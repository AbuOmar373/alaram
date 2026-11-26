"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { getTurnstileSiteKey } from "@/lib/turnstile";
import { contactFormSchema, type ContactFormData } from "@/lib/validations/contact-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const locale = useLocale();
  const siteKey = getTurnstileSiteKey();
  const turnstile = React.useRef<TurnstileInstance>(null);
  const attempt = React.useRef({ id: "", started: 0 });
  const [token, setToken] = React.useState("");
  React.useEffect(() => {
    attempt.current = { id: crypto.randomUUID(), started: Date.now() };
  }, []);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          locale,
          submissionId: attempt.current.id,
          formStartedAt: attempt.current.started,
          ...(token ? { turnstileToken: token } : {}),
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
        attempt.current = { id: crypto.randomUUID(), started: Date.now() };
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setToken("");
      turnstile.current?.reset();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("submit")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(event) => void handleSubmit(onSubmit)(event)} className="space-y-4">
          <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="contact-website">Website</label>
            <input id="contact-website" tabIndex={-1} autoComplete="off" {...register("website")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">{t("name")}</Label>
            <Input id="name" {...register("name")} />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{t("phone")}</Label>
            <Input id="phone" type="tel" {...register("phone")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">{t("company")}</Label>
            <Input id="company" {...register("company")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">{t("industry")}</Label>
            <Input id="industry" {...register("industry")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{t("message")}</Label>
            <Textarea id="message" rows={5} {...register("message")} />
            {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
          </div>

          {siteKey && (
            <Turnstile
              ref={turnstile}
              siteKey={siteKey}
              options={{ action: "contact_form", language: locale, theme: "auto" }}
              onSuccess={setToken}
              onExpire={() => setToken("")}
              onError={() => setToken("")}
            />
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || Boolean(siteKey && !token)}
          >
            {isSubmitting ? t("sending") : t("submit")}
          </Button>

          {submitStatus === "success" && (
            <p className="text-center text-sm text-green-600">{t("success")}</p>
          )}
          {submitStatus === "error" && (
            <p className="text-center text-sm text-destructive">{t("error")}</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
