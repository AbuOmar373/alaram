import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Log the contact form submission (in production, this would save to a database or send to a CRM)
    console.log("Contact Form Submission:", {
      timestamp: new Date().toISOString(),
      ...body,
    });

    // Simulate email sending (in production, use a service like SendGrid, Mailgun, etc.)
    console.log(`Sending email to: ${process.env.CONTACT_INBOX || "sales@alaram.example"}`);
    console.log("Email content:", {
      subject: `New Contact Form: ${body.name}`,
      from: body.email,
      message: body.message,
    });

    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received. We'll contact you soon!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}

