import { NextResponse } from "next/server";
import { fetchQuery } from "convex/nextjs";
import { z } from "zod";
import { api } from "@/convex/_generated/api";
import { reconcileOrder } from "@/lib/payments/ledger";
import { readJson } from "@/lib/http/read-json";
export async function POST(request: Request) {
  const token = request.headers.get("authorization")?.replace(/^Bearer /, "");
  if (!token || token.length > 8192)
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    await fetchQuery(api.admin.me, {}, { token });
  } catch {
    return NextResponse.json({ error: "unauthorized" }, { status: 403 });
  }
  try {
    const { orderId } = z
      .object({ orderId: z.string().uuid() })
      .strict()
      .parse(await readJson(request, 2048));
    const charge = await reconcileOrder(orderId);
    return NextResponse.json(
      { status: charge.status },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}
