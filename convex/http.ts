import { httpRouter, type FunctionArgs } from "convex/server";
import { z } from "zod";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { auth } from "./auth";

const http = httpRouter();
auth.addHttpRoutes(http);

const requestSchema = z
  .object({
    operation: z.enum([
      "createOrder",
      "setOrderState",
      "getOrder",
      "createInquiry",
      "notification",
    ]),
    data: z.record(z.string(), z.unknown()),
  })
  .strict();

async function authorized(request: Request) {
  const secret = process.env.STORE_INGEST_SECRET;
  if (!secret) return false;
  const encoder = new TextEncoder();
  const values = await Promise.all(
    [request.headers.get("authorization") || "", `Bearer ${secret}`].map((value) =>
      crypto.subtle.digest("SHA-256", encoder.encode(value))
    )
  );
  const a = new Uint8Array(values[0]);
  const b = new Uint8Array(values[1]);
  let different = 0;
  for (let i = 0; i < a.length; i++) different |= a[i] ^ b[i];
  return different === 0;
}

http.route({
  path: "/store/ingest",
  method: "POST",
  handler: httpAction(async (ctx, request): Promise<Response> => {
    const json = (body: unknown, status = 200) =>
      Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
    if (!(await authorized(request))) return json({ error: "unauthorized" }, 401);
    try {
      const raw = await request.text();
      if (raw.length > 32_000) return json({ error: "invalid" }, 400);
      const { operation, data } = requestSchema.parse(JSON.parse(raw));
      let result: unknown;
      switch (operation) {
        case "createOrder":
          result = await ctx.runMutation(
            internal.ingest.createOrder,
            data as FunctionArgs<typeof internal.ingest.createOrder>
          );
          break;
        case "setOrderState":
          result = await ctx.runMutation(
            internal.ingest.setOrderState,
            data as FunctionArgs<typeof internal.ingest.setOrderState>
          );
          break;
        case "getOrder":
          result = await ctx.runQuery(
            internal.ingest.getOrder,
            data as FunctionArgs<typeof internal.ingest.getOrder>
          );
          break;
        case "createInquiry":
          result = await ctx.runMutation(
            internal.ingest.createInquiry,
            data as FunctionArgs<typeof internal.ingest.createInquiry>
          );
          break;
        case "notification":
          result = await ctx.runMutation(
            internal.ingest.notification,
            data as FunctionArgs<typeof internal.ingest.notification>
          );
          break;
      }
      return json({ result });
    } catch {
      return json({ error: "store_request_failed" }, 400);
    }
  }),
});

export default http;
