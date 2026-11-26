import "server-only";

import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { type PaymentLocale, type PaymentPlan } from "@/lib/payments/catalog";
import { getCheckoutPlan } from "@/lib/admin/store";

const API_URL = "https://api.tap.company/v2/charges";
// Tap retains idempotency for 24h; never submit an older checkout attempt.
export const CHECKOUT_LIFETIME_MS = 23 * 60 * 60 * 1000;

export class PaymentError extends Error {
  constructor(public code: "unavailable" | "invalid" | "expired" | "provider" | "mismatch") {
    super(code);
  }
}

export function getTapConfig() {
  const mode = process.env.TAP_MODE?.trim();
  const secretKey = process.env.TAP_SECRET_KEY?.trim();
  const merchantId = process.env.TAP_MERCHANT_ID?.trim();
  const signingSecret = process.env.TAP_CHECKOUT_SIGNING_SECRET?.trim();
  if (
    (mode !== "test" && mode !== "live") ||
    !secretKey?.startsWith(`sk_${mode}_`) ||
    secretKey.length < 20 ||
    !merchantId ||
    !/^\d+$/.test(merchantId) ||
    !signingSecret ||
    signingSecret.length < 32
  )
    throw new PaymentError("unavailable");

  let url: URL;
  try {
    url = new URL(process.env.TAP_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || "");
  } catch {
    throw new PaymentError("unavailable");
  }
  const localTest = mode === "test" && ["localhost", "127.0.0.1"].includes(url.hostname);
  if (
    (url.protocol !== "https:" && !(localTest && url.protocol === "http:")) ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== "/"
  ) {
    throw new PaymentError("unavailable");
  }
  return {
    mode: mode as "test" | "live",
    secretKey,
    merchantId,
    signingSecret,
    origin: url.origin,
  };
}

export type TapConfig = ReturnType<typeof getTapConfig>;

const intentSchema = z
  .object({
    version: z.literal(1),
    orderId: z.string().uuid(),
    product: z.enum(["lms", "estimator"]),
    plan: z.string().max(40),
    amountMinor: z.number().int().positive(),
    currency: z.literal("SAR"),
    locale: z.enum(["ar", "en"]),
    mode: z.enum(["test", "live"]),
    merchantId: z.string(),
    createdAt: z.number().int().positive(),
  })
  .strict();

export type PaymentIntent = z.infer<typeof intentSchema>;

function signature(payload: string, config: TapConfig) {
  return createHmac("sha256", config.signingSecret).update(payload).digest();
}

export function createPaymentIntent(
  plan: PaymentPlan,
  locale: PaymentLocale,
  config: TapConfig,
  now = Date.now()
) {
  const intent: PaymentIntent = {
    version: 1,
    orderId: randomUUID(),
    product: plan.product as PaymentIntent["product"],
    plan: plan.id,
    amountMinor: plan.amountMinor,
    currency: "SAR",
    locale,
    mode: config.mode,
    merchantId: config.merchantId,
    createdAt: now,
  };
  const payload = Buffer.from(JSON.stringify(intent)).toString("base64url");
  return {
    token: `${payload}.${signature(payload, config).toString("base64url")}`,
    expiresAt: now + CHECKOUT_LIFETIME_MS,
  };
}

export function readPaymentIntent(
  token: string,
  config: TapConfig,
  forCreation = true,
  now = Date.now()
): PaymentIntent {
  if (token.length > 2000) throw new PaymentError("invalid");
  const parts = token.split(".");
  if (parts.length !== 2) throw new PaymentError("invalid");
  const [payload, encodedSignature] = parts;
  const received = Buffer.from(encodedSignature, "base64url");
  const expected = signature(payload, config);
  if (received.length !== expected.length || !timingSafeEqual(received, expected))
    throw new PaymentError("invalid");
  let intent: PaymentIntent;
  try {
    intent = intentSchema.parse(JSON.parse(Buffer.from(payload, "base64url").toString("utf8")));
  } catch {
    throw new PaymentError("invalid");
  }
  if (
    intent.mode !== config.mode ||
    intent.merchantId !== config.merchantId ||
    intent.createdAt > now + 60_000
  ) {
    throw new PaymentError("invalid");
  }
  if (forCreation) {
    if (now - intent.createdAt >= CHECKOUT_LIFETIME_MS) throw new PaymentError("expired");
  }
  return intent;
}

export const checkoutSubmissionSchema = z
  .object({
    token: z.string().min(1).max(2000),
    acceptedTerms: z.literal(true),
    customer: z
      .object({
        name: z
          .string()
          .trim()
          .min(2)
          .max(100)
          .refine((v) => !/[\u0000-\u001f]/.test(v)),
        email: z.string().trim().email().max(254),
        countryCode: z.string().regex(/^[1-9]\d{0,3}$/),
        phone: z.string().regex(/^\d{6,14}$/),
      })
      .strict()
      .refine((v) => (v.countryCode + v.phone).length <= 15),
  })
  .strict();

