"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export const dynamic = 'force-dynamic';
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Check, TrendingUp } from "lucide-react";

import { industries } from "@/data/industries";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SolutionsPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = useTranslations("solutions");
  const isRTL = locale === "ar";

  const benefits = [
    {
      titleAR: "مصمم خصيصاً لقطاعك",
      titleEN: "Designed for Your Industry",
      descAR: "كل حل مبني على فهم عميق لاحتياجات قطاعك الخاص",
      descEN: "Each solution built on deep understanding of your industry needs",
    },
    {
      titleAR: "سهل الاستخدام والتطبيق",
      titleEN: "Easy to Use & Implement",
      descAR: "واجهات بسيطة وعملية التنفيذ سريعة",
      descEN: "Simple interfaces and quick implementation",
    },
    {
      titleAR: "دعم فني متخصص",
      titleEN: "Specialized Support",
      descAR: "فريق دعم متخصص في قطاعك متاح دائماً",
      descEN: "Industry-specialized support team always available",
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
              <span>{isRTL ? "حلول متخصصة لكل قطاع" : "Specialized Solutions"}</span>
            </div>
            
            <h1 className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-5xl font-bold leading-tight tracking-tight text-transparent dark:from-gray-100 dark:via-white dark:to-gray-100 sm:text-6xl md:text-7xl">
              {t("title")}
            </h1>
            
            <p className="mt-6 text-xl leading-relaxed text-muted-foreground md:text-2xl">
              {t("subtitle")}
            </p>

            {/* Quick Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="mb-2 text-4xl font-bold text-primary">5+</div>
                <div className="text-sm text-muted-foreground">
                  {isRTL ? "قطاعات" : "Industries"}
                </div>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="mb-2 text-4xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">
                  {isRTL ? "عميل" : "Clients"}
                </div>
              </motion.div>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="mb-2 text-4xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">
                  {isRTL ? "رضا" : "Satisfaction"}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="border-b py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex gap-4 rounded-2xl border-2 bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">
                    {isRTL ? benefit.titleAR : benefit.titleEN}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isRTL ? benefit.descAR : benefit.descEN}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">
              {isRTL ? "اختر الحل المناسب لقطاعك" : "Choose Your Industry Solution"}
            </h2>
            <p className="text-muted-foreground">
              {isRTL
                ? "حلول مصممة خصيصاً لتلبية احتياجات قطاعك بدقة"
                : "Solutions designed precisely to meet your industry needs"}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group relative h-full overflow-hidden border-2 bg-gradient-to-br from-card to-card/50 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 opacity-0 transition-opacity duration-300 group-hover:from-primary/5 group-hover:to-purple-500/5 group-hover:opacity-100" />
                  
                  {/* Trending indicator for popular industries */}
                  {index < 2 && (
                    <div className="absolute end-4 top-4 z-10">
                      <Badge variant="default" className="bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg">
                        <TrendingUp className="me-1 h-3 w-3" />
                        {isRTL ? "الأكثر طلباً" : "Trending"}
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="relative pb-4">
                    <CardTitle className="text-2xl font-bold">
                      {locale === "ar" ? industry.nameAR : industry.nameEN}
                    </CardTitle>
                    <CardDescription className="mt-3 text-base leading-relaxed">
                      {locale === "ar" ? industry.summaryAR : industry.summaryEN}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative space-y-6">
                    {/* Core Modules */}
                    <div>
                      <h4 className="mb-3 text-sm font-semibold text-muted-foreground">
                        {t("coreModules")}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {industry.coreModules.slice(0, 4).map((module) => (
                          <Badge
                            key={module}
                            variant="secondary"
                            className="bg-primary/10 font-medium text-primary hover:bg-primary/20"
                          >
                            {module}
                          </Badge>
                        ))}
                        {industry.coreModules.length > 4 && (
                          <Badge variant="secondary" className="bg-muted">
                            +{industry.coreModules.length - 4}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Features Count */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>
                          {industry.specialized.length}{" "}
                          {isRTL ? "ميزة متخصصة" : "features"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>
                          {industry.coreModules.length}{" "}
                          {isRTL ? "وحدة" : "modules"}
                        </span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Button
                      asChild
                      className="group/btn w-full rounded-xl bg-gradient-to-r from-primary to-blue-600 font-semibold shadow-lg shadow-primary/30 transition-all hover:scale-105 hover:shadow-xl"
                    >
                      <Link href={`/solutions/${industry.id}`}>
                        {t("viewDetails")}
                        <ArrowRight className="ms-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-blue-600 to-purple-600 py-20 text-white">
        {/* Animated background elements */}
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
              {isRTL
                ? "جاهز لتحويل عملك؟"
                : "Ready to Transform Your Business?"}
            </h2>
            <p className="mt-6 text-xl opacity-90">
              {isRTL
                ? "ابدأ تجربتك المجانية اليوم ولا حاجة لبطاقة ائتمانية"
                : "Start your free trial today with no credit card required"}
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
                <Link href="/contact">
                  {isRTL ? "تحدث مع خبير" : "Talk to Expert"}
                </Link>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm opacity-90">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5" />
                <span>{isRTL ? "14 يوم تجربة مجانية" : "14-day free trial"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5" />
                <span>{isRTL ? "بدون بطاقة ائتمانية" : "No credit card"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5" />
                <span>{isRTL ? "دعم 24/7" : "24/7 Support"}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
