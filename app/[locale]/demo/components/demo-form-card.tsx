"use client";

import * as React from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Calendar, ArrowRight, CheckCircle2, Bold, Italic, Underline, List, Home } from "lucide-react";

import { industries } from "@/data/industries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { brand } from "@/lib/brand";
import { getTurnstileSiteKey, isTurnstileConfigured } from "@/lib/turnstile";

import { useDemoForm } from "../hooks/use-demo-form";

type Props = {
  locale: string;
  isRTL: boolean;
};

const SUBMISSION_COUNT_KEY = "demo_successful_submissions";

export default function DemoFormCard({ locale, isRTL }: Props) {
  const t = useTranslations("demo");
  const tContact = useTranslations("contact");
  const editorRef = React.useRef<HTMLDivElement>(null);
  const turnstileRef = React.useRef<TurnstileInstance>(null);
  const [isMessageEmpty, setIsMessageEmpty] = React.useState(true);
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [verificationError, setVerificationError] = React.useState(false);
  const [requiresVisibleVerification, setRequiresVisibleVerification] = React.useState(false);
  const isTurnstileEnabled = isTurnstileConfigured();
  const turnstileSiteKey = getTurnstileSiteKey();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    onSubmit,
    isSubmitting,
    submitStatus,
  } = useDemoForm();
  const messageValue = watch("message") ?? "";

  React.useEffect(() => {
    if (!isTurnstileEnabled) return;

    const submissionCount = Number(window.localStorage.getItem(SUBMISSION_COUNT_KEY) ?? 0);

    setRequiresVisibleVerification(submissionCount >= 1);
  }, [isTurnstileEnabled]);

  React.useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    if (editor.innerHTML !== messageValue) {
      editor.innerHTML = messageValue;
    }

    const plainText = editor.textContent?.trim() ?? "";
    setIsMessageEmpty(!plainText);
  }, [messageValue]);

  const syncEditorValue = () => {
    const editor = editorRef.current;
    if (!editor) return;

    setValue("message", editor.innerHTML, { shouldDirty: true, shouldValidate: true });
    const plainText = editor.textContent?.trim() ?? "";
    setIsMessageEmpty(!plainText);
  };

  const applyEditorCommand = (command: "bold" | "italic" | "underline" | "insertUnorderedList") => {
    const editor = editorRef.current;
    if (!editor) return;

    editor.focus();
    document.execCommand(command);
    syncEditorValue();
  };

  const submitDemo = async (data: Parameters<typeof onSubmit>[0]) => {
    setIsVerifying(true);
    setVerificationError(false);

    try {
      let turnstileToken: string | undefined;

      if (isTurnstileEnabled) {
        const turnstile = turnstileRef.current;

        if (!turnstile) {
          setVerificationError(true);
          return;
        }

        if (requiresVisibleVerification) {
          turnstileToken =
            turnstile.getResponse() ?? (await turnstile.getResponsePromise());
        } else {
          turnstile.execute();
          turnstileToken = await turnstile.getResponsePromise();
        }

        if (!turnstileToken) {
          setVerificationError(true);
          return;
        }
      }

      const wasSent = await onSubmit(
        {
          ...data,
          locale: locale === "ar" ? "ar" : "en",
        },
        turnstileToken
      );

      turnstileRef.current?.reset();

      if (wasSent && isTurnstileEnabled) {
        const submissionCount = Number(window.localStorage.getItem(SUBMISSION_COUNT_KEY) ?? 0) + 1;

        window.localStorage.setItem(SUBMISSION_COUNT_KEY, String(submissionCount));
        setRequiresVisibleVerification(true);
      }
    } catch {
      turnstileRef.current?.reset();
      setVerificationError(true);
    } finally {
      setIsVerifying(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <Card className="border-2 shadow-xl">
        <CardContent className="flex flex-col items-center px-6 py-16 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>

          <h2 className="mb-3 text-2xl font-bold">{t("success.title")}</h2>
          <p className="mb-2 max-w-md text-base text-muted-foreground">{t("success.thankYou")}</p>
          <p className="mb-8 max-w-md text-base text-muted-foreground">{t("success.followUp")}</p>

          <Button
            asChild
            size="lg"
            className="h-12 rounded-xl bg-gradient-to-r from-primary to-blue-600 px-8 text-base font-semibold shadow-lg shadow-primary/30"
          >
            <Link href={`/${locale}`}>
              <Home className="me-2 h-5 w-5" />
              {t("success.backHome")}
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
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
        <form onSubmit={handleSubmit(submitDemo)} className="space-y-6">
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
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
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
                placeholder={brand.email}
                dir="ltr"
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
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
                placeholder={brand.phoneIntlDisplay}
                dir="ltr"
              />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
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
              <Select
                onValueChange={(value) => setValue("industry", value, { shouldValidate: true })}
              >
                <SelectTrigger className="h-12 rounded-xl border-2">
                  <SelectValue placeholder={locale === "ar" ? "اختر القطاع" : "Select Industry"} />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry.id} value={industry.id}>
                      {locale === "ar" ? industry.nameAR : industry.nameEN}
                    </SelectItem>
                  ))}
                  <SelectItem value="alaramlms">ALaramLMS</SelectItem>
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
              <Select
                onValueChange={(value) =>
                  setValue("employeeCount", value, { shouldValidate: true })
                }
              >
                <SelectTrigger className="h-12 rounded-xl border-2">
                  <SelectValue placeholder={locale === "ar" ? "اختر العدد" : "Select Count"} />
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
              <Select
                onValueChange={(value) =>
                  setValue("preferredTime", value, { shouldValidate: true })
                }
              >
                <SelectTrigger className="h-12 rounded-xl border-2">
                  <SelectValue placeholder={locale === "ar" ? "اختر الوقت" : "Select Time"} />
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
              placeholder={isRTL ? "النظام الحالي (إن وجد)" : "Current system (if any)"}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-base font-semibold">
              {tContact("form.message")}
            </Label>
            <input type="hidden" {...register("message")} />
            <div className="rounded-xl border-2">
              <div className="flex items-center gap-1 border-b p-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => applyEditorCommand("bold")}
                  aria-label={isRTL ? "تنسيق غامق" : "Bold"}
                  title={isRTL ? "غامق" : "Bold"}
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => applyEditorCommand("italic")}
                  aria-label={isRTL ? "تنسيق مائل" : "Italic"}
                  title={isRTL ? "مائل" : "Italic"}
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => applyEditorCommand("underline")}
                  aria-label={isRTL ? "تسطير" : "Underline"}
                  title={isRTL ? "تحته خط" : "Underline"}
                >
                  <Underline className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => applyEditorCommand("insertUnorderedList")}
                  aria-label={isRTL ? "قائمة نقطية" : "Bullet list"}
                  title={isRTL ? "قائمة نقطية" : "Bullet list"}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <div className="relative">
                {isMessageEmpty && (
                  <span className="pointer-events-none absolute inset-x-3 top-3 text-sm text-muted-foreground">
                    {isRTL ? "أخبرنا المزيد عن احتياجاتك..." : "Tell us more about your needs..."}
                  </span>
                )}
                <div
                  id="message"
                  ref={editorRef}
                  dir={isRTL ? "rtl" : "ltr"}
                  contentEditable
                  suppressContentEditableWarning
                  onInput={syncEditorValue}
                  className="min-h-[140px] p-3 text-sm outline-none"
                />
              </div>
            </div>
          </div>

          {isTurnstileEnabled && (
            <div
              className={
                requiresVisibleVerification
                  ? "space-y-3 rounded-xl border-2 border-primary/20 bg-muted/40 p-4"
                  : ""
              }
            >
              {requiresVisibleVerification && (
                <div>
                  <p className="font-semibold">{t("form.verificationTitle")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("form.verificationDescription")}
                  </p>
                </div>
              )}
              <Turnstile
                key={requiresVisibleVerification ? "visible" : "silent"}
                ref={turnstileRef}
                siteKey={turnstileSiteKey}
                options={{
                  action: "demo_form",
                  appearance: requiresVisibleVerification ? "always" : "interaction-only",
                  execution: requiresVisibleVerification ? "render" : "execute",
                  language: locale === "ar" ? "ar" : "auto",
                  refreshExpired: "auto",
                  theme: "auto",
                }}
                onError={() => setVerificationError(true)}
              />
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            className="h-14 w-full rounded-xl bg-gradient-to-r from-primary to-blue-600 text-lg font-semibold shadow-lg shadow-primary/30 transition-all hover:shadow-xl"
            disabled={isSubmitting || isVerifying}
          >
            {isSubmitting || isVerifying ? (
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

          {submitStatus === "error" && (
            <div className="rounded-xl bg-red-50 p-4 dark:bg-red-900/20">
              <p className="text-sm font-medium text-red-800 dark:text-red-300">
                {tContact("form.error")}
              </p>
            </div>
          )}

          {(submitStatus === "verification-error" || verificationError) && (
            <div className="rounded-xl bg-red-50 p-4 dark:bg-red-900/20">
              <p className="text-sm font-medium text-red-800 dark:text-red-300">
                {t("form.verificationError")}
              </p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
