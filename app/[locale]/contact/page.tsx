"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  Sparkles,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  CheckCircle2,
  Headphones,
  Zap,
} from "lucide-react";
import Link from "next/link";

import { ContactForm } from "@/components/forms/contact-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations("contact");
  const isRTL = locale === "ar";

  const contactMethods = [
    {
      icon: Mail,
      title: t("info.email"),
      description: locale === "ar" ? "راسلنا في أي وقت" : "Email us anytime",
      primary: "sales@alaram.example",
      secondary: "support@alaram.example",
      color: "from-blue-500 to-cyan-500",
      href: "mailto:sales@alaram.example",
    },
    {
      icon: Phone,
      title: t("info.phone"),
      description: locale === "ar" ? "اتصل بنا مباشرة" : "Call us directly",
      primary: "+966 XX XXX XXXX",
      secondary: locale === "ar" ? "السبت - الخميس: 9 صباحاً - 6 مساءً" : "Sat - Thu: 9 AM - 6 PM",
      color: "from-green-500 to-emerald-500",
      href: "tel:+966XXXXXXXX",
    },
    {
      icon: MapPin,
      title: t("info.address"),
      description: locale === "ar" ? "زوروا مكتبنا" : "Visit our office",
      primary: locale === "ar" ? "الرياض، المملكة العربية السعودية" : "Riyadh, Saudi Arabia",
      secondary: locale === "ar" ? "طريق الملك فهد" : "King Fahd Road",
      color: "from-purple-500 to-pink-500",
      href: "#",
    },
    {
      icon: MessageSquare,
      title: locale === "ar" ? "الدردشة المباشرة" : "Live Chat",
      description: locale === "ar" ? "دردش معنا الآن" : "Chat with us now",
      primary: locale === "ar" ? "متاح الآن" : "Available now",
      secondary: locale === "ar" ? "رد فوري" : "Instant response",
      color: "from-orange-500 to-red-500",
      href: "#",
    },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-blue-600" },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-sky-500" },
    { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-600" },
    { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:text-blue-700" },
  ];

  const quickLinks = [
    {
      title: locale === "ar" ? "الأسئلة الشائعة" : "FAQ",
      description: locale === "ar" ? "إجابات سريعة على أسئلتك" : "Quick answers to your questions",
      href: "/",
      icon: Headphones,
    },
    {
      title: locale === "ar" ? "احجز عرضاً" : "Book a Demo",
      description: locale === "ar" ? "شاهد النظام عملياً" : "See the system in action",
      href: "/demo",
      icon: Zap,
    },
  ];

  const features = [
    {
      text: locale === "ar" ? "رد خلال 24 ساعة" : "24-hour response",
    },
    {
      text: locale === "ar" ? "دعم بالعربية والإنجليزية" : "Arabic & English support",
    },
    {
      text: locale === "ar" ? "فريق متخصص" : "Specialized team",
    },
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
              <span>{isRTL ? "نحن هنا لمساعدتك" : "We're Here to Help"}</span>
            </div>

            <h1 className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-5xl font-bold leading-tight tracking-tight text-transparent dark:from-gray-100 dark:via-white dark:to-gray-100 sm:text-6xl md:text-7xl">
              {t("title")}
            </h1>

            <p className="mt-6 text-xl leading-relaxed text-muted-foreground md:text-2xl">
              {t("subtitle")}
            </p>

            {/* Features */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm dark:bg-gray-800/80"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">
              {isRTL ? "طرق التواصل" : "Get in Touch"}
            </h2>
            <p className="text-muted-foreground">
              {isRTL ? "اختر الطريقة الأنسب للتواصل معنا" : "Choose your preferred way to reach us"}
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group h-full overflow-hidden border-2 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
                  <CardHeader className="space-y-4">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${method.color} p-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      <method.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{method.title}</CardTitle>
                      <CardDescription className="mt-1">{method.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="font-semibold" dir={method.primary.startsWith('+') ? 'ltr' : undefined}>
                      {method.primary}
                    </p>
                    <p className="text-sm text-muted-foreground">{method.secondary}</p>
                    {method.href !== "#" && (
                      <Button variant="ghost" size="sm" asChild className="mt-2 w-full">
                        <a href={method.href}>
                          {isRTL ? "تواصل الآن" : "Contact Now"}
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="border-y bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-5">
            {/* Contact Info & Quick Links */}
            <div className="space-y-8 lg:col-span-2">
              {/* Working Hours */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-purple-500/5 to-background">
                  <CardHeader>
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{isRTL ? "ساعات العمل" : "Working Hours"}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg bg-background/50 p-3">
                      <span className="font-medium">
                        {locale === "ar" ? "السبت - الخميس" : "Saturday - Thursday"}
                      </span>
                      <Badge variant="default" dir="ltr">
                        9:00 AM - 6:00 PM
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-background/50 p-3">
                      <span className="font-medium">{locale === "ar" ? "الجمعة" : "Friday"}</span>
                      <Badge variant="secondary">{locale === "ar" ? "مغلق" : "Closed"}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold">
                  {isRTL ? "روابط سريعة" : "Quick Links"}
                </h3>
                {quickLinks.map((link, index) => (
                  <Card
                    key={index}
                    className="group cursor-pointer border-2 transition-all hover:border-primary/50 hover:shadow-lg"
                  >
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-transform group-hover:scale-110">
                        <link.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{link.title}</h4>
                        <p className="text-sm text-muted-foreground">{link.description}</p>
                      </div>
                      <Send className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </CardContent>
                  </Card>
                ))}
              </motion.div>

              {/* Social Media */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {isRTL ? "تابعنا على" : "Follow Us"}
                    </CardTitle>
                    <CardDescription>
                      {isRTL ? "ابقَ على تواصل معنا" : "Stay connected with us"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-3">
                      {socialLinks.map((social) => (
                        <a
                          key={social.name}
                          href={social.href}
                          className={`flex h-12 w-12 items-center justify-center rounded-xl border-2 bg-background transition-all hover:scale-110 hover:border-primary/50 hover:shadow-lg ${social.color}`}
                          aria-label={social.name}
                        >
                          <social.icon className="h-5 w-5" />
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="sticky top-24">
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map/Location Section (Placeholder) */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="overflow-hidden border-2">
                <div className="relative h-96 bg-gradient-to-br from-primary/10 via-purple-500/10 to-background">
                  {/* Placeholder for map */}
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <MapPin className="mx-auto mb-4 h-16 w-16 text-primary" />
                      <h3 className="mb-2 text-2xl font-bold">
                        {isRTL ? "موقعنا" : "Our Location"}
                      </h3>
                      <p className="text-muted-foreground">
                        {locale === "ar"
                          ? "الرياض، المملكة العربية السعودية"
                          : "Riyadh, Saudi Arabia"}
                      </p>
                      <Button variant="outline" className="mt-4" asChild>
                        <a href="#">
                          {isRTL ? "افتح في خرائط جوجل" : "Open in Google Maps"}
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
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
              {isRTL ? "لديك سؤال؟" : "Have a Question?"}
            </h2>
            <p className="mt-6 text-xl opacity-90">
              {isRTL
                ? "فريقنا جاهز للإجابة على جميع استفساراتك"
                : "Our team is ready to answer all your questions"}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                asChild
                className="h-14 rounded-2xl bg-white px-10 text-lg font-semibold text-primary shadow-2xl transition-all hover:scale-105 hover:bg-white/90"
              >
                <Link href="/demo">
                  {isRTL ? "احجز عرضاً توضيحياً" : "Book a Demo"}
                  <Send className="ms-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-14 rounded-2xl border-2 border-white bg-transparent px-10 text-lg font-semibold text-white hover:bg-white/10"
              >
                <a href="tel:+966XXXXXXXX">
                  {isRTL ? "اتصل بنا الآن" : "Call Us Now"}
                  <Phone className="ms-2 h-5 w-5" />
                </a>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm opacity-90">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span>{isRTL ? "رد خلال 24 ساعة" : "24-hour response"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span>{isRTL ? "دعم متخصص" : "Expert support"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span>{isRTL ? "مجاناً تماماً" : "Completely free"}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
