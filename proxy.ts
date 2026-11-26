import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["ar", "en"],
  defaultLocale: "ar",
  localePrefix: "always",
  // hreflang alternates are emitted in the page <head> and the sitemap; the
  // middleware's Link header used a conflicting x-default ("/" instead of "/ar").
  alternateLinks: false,
});

export const config = {
  matcher: ["/((?!api|admin|_next|_vercel|.*\\..*).*)"],
};
