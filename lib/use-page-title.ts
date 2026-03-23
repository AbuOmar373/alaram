"use client";

import { useEffect } from "react";
import { brand } from "@/lib/brand";

export function usePageTitle(locale: string, pageTitle: string) {
  useEffect(() => {
    const siteName = locale === "ar" ? brand.name.ar : brand.name.en;
    document.title = `${siteName} - ${pageTitle}`;
  }, [locale, pageTitle]);
}
