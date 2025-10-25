import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Log the demo booking (in production, this would save to a database or CRM)
    console.log("Demo Booking:", {
      timestamp: new Date().toISOString(),
      ...body,
    });

    // Simulate email sending (in production, use a service like SendGrid, Mailgun, etc.)
    console.log(`Sending confirmation email to: ${body.email}`);
    console.log("Demo details:", {
      name: body.name,
      company: body.company,
      industry: body.industry,
      preferredDate: body.preferredDate,
      preferredTime: body.preferredTime,
    });

    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message:
          "Demo booked successfully! We'll contact you shortly to confirm the appointment.",
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

