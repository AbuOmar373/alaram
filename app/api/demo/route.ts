import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import React from "react";

import DemoConfirmationEmail from "@/emails/demo-confirmation";
import { TURNSTILE_ACTION, isTurnstileConfigured, verifyTurnstileToken } from "@/lib/turnstile";
import { demoSubmissionSchema } from "@/lib/validations/demo-schema";

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
          getClientIp(request)
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
    const emailContent = React.createElement(DemoConfirmationEmail, {
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
      message: data.message,
    });

    if (adminEmail) {
      const adminResult = await resend.emails.send({
        from: fromEmail,
        to: adminEmail,
        replyTo: data.email,
        subject,
        react: emailContent,
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
    }

    const customerResult = await resend.emails.send({
      from: fromEmail,
      to: data.email,
      replyTo: adminEmail || fromEmail,
      subject,
      react: emailContent,
    });

    if (customerResult.error) {
      console.error("Resend customer confirmation error:", customerResult.error);

      return NextResponse.json(
        {
          success: false,
          code: "EMAIL_FAILED",
          message: "Failed to send email",
        },
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

    return NextResponse.json(
      {
        success: false,
        message: "An error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
