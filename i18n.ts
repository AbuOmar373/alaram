import { getRequestConfig } from "next-intl/server";

const supportedLocales = ["ar", "en"] as const;
type SupportedLocale = (typeof supportedLocales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: SupportedLocale =
    requested && supportedLocales.includes(requested as SupportedLocale)
      ? (requested as SupportedLocale)
      : "ar";

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});

