"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Facebook, Mail, MessageCircle, Phone } from "lucide-react";

import { ContactForm } from "@/components/forms/contact-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { brand } from "@/lib/brand";

export default function ContactPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const isRTL = locale === "ar";
  const t = useTranslations("contact");

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-purple-500/5 to-background py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-5xl font-bold leading-tight tracking-tight text-transparent dark:from-gray-100 dark:via-white dark:to-gray-100 sm:text-6xl">
              {t("title")}
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-muted-foreground md:text-2xl">{t("subtitle")}</p>
            <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
              {isRTL ? brand.serviceArea.ar : brand.serviceArea.en}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto grid gap-6 px-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>{t("info.phone")}</CardTitle>
              <CardDescription>{isRTL ? "الرقم الرسمي للتواصل" : "Official phone number"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="font-semibold" dir="ltr">
                {brand.phoneLocal}
              </p>
              <Button asChild className="w-full">
                <a href={brand.telHref}>
                  <Phone className="me-2 h-4 w-4" />
                  {isRTL ? "اتصال" : "Call"}
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle>{t("info.email")}</CardTitle>
              <CardDescription>{isRTL ? "البريد الرسمي الوحيد" : "Official email address"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="font-semibold" dir="ltr">
                {brand.email}
              </p>
              <Button asChild className="w-full">
                <a href={brand.mailtoHref}>
                  <Mail className="me-2 h-4 w-4" />
                  {isRTL ? "بريد إلكتروني" : "Email"}
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle>WhatsApp</CardTitle>
              <CardDescription>{isRTL ? "تواصل مباشر عبر واتساب" : "Direct WhatsApp contact"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="font-semibold" dir="ltr">
                {brand.phoneIntlDisplay}
              </p>
              <Button asChild className="w-full">
                <a href={brand.whatsapp} target="_blank" rel="noreferrer">
                  <MessageCircle className="me-2 h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle>Facebook</CardTitle>
              <CardDescription>{isRTL ? "الحساب الرسمي" : "Official page"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{isRTL ? "تابع آخر التحديثات" : "Follow our updates"}</p>
              <Button asChild className="w-full" variant="outline">
                <a href={brand.facebook} target="_blank" rel="noreferrer">
                  <Facebook className="me-2 h-4 w-4" />
                  {isRTL ? "فيسبوك" : "Facebook"}
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-y bg-muted/30 py-20">
        <div className="container mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            <h2 className="text-2xl font-bold">{isRTL ? "معلومات التواصل" : "Contact Information"}</h2>
            <p className="text-muted-foreground">{isRTL ? brand.serviceArea.ar : brand.serviceArea.en}</p>
            <p className="text-sm text-muted-foreground">
              {isRTL
                ? "لا يوجد عنوان مكتبي ثابت حالياً، ويتم تقديم الخدمات بالكامل عن بُعد."
                : "There is currently no fixed office address; all services are provided remotely."}
            </p>
            <div className="pt-2">
              <Button asChild variant="outline">
                <Link href={`/${locale}/demo`}>{isRTL ? "احجز عرضًا توضيحيًا" : "Book a Demo"}</Link>
              </Button>
            </div>
          </div>
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
