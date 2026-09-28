import { industries } from "@/data/industries";
import type { DemoSubmissionData } from "@/lib/validations/demo-schema";

/**
 * Server-side heuristics that stop form-spam bots before any email is sent.
 * Every check here is cheap and runs before Turnstile / Resend calls.
 */

const MIN_FILL_TIME_MS = 3_000; // humans need more than 3s to fill the form
const MAX_FILL_TIME_MS = 6 * 60 * 60 * 1000; // stale page (6h)

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 3; // max submissions per IP per window

const validIndustryIds = new Set(industries.map((i) => i.id));

export type SpamCheckResult = { ok: true } | { ok: false; reason: string };

/** Words like "GkkInugAFRtLwufRCvBZACr" – random mixed-case strings. */
function looksRandom(value?: string) {
  if (!value) return false;

  return value.split(/\s+/).some((word) => {
    if (word.length < 8) return false;
    const transitions = word.match(/[a-z][A-Z]/g)?.length ?? 0;
    return transitions >= 3;
  });
}

function isValidPreferredDate(value?: string) {
  if (!value) return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return false;

  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;
  // Allow from yesterday (timezone slack) up to one year ahead.
  return date.getTime() >= now - 2 * oneDay && date.getTime() <= now + 366 * oneDay;
}

export function checkSubmission(data: DemoSubmissionData): SpamCheckResult {
  if (data.website && data.website.trim() !== "") {
    return { ok: false, reason: "honeypot" };
  }

  if (!data.formStartedAt) {
    return { ok: false, reason: "missing-timestamp" };
  }

  const elapsed = Date.now() - data.formStartedAt;
  if (elapsed < MIN_FILL_TIME_MS || elapsed > MAX_FILL_TIME_MS) {
    return { ok: false, reason: `fill-time:${elapsed}` };
  }

  if (!validIndustryIds.has(data.industry)) {
    return { ok: false, reason: "invalid-industry" };
  }

  if (!isValidPreferredDate(data.preferredDate)) {
    return { ok: false, reason: `invalid-date:${data.preferredDate}` };
  }

  if ([data.name, data.company, data.currentSolution].some(looksRandom)) {
    return { ok: false, reason: "random-text" };
  }

  return { ok: true };
}

/**
 * Simple in-memory rate limiter per IP.
 * Note: on serverless (e.g. Vercel) each instance has its own memory, so this
 * is a best-effort layer. For a shared limit use Upstash Ratelimit / Arcjet.
 */
const hits = new Map<string, number[]>();

export function isRateLimited(key: string | undefined) {
  if (!key) return false;

  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 5_000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) hits.delete(k);
    }
  }

  return recent.length > RATE_LIMIT_MAX;
}
