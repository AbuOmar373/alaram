import { test, beforeEach, afterEach, mock } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { getPaymentPlan } from "../lib/payments/catalog.ts";
import {
  CHECKOUT_LIFETIME_MS, checkoutSubmissionSchema, createPaymentIntent, createTapCharge, getTapConfig,
  paymentStatus, readPaymentIntent, retrieveTapCharge, validateTapRedirect, verifyCharge,
} from "../lib/payments/tap.ts";
import { POST } from "../app/api/payments/tap/route.ts";

// Fixtures only: no valid provider credentials and no network requests in this suite.
const env = {
  TAP_MODE: "test", TAP_SECRET_KEY: "sk_test_unit_tests_not_a_real_key",
  TAP_MERCHANT_ID: "12345678", TAP_SITE_URL: "https://shop.example",
  TAP_CHECKOUT_SIGNING_SECRET: "a_test_only_signing_secret_at_least_32_characters",
};
const saved = Object.fromEntries(Object.keys(env).map((key) => [key, process.env[key]]));
const customer = { name: "Test Customer", email: "customer@example.com", countryCode: "966", phone: "500000000" };
beforeEach(() => {
  Object.assign(process.env, env);
  mock.method(globalThis, "fetch", async () => { throw new Error("Unexpected network access in test"); });
});
afterEach(() => {
  mock.restoreAll();
  for (const [key, value] of Object.entries(saved)) {
    if (value === undefined) delete process.env[key]; else process.env[key] = value;
  }
});

function fixture(product = "lms", planId = "application") {
  const config = getTapConfig();
  const plan = getPaymentPlan(product, planId);
  const signed = createPaymentIntent(plan, "ar", config);
  const intent = readPaymentIntent(signed.token, config);
  const charge = {
    id: "chg_test_order_123", status: "INITIATED", amount: plan.amountMinor / 100,
    currency: "SAR", live_mode: false, merchant: { id: config.merchantId },
    reference: { order: intent.orderId },
    metadata: { order_id: intent.orderId, product, plan: planId },
    transaction: { url: "https://sandbox.payments.tap.company/test/payment" },
  };
  return { ...signed, config, plan, intent, charge };
}

