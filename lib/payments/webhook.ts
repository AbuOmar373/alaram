import { createHmac, timingSafeEqual } from "node:crypto";
import { z } from "zod";

export const tapWebhookSchema = z.object({
  id: z.string().regex(/^chg_[A-Za-z0-9_]{1,180}$/),
  amount: z.number().positive().finite(),
  currency: z.literal("SAR"),
  status: z.string().min(1).max(50),
  live_mode: z.boolean(),
  reference: z.object({
    gateway: z.string().nullish(),
    payment: z.string().nullish(),
    order: z.string().uuid(),
  }),
  transaction: z.object({
    created: z.union([z.string().regex(/^\d+$/), z.number().int().positive()]),
  }),
  metadata: z.object({
    order_id: z.string().uuid(),
    product: z.enum(["lms", "estimator"]),
    plan: z.string().max(40),
  }),
});
export type TapWebhook = z.infer<typeof tapWebhookSchema>;
export function webhookHash(payload: TapWebhook, secret: string) {
  const input = `x_id${payload.id}x_amount${payload.amount.toFixed(2)}x_currency${payload.currency}x_gateway_reference${payload.reference.gateway || ""}x_payment_reference${payload.reference.payment || ""}x_status${payload.status}x_created${payload.transaction.created}`;
  return createHmac("sha256", secret).update(input).digest("hex");
}
export function verifyWebhookHash(payload: TapWebhook, received: string | null, secret: string) {
  if (!received || !/^[a-fA-F0-9]{64}$/.test(received)) return false;
  return timingSafeEqual(
    Buffer.from(received, "hex"),
    Buffer.from(webhookHash(payload, secret), "hex")
  );
}
