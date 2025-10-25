import { useTranslations } from "next-intl";

import { Hero } from "@/components/sections/hero";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { IndustriesCarousel } from "@/components/sections/industries-carousel";
import { Stats } from "@/components/sections/stats";
import { FAQ } from "@/components/sections/faq";
import { Testimonials } from "@/components/sections/testimonials";
import { industries } from "@/data/industries";
import { Badge } from "@/components/ui/badge";

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations("home");
  const tSolutions = useTranslations("solutions");
  const tFaq = useTranslations("faq");
  const tTestimonials = useTranslations("testimonials");
  const tStats = useTranslations("stats");
  const tCompliance = useTranslations("compliance");

  const features = [
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
      <section className="border-y bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex gap-4">
              <Badge variant="success" className="h-fit">
                {locale === "ar" ? "جاهز" : "Ready"}
              </Badge>
              <div>
                <h3 className="mb-2 text-lg font-semibold">{tCompliance("zatca.title")}</h3>
                <p className="text-sm text-muted-foreground">{tCompliance("zatca.description")}</p>
                <p className="mt-2 text-xs italic text-muted-foreground">
                  {tCompliance("zatca.note")}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="success" className="h-fit">
                15%
              </Badge>
              <div>
                <h3 className="mb-2 text-lg font-semibold">{tCompliance("vat.title")}</h3>
                <p className="text-sm text-muted-foreground">{tCompliance("vat.description")}</p>
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
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">{t("cta.title")}</h2>
          <p className="mt-4 text-lg opacity-90">{t("cta.subtitle")}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href="/demo"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-background px-8 font-medium text-foreground transition-colors hover:bg-background/90"
            >
              {t("cta.primary")}
            </a>
            <a
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-primary-foreground/20 bg-transparent px-8 font-medium transition-colors hover:bg-primary-foreground/10"
            >
              {t("cta.secondary")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

