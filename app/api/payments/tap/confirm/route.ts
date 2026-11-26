import { NextResponse } from "next/server";
import { z } from "zod";
import { getTapConfig, readPaymentIntent } from "@/lib/payments/tap";
import { reconcileOrder } from "@/lib/payments/ledger";
import { readJson } from "@/lib/http/read-json";
const schema = z
  .object({ state: z.string().max(2000), chargeId: z.string().regex(/^chg_[A-Za-z0-9_]{1,180}$/) })
  .strict();
export async function POST(request: Request) {
  try {
    const config = getTapConfig();
    if (request.headers.get("origin") !== config.origin)
      return NextResponse.json({ error: "invalid" }, { status: 403 });
    const { state, chargeId } = schema.parse(await readJson(request, 8192));
    const intent = readPaymentIntent(state, config, false);
    await reconcileOrder(intent.orderId, chargeId, config);
    return NextResponse.json({ confirmed: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}
