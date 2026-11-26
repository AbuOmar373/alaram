"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { CreditCard, Loader2, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PaymentLocale, PaymentPlan } from "@/lib/payments/catalog";

export function TapCheckout({ locale, plan, token, expiresAt, testMode }: {
  locale: PaymentLocale; plan: PaymentPlan; token: string; expiresAt: number; testMode: boolean;
}) {
  const ar = locale === "ar";
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const submitting = useRef(false);
  // Retain the same attempt through clicks, timeouts, reloads, and Back navigation.
  const attempt = useRef({ token, expiresAt, amountMinor: plan.amountMinor });
  const storageKey = `tap-checkout:${plan.product}:${plan.id}`;
  const money = new Intl.NumberFormat(ar ? "ar-SA" : "en-SA", { style: "currency", currency: "SAR" }).format(plan.amountMinor / 100);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    let errorMessage = ar ? "تعذر الاتصال بتاب. أعد المحاولة لاستئناف طلب الدفع نفسه." : "Could not reach Tap. Retry to resume the same payment attempt.";
    try {
      // Storage can be unavailable in private browsers; the ref still protects retries.
      try {
        const stored = JSON.parse(sessionStorage.getItem(storageKey) || "null");
        if (stored && typeof stored.token === "string" && stored.amountMinor === plan.amountMinor &&
            typeof stored.expiresAt === "number" && stored.expiresAt > Date.now()) attempt.current = stored;
        sessionStorage.setItem(storageKey, JSON.stringify(attempt.current));
      } catch { /* Continue with the signed attempt already held in memory. */ }

      const response = await fetch("/api/payments/tap", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: attempt.current.token, acceptedTerms: form.get("terms") === "on",
          customer: {
            name: String(form.get("name") || "").trim(), email: String(form.get("email") || "").trim(),
            countryCode: String(form.get("countryCode") || "").replace(/^\+/, ""),
            phone: String(form.get("phone") || "").replace(/[\s()-]/g, "").replace(/^0+/, ""),
          },
        }),
      });
      const data = await response.json();
      if (!response.ok || typeof data.url !== "string") {
        const messages: Record<string, string> = {
          unavailable: ar ? "الدفع غير متاح حاليًا. يرجى التواصل معنا أو المحاولة لاحقًا." : "Payments are currently unavailable. Please contact us or try later.",
          invalid: ar ? "تعذر بدء الدفع. راجع بياناتك وحدّث الصفحة إذا استمرت المشكلة." : "Could not start payment. Check your details and refresh the page if needed.",
          expired: ar ? "انتهت صلاحية جلسة الدفع. إذا سبق لك الدفع فتحقق من نتيجته قبل بدء طلب جديد، ثم حدّث الصفحة." : "This checkout has expired. If you already paid, check its status before starting a new order, then refresh this page.",
        };
        errorMessage = messages[data.error] || errorMessage;
        throw new Error("checkout-failed");
      }
      window.location.assign(data.url);
    } catch {
      setError(errorMessage);
      submitting.current = false;
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_1.15fr]">
      <div className="h-fit rounded-3xl border bg-muted/30 p-6 sm:p-8">
        <p className="text-sm font-bold text-primary">{plan.productName[locale]}</p>
        <h2 className="mt-3 text-2xl font-black">{plan.name[locale]}</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{plan.period[locale]}</p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
          <span className="font-bold">{ar ? "الإجمالي المستحق" : "Total due"}</span>
          <strong className="text-2xl">{money}</strong>
        </div>
        <p className="mt-5 text-sm leading-7 text-muted-foreground">{ar
          ? "بعد تأكيد الدفع، يتولى فريقنا تسليم الباقة أو تفعيل الحساب وفق سياسة التسليم. بيانات البطاقة تُدخل في صفحة تاب الآمنة."
          : "After payment is confirmed, our team delivers your package or activates your account under our delivery policy. Enter card details on Tap’s secure page."}</p>
        <Link className="mt-3 inline-block font-semibold text-primary underline" href={`/${locale}/legal/delivery`}>{ar ? "سياسة التسليم والتفعيل" : "Delivery and activation policy"}</Link>
        {testMode && <p role="status" className="mt-6 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm font-bold leading-7">{ar ? "وضع الاختبار — هذه عملية تجريبية ولا تفعّل باقة مدفوعة." : "Test mode — this is a test payment and does not activate a paid package."}</p>}
      </div>
      <form onSubmit={submit} className="rounded-3xl border bg-card p-6 sm:p-8">
        <h2 className="mb-6 text-xl font-black">{ar ? "بيانات المشتري" : "Customer details"}</h2>
        <fieldset disabled={busy} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="checkout-name">{ar ? "الاسم الكامل" : "Full name"}</Label>
            <Input id="checkout-name" name="name" autoComplete="name" required minLength={2} maxLength={100} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="checkout-email">{ar ? "البريد الإلكتروني" : "Email address"}</Label>
            <Input id="checkout-email" name="email" type="email" dir="ltr" autoComplete="email" required maxLength={254} />
          </div>
          <div className="grid grid-cols-[6.5rem_1fr] gap-3">
            <div className="space-y-2">
              <Label htmlFor="checkout-code">{ar ? "رمز الدولة" : "Country code"}</Label>
              <Input id="checkout-code" name="countryCode" type="tel" dir="ltr" autoComplete="tel-country-code" defaultValue="966" pattern="\+?[1-9][0-9]{0,3}" required maxLength={5} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="checkout-phone">{ar ? "رقم الجوال" : "Phone number"}</Label>
              <Input id="checkout-phone" name="phone" type="tel" dir="ltr" autoComplete="tel-national" placeholder="5XXXXXXXX" required minLength={6} maxLength={20} pattern="[0-9 ]+" />
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl bg-muted/40 p-4 text-sm leading-7">
            <input id="checkout-terms" name="terms" type="checkbox" required className="mt-2 h-4 w-4 shrink-0 accent-primary" />
            <label htmlFor="checkout-terms">{ar ? "أوافق على " : "I agree to the "}<Link className="text-primary underline" href={`/${locale}/legal/terms`} target="_blank">{ar ? "الشروط والأحكام" : "terms"}</Link>{ar ? " و" : ", "}<Link className="text-primary underline" href={`/${locale}/legal/privacy`} target="_blank">{ar ? "سياسة الخصوصية" : "privacy policy"}</Link>{ar ? " و" : " and "}<Link className="text-primary underline" href={`/${locale}/legal/refund`} target="_blank">{ar ? "سياسة الاسترجاع والاسترداد" : "refund policy"}</Link>.</label>
          </div>
          {error && <p role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm leading-7 text-destructive">{error}</p>}
          <Button type="submit" disabled={busy} size="lg" className="h-auto min-h-12 w-full gap-2 whitespace-normal py-3 text-base font-bold">
            {busy ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : <CreditCard className="h-5 w-5" aria-hidden="true" />}
            {busy ? (ar ? "جارٍ الانتقال إلى تاب…" : "Opening Tap…") : `${ar ? "ادفع عبر تاب" : "Pay with Tap"} · ${money}`}
          </Button>
        </fieldset>
        <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground"><LockKeyhole className="h-4 w-4" aria-hidden="true" />{ar ? "لا نحفظ بيانات بطاقتك في الموقع" : "We do not store your card details"}</p>
      </form>
    </div>
  );
}
