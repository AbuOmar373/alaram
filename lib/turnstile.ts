const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export const TURNSTILE_ACTION = "demo_form";

type TurnstileVerification = {
  success: boolean;
  action?: string;
  "error-codes"?: string[];
};

export async function verifyTurnstileToken(token: string, remoteIp?: string) {
  const secretKey =
    process.env.TURNSTILE_SECRET_KEY ||
    (process.env.NODE_ENV === "development" ? "1x0000000000000000000000000000000AA" : "");

  if (!secretKey) {
    throw new Error("TURNSTILE_SECRET_KEY is missing");
  }

  const body = new URLSearchParams({
    secret: secretKey,
    response: token,
    idempotency_key: crypto.randomUUID(),
  });

  if (remoteIp) {
    body.set("remoteip", remoteIp);
  }

  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Turnstile verification failed with ${response.status}`);
  }

  const result = (await response.json()) as TurnstileVerification;

  return result.success && (!result.action || result.action === TURNSTILE_ACTION);
}
