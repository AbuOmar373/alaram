import { Mail, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { PurchaseLinks } from "@/components/commerce/purchase-links";
import { Button } from "@/components/ui/button";
import { policyUpdatedAt, type PurchasePolicy } from "@/data/purchase-policies";
import { brand } from "@/lib/brand";
import type { Locale } from "@/lib/seo";

export function PolicyDocument({ locale, policy }: { locale: Locale; policy: PurchasePolicy }) {
  const isArabic = locale === "ar";

  return (
    <div className="pb-20">
      <header className="border-b bg-gradient-to-br from-primary/5 via-purple-500/5 to-background py-16 sm:py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <ShieldCheck className="mb-5 h-9 w-9 text-primary" aria-hidden="true" />
          <h1 className="text-3xl font-black leading-tight text-heading sm:text-4xl">
            {policy.title[locale]}
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            {policy.description[locale]}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            {isArabic ? "آخر تحديث: " : "Last updated: "}
            <time dateTime={policyUpdatedAt}>{policyUpdatedAt}</time>
          </p>
        </div>
      </header>
      <div className="container mx-auto max-w-4xl px-4 pt-10">
        <nav
          aria-label={isArabic ? "محتويات السياسة" : "Policy contents"}
          className="mb-10 rounded-2xl border bg-muted/30 p-6"
        >
          <p className="mb-4 font-bold">{isArabic ? "في هذه الصفحة" : "On this page"}</p>
          <ol className="grid list-inside list-decimal gap-3 text-sm sm:grid-cols-2">
            {policy.sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {section.title[locale]}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <article className="space-y-8">
          {policy.sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-title`}
              className="scroll-mt-28 rounded-2xl border bg-card p-6 sm:p-8"
            >
              <h2 id={`${section.id}-title`} className="mb-4 text-xl font-bold text-heading">
                {index + 1}. {section.title[locale]}
              </h2>
              <div className="space-y-4 text-base leading-8 text-muted-foreground">
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>{paragraph[locale]}</p>
                ))}
              </div>
            </section>
          ))}
        </article>
        <section
          aria-labelledby="policy-contact-title"
          className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8"
        >
          <h2 id="policy-contact-title" className="text-xl font-bold">
            {isArabic ? "تواصل بخصوص طلبك" : "Contact us about your order"}
          </h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            {isArabic
              ? "نستقبل طلبات الاسترجاع والاستبدال ومتابعة التفعيل عبر وسائل التواصل الرسمية التالية."
              : "Use these official channels for refunds, plan changes, and activation support."}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <a href={brand.mailtoHref}>
                <Mail className="me-2 h-4 w-4" aria-hidden="true" />
                <span dir="ltr">{brand.email}</span>
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={brand.whatsapp} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="me-2 h-4 w-4" aria-hidden="true" />
                {isArabic ? "واتساب" : "WhatsApp"}
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={brand.telHref}>
                <Phone className="me-2 h-4 w-4" aria-hidden="true" />
                <span dir="ltr">{brand.phoneIntlDisplay}</span>
              </a>
            </Button>
          </div>
        </section>
        <PurchaseLinks locale={locale} />
      </div>
    </div>
  );
}
