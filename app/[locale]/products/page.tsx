import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { ArrowUpRight, Calculator, FileText, GraduationCap, LayoutGrid } from "lucide-react";
import { PurchaseLinks } from "@/components/commerce/purchase-links";
import { Button } from "@/components/ui/button";
import { accountingPrices, annualAccountingPrice } from "@/data/accounting-pricing";
import { alaramLms } from "@/data/alaramlms";
import { estimator } from "@/data/estimator";
import { samt } from "@/data/samt";
import { getDefaultMarket } from "@/config/markets";
import { buildPageMetadata, getLocaleFromParam } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = getLocaleFromParam((await params).locale);
  return buildPageMetadata({
    locale,
    path: "/products",
    title: locale === "ar" ? "المنتجات والخدمات والأسعار" : "Products, Services & Prices",
    description:
      locale === "ar"
        ? "تعرّف على برامج الأرام: حلول الأعمال والمحاسبة، منصة التدريب، مُقدّر التكلفة وسَمْت، مع وصف الخدمات وأسعار الباقات وطريقة الطلب."
        : "Explore ALaram business software, LMS, Cost Estimator, and Samt with service descriptions, package prices, and ordering details.",
  });
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = getLocaleFromParam((await params).locale);
  setRequestLocale(locale);
  const isArabic = locale === "ar";
  const market = getDefaultMarket();
  const money = (amount: number, currency = "SAR") =>
    new Intl.NumberFormat(isArabic ? "ar-SA-u-nu-latn" : "en-SA", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  const accountingNames = {
    basic: isArabic ? "الأساسية" : "Basic",
    professional: isArabic ? "الاحترافية" : "Professional",
    enterprise: isArabic ? "المؤسسات" : "Enterprise",
  };
  const products = [
    {
      id: "accounting",
      icon: LayoutGrid,
      name: isArabic ? "حلول الأعمال والمحاسبة" : "Business & Accounting Software",
      description: isArabic
        ? "أنظمة لإدارة المبيعات والمخزون والحسابات والتقارير، مع حلول تناسب السوبرماركت والتجزئة والخدمات والعطور والصالونات. تختلف حدود المستخدمين والفروع والمزايا حسب الباقة."
        : "Sales, inventory, accounting, and reporting software for supermarkets, retail, services, perfume shops, and salons. User and branch limits and features vary by plan.",
      kind: isArabic ? "اشتراك شهري أو سنوي" : "Monthly or annual subscription",
      prices: Object.entries(accountingPrices).map(([id, price]) => ({
        label: accountingNames[id as keyof typeof accountingNames],
        amount: `${money(price, market.defaultCurrency)} ${isArabic ? "/ شهر" : "/ month"}`,
        detail: `${money(annualAccountingPrice(price), market.defaultCurrency)} ${isArabic ? "عند الدفع سنويًا (خصم 20%)" : "billed annually (20% off)"}`,
      })),
      note: isArabic
        ? "الأسعار المعروضة قبل الضريبة؛ راجع تفاصيل الباقات والمزايا في صفحة الأسعار."
        : "Displayed prices exclude tax. See the pricing page for plan features and details.",
      href: "/solutions",
      pricingHref: "/pricing",
    },
    {
      id: "lms",
      icon: GraduationCap,
      name: "ALaramLMS",
      description: isArabic
        ? "تطبيق لمنصة تدريب إلكترونية باسمك لإدارة الدورات والدروس والطلاب. يمكنك شراء التطبيق وإعداده بنفسك، أو اختيار باقة تتضمن الإعداد والتشغيل الكامل."
        : "A training platform application under your brand for courses, lessons, and students. Purchase the app and set it up yourself, or choose the package with full setup and launch.",
      kind: alaramLms.pricing.period[locale],
      prices: alaramLms.pricing.packages.map((plan) => ({
        label: plan.name[locale],
        amount: money(plan.price),
        detail: plan.description[locale],
      })),
      note: alaramLms.pricing.note[locale],
      href: "/lms",
      pricingHref: "/lms#pricing",
    },
    {
      id: "estimator",
      icon: Calculator,
      name: estimator.name[locale],
      description: estimator.summary[locale],
      kind: isArabic ? "اشتراك شهري أو سنوي" : "Monthly or annual subscription",
      prices: estimator.pricing.plans.map((plan) => ({
        label: plan.name[locale],
        amount: money(plan.billedAmount),
        detail: plan.billing[locale],
      })),
      note: isArabic
        ? "الاشتراك السنوي يُدفع مقدمًا عن 12 شهرًا. تشمل الباقتان جميع أقسام التطبيق."
        : "The annual subscription is paid upfront for 12 months. Both plans include all application modules.",
      href: "/estimator",
      pricingHref: "/estimator#pricing",
    },
    {
      id: "samt",
      icon: FileText,
      name: samt.name[locale],
      description: samt.summary[locale],
      kind: isArabic ? "حزم أرصدة رقمية" : "Digital credit packs",
      prices: samt.pricing.packs.map((pack) => ({
        label: pack.name[locale],
        amount: money(Number(pack.price)),
        detail: `${pack.credits} ${samt.pricing.creditLabel[locale]}`,
      })),
      note: samt.pricing.note[locale],
      href: "/samt",
      pricingHref: "/samt#pricing",
    },
  ];

  return (
    <div className="pb-20">
      <section className="border-b bg-gradient-to-br from-primary/5 via-purple-500/5 to-background py-16 sm:py-24">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
            <LayoutGrid className="h-4 w-4" aria-hidden="true" />
            {isArabic ? "برامج وخدمات رقمية" : "Software & digital services"}
          </span>
          <h1 className="mt-6 text-3xl font-black leading-tight text-heading sm:text-5xl">
            {isArabic ? "منتجاتنا وخدماتنا" : "Our Products & Services"}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {isArabic
              ? "تعرّف على الخدمة المناسبة لك، وما تتضمنه كل باقة وسعرها، ثم راجع التفاصيل أو تواصل معنا لإتمام طلبك."
              : "Find the service you need, explore package details and prices, then review the full description or contact us to place your order."}
          </p>
          <nav
            aria-label={isArabic ? "تصفح المنتجات" : "Browse products"}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            {products.map((product) => (
              <a
                key={product.id}
                href={`#${product.id}`}
                className="rounded-full border bg-background px-4 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                {product.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="container mx-auto px-4 pt-12">
        <div className="grid items-start gap-8 lg:grid-cols-2">
          {products.map((product) => (
            <section
              key={product.id}
              id={product.id}
              aria-labelledby={`${product.id}-title`}
              className="scroll-mt-28 rounded-3xl border bg-card p-6 shadow-sm sm:p-8"
            >
              <div className="mb-5 flex items-center gap-4">
                <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                  <product.icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <div>
                  <p className="mb-1 text-sm font-semibold text-primary">{product.kind}</p>
                  <h2 id={`${product.id}-title`} className="text-2xl font-black text-heading">
                    {product.name}
                  </h2>
                </div>
              </div>
              <p className="leading-8 text-muted-foreground">{product.description}</p>
              <dl className="my-6 divide-y rounded-2xl border bg-muted/20 px-4">
                {product.prices.map((price) => (
                  <div key={price.label} className="py-4">
                    <dt className="font-bold">{price.label}</dt>
                    <dd className="mt-2 text-xl font-black text-primary">
                      <bdi>{price.amount}</bdi>
                    </dd>
                    <dd className="mt-2 text-sm leading-7 text-muted-foreground">{price.detail}</dd>
                  </div>
                ))}
              </dl>
              <p className="mb-6 text-sm leading-7 text-muted-foreground">{product.note}</p>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href={`/${locale}${product.pricingHref}`}>
                    {isArabic ? "الباقات وطريقة الطلب" : "Plans & ordering"}
                    <ArrowUpRight className="ms-2 h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={`/${locale}${product.href}`}>
                    {isArabic ? "وصف الخدمة والمزايا" : "Description & features"}
                  </Link>
                </Button>
              </div>
            </section>
          ))}
        </div>
        <section
          aria-labelledby="order-steps"
          className="mt-12 rounded-3xl border bg-muted/30 p-6 sm:p-8"
        >
          <h2 id="order-steps" className="text-2xl font-bold text-heading">
            {isArabic ? "كيف تطلب خدمتك؟" : "How to place an order"}
          </h2>
          <ol className="mt-6 grid list-inside list-decimal gap-6 leading-8 md:grid-cols-3">
            <li>
              {isArabic
                ? "اختر المنتج والباقة، وراجع الوصف والمدة وسياسة الاسترجاع."
                : "Choose your product and plan, and review the description, term, and refund policy."}
            </li>
            <li>
              {isArabic
                ? "اطلب الباقة من صفحة المنتج أو تواصل معنا لتأكيد الإجمالي وأي ضريبة أو خدمات إضافية وموعد التسليم قبل الدفع."
                : "Order through the product page or contact us to confirm the total, any tax or extras, and delivery date before payment."}
            </li>
            <li>
              {isArabic
                ? "بعد تأكيد الدفع، تستلم الخدمة إلكترونيًا وفق نوع الباقة وموعد التفعيل أو التسليم المتفق عليه."
                : "After payment is confirmed, receive the digital service according to your package and the agreed activation or delivery date."}
            </li>
          </ol>
          <PurchaseLinks locale={locale} />
        </section>
      </div>
    </div>
  );
}
