const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export const TURNSTILE_ACTION = "demo_form";
export const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";
export const TURNSTILE_TEST_SECRET_KEY = "1x0000000000000000000000000000000AA";

type TurnstileVerification = {
  success: boolean;
  action?: string;
  "error-codes"?: string[];
};

export function getTurnstileSiteKey() {
  if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
    return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  }

  if (process.env.NODE_ENV === "development") {
    return TURNSTILE_TEST_SITE_KEY;
  }

  return "";
}

export function isTurnstileConfigured(options?: { server?: boolean }) {
  const hasSiteKey = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

  if (!options?.server) {
    return hasSiteKey;
  }

  return hasSiteKey && Boolean(process.env.TURNSTILE_SECRET_KEY);
}

export async function verifyTurnstileToken(token: string, remoteIp?: string) {
  const secretKey =
    process.env.TURNSTILE_SECRET_KEY ||
    (process.env.NODE_ENV === "development" ? TURNSTILE_TEST_SECRET_KEY : "");

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

  return (
    result.success &&
    (!result.action || result.action === TURNSTILE_ACTION)
  );
}
