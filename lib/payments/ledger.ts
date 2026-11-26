import "server-only";
import { storeRequest } from "@/lib/admin/store";
import {
  getTapConfig,
  paymentStatus,
  retrieveTapCharge,
  verifyCharge,
  type PaymentIntent,
  type TapCharge,
  type TapConfig,
} from "@/lib/payments/tap";
import type { Doc } from "@/convex/_generated/dataModel";

export function intentForOrder(order: Doc<"orders">): PaymentIntent {
  return {
    version: 1,
    orderId: order.orderId,
    product: order.product,
    plan: order.plan,
    amountMinor: order.amountMinor,
    currency: order.currency,
    locale: order.locale,
    mode: order.mode,
    merchantId: order.merchantId,
    createdAt: order.createdAt,
  };
}
export async function recordCharge(charge: TapCharge, intent: PaymentIntent) {
  verifyCharge(charge, intent);
  await storeRequest("setOrderState", {
    orderId: intent.orderId,
    chargeId: charge.id,
    status: paymentStatus(charge.status),
    providerStatus: charge.status,
  });
}
export async function reconcileOrder(
  orderId: string,
  expectedChargeId?: string,
  config?: TapConfig
) {
  const order = await storeRequest("getOrder", { orderId });
  if (!order) throw new Error("Order not found");
  const settings = config || getTapConfig();
  if (order.mode !== settings.mode || order.merchantId !== settings.merchantId)
    throw new Error("Payment mode mismatch");
  const chargeId = expectedChargeId || order.chargeId;
  if (!chargeId || (order.chargeId && order.chargeId !== chargeId))
    throw new Error("Charge mismatch");
  const intent = intentForOrder(order);
  const charge = await retrieveTapCharge(chargeId, intent, settings);
  await recordCharge(charge, intent);
  return charge;
}
