"use client";

import { useTranslations } from "next-intl";

export const dynamic = 'force-dynamic';
import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Award,
  Users,
  Heart,
  Lightbulb,
  TrendingUp,
  CheckCircle2,
  Rocket,
  Globe,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Stats } from "@/components/sections/stats";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AboutPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = useTranslations("about");
  const isRTL = locale === "ar";

  const stats = [
    { value: locale === "ar" ? "أونلاين" : "Online", label: locale === "ar" ? "نموذج الخدمة" : "Service Model" },
    { value: locale === "ar" ? "السعودية" : "Saudi Arabia", label: locale === "ar" ? "نطاق الخدمة" : "Service Area" },
    { value: "5+", label: locale === "ar" ? "قطاعات مستهدفة" : "Target Industries" },
    { value: locale === "ar" ? "عربي/EN" : "AR/EN", label: locale === "ar" ? "لغة الدعم" : "Support Language" },
  ];

  const values = [
    {
      icon: Heart,
      title: locale === "ar" ? "التركيز على العميل" : "Customer Focus",
      description:
        locale === "ar"
          ? "نضع احتياجات عملائنا في المقام الأول ونعمل على تقديم أفضل الحلول لهم"
          : "We put our customers' needs first and work to provide the best solutions for them",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: Award,
      title: locale === "ar" ? "الجودة والتميز" : "Quality & Excellence",
      description:
        locale === "ar"
          ? "نلتزم بأعلى معايير الجودة في جميع منتجاتنا وخدماتنا"
          : "We commit to the highest quality standards in all our products and services",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Users,
      title: locale === "ar" ? "العمل الجماعي" : "Teamwork",
      description:
        locale === "ar"
          ? "نؤمن بقوة العمل الجماعي والتعاون لتحقيق النجاح"
          : "We believe in the power of teamwork and collaboration to achieve success",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Eye,
      title: locale === "ar" ? "الشفافية" : "Transparency",
      description:
        locale === "ar"
          ? "نتعامل بشفافية وصدق مع عملائنا وشركائنا"
          : "We deal with transparency and honesty with our customers and partners",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Lightbulb,
      title: locale === "ar" ? "الابتكار" : "Innovation",
      description:
        locale === "ar"
          ? "نسعى دائماً للابتكار وتطوير حلول جديدة"
          : "We always strive for innovation and developing new solutions",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: TrendingUp,
      title: locale === "ar" ? "النمو المستدام" : "Sustainable Growth",
      description:
        locale === "ar"
          ? "نركز على النمو المستدام لنا ولعملائنا"
          : "We focus on sustainable growth for us and our clients",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const timeline = [
    {
      year: locale === "ar" ? "المرحلة 1" : "Phase 1",
      title: locale === "ar" ? "بناء الأساس" : "Foundation",
      description:
        locale === "ar"
          ? "تصميم تجربة منصة تركز على سهولة الاستخدام ووضوح العمليات الأساسية."
          : "Building a platform experience focused on usability and clear core workflows.",
    },
    {
      year: locale === "ar" ? "المرحلة 2" : "Phase 2",
      title: locale === "ar" ? "تطوير الحلول القطاعية" : "Industry Expansion",
      description:
        locale === "ar"
          ? "توسيع الوحدات لتناسب احتياجات قطاعات متعددة مثل السوبرماركت والصيانة والورش."
          : "Expanding modules to fit multiple industries such as supermarkets, maintenance, and workshops.",
    },
    {
      year: locale === "ar" ? "المرحلة 3" : "Phase 3",
      title: locale === "ar" ? "تحسين الأداء" : "Performance Optimization",
      description:
        locale === "ar"
          ? "تحسين تجربة الاستخدام وسرعة التنفيذ والتقارير الفورية لدعم العمليات اليومية."
          : "Enhancing usability, speed, and real-time reporting to support daily operations.",
    },
    {
      year: locale === "ar" ? "المرحلة 4" : "Phase 4",
      title: locale === "ar" ? "تعزيز التكاملات" : "Integration Readiness",
      description:
        locale === "ar"
          ? "إضافة تجهيزات تقنية تدعم متطلبات التكامل حسب نطاق المشروع والتنفيذ الفني."
          : "Adding technical readiness features for integrations based on project scope and implementation.",
    },
    {
      year: locale === "ar" ? "مستمر" : "Ongoing",
      title: locale === "ar" ? "تحديث مستمر" : "Continuous Improvement",
      description:
        locale === "ar"
          ? "تطوير مستمر وفق احتياجات العملاء الفعلية وأولويات التشغيل."
          : "Continuous development aligned with real customer needs and operational priorities.",
    },
  ];

  const achievements = [
    {
      icon: CheckCircle2,
      title: locale === "ar" ? "حلول مخصصة" : "Tailored Solutions",
      description: locale === "ar" ? "تجهيزات تناسب طبيعة كل قطاع" : "Setup designed for each industry workflow",
    },
    {
      icon: Globe,
      title: locale === "ar" ? "خدمة إلكترونية" : "Online Service Delivery",
      description: locale === "ar" ? "تقديم الخدمات عن بُعد داخل السعودية" : "Services delivered remotely across Saudi Arabia",
    },
    {
      icon: Rocket,
      title: locale === "ar" ? "تحسين مستمر" : "Continuous Improvement",
      description: locale === "ar" ? "تحديثات دورية على الأداء وتجربة الاستخدام" : "Regular updates for performance and user experience",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-purple-500/5 to-background py-20 md:py-32">
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
              <span>{isRTL ? "قصتنا" : "Our Story"}</span>
            </div>

            <h1 className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-5xl font-bold leading-tight tracking-tight text-transparent dark:from-gray-100 dark:via-white dark:to-gray-100 sm:text-6xl md:text-7xl">
              {t("title")}
            </h1>

            <p className="mt-6 text-xl leading-relaxed text-muted-foreground md:text-2xl">
              {t("subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <Stats stats={stats} />

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid gap-12 lg:grid-cols-2 lg:items-center"
            >
              <div>
                <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                  {isRTL ? "منصة حلول أعمال" : "Business Solutions Platform"}
                </Badge>
                <h2 className="mb-6 text-4xl font-bold">
                  {isRTL ? "رحلتنا نحو التميز" : "Our Journey to Excellence"}
                </h2>
                <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
                  <p>
                    {locale === "ar"
                      ? "الأرام منصة حلول أعمال ومحاسبة تركّز على تقديم تجربة مرنة وسهلة للقطاعات المختلفة داخل السعودية."
                      : "ALaram is a business and accounting solutions platform focused on delivering a flexible, easy-to-use experience for multiple industries in Saudi Arabia."}
                  </p>
                  <p>
                    {locale === "ar"
                      ? "نطوّر حلولنا بشكل مستمر بناءً على احتياجات الاستخدام الفعلية، مع اهتمام خاص بسرعة الأداء، دقة التقارير، وسهولة التشغيل اليومي."
                      : "We continuously refine our platform based on real usage needs, with a strong focus on fast performance, accurate reporting, and smooth day-to-day operations."}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="border-2 text-center transition-all hover:border-primary/50 hover:shadow-lg">
                      <CardContent className="pt-6">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20">
                          <achievement.icon className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="mb-2 font-bold">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="group h-full overflow-hidden border-2 border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <CardHeader className="relative">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-blue-500/20">
                      <Target className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle className="text-3xl font-bold">{t("mission")}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      {locale === "ar"
                        ? "مهمتنا هي تمكين الشركات السعودية والخليجية من خلال توفير حلول برمجية محاسبية متخصصة وسهلة الاستخدام تساعدهم على النمو والازدهار في عصر التحول الرقمي."
                        : "Our mission is to empower Saudi and Gulf companies by providing specialized and easy-to-use accounting software solutions that help them grow and thrive in the digital transformation era."}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="group h-full overflow-hidden border-2 border-purple-500/50 transition-all hover:shadow-2xl hover:shadow-purple-500/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <CardHeader className="relative">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                      <Eye className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                    </div>
                    <CardTitle className="text-3xl font-bold">{t("vision")}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      {locale === "ar"
                        ? "رؤيتنا أن نكون الخيار الأول للشركات في المنطقة عندما يتعلق الأمر بالحلول البرمجية المحاسبية المتخصصة، وأن نساهم في التحول الرقمي للاقتصاد السعودي والخليجي."
                        : "Our vision is to be the first choice for companies in the region when it comes to specialized accounting software solutions, and to contribute to the digital transformation of the Saudi and Gulf economy."}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-4xl font-bold">
              {isRTL ? "مسيرتنا عبر السنين" : "Our Journey Through the Years"}
            </h2>
            <p className="text-lg text-muted-foreground">
              {isRTL
                ? "نظرة على أهم المحطات في رحلتنا"
                : "A look at key milestones in our journey"}
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute start-4 top-0 h-full w-0.5 bg-gradient-to-b from-primary via-purple-500 to-primary md:start-1/2" />

              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    className={`relative flex items-center gap-8 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {/* Content */}
                    <div className="flex-1 md:text-end" style={{ textAlign: index % 2 === 0 ? (isRTL ? "start" : "end") : (isRTL ? "end" : "start") }}>
                      <Card className="inline-block border-2 transition-all hover:border-primary/50 hover:shadow-lg">
                        <CardHeader>
                          <Badge className="mb-2 w-fit bg-gradient-to-r from-primary to-blue-600">
                            {item.year}
                          </Badge>
                          <CardTitle className="text-xl">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Dot */}
                    <div className="absolute start-4 z-10 flex h-4 w-4 items-center justify-center md:start-1/2 md:-translate-x-1/2">
                      <div className="h-4 w-4 rounded-full border-4 border-background bg-primary shadow-lg shadow-primary/50" />
                    </div>

                    <div className="hidden flex-1 md:block" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gradient-to-b from-background via-muted/30 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-4xl font-bold">{t("values")}</h2>
            <p className="text-lg text-muted-foreground">
              {isRTL
                ? "القيم التي نؤمن بها وتوجه عملنا يومياً"
                : "The values we believe in and guide our daily work"}
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group h-full overflow-hidden border-2 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl">
                  <CardHeader className="space-y-4">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${value.color} p-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="leading-relaxed">{value.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
              {isRTL ? "انضم إلى رحلتنا" : "Join Our Journey"}
            </h2>
            <p className="mt-6 text-xl opacity-90">
              {isRTL
                ? "كن جزءاً من قصة النجاح وابدأ تجربتك المجانية اليوم"
                : "Be part of the success story and start your free trial today"}
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
                <Link href="/contact">{isRTL ? "تواصل معنا" : "Contact Us"}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
