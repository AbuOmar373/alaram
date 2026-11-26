import { NextRequest, NextResponse } from "next/server";
import { contactSubmissionSchema } from "@/lib/validations/contact-schema";
import { readJson } from "@/lib/http/read-json";
import { isRateLimited } from "@/lib/spam-guard";
import { isTurnstileConfigured, verifyTurnstileToken } from "@/lib/turnstile";
import { storeRequest } from "@/lib/admin/store";

export async function POST(request: NextRequest) {
  const json = (success: boolean, status: number, code?: string) =>
    NextResponse.json({ success, code }, { status });
  try {
    const parsed = contactSubmissionSchema.safeParse(await readJson(request));
    if (!parsed.success) return json(false, 400, "INVALID_DATA");
    const data = parsed.data;
    const ip =
      request.headers.get("x-real-ip") ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    if (isRateLimited(ip ? `contact:${ip}` : undefined)) return json(false, 429, "RATE_LIMITED");
    const elapsed = Date.now() - data.formStartedAt;
    if (data.website?.trim() || elapsed < 3000 || elapsed > 21_600_000) return json(true, 200);
    if (process.env.NODE_ENV === "production" && !isTurnstileConfigured({ server: true }))
      return json(false, 503, "CONFIG_ERROR");
    if (
      isTurnstileConfigured({ server: true }) &&
      (!data.turnstileToken ||
        !(await verifyTurnstileToken(data.turnstileToken, ip, "contact_form")))
    )
      return json(false, 403, "TURNSTILE_FAILED");
    await storeRequest("createInquiry", {
      submissionId: data.submissionId,
      kind: "contact",
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      industry: data.industry,
      message: data.message,
      locale: data.locale,
    });
    return json(true, 200);
  } catch {
    return json(false, 503, "SERVICE_UNAVAILABLE");
  }
}
