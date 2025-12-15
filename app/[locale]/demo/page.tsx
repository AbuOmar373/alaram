"use client";

export const dynamic = 'force-dynamic';

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Building2,
  Users,
  CheckCircle2,
  Video,
  MessageSquare,
  Sparkles,
  Play,
  ArrowRight,
  Phone,
  Mail,
  Award,
  Target,
  TrendingUp,
  Zap,
  Shield,
  Headphones,
  Globe,
  Star,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { industries } from "@/data/industries";
import { cn } from "@/lib/utils";

const demoFormSchema = z.object({
  name: z.string().min(2, "يجب أن يكون الاسم حرفين على الأقل"),
  email: z.string().email("البريد الإلكتروني غير صالح"),
  phone: z.string().min(10, "رقم الهاتف غير صالح"),
  company: z.string().min(2, "اسم الشركة مطلوب"),
  industry: z.string().min(1, "يرجى اختيار القطاع"),
  employeeCount: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  currentSolution: z.string().optional(),
  message: z.string().optional(),
});

type DemoFormData = z.infer<typeof demoFormSchema>;

export default function DemoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params);
  const t = useTranslations("demo");
  const tContact = useTranslations("contact");
  const isRTL = locale === "ar";
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<DemoFormData>({
    resolver: zodResolver(demoFormSchema),
  });

  const onSubmit = async (data: DemoFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: Video,
      title: isRTL ? "عرض حي تفاعلي" : "Live Interactive Demo",
      description: isRTL
        ? "شاهد النظام مباشرة مع إمكانية طرح الأسئلة"
        : "Watch the system live with the ability to ask questions",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Target,
      title: isRTL ? "مخصص لقطاعك" : "Customized for Your Industry",
      description: isRTL
        ? "نعرض الميزات المناسبة لمجال عملك تحديداً"
        : "We showcase features specifically for your business sector",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Users,
      title: isRTL ? "خبير متخصص" : "Specialized Expert",
      description: isRTL
        ? "مستشار أعمال يفهم احتياجاتك ويجيب على استفساراتك"
        : "Business consultant who understands your needs and answers your questions",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Clock,
      title: isRTL ? "30 دقيقة فقط" : "Only 30 Minutes",
      description: isRTL
        ? "عرض مركز يوفر وقتك ويغطي كل ما تحتاجه"
        : "Focused demo that saves your time and covers everything you need",
      color: "from-orange-500 to-red-500",
    },
  ];

  const process = [
    {
      step: "1",
      title: isRTL ? "املأ النموذج" : "Fill the Form",
      description: isRTL ? "أخبرنا عن عملك واحتياجاتك" : "Tell us about your business and needs",
    },
    {
      step: "2",
      title: isRTL ? "تأكيد الموعد" : "Confirm Appointment",
      description: isRTL ? "سنتواصل معك خلال 24 ساعة" : "We'll contact you within 24 hours",
    },
    {
      step: "3",
      title: isRTL ? "العرض التوضيحي" : "Demo Session",
      description: isRTL ? "عرض حي عبر الإنترنت" : "Live online demonstration",
    },
    {
      step: "4",
      title: isRTL ? "ابدأ التجربة" : "Start Trial",
      description: isRTL ? "14 يوماً مجانية بدون بطاقة ائتمان" : "14 days free, no credit card",
    },
  ];

  const testimonials = [
    {
      name: isRTL ? "أحمد المالكي" : "Ahmed Al-Malki",
      company: isRTL ? "سوبر ماركت الرواد" : "Al-Rowad Supermarket",
      text: isRTL
        ? "العرض التوضيحي كان شاملاً ومفيداً جداً. الفريق محترف وشرح كل شيء بوضوح."
        : "The demo was comprehensive and very helpful. The team is professional and explained everything clearly.",
      rating: 5,
    },
    {
      name: isRTL ? "فاطمة السعيد" : "Fatima Al-Saeed",
      company: isRTL ? "صالون الجمال الراقي" : "Elegant Beauty Salon",
      text: isRTL
        ? "أعجبني كيف خصصوا العرض لقطاع الصالونات. كانوا يفهمون احتياجاتنا تماماً."
        : "I loved how they customized the demo for the salon sector. They completely understood our needs.",
      rating: 5,
    },
    {
      name: isRTL ? "خالد العتيبي" : "Khaled Al-Otaibi",
      company: isRTL ? "ورشة الخليج للسيارات" : "Gulf Auto Workshop",
      text: isRTL
        ? "العرض كان واضحاً ومباشراً. تم الرد على جميع أسئلتي وبدأت التجربة فوراً."
        : "The demo was clear and straightforward. All my questions were answered and I started the trial immediately.",
      rating: 5,
    },
  ];

  const stats = [
    { value: "500+", label: isRTL ? "عرض توضيحي شهرياً" : "Demos Monthly" },
    { value: "95%", label: isRTL ? "معدل الرضا" : "Satisfaction Rate" },
    { value: "24", label: isRTL ? "ساعة رد أولي" : "Hour Initial Response" },
    { value: "14", label: isRTL ? "يوم تجربة مجانية" : "Day Free Trial" },
  ];

  const whatsIncluded = [
    isRTL ? "عرض شامل للنظام" : "Comprehensive system overview",
    isRTL ? "ميزات مخصصة لقطاعك" : "Features customized for your sector",
    isRTL ? "جلسة أسئلة وأجوبة" : "Q&A session",
    isRTL ? "خطة تنفيذ مقترحة" : "Proposed implementation plan",
    isRTL ? "عرض أسعار مخصص" : "Customized pricing quote",
    isRTL ? "دليل بدء سريع" : "Quick start guide",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-purple-500/5 to-background py-20 md:py-28">
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
              <span>{isRTL ? "عرض توضيحي مجاني" : "Free Demo"}</span>
            </div>

            <h1 className="mb-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-5xl font-bold leading-tight tracking-tight text-transparent dark:from-gray-100 dark:via-white dark:to-gray-100 sm:text-6xl md:text-7xl">
              {t("title")}
            </h1>

            <p className="mb-10 text-xl leading-relaxed text-muted-foreground md:text-2xl">
              {t("subtitle")}
            </p>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <div className="mb-2 text-4xl font-bold text-primary md:text-5xl">{stat.value}</div>
                  <div className="text-sm text-muted-foreground md:text-base">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {isRTL ? "لماذا تحجز عرضاً توضيحياً؟" : "Why Book a Demo?"}
            </h2>
            <p className="text-lg text-muted-foreground">
              {isRTL
                ? "اكتشف كيف يمكن لنظام الأرام تحويل إدارة أعمالك"
                : "Discover how ALaram can transform your business management"}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group h-full border-2 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
                  <CardHeader className="space-y-4">
                    <div
                      className={cn(
                        "flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br p-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
                        benefit.color
                      )}
                    >
                      <benefit.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <CardDescription className="leading-relaxed">{benefit.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {isRTL ? "شاهد النظام بنفسك" : "See the System Yourself"}
              </h2>
              <p className="text-lg text-muted-foreground">
                {isRTL
                  ? "جولة سريعة في واجهة النظام وأهم المميزات"
                  : "Quick tour of the system interface and main features"}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="group overflow-hidden border-2 border-primary/50 shadow-2xl">
                <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-purple-500/20">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/90 shadow-2xl transition-transform duration-300 group-hover:scale-110">
                        <Play className="h-12 w-12 text-primary" />
                      </div>
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        {isRTL ? "فيديو توضيحي (2 دقيقة)" : "Demo Video (2 minutes)"}
                      </p>
                    </div>
                  </div>
                  <Badge className="absolute start-4 top-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    <Video className="me-1 h-3 w-3" />
                    {isRTL ? "جديد" : "New"}
                  </Badge>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
              {/* Demo Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="border-2 shadow-xl">
                  <CardHeader className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-600 text-white">
                        <Calendar className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">
                          {locale === "ar" ? "احجز عرضك التوضيحي" : "Book Your Demo"}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {locale === "ar"
                            ? "املأ النموذج وسنتواصل معك خلال 24 ساعة"
                            : "Fill the form and we'll contact you within 24 hours"}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-base font-semibold">
                            {tContact("form.name")} <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="name"
                            {...register("name")}
                            className="h-12 rounded-xl border-2"
                            placeholder={isRTL ? "أدخل اسمك الكامل" : "Enter your full name"}
                          />
                          {errors.name && (
                            <p className="text-sm text-destructive">{errors.name.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-base font-semibold">
                            {tContact("form.email")} <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            {...register("email")}
                            className="h-12 rounded-xl border-2"
                            placeholder={isRTL ? "example@email.com" : "example@email.com"}
                            dir="ltr"
                          />
                          {errors.email && (
                            <p className="text-sm text-destructive">{errors.email.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-base font-semibold">
                            {tContact("form.phone")} <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            {...register("phone")}
                            className="h-12 rounded-xl border-2"
                            placeholder="+966 5X XXX XXXX"
                            dir="ltr"
                          />
                          {errors.phone && (
                            <p className="text-sm text-destructive">{errors.phone.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="company" className="text-base font-semibold">
                            {tContact("form.company")} <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="company"
                            {...register("company")}
                            className="h-12 rounded-xl border-2"
                            placeholder={isRTL ? "اسم شركتك" : "Your company name"}
                          />
                          {errors.company && (
                            <p className="text-sm text-destructive">{errors.company.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="industry" className="text-base font-semibold">
                            {tContact("form.industry")} <span className="text-destructive">*</span>
                          </Label>
                          <Select onValueChange={(value) => setValue("industry", value)}>
                            <SelectTrigger className="h-12 rounded-xl border-2">
                              <SelectValue
                                placeholder={locale === "ar" ? "اختر القطاع" : "Select Industry"}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {industries.map((industry) => (
                                <SelectItem key={industry.id} value={industry.id}>
                                  {locale === "ar" ? industry.nameAR : industry.nameEN}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.industry && (
                            <p className="text-sm text-destructive">{errors.industry.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="employeeCount" className="text-base font-semibold">
                            {t("form.employeeCount")}
                          </Label>
                          <Select onValueChange={(value) => setValue("employeeCount", value)}>
                            <SelectTrigger className="h-12 rounded-xl border-2">
                              <SelectValue
                                placeholder={locale === "ar" ? "اختر العدد" : "Select Count"}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-5">1-5</SelectItem>
                              <SelectItem value="6-20">6-20</SelectItem>
                              <SelectItem value="21-50">21-50</SelectItem>
                              <SelectItem value="51-100">51-100</SelectItem>
                              <SelectItem value="100+">100+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="preferredDate" className="text-base font-semibold">
                            {t("form.preferredDate")}
                          </Label>
                          <Input
                            id="preferredDate"
                            type="date"
                            {...register("preferredDate")}
                            className="h-12 rounded-xl border-2"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="preferredTime" className="text-base font-semibold">
                            {t("form.preferredTime")}
                          </Label>
                          <Select onValueChange={(value) => setValue("preferredTime", value)}>
                            <SelectTrigger className="h-12 rounded-xl border-2">
                              <SelectValue
                                placeholder={locale === "ar" ? "اختر الوقت" : "Select Time"}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="morning" dir="ltr">
                                9:00 AM - 12:00 PM
                              </SelectItem>
                              <SelectItem value="afternoon" dir="ltr">
                                12:00 PM - 3:00 PM
                              </SelectItem>
                              <SelectItem value="evening" dir="ltr">
                                3:00 PM - 6:00 PM
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="currentSolution" className="text-base font-semibold">
                          {t("form.currentSolution")}
                        </Label>
                        <Input
                          id="currentSolution"
                          {...register("currentSolution")}
                          className="h-12 rounded-xl border-2"
                          placeholder={
                            isRTL ? "النظام الحالي (إن وجد)" : "Current system (if any)"
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-base font-semibold">
                          {tContact("form.message")}
                        </Label>
                        <Textarea
                          id="message"
                          rows={4}
                          {...register("message")}
                          className="rounded-xl border-2"
                          placeholder={
                            isRTL
                              ? "أخبرنا المزيد عن احتياجاتك..."
                              : "Tell us more about your needs..."
                          }
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="h-14 w-full rounded-xl bg-gradient-to-r from-primary to-blue-600 text-lg font-semibold shadow-lg shadow-primary/30 transition-all hover:shadow-xl"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="me-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            {tContact("form.sending")}
                          </>
                        ) : (
                          <>
                            {tContact("form.submit")}
                            <ArrowRight className="ms-2 h-5 w-5" />
                          </>
                        )}
                      </Button>

                      {submitStatus === "success" && (
                        <div className="rounded-xl bg-green-50 p-4 dark:bg-green-900/20">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                            <p className="text-sm font-medium text-green-800 dark:text-green-300">
                              {tContact("form.success")}
                            </p>
                          </div>
                        </div>
                      )}
                      {submitStatus === "error" && (
                        <div className="rounded-xl bg-red-50 p-4 dark:bg-red-900/20">
                          <p className="text-sm font-medium text-red-800 dark:text-red-300">
                            {tContact("form.error")}
                          </p>
                        </div>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Sidebar */}
              <motion.aside
                className="space-y-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="sticky top-24 space-y-6">
                  {/* What's Included */}
                  <Card className="border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-purple-500/5">
                    <CardHeader>
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-600 text-white">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl">
                        {isRTL ? "ما يشمله العرض" : "What's Included"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {whatsIncluded.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                            <span className="text-sm leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Contact Options */}
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {isRTL ? "تفضل التواصل المباشر؟" : "Prefer Direct Contact?"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start gap-3" asChild>
                        <a href="tel:+966XXXXXXXX">
                          <Phone className="h-5 w-5" />
                          <span dir="ltr">+966 XX XXX XXXX</span>
                        </a>
                      </Button>
                      <Button variant="outline" className="w-full justify-start gap-3" asChild>
                        <a href="mailto:demo@alaram.example">
                          <Mail className="h-5 w-5" />
                          <span dir="ltr">demo@alaram.example</span>
                        </a>
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Trust Badges */}
                  <Card className="border-2">
                    <CardContent className="space-y-4 p-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
                          <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <div className="font-semibold">{isRTL ? "آمن 100%" : "100% Secure"}</div>
                          <div className="text-xs text-muted-foreground">
                            {isRTL ? "بياناتك محمية" : "Your data is protected"}
                          </div>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
                          <Headphones className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <div className="font-semibold">{isRTL ? "دعم 24/7" : "24/7 Support"}</div>
                          <div className="text-xs text-muted-foreground">
                            {isRTL ? "نحن هنا لمساعدتك" : "We're here to help"}
                          </div>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/20">
                          <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <div className="font-semibold">
                            {isRTL ? "معتمد من ZATCA" : "ZATCA Certified"}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {isRTL ? "متوافق 100%" : "100% Compliant"}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.aside>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="border-y bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {isRTL ? "كيف تعمل العملية؟" : "How Does It Work?"}
              </h2>
              <p className="text-lg text-muted-foreground">
                {isRTL ? "أربع خطوات بسيطة للبدء" : "Four simple steps to get started"}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {process.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <Card className="h-full border-2 transition-all hover:border-primary/50 hover:shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-blue-600 text-2xl font-bold text-white shadow-lg">
                        {item.step}
                      </div>
                      <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                  {index < process.length - 1 && (
                    <div className="absolute end-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 lg:block">
                      <ArrowRight className="h-6 w-6 text-primary" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {isRTL ? "ماذا يقول عملاؤنا" : "What Our Clients Say"}
              </h2>
              <p className="text-lg text-muted-foreground">
                {isRTL
                  ? "تجارب حقيقية من عملاء حضروا العروض التوضيحية"
                  : "Real experiences from clients who attended demos"}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full border-2 transition-all hover:border-primary/50 hover:shadow-xl">
                    <CardContent className="p-6">
                      <div className="mb-4 flex gap-1">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="mb-6 leading-relaxed text-muted-foreground">{testimonial.text}</p>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
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
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              {isRTL ? "مستعد للبدء؟" : "Ready to Get Started?"}
            </h2>
            <p className="mb-10 text-xl opacity-90">
              {isRTL
                ? "احجز عرضك التوضيحي المجاني اليوم واكتشف الفرق"
                : "Book your free demo today and discover the difference"}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                asChild
                className="h-14 rounded-2xl bg-white px-10 text-lg font-semibold text-primary shadow-2xl transition-all hover:scale-105 hover:bg-white/90"
              >
                <a href="#form">
                  {isRTL ? "احجز الآن" : "Book Now"}
                  <Calendar className="ms-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-14 rounded-2xl border-2 border-white bg-transparent px-10 text-lg font-semibold text-white hover:bg-white/10"
              >
                <Link href={`/${locale}/contact`}>
                  {isRTL ? "تواصل معنا" : "Contact Us"}
                  <MessageSquare className="ms-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm opacity-90">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span>{isRTL ? "بدون التزام" : "No commitment"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span>{isRTL ? "مجاناً 100%" : "100% Free"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span>{isRTL ? "30 دقيقة فقط" : "Only 30 minutes"}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
