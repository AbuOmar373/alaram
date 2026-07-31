import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import React from "react";

import DemoConfirmationEmail from "@/emails/demo-confirmation";
import { TURNSTILE_ACTION, verifyTurnstileToken } from "@/lib/turnstile";
import { demoSubmissionSchema } from "@/lib/validations/demo-schema";

const resend = new Resend(process.env.RESEND_API_KEY);

function getClientIp(request: NextRequest) {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
  );
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is missing");
    }

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
    const isHuman = await verifyTurnstileToken(data.turnstileToken, getClientIp(request));

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

    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: data.email,
      cc: process.env.RESEND_TO_EMAIL || "",
      replyTo: process.env.RESEND_TO_EMAIL || "",
      subject:
        data.locale === "ar"
          ? `طلب عرض توضيحي جديد - ${data.company}`
          : `New Demo Request - ${data.company}`,
      react: React.createElement(DemoConfirmationEmail, {
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
      }),
    });

    if (result.error) {
      console.error("Resend send error:", result.error);

      return NextResponse.json(
        {
          success: false,
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
