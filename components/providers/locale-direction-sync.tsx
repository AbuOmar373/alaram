"use client";

import * as React from "react";

type Props = {
  locale: string;
};

export function LocaleDirectionSync({ locale }: Props) {
  React.useEffect(() => {
    const dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    document.body.dir = dir;
  }, [locale]);

  return null;
}
