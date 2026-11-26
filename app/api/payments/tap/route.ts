import { NextRequest, NextResponse } from "next/server";
import {
  checkoutSubmissionSchema,
  createTapCharge,
  getTapConfig,
  PaymentError,
  readPaymentIntent,
} from "@/lib/payments/tap";
import { getCheckoutPlan, isStoreConfigured, storeRequest } from "@/lib/admin/store";
import { recordCharge } from "@/lib/payments/ledger";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const headers = { "Cache-Control": "no-store" };
  try {
    const config = getTapConfig();
    if (request.headers.get("origin") !== config.origin) {
      return NextResponse.json({ error: "invalid" }, { status: 403, headers });
    }
    if (!request.headers.get("content-type")?.startsWith("application/json")) {
      return NextResponse.json({ error: "invalid" }, { status: 415, headers });
    }
    // Bound the body even for chunked requests with no Content-Length.
    const reader = request.body?.getReader();
    if (!reader) throw new PaymentError("invalid");
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > 8192) {
        await reader.cancel();
        throw new PaymentError("invalid");
      }
      chunks.push(value);
    }
    let body: unknown;
    try {
      body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    } catch {
      throw new PaymentError("invalid");
    }
    const parsed = checkoutSubmissionSchema.safeParse(body);
    if (!parsed.success) throw new PaymentError("invalid");
    const intent = readPaymentIntent(parsed.data.token, config);
    const plan = await getCheckoutPlan(intent.product, intent.plan);
    if (!plan || plan.amountMinor !== intent.amountMinor) throw new PaymentError("invalid");
    const save = isStoreConfigured();
    if (!save && process.env.NODE_ENV === "production") throw new PaymentError("unavailable");
    if (save)
      await storeRequest("createOrder", {
        orderId: intent.orderId,
        product: intent.product,
        plan: intent.plan,
        packageName: plan.name[intent.locale],
        amountMinor: intent.amountMinor,
        currency: "SAR",
        mode: intent.mode,
        merchantId: intent.merchantId,
        locale: intent.locale,
        customerName: parsed.data.customer.name,
        customerEmail: parsed.data.customer.email,
        customerPhone: `+${parsed.data.customer.countryCode}${parsed.data.customer.phone}`,
        createdAt: intent.createdAt,
      });
    const url = await createTapCharge(
      parsed.data.token,
      parsed.data.customer,
      config,
      save ? recordCharge : undefined
    );
    return NextResponse.json({ url }, { headers });
  } catch (error) {
    const code = error instanceof PaymentError ? error.code : "provider";
    const status = code === "unavailable" ? 503 : ["invalid", "expired"].includes(code) ? 400 : 502;
    return NextResponse.json({ error: code }, { status, headers });
  }
}
