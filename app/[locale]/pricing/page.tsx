"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Check,
  X,
  Sparkles,
  Zap,
  Shield,
  Heart,
  ArrowRight,
  HelpCircle,
  Star,
} from "lucide-react";

import { getDefaultMarket } from "@/config/markets";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function PricingPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations("pricing");
  const market = getDefaultMarket();
  const isRTL = locale === "ar";
  const [isAnnual, setIsAnnual] = useState(false);

  const calculatePrice = (monthlyPrice: number) => {
    if (isAnnual) {
      return Math.round(monthlyPrice * 12 * 0.8); // 20% discount
    }
    return monthlyPrice;
  };

  const tiers = [
    {
      name: locale === "ar" ? "الباقة الأساسية" : "Basic",
      description: locale === "ar" ? "للأعمال الصغيرة والناشئة" : "For small startups",
      monthlyPrice: 299,
      icon: Zap,
      features: [
        { text: locale === "ar" ? "مستخدم واحد" : "1 User", included: true },
        { text: locale === "ar" ? "نقطة بيع واحدة" : "1 POS Terminal", included: true },
        { text: locale === "ar" ? "المحاسبة الأساسية" : "Basic Accounting", included: true },
        { text: locale === "ar" ? "إدارة المخزون" : "Inventory Management", included: true },
        { text: locale === "ar" ? "التقارير الأساسية" : "Basic Reports", included: true },
        { text: locale === "ar" ? "دعم فني" : "Email Support", included: true },
        { text: locale === "ar" ? "نقاط بيع متعددة" : "Multiple POS", included: false },
        { text: locale === "ar" ? "التقارير المتقدمة" : "Advanced Reports", included: false },
      ],
      cta: locale === "ar" ? "ابدأ تجربتك المجانية" : "Start Free Trial",
      popular: false,
    },
    {
      name: locale === "ar" ? "الباقة الاحترافية" : "Professional",
      description: locale === "ar" ? "للشركات المتوسطة والمتنامية" : "For growing businesses",
      monthlyPrice: 699,
      icon: Star,
      features: [
        { text: locale === "ar" ? "5 مستخدمين" : "5 Users", included: true },
        { text: locale === "ar" ? "نقاط بيع متعددة" : "Multiple POS", included: true },
        { text: locale === "ar" ? "المحاسبة المتقدمة" : "Advanced Accounting", included: true },
        { text: locale === "ar" ? "إدارة الموارد البشرية" : "HR Management", included: true },
        { text: locale === "ar" ? "التقارير المتقدمة" : "Advanced Reports", included: true },
        { text: locale === "ar" ? "الفوترة الإلكترونية" : "E-Invoicing", included: true },
        { text: locale === "ar" ? "دعم ذو أولوية" : "Priority Support", included: true },
        { text: locale === "ar" ? "API Integration" : "API Integration", included: true },
      ],
      cta: locale === "ar" ? "ابدأ تجربتك المجانية" : "Start Free Trial",
      popular: true,
    },
    {
      name: locale === "ar" ? "باقة المؤسسات" : "Enterprise",
      description: locale === "ar" ? "للمؤسسات الكبيرة" : "For large enterprises",
      monthlyPrice: 1999,
      icon: Shield,
      features: [
        { text: locale === "ar" ? "مستخدمون غير محدودين" : "Unlimited Users", included: true },
        { text: locale === "ar" ? "فروع متعددة" : "Multiple Branches", included: true },
        { text: locale === "ar" ? "صلاحيات متقدمة" : "Advanced Permissions", included: true },
        { text: locale === "ar" ? "تقارير مخصصة" : "Custom Reports", included: true },
        { text: locale === "ar" ? "استضافة خاصة" : "Private Hosting", included: true },
        { text: locale === "ar" ? "تكامل API كامل" : "Full API Access", included: true },
        { text: locale === "ar" ? "مدير حساب مخصص" : "Account Manager", included: true },
        { text: locale === "ar" ? "دعم على مدار الساعة" : "24/7 Support", included: true },
      ],
      cta: locale === "ar" ? "تحدث مع المبيعات" : "Talk to Sales",
      popular: false,
    },
  ];

  const faqs = [
    {
      question: locale === "ar" ? "هل يمكنني تغيير الباقة لاحقاً؟" : "Can I change my plan later?",
      answer:
        locale === "ar"
          ? "نعم، يمكنك الترقية أو التخفيض في أي وقت. سيتم احتساب الفرق بشكل تناسبي."
          : "Yes, you can upgrade or downgrade at any time. The difference will be prorated.",
    },
    {
      question: locale === "ar" ? "هل التجربة المجانية تتطلب بطاقة ائتمانية؟" : "Does the free trial require a credit card?",
      answer:
        locale === "ar"
          ? "لا، يمكنك البدء بالتجربة المجانية لمدة 14 يوماً بدون الحاجة لإدخال بيانات البطاقة الائتمانية."
          : "No, you can start a 14-day free trial without entering credit card information.",
    },
    {
      question: locale === "ar" ? "ماذا يحدث بعد انتهاء التجربة المجانية؟" : "What happens after the free trial?",
      answer:
        locale === "ar"
          ? "بعد انتهاء التجربة، يمكنك اختيار الباقة المناسبة والبدء بالاشتراك. لن يتم خصم أي مبلغ تلقائياً."
          : "After the trial ends, you can choose a plan and start your subscription. No automatic charges will be made.",
    },
    {
      question: locale === "ar" ? "هل الأسعار تشمل ضريبة القيمة المضافة؟" : "Do prices include VAT?",
      answer:
        locale === "ar"
          ? "لا، الأسعار المعروضة لا تشمل ضريبة القيمة المضافة (15%). سيتم إضافتها عند الدفع."
          : "No, displayed prices exclude VAT (15%). It will be added at checkout.",
    },
    {
      question: locale === "ar" ? "هل يمكنني إلغاء الاشتراك في أي وقت؟" : "Can I cancel my subscription anytime?",
      answer:
        locale === "ar"
          ? "نعم، يمكنك إلغاء اشتراكك في أي وقت بدون أي رسوم إضافية."
          : "Yes, you can cancel your subscription at any time without any additional fees.",
    },
  ];

  const comparisonFeatures = [
    {
      category: locale === "ar" ? "المستخدمون" : "Users",
      features: [
        { name: locale === "ar" ? "عدد المستخدمين" : "Number of Users", basic: "1", pro: "5", enterprise: locale === "ar" ? "غير محدود" : "Unlimited" },
        { name: locale === "ar" ? "الصلاحيات" : "Permissions", basic: locale === "ar" ? "أساسية" : "Basic", pro: locale === "ar" ? "متقدمة" : "Advanced", enterprise: locale === "ar" ? "مخصصة" : "Custom" },
      ],
    },
    {
      category: locale === "ar" ? "الميزات" : "Features",
      features: [
        { name: locale === "ar" ? "نقاط البيع" : "POS Terminals", basic: "1", pro: locale === "ar" ? "متعددة" : "Multiple", enterprise: locale === "ar" ? "غير محدودة" : "Unlimited" },
        { name: locale === "ar" ? "الفوترة الإلكترونية" : "E-Invoicing", basic: "✗", pro: "✓", enterprise: "✓" },
        { name: locale === "ar" ? "API Integration" : "API Integration", basic: "✗", pro: "✓", enterprise: locale === "ar" ? "متقدم" : "Advanced" },
      ],
    },
    {
      category: locale === "ar" ? "الدعم" : "Support",
      features: [
        { name: locale === "ar" ? "الدعم الفني" : "Technical Support", basic: locale === "ar" ? "بريد إلكتروني" : "Email", pro: locale === "ar" ? "أولوية" : "Priority", enterprise: "24/7" },
        { name: locale === "ar" ? "مدير حساب" : "Account Manager", basic: "✗", pro: "✗", enterprise: "✓" },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-purple-500/5 to-background py-20 md:py-28">
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="container relative mx-auto px-4">
          <motion.div
            className="mx-auto max-w-4xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4" />
              <span>{isRTL ? "أسعار شفافة وواضحة" : "Transparent Pricing"}</span>
            </div>

            <h1 className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-5xl font-bold leading-tight tracking-tight text-transparent dark:from-gray-100 dark:via-white dark:to-gray-100 sm:text-6xl md:text-7xl">
              {t("title")}
            </h1>

            <p className="mt-6 text-xl leading-relaxed text-muted-foreground md:text-2xl">
              {t("subtitle")}
            </p>

            {/* Billing Toggle */}
            <div className="mt-10 flex items-center justify-center gap-4">
              <span
                className={`text-sm font-medium ${!isAnnual ? "text-primary" : "text-muted-foreground"}`}
              >
                {isRTL ? "الدفع الشهري" : "Monthly"}
              </span>
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                className="data-[state=checked]:bg-primary"
              />
              <span
                className={`text-sm font-medium ${isAnnual ? "text-primary" : "text-muted-foreground"}`}
              >
                {isRTL ? "الدفع السنوي" : "Annual"}
              </span>
              {isAnnual && (
                <Badge variant="default" className="bg-green-500 text-white">
                  {isRTL ? "وفّر 20%" : "Save 20%"}
                </Badge>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {tiers.map((tier, index) => {
              const Icon = tier.icon;
              const displayPrice = isAnnual
                ? calculatePrice(tier.monthlyPrice)
                : tier.monthlyPrice;

              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    className={`group relative h-full overflow-hidden transition-all duration-300 ${
                      tier.popular
                        ? "scale-105 border-2 border-primary shadow-2xl shadow-primary/20"
                        : "border-2 hover:border-primary/50 hover:shadow-xl"
                    }`}
                  >
                    {tier.popular && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5" />
                        <Badge className="absolute -top-3 start-1/2 z-10 -translate-x-1/2 bg-gradient-to-r from-primary to-blue-600 px-4 py-1 text-sm font-bold shadow-lg">
                          {t("mostPopular")}
                        </Badge>
                      </>
                    )}

                    <CardHeader className="relative space-y-4 pb-8">
                      <div className="flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        {tier.popular && (
                          <Heart className="h-5 w-5 fill-primary text-primary" />
                        )}
                      </div>

                      <div>
                        <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                        <CardDescription className="mt-2 text-base">
                          {tier.description}
                        </CardDescription>
                      </div>

                      <div className="pt-4">
                        <div className="flex items-baseline gap-2">
                          <span className="bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-5xl font-bold text-transparent dark:from-gray-100 dark:to-gray-300">
                            {displayPrice.toLocaleString()}
                          </span>
                          <span className="text-lg text-muted-foreground">
                            {market.currencySymbol}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {isAnnual
                            ? isRTL
                              ? "سنوياً (خصم 20%)"
                              : "per year (20% off)"
                            : isRTL
                              ? "شهرياً"
                              : "per month"}
                        </p>
                      </div>
                    </CardHeader>

                    <CardContent className="relative space-y-6 pb-8">
                      <Button
                        asChild
                        className={`w-full rounded-xl py-6 text-base font-semibold transition-all ${
                          tier.popular
                            ? "bg-gradient-to-r from-primary to-blue-600 shadow-lg shadow-primary/30 hover:scale-105 hover:shadow-xl"
                            : "border-2 hover:bg-primary/5"
                        }`}
                        variant={tier.popular ? "default" : "outline"}
                      >
                        <Link href="/demo">
                          {tier.cta}
                          <ArrowRight className="ms-2 h-4 w-4" />
                        </Link>
                      </Button>

                      <div className="space-y-3">
                        {tier.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            {feature.included ? (
                              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10">
                                <Check className="h-4 w-4 text-green-500" />
                              </div>
                            ) : (
                              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted">
                                <X className="h-4 w-4 text-muted-foreground" />
                              </div>
                            )}
                            <span
                              className={`text-sm leading-relaxed ${
                                feature.included ? "" : "text-muted-foreground line-through"
                              }`}
                            >
                              {feature.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="border-y bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold">
              {isRTL ? "مقارنة تفصيلية للباقات" : "Detailed Plan Comparison"}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {isRTL
                ? "اختر الباقة المناسبة بناءً على احتياجاتك"
                : "Choose the right plan based on your needs"}
            </p>
          </div>

          <div className="mx-auto max-w-5xl overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2">
                  <th className="p-4 text-start font-semibold"></th>
                  <th className="p-4 text-center font-semibold">
                    {isRTL ? "الأساسية" : "Basic"}
                  </th>
                  <th className="bg-primary/5 p-4 text-center font-semibold">
                    {isRTL ? "الاحترافية" : "Professional"}
                  </th>
                  <th className="p-4 text-center font-semibold">
                    {isRTL ? "المؤسسات" : "Enterprise"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((category) => (
                  <>
                    <tr key={category.category} className="border-b bg-muted/50">
                      <td colSpan={4} className="p-4 font-semibold">
                        {category.category}
                      </td>
                    </tr>
                    {category.features.map((feature) => (
                      <tr key={feature.name} className="border-b">
                        <td className="p-4 text-sm">{feature.name}</td>
                        <td className="p-4 text-center text-sm">{feature.basic}</td>
                        <td className="bg-primary/5 p-4 text-center text-sm font-medium">
                          {feature.pro}
                        </td>
                        <td className="p-4 text-center text-sm">{feature.enterprise}</td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 text-primary">
              <HelpCircle className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-bold">
              {isRTL ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {isRTL ? "إجابات على أكثر الأسئلة شيوعاً" : "Answers to common questions"}
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-start text-base font-semibold hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-blue-600 to-purple-600 py-20 text-white">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <div className="container relative mx-auto px-4">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold md:text-5xl">
              {isRTL ? "جاهز للبدء؟" : "Ready to Get Started?"}
            </h2>
            <p className="mt-6 text-xl opacity-90">
              {isRTL
                ? "جرّب الأرام مجاناً لمدة 14 يوماً بدون بطاقة ائتمانية"
                : "Try ALaram free for 14 days with no credit card required"}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                asChild
                className="h-14 rounded-2xl bg-white px-10 text-lg font-semibold text-primary shadow-2xl transition-all hover:scale-105 hover:bg-white/90"
              >
                <Link href="/demo">
                  {isRTL ? "ابدأ تجربتك المجانية" : "Start Free Trial"}
                  <ArrowRight className="ms-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-14 rounded-2xl border-2 border-white bg-transparent px-10 text-lg font-semibold text-white hover:bg-white/10"
              >
                <Link href="/contact">{isRTL ? "تحدث مع المبيعات" : "Talk to Sales"}</Link>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm opacity-90">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5" />
                <span>{isRTL ? "تجربة مجانية 14 يوم" : "14-day free trial"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5" />
                <span>{isRTL ? "بدون بطاقة ائتمانية" : "No credit card"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5" />
                <span>{isRTL ? "إلغاء في أي وقت" : "Cancel anytime"}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
