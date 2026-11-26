import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { TapResultActions } from "@/components/commerce/tap-result-actions";
import { checkoutPath } from "@/lib/payments/catalog";
import { getTapConfig, paymentStatus, readPaymentIntent, retrieveTapCharge, type PaymentIntent } from "@/lib/payments/tap";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Payment status | نتيجة الدفع", robots: { index: false, follow: false }, referrer: "no-referrer" };

export default async function PaymentResultPage({ params, searchParams }: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ tap_id?: string; state?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const ar = locale === "ar";
  const query = await searchParams;
  let status: "paid" | "failed" | "pending" | "unknown" = "unknown";
  let intent: PaymentIntent | undefined;
  let chargeId: string | undefined;
  try {
    if (typeof query.state !== "string" || typeof query.tap_id !== "string") throw new Error("missing");
    const config = getTapConfig();
    intent = readPaymentIntent(query.state, config, false);
    const charge = await retrieveTapCharge(query.tap_id, intent, config);
    status = paymentStatus(charge.status);
    chargeId = charge.id;
  } catch { /* An unverified redirect must never be shown as a successful payment. */ }
  const test = intent?.mode === "test";
  const titles = {
    paid: ar ? (test ? "نجحت عملية الدفع التجريبية" : "تم الدفع بنجاح") : (test ? "Test payment successful" : "Payment successful"),
    failed: ar ? "لم تكتمل عملية الدفع" : "Payment was not completed",
    pending: ar ? "الدفع قيد المعالجة" : "Payment is processing",
    unknown: ar ? "تعذر التحقق من نتيجة الدفع" : "Unable to verify payment status",
  };
  const descriptions = {
    paid: ar ? (test ? "هذه عملية اختبار ولا يترتب عليها تسليم أو تفعيل باقة مدفوعة." : "تم تأكيد الدفع لدى تاب. احتفظ برقم العملية؛ يتولى فريقنا التسليم أو التفعيل وفق سياسة التسليم.") : (test ? "This is a test transaction and does not deliver or activate a paid package." : "Tap has confirmed your payment. Keep your payment reference; our team handles delivery or activation under our delivery policy."),
    failed: ar ? "لم تؤكد تاب نجاح هذه العملية. يمكنك العودة إلى الباقة والمحاولة مجددًا." : "Tap did not confirm this payment as successful. You can return to the plan and try again.",
    pending: ar ? "لم تُحسم نتيجة العملية بعد. تحقق مجددًا قبل بدء عملية دفع أخرى لتجنب الدفع مرتين." : "This payment has not reached a final status. Check again before starting another payment to avoid paying twice.",
    unknown: ar ? "قد تكون العملية مكتملة لدى تاب. لا تبدأ دفعًا جديدًا قبل التحقق مجددًا أو التواصل معنا." : "Your payment may have completed at Tap. Check again or contact us before starting another payment.",
  };
  return (
    <section className="container mx-auto max-w-3xl px-4 pb-24 pt-32">
      <div className="rounded-3xl border bg-card p-6 sm:p-10">
        <p className="mb-3 font-bold text-primary">Tap Payments</p>
        <h1 className="text-3xl font-black" role="status">{titles[status]}</h1>
        <p className="mt-5 leading-8 text-muted-foreground">{descriptions[status]}</p>
        {chargeId && intent && <dl className="my-6 space-y-3 rounded-xl bg-muted/50 p-4 text-sm">
          <div><dt className="font-bold">{ar ? "رقم العملية" : "Payment reference"}</dt><dd dir="ltr" className="mt-1 break-all">{chargeId}</dd></div>
          <div><dt className="font-bold">{ar ? "رقم الطلب" : "Order reference"}</dt><dd dir="ltr" className="mt-1 break-all">{intent.orderId}</dd></div>
          <div><dt className="font-bold">{ar ? "المبلغ" : "Amount"}</dt><dd>{new Intl.NumberFormat(ar ? "ar-SA" : "en-SA", { style: "currency", currency: "SAR" }).format(intent.amountMinor / 100)}</dd></div>
        </dl>}
        <div className="mt-6 flex flex-wrap items-center gap-5">
          <TapResultActions locale={locale} product={intent?.product} plan={intent?.plan} token={query.state} chargeId={chargeId} terminal={status === "paid" || status === "failed"} />
          {status === "failed" && intent && <Link className="font-bold text-primary underline" href={checkoutPath(locale, intent.product, intent.plan)}>{ar ? "العودة إلى الباقة" : "Return to plan"}</Link>}
          <Link className="font-bold text-primary underline" href={`/${locale}/contact`}>{ar ? "تواصل معنا" : "Contact us"}</Link>
          <Link className="font-bold text-primary underline" href={`/${locale}/legal/delivery`}>{ar ? "سياسة التسليم والتفعيل" : "Delivery and activation policy"}</Link>
        </div>
      </div>
    </section>
  );
}
