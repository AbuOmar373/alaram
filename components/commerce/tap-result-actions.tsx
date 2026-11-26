"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function TapResultActions({
  locale,
  product,
  plan,
  token,
  chargeId,
  terminal,
}: {
  locale: string;
  product?: string;
  plan?: string;
  token?: string;
  chargeId?: string;
  terminal: boolean;
}) {
  const router = useRouter();
  useEffect(() => {
    if (!token || !chargeId) return;
    // Reconcile through an explicit POST; viewing a result page never mutates data.
    void fetch("/api/payments/tap/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state: token, chargeId }),
      keepalive: true,
    }).catch(() => {});
  }, [token, chargeId]);
  useEffect(() => {
    if (!terminal || !product || !plan || !token) return;
    try {
      const key = `tap-checkout:${product}:${plan}`;
      const stored = JSON.parse(sessionStorage.getItem(key) || "null");
      if (stored?.token === token) sessionStorage.removeItem(key);
    } catch {
      /* Browser storage may be disabled. */
    }
  }, [terminal, product, plan, token]);

  if (terminal) return null;
  return (
    <Button variant="outline" onClick={() => router.refresh()}>
      {locale === "ar" ? "تحقق من النتيجة مجددًا" : "Check payment status again"}
    </Button>
  );
}