function request(body, headers = {}) {
  return new NextRequest("https://shop.example/api/payments/tap", {
    method: "POST", headers: { origin: "https://shop.example", "content-type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

test("catalog uses final prices, including the full annual bill", () => {
  assert.equal(getPaymentPlan("lms", "application").amountMinor, 60000);
  assert.equal(getPaymentPlan("lms", "full-setup").amountMinor, 150000);
  assert.equal(getPaymentPlan("estimator", "annual").amountMinor, 119000);
  assert.equal(getPaymentPlan("estimator", "monthly").amountMinor, 12900);
  assert.equal(getPaymentPlan("lms", "annual"), null);
  assert.equal(getPaymentPlan("unknown", "monthly"), null);
});

test("configuration fails closed for absent credentials or mismatched mode", () => {
  for (const change of [{ TAP_SECRET_KEY: "" }, { TAP_MODE: "live" }, { TAP_MODE: "" },
    { TAP_MERCHANT_ID: "" }, { TAP_CHECKOUT_SIGNING_SECRET: "short" }]) {
    Object.assign(process.env, env, change);
    assert.throws(getTapConfig, /unavailable/);
  }
});

test("redirect origin must be explicit and secure; HTTP localhost is test-only", () => {
  for (const origin of ["https://user:pass@shop.example", "https://shop.example/path", "https://shop.example/?q=x", "http://shop.example", "invalid"]) {
    process.env.TAP_SITE_URL = origin;
    assert.throws(getTapConfig, /unavailable/);
  }
  process.env.TAP_SITE_URL = "http://localhost:3000";
  assert.equal(getTapConfig().origin, "http://localhost:3000");
  Object.assign(process.env, { TAP_MODE: "live", TAP_SECRET_KEY: "sk_live_unit_tests_not_a_real_key" });
  assert.throws(getTapConfig, /unavailable/);
});

test("signed intent rejects changed price, product, or signature", () => {
  const f = fixture();
  assert.equal(f.intent.amountMinor, 60000);
  const [payload, signature] = f.token.split(".");
  for (const change of [{ amountMinor: 1 }, { product: "estimator" }, { plan: "full-setup" }]) {
    const changed = Buffer.from(JSON.stringify({ ...JSON.parse(Buffer.from(payload, "base64url")), ...change })).toString("base64url");
    assert.throws(() => readPaymentIntent(`${changed}.${signature}`, f.config), /invalid/);
  }
  assert.throws(() => readPaymentIntent(`${f.token}x`, f.config), /invalid/);
  assert.throws(() => readPaymentIntent("invalid", f.config), /invalid/);
});

test("expired intent cannot create new charges but can still verify an old result", () => {
  const f = fixture();
  const later = f.intent.createdAt + CHECKOUT_LIFETIME_MS;
  assert.throws(() => readPaymentIntent(f.token, f.config, true, later), /expired/);
  assert.equal(readPaymentIntent(f.token, f.config, false, later).orderId, f.intent.orderId);
  assert.throws(() => readPaymentIntent(f.token, { ...f.config, merchantId: "different" }), /invalid/);
  assert.throws(() => readPaymentIntent(f.token, { ...f.config, mode: "live" }), /invalid/);
});

test("only a captured, matching charge is considered paid", () => {
  const f = fixture();
  assert.doesNotThrow(() => verifyCharge(f.charge, f.intent, f.charge.id));
  for (const change of [{ amount: 1 }, { currency: "USD" }, { live_mode: true },
    { reference: { order: "another" } }, { merchant: { id: "another" } },
    { metadata: { ...f.charge.metadata, product: "estimator" } },
    { metadata: { ...f.charge.metadata, plan: "full-setup" } },
    { metadata: { ...f.charge.metadata, order_id: "another" } }]) {
    assert.throws(() => verifyCharge({ ...f.charge, ...change }, f.intent), /mismatch/);
  }
  assert.throws(() => verifyCharge(f.charge, f.intent, "chg_other"), /mismatch/);
  assert.equal(paymentStatus("CAPTURED"), "paid");
  for (const status of ["FAILED", "DECLINED", "CANCELLED", "ABANDONED", "TIMEDOUT", "RESTRICTED", "VOID"]) assert.equal(paymentStatus(status), "failed");
  for (const status of ["INITIATED", "PENDING", "AUTHORIZED", "UNKNOWN"]) assert.equal(paymentStatus(status), "pending");
});

test("hosted redirect rejects phishing URLs, credentials, and non-HTTPS schemes", () => {
  assert.equal(validateTapRedirect("https://checkout.tap.company/pay"), "https://checkout.tap.company/pay");
  for (const url of ["https://tap.company.evil.test/pay", "https://eviltap.company/pay", "https://evil.test", "javascript:alert(1)",
    "http://checkout.tap.company/pay", "https://a:b@tap.company/pay", "https://tap.company:444/pay", ""]) {
    assert.throws(() => validateTapRedirect(url), /provider/);
  }
});

test("charge request uses server price, merchant, secure hosted flow, and stable idempotency on retry", async () => {
  const f = fixture("estimator", "annual");
  const calls = [];
  globalThis.fetch.mock.mockImplementation(async (url, init) => {
    calls.push({ url, init, body: JSON.parse(init.body) });
    return Response.json(f.charge);
  });
  assert.equal(await createTapCharge(f.token, customer, f.config), f.charge.transaction.url);
  await createTapCharge(f.token, customer, f.config);
  assert.equal(calls[0].url, "https://api.tap.company/v2/charges/");
  const { body, init } = calls[0];
  assert.equal(body.amount, 1190);
  assert.equal(body.currency, "SAR");
  assert.equal(body.merchant.id, f.config.merchantId);
  assert.equal(body.reference.idempotent, calls[1].body.reference.idempotent);
  assert.equal(body.reference.idempotent, f.intent.orderId);
  assert.equal(body.source.id, "src_all");
  assert.equal(body.threeDSecure, true);
  assert.equal(body.save_card, false);
  assert.equal(body.customer.first_name, "Test");
  assert.equal(body.customer.last_name, "Customer");
  assert.equal(init.headers.lang_code, "ar");
  assert.equal(init.cache, "no-store");
  assert.equal(init.redirect, "error");
  const redirect = new URL(body.redirect.url);
  assert.equal(redirect.origin, "https://shop.example");
  assert.equal(redirect.pathname, "/ar/checkout/result");
  assert.equal(redirect.searchParams.get("state"), f.token);
});

test("a timeout retries the same idempotent order, never creating a replacement ID", async () => {
  const f = fixture();
  const ids = [];
  globalThis.fetch.mock.mockImplementation(async (_url, init) => {
    ids.push(JSON.parse(init.body).reference.idempotent);
    if (ids.length === 1) throw new Error("timeout");
    return Response.json(f.charge);
  });
  await assert.rejects(createTapCharge(f.token, customer, f.config), /provider/);
  await createTapCharge(f.token, customer, f.config);
  assert.deepEqual(ids, [f.intent.orderId, f.intent.orderId]);
});

test("completed duplicate request goes to verified result flow instead of charging again", async () => {
  const f = fixture();
  globalThis.fetch.mock.mockImplementation(async () => Response.json({ ...f.charge, status: "CAPTURED", transaction: {} }));
  const url = new URL(await createTapCharge(f.token, customer, f.config));
  assert.equal(url.origin, "https://shop.example");
  assert.equal(url.searchParams.get("tap_id"), f.charge.id);
});

test("retrieve validates the provider response against the signed order", async () => {
  const f = fixture();
  globalThis.fetch.mock.mockImplementation(async (url, init) => {
    assert.equal(url, `https://api.tap.company/v2/charges/${f.charge.id}`);
    assert.equal(init.cache, "no-store");
    return Response.json({ ...f.charge, status: "CAPTURED" });
  });
  assert.equal((await retrieveTapCharge(f.charge.id, f.intent, f.config)).status, "CAPTURED");
  await assert.rejects(retrieveTapCharge("../../other", f.intent, f.config), /invalid/);
  globalThis.fetch.mock.mockImplementation(async () => Response.json({ ...f.charge, amount: 2 }));
  await assert.rejects(retrieveTapCharge(f.charge.id, f.intent, f.config), /mismatch/);
});

test("malformed and failed provider responses never leak upstream details", async () => {
  const f = fixture();
  for (const response of [Response.json({ secret: "should not escape" }, { status: 401 }),
    Response.json({ status: "CAPTURED" }), new Response("invalid json")]) {
    globalThis.fetch.mock.mockImplementation(async () => response);
    await assert.rejects(createTapCharge(f.token, customer, f.config), (err) => err.message === "provider");
  }
});

test("buyer validation rejects missing consent, invalid contacts, and client prices", () => {
  const f = fixture();
  const valid = { token: f.token, acceptedTerms: true, customer };
  assert.ok(checkoutSubmissionSchema.safeParse(valid).success);
  for (const value of [{ ...valid, acceptedTerms: false }, { ...valid, amount: 1 },
    { ...valid, customer: { ...customer, email: "bad" } },
    { ...valid, customer: { ...customer, phone: "123" } }]) {
    assert.equal(checkoutSubmissionSchema.safeParse(value).success, false);
  }
});

test("API rejects foreign origins, wrong content type, oversized bodies, and malformed JSON", async () => {
  assert.equal((await POST(request({}, { origin: "https://evil.test" }))).status, 403);
  assert.equal((await POST(request({}, { "content-type": "text/plain" }))).status, 415);
  assert.equal((await POST(request("x".repeat(9000)))).status, 400);
  assert.equal((await POST(request("{"))).status, 400);
  assert.equal(globalThis.fetch.mock.callCount(), 0);
});

test("API fails closed without a configured key and returns safe errors", async () => {
  process.env.TAP_SECRET_KEY = "";
  const response = await POST(request({}));
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { error: "unavailable" });
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(globalThis.fetch.mock.callCount(), 0);
});

test("API returns only hosted URL after validating order, with no secrets or customer data", async () => {
  const f = fixture();
  globalThis.fetch.mock.mockImplementation(async () => Response.json(f.charge));
  const response = await POST(request({ token: f.token, acceptedTerms: true, customer }));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { url: f.charge.transaction.url });
  assert.equal(response.headers.get("cache-control"), "no-store");
});