const chargeSchema = z.object({
  id: z.string().regex(/^chg_[A-Za-z0-9_]+$/),
  status: z.string(),
  amount: z.number().positive(),
  currency: z.string(),
  live_mode: z.boolean(),
  reference: z.object({ order: z.string() }),
  metadata: z.object({ order_id: z.string(), product: z.string(), plan: z.string() }),
  merchant: z.object({ id: z.string() }).optional(),
  transaction: z.object({ url: z.string().nullish() }).optional(),
});
export type TapCharge = z.infer<typeof chargeSchema>;

async function tapRequest(path: string, config: TapConfig, init: RequestInit = {}) {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...init,
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(20_000),
      headers: {
        Authorization: `Bearer ${config.secretKey}`,
        "Content-Type": "application/json",
        ...init.headers,
      },
    });
    if (!response.ok) throw new PaymentError("provider");
    const parsed = chargeSchema.safeParse(await response.json());
    if (!parsed.success) throw new PaymentError("provider");
    return parsed.data;
  } catch {
    // Do not expose provider payloads, credentials, or customer information.
    throw new PaymentError("provider");
  }
}

export function verifyCharge(charge: TapCharge, intent: PaymentIntent, expectedId?: string) {
  if (
    (expectedId && charge.id !== expectedId) ||
    Math.abs(charge.amount * 100 - intent.amountMinor) > 0.001 ||
    charge.currency !== intent.currency ||
    charge.live_mode !== (intent.mode === "live") ||
    charge.reference.order !== intent.orderId ||
    charge.metadata.order_id !== intent.orderId ||
    charge.metadata.product !== intent.product ||
    charge.metadata.plan !== intent.plan ||
    (charge.merchant && charge.merchant.id !== intent.merchantId)
  )
    throw new PaymentError("mismatch");
}

export function paymentStatus(status: string): "paid" | "failed" | "pending" {
  if (status === "CAPTURED") return "paid";
  if (
    ["FAILED", "DECLINED", "CANCELLED", "ABANDONED", "TIMEDOUT", "RESTRICTED", "VOID"].includes(
      status
    )
  )
    return "failed";
  return "pending";
}

export function resultUrl(
  intent: PaymentIntent,
  token: string,
  config: TapConfig,
  chargeId?: string
) {
  const url = new URL(`/${intent.locale}/checkout/result`, config.origin);
  url.searchParams.set("state", token);
  if (chargeId) url.searchParams.set("tap_id", chargeId);
  return url.toString();
}

export function validateTapRedirect(value: string | null | undefined) {
  let url: URL;
  try {
    url = new URL(value || "");
  } catch {
    throw new PaymentError("provider");
  }
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    (url.port && url.port !== "443") ||
    !(url.hostname === "tap.company" || url.hostname.endsWith(".tap.company"))
  )
    throw new PaymentError("provider");
  return url.toString();
}

export async function createTapCharge(
  token: string,
  customer: z.infer<typeof checkoutSubmissionSchema>["customer"],
  config: TapConfig,
  onCharge?: (charge: TapCharge, intent: PaymentIntent) => Promise<void>
) {
  const intent = readPaymentIntent(token, config);
  const plan = await getCheckoutPlan(intent.product, intent.plan);
  if (!plan || plan.amountMinor !== intent.amountMinor) throw new PaymentError("invalid");
  const [firstName, ...remainingName] = customer.name.split(/\s+/);
  const charge = await tapRequest("/", config, {
    method: "POST",
    headers: { lang_code: intent.locale },
    body: JSON.stringify({
      amount: intent.amountMinor / 100,
      currency: intent.currency,
      customer_initiated: true,
      threeDSecure: true,
      save_card: false,
      description: `${plan.productName[intent.locale]} — ${plan.name[intent.locale]}`,
      metadata: { order_id: intent.orderId, product: intent.product, plan: intent.plan },
      reference: { order: intent.orderId, transaction: intent.orderId, idempotent: intent.orderId },
      customer: {
        first_name: firstName,
        ...(remainingName.length ? { last_name: remainingName.join(" ") } : {}),
        email: customer.email,
        phone: { country_code: customer.countryCode, number: customer.phone },
      },
      merchant: { id: config.merchantId },
      source: { id: "src_all" },
      redirect: { url: resultUrl(intent, token, config) },
      ...(config.origin.startsWith("https:")
        ? { post: { url: new URL("/api/payments/tap/webhook", config.origin).toString() } }
        : {}),
    }),
  });
  verifyCharge(charge, intent);
  if (onCharge) await onCharge(charge, intent);
  // Reusing an attempt can return a charge that has already completed.
  return paymentStatus(charge.status) !== "pending"
    ? resultUrl(intent, token, config, charge.id)
    : validateTapRedirect(charge.transaction?.url);
}

export async function retrieveTapCharge(
  chargeId: string,
  intent: PaymentIntent,
  config: TapConfig
) {
  if (!/^chg_[A-Za-z0-9_]{1,180}$/.test(chargeId)) throw new PaymentError("invalid");
  const charge = await tapRequest(`/${encodeURIComponent(chargeId)}`, config);
  verifyCharge(charge, intent, chargeId);
  return charge;
}
