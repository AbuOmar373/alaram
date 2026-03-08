"use client";

import { useTranslations } from "next-intl";
import { Calendar, ArrowRight, CheckCircle2 } from "lucide-react";

import { industries } from "@/data/industries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useDemoForm } from "../hooks/use-demo-form";

type Props = {
  locale: string;
  isRTL: boolean;
};

export default function DemoFormCard({ locale, isRTL }: Props) {
  const t = useTranslations("demo");
  const tContact = useTranslations("contact");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    onSubmit,
    isSubmitting,
    submitStatus,
  } = useDemoForm();

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
      <form
        onSubmit={handleSubmit((data) =>
            onSubmit({
            ...data,
            locale: locale === "ar" ? "ar" : "en",
            })
        )}
        className="space-y-6"
        >
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
                placeholder="example@email.com"
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
              <Select
                onValueChange={(value) =>
                  setValue("industry", value, { shouldValidate: true })
                }
              >
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
              <Select
                onValueChange={(value) =>
                  setValue("employeeCount", value, { shouldValidate: true })
                }
              >
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
              <Select
                onValueChange={(value) =>
                  setValue("preferredTime", value, { shouldValidate: true })
                }
              >
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
              placeholder={isRTL ? "النظام الحالي (إن وجد)" : "Current system (if any)"}
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
                isRTL ? "أخبرنا المزيد عن احتياجاتك..." : "Tell us more about your needs..."
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
  );
}