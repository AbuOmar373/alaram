import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

import { Hero } from "@/components/sections/hero";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { IndustriesCarousel } from "@/components/sections/industries-carousel";
import { Stats } from "@/components/sections/stats";
import { FAQ } from "@/components/sections/faq";
import { Testimonials } from "@/components/sections/testimonials";
import { CTASection } from "@/components/sections/cta-section";
import { industries } from "@/data/industries";
import { Badge } from "@/components/ui/badge";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tSolutions = await getTranslations("solutions");
  const tFaq = await getTranslations("faq");
  const tTestimonials = await getTranslations("testimonials");
  const tStats = await getTranslations("stats");
  const tCompliance = await getTranslations("compliance");

  // Match FeatureGrid's expected iconName type (Lucide icon names)
  type LucideIconName = keyof typeof import("lucide-react");

  const features: Array<{ iconName: LucideIconName; title: string; description: string }> = [
    {
      iconName: "ShoppingCart",
      title: locale === "ar" ? "نقاط بيع سريعة" : "Fast POS",
      description:
        locale === "ar"
          ? "نقاط بيع سريعة وسهلة الاستخدام مع دعم لجميع طرق الدفع"
          : "Fast and easy-to-use POS with support for all payment methods",
    },
    {
      iconName: "Calculator",
      title: locale === "ar" ? "محاسبة متكاملة" : "Complete Accounting",
      description:
        locale === "ar"
          ? "نظام محاسبي شامل مع تقارير مالية دقيقة"
          : "Comprehensive accounting system with accurate financial reports",
    },
    {
      iconName: "Package",
      title: locale === "ar" ? "إدارة المخزون" : "Inventory Management",
      description:
        locale === "ar"
          ? "تتبع دقيق للمخزون مع تنبيهات إعادة الطلب"
          : "Accurate inventory tracking with reorder alerts",
    },
    {
      iconName: "Users",
      title: locale === "ar" ? "الموارد البشرية" : "HR Management",
      description:
        locale === "ar"
          ? "إدارة كاملة للموظفين والرواتب والحضور"
          : "Complete employee, payroll, and attendance management",
    },
    {
      iconName: "BarChart3",
      title: locale === "ar" ? "تقارير متقدمة" : "Advanced Reports",
      description:
        locale === "ar"
          ? "تقارير وتحليلات مفصلة لدعم قراراتك"
          : "Detailed reports and analytics to support your decisions",
    },
    {
      iconName: "Zap",
      title: locale === "ar" ? "أداء سريع" : "Fast Performance",
      description:
        locale === "ar" ? "تجربة سريعة وسلسة حتى مع كميات بيانات كبيرة" : "Fast and smooth experience even with large data volumes",
    },
    {
      iconName: "Shield",
      title: locale === "ar" ? "أمان عالي" : "High Security",
      description:
        locale === "ar"
          ? "حماية متقدمة لبياناتك مع نسخ احتياطي تلقائي"
          : "Advanced protection for your data with automatic backups",
    },
    {
      iconName: "Clock",
      title: locale === "ar" ? "دعم 24/7" : "24/7 Support",
      description:
        locale === "ar"
          ? "فريق دعم متواجد على مدار الساعة لمساعدتك"
          : "Support team available 24/7 to help you",
    },
  ];

  const industriesList = industries.map((industry) => ({
    id: industry.id,
    name: locale === "ar" ? industry.nameAR : industry.nameEN,
    summary: locale === "ar" ? industry.summaryAR : industry.summaryEN,
  }));

  const stats = [
    { value: "500+", label: tStats("customers") },
    { value: "50,000+", label: tStats("transactions") },
    { value: "24/7", label: tStats("support") },
    { value: "98%", label: tStats("satisfaction") },
  ];

  const testimonials = [
    {
      content:
        locale === "ar"
          ? "نظام رائع ساعدنا في تنظيم عملنا بشكل كامل. الدعم الفني ممتاز والواجهة سهلة الاستخدام."
          : "Amazing system that helped us fully organize our business. Excellent technical support and easy-to-use interface.",
      author: locale === "ar" ? "محمد العتيبي" : "Mohammed Al-Otaibi",
      role: locale === "ar" ? "مدير" : "Manager",
      company: locale === "ar" ? "سوبرماركت النخيل" : "Al-Nakheel Supermarket",
    },
    {
      content:
        locale === "ar"
          ? "بعد تجربة عدة أنظمة، وجدنا في الأرام الحل الأمثل. التقارير دقيقة والنظام سريع جداً."
          : "After trying several systems, we found ALaram to be the optimal solution. Reports are accurate and the system is very fast.",
      author: locale === "ar" ? "فاطمة الدوسري" : "Fatimah Al-Dosari",
      role: locale === "ar" ? "مالكة" : "Owner",
      company: locale === "ar" ? "صالون الجوهرة" : "Al-Jawharah Salon",
    },
    {
      content:
        locale === "ar"
          ? "التكامل مع الفوترة الإلكترونية كان سلساً جداً. ننصح به بشدة لأي صاحب عمل في السعودية."
          : "Integration with e-invoicing was very smooth. We highly recommend it for any business owner in Saudi Arabia.",
      author: locale === "ar" ? "خالد السعيد" : "Khaled Al-Saeed",
      role: locale === "ar" ? "صاحب" : "Owner",
      company: locale === "ar" ? "ورشة السعيد للسيارات" : "Al-Saeed Auto Workshop",
    },
  ];

  const faqs = [
    {
      question:
        locale === "ar"
          ? "هل يدعم النظام عدة فروع؟"
          : "Does the system support multiple branches?",
      answer:
        locale === "ar"
          ? "نعم، يدعم النظام إدارة عدة فروع مع إمكانية المتابعة المركزية لجميع الفروع وإصدار تقارير موحدة."
          : "Yes, the system supports multiple branch management with centralized monitoring and unified reports.",
    },
    {
      question:
        locale === "ar"
          ? "هل يمكن استيراد البيانات من Excel؟"
          : "Can I import data from Excel?",
      answer:
        locale === "ar"
          ? "نعم، يمكنك استيراد المنتجات والعملاء والموردين من ملفات Excel بسهولة."
          : "Yes, you can easily import products, customers, and suppliers from Excel files.",
    },
    {
      question:
        locale === "ar" ? "هل النظام متوافق مع متطلبات الزكاة والضريبة؟" : "Is the system compliant with ZATCA requirements?",
      answer:
        locale === "ar"
          ? "نعم، النظام جاهز للتكامل مع متطلبات هيئة الزكاة والضريبة والجمارك (ZATCA) للفوترة الإلكترونية."
          : "Yes, the system is ready to integrate with ZATCA e-invoicing requirements.",
    },
    {
      question:
        locale === "ar" ? "ما هي طرق الدفع المدعومة؟" : "What payment methods are supported?",
      answer:
        locale === "ar"
          ? "ندعم جميع طرق الدفع الشائعة في السعودية: مدى، Apple Pay، STC Pay، والبطاقات الائتمانية."
          : "We support all common payment methods in Saudi Arabia: Mada, Apple Pay, STC Pay, and credit cards.",
    },
    {
      question:
        locale === "ar" ? "هل يعمل النظام بدون إنترنت؟" : "Does the system work offline?",
      answer:
        locale === "ar"
          ? "نعم، يمكن للنظام العمل بدون إنترنت ومزامنة البيانات عند توفر الاتصال."
          : "Yes, the system can work offline and sync data when connection is available.",
    },
  ];

  return (
    <>
      <Hero
        headline={t("hero.headline")}
        subheadline={t("hero.subheadline")}
        primaryCta={t("hero.cta")}
        secondaryCta={t("hero.secondaryCta")}
      />

      <Stats stats={stats} />

      <IndustriesCarousel
        title={t("industries.title")}
        subtitle={t("industries.subtitle")}
        industries={industriesList}
        viewDetailsText={tSolutions("viewDetails")}
      />

      <FeatureGrid title={t("features.title")} subtitle={t("features.subtitle")} features={features} />

      {/* Compliance Section */}
      <section className="border-y bg-gradient-to-r from-green-50/50 via-emerald-50/30 to-green-50/50 py-20 dark:from-green-950/20 dark:via-emerald-950/10 dark:to-green-950/20">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="group flex gap-6 rounded-2xl border-2 border-green-200/50 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-green-300 hover:shadow-xl dark:border-green-800/50 dark:bg-gray-900/80">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 shadow-md">
                <Badge variant="success" className="text-base font-bold">
                  {locale === "ar" ? "جاهز" : "Ready"}
                </Badge>
              </div>
              <div>
                <h3 className="mb-3 text-2xl font-bold text-foreground">{tCompliance("zatca.title")}</h3>
                <p className="text-base leading-relaxed text-muted-foreground">{tCompliance("zatca.description")}</p>
                <p className="mt-3 text-sm font-medium italic text-green-600 dark:text-green-400">
                  {tCompliance("zatca.note")}
                </p>
              </div>
            </div>
            <div className="group flex gap-6 rounded-2xl border-2 border-green-200/50 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-green-300 hover:shadow-xl dark:border-green-800/50 dark:bg-gray-900/80">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 shadow-md">
                <Badge variant="success" className="text-base font-bold">
                  15%
                </Badge>
              </div>
              <div>
                <h3 className="mb-3 text-2xl font-bold text-foreground">{tCompliance("vat.title")}</h3>
                <p className="text-base leading-relaxed text-muted-foreground">{tCompliance("vat.description")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials
        title={tTestimonials("title")}
        subtitle={tTestimonials("subtitle")}
        testimonials={testimonials}
      />

      <FAQ title={tFaq("title")} subtitle={tFaq("subtitle")} items={faqs} />

      {/* Final CTA */}
      <CTASection
        title={t("cta.title")}
        subtitle={t("cta.subtitle")}
        primaryCta={t("cta.primary")}
        secondaryCta={t("cta.secondary")}
      />
    </>
  );
}
