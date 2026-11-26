import { NextResponse } from "next/server";
import { getTapConfig } from "@/lib/payments/tap";
import { tapWebhookSchema, verifyWebhookHash } from "@/lib/payments/webhook";
import { reconcileOrder } from "@/lib/payments/ledger";
import { readJson } from "@/lib/http/read-json";
export const runtime = "nodejs";
export async function POST(request: Request) {
  let payload;
  try {
    payload = tapWebhookSchema.parse(await readJson(request, 64_000));
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  try {
    const config = getTapConfig();
    if (!verifyWebhookHash(payload, request.headers.get("hashstring"), config.secretKey))
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    if (
      payload.metadata.order_id !== payload.reference.order ||
      payload.live_mode !== (config.mode === "live")
    )
      return NextResponse.json({ error: "mismatch" }, { status: 400 });
    await reconcileOrder(payload.reference.order, payload.id, config);
    return NextResponse.json({ received: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    // Non-2xx tells Tap to retry after a temporary storage/API outage.
    return NextResponse.json({ error: "retry_later" }, { status: 503 });
  }
}
