import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import React from "react";

import DemoConfirmationEmail from "@/emails/demo-confirmation";
import { TURNSTILE_ACTION, isTurnstileConfigured, verifyTurnstileToken } from "@/lib/turnstile";
import { checkSubmission, isRateLimited } from "@/lib/spam-guard";
import { demoSubmissionSchema, type DemoFormData } from "@/lib/validations/demo-schema";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is missing");
  }

  return new Resend(apiKey);
}

function getClientIp(request: NextRequest) {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
  );
}

function stripHtml(value?: string) {
  if (!value?.trim()) return undefined;

  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function createDemoEmailElement(data: DemoFormData) {
  return React.createElement(DemoConfirmationEmail, {
    locale: data.locale,
    name: data.name,
    email: data.email,
    phone: data.phone,
    company: data.company,
    industry: data.industry,
    employeeCount: data.employeeCount,
    preferredDate: data.preferredDate,
    preferredTime: data.preferredTime,
    currentSolution: data.currentSolution,
    message: stripHtml(data.message),
  });
}

function buildPlainTextEmail(data: DemoFormData) {
  const message = stripHtml(data.message);

  return [
    `Demo request from ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Company: ${data.company}`,
    `Industry: ${data.industry}`,
    data.employeeCount ? `Employees: ${data.employeeCount}` : null,
    data.preferredDate ? `Preferred date: ${data.preferredDate}` : null,
    data.preferredTime ? `Preferred time: ${data.preferredTime}` : null,
    data.currentSolution ? `Current solution: ${data.currentSolution}` : null,
    message ? `Message:\n${message}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

async function sendDemoEmail(
  resend: Resend,
  options: {
    from: string;
    to: string;
    subject: string;
    data: DemoFormData;
    replyTo?: string;
  }
) {
  const { from, to, subject, data, replyTo } = options;
  const react = createDemoEmailElement(data);
  const text = buildPlainTextEmail(data);

  const reactResult = await resend.emails.send({
    from,
    to,
    replyTo,
    subject,
    react,
    text,
  });

  if (!reactResult.error) {
    return reactResult;
  }

  console.error("Resend react email error:", reactResult.error);

  return resend.emails.send({
    from,
    to,
    replyTo,
    subject,
    text,
  });
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.RESEND_FROM_EMAIL) {
      throw new Error("RESEND_FROM_EMAIL is missing");
    }

    const body = await request.json();
    const parsed = demoSubmissionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid form data",
          errors: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const clientIp = getClientIp(request);

    // Bots get a fake "success" so they don't learn what blocked them.
    const fakeSuccess = () =>
      NextResponse.json({ success: true, message: "Demo booked successfully" }, { status: 200 });

    if (isRateLimited(clientIp)) {
      console.warn("Demo form rate limited:", { ip: clientIp, email: data.email });
      return NextResponse.json(
        { success: false, code: "RATE_LIMITED", message: "Too many requests" },
        { status: 429 }
      );
    }

    const spamCheck = checkSubmission(data);
    if (!spamCheck.ok) {
      console.warn("Demo form blocked as spam:", {
        reason: spamCheck.reason,
        ip: clientIp,
        email: data.email,
      });
      return fakeSuccess();
    }

    // Fail closed: never send emails in production without human verification.
    if (process.env.NODE_ENV === "production" && !isTurnstileConfigured({ server: true })) {
      console.error(
        "Turnstile is not configured (NEXT_PUBLIC_TURNSTILE_SITE_KEY / TURNSTILE_SECRET_KEY). Refusing demo submission."
      );
      return NextResponse.json(
        { success: false, code: "CONFIG_ERROR", message: "Service temporarily unavailable" },
        { status: 503 }
      );
    }

    if (isTurnstileConfigured({ server: true })) {
      if (!data.turnstileToken) {
        return NextResponse.json(
          {
            success: false,
            code: "TURNSTILE_FAILED",
            message: "Human verification is required",
            action: TURNSTILE_ACTION,
          },
          { status: 403 }
        );
      }

      try {
        const isHuman = await verifyTurnstileToken(
          data.turnstileToken,
          clientIp
        );

        if (!isHuman) {
          return NextResponse.json(
            {
              success: false,
              code: "TURNSTILE_FAILED",
              message: "Human verification failed",
              action: TURNSTILE_ACTION,
            },
            { status: 403 }
          );
        }
      } catch (error) {
        console.error("Turnstile verification error:", error);

        return NextResponse.json(
          {
            success: false,
            code: "TURNSTILE_FAILED",
            message: "Human verification service unavailable",
          },
          { status: 503 }
        );
      }
    }

    const resend = getResendClient();
    const adminEmail = process.env.RESEND_TO_EMAIL?.trim();
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    const subject =
      data.locale === "ar"
        ? `طلب عرض توضيحي جديد - ${data.company}`
        : `New Demo Request - ${data.company}`;

    let adminSent = false;

    if (adminEmail) {
      const adminResult = await sendDemoEmail(resend, {
        from: fromEmail,
        to: adminEmail,
        replyTo: data.email,
        subject,
        data,
      });

      if (adminResult.error) {
        console.error("Resend admin notification error:", adminResult.error);

        return NextResponse.json(
          {
            success: false,
            code: "EMAIL_FAILED",
            message: "Failed to send email",
          },
          { status: 500 }
        );
      }

      adminSent = true;
    }

    // NOTE: We intentionally do NOT email the address typed into the form.
    // Bots abuse that to send mail to victims through our domain, which hurts
    // deliverability. The team replies to the customer manually instead.
    if (!adminSent) {
      console.error("RESEND_TO_EMAIL is missing; demo request was not delivered.");
      return NextResponse.json(
        { success: false, code: "CONFIG_ERROR", message: "An error occurred. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Demo booked successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Demo booking error:", error);

    const message = error instanceof Error ? error.message : "Unknown error";
    const isConfigError =
      message.includes("RESEND_API_KEY") || message.includes("RESEND_FROM_EMAIL");

    return NextResponse.json(
      {
        success: false,
        code: isConfigError ? "CONFIG_ERROR" : "SERVER_ERROR",
        message: "An error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
