"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { demoSchema } from "@/lib/validations/demo-schema";
import type { DemoFormData } from "@/lib/validations/demo-schema";

export function useDemoForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<
    "idle" | "success" | "error" | "verification-error"
  >("idle");

  const form = useForm<DemoFormData>({
    resolver: zodResolver(demoSchema),
    defaultValues: {
      locale: "ar",
    },
  });

  const onSubmit = async (data: DemoFormData, turnstileToken?: string) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          ...(turnstileToken ? { turnstileToken } : {}),
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        form.reset({ locale: data.locale });
        return true;
      } else {
        const result = (await response.json().catch(() => null)) as {
          code?: string;
        } | null;

        setSubmitStatus(result?.code === "TURNSTILE_FAILED" ? "verification-error" : "error");
        return false;
      }
    } catch {
      setSubmitStatus("error");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    ...form,
    onSubmit,
    isSubmitting,
    submitStatus,
  };
}
