import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Facebook, MessageCircle, Mail, Phone, Heart } from "lucide-react";

import { Logo } from "@/components/logo";
import { brand } from "@/lib/brand";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const locale = useLocale();
  const withLocale = (href: string) => (href === "/" ? `/${locale}` : `/${locale}${href}`);

  const footerSections = [
    {
      title: t("products"),
      links: [
        { name: nav("solutions"), href: "/solutions" },
        { name: nav("pricing"), href: "/pricing" },
      ],
    },
    {
      title: t("company"),
      links: [
        { name: nav("about"), href: "/about" },
        { name: nav("blog"), href: "/blog" },
        { name: nav("contact"), href: "/contact" },
      ],
    },
    {
      title: t("support"),
      links: [
        { name: nav("demo"), href: "/demo" },
        { name: nav("contact"), href: "/contact" },
      ],
    },
    {
      title: t("legal"),
      links: [
        { name: t("terms"), href: "/legal/terms" },
        { name: t("privacy"), href: "/legal/privacy" },
      ],
    },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: brand.facebook, color: "hover:text-blue-500" },
    { name: "WhatsApp", icon: MessageCircle, href: brand.whatsapp, color: "hover:text-green-500" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-background">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 lg:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Logo href={withLocale("/")} />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
            
            {/* Social Links */}
            <div className="mt-6 flex gap-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className={`group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border/70 bg-card/70 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg ${social.color}`}
                  aria-label={social.name}
                >
                  <span className="absolute inset-0 -z-10 bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <social.icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                </Link>
              ))}
            </div>

            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              <a
                href={brand.mailtoHref}
                className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary/15">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <span>{brand.email}</span>
              </a>
              
              <a
                href={brand.telHref}
                className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary/15">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <span dir="ltr">{brand.phoneLocal}</span>
              </a>
              
              <div className="group flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <MessageCircle className="h-4 w-4 text-primary" />
                </div>
                <span>{locale === "ar" ? brand.serviceArea.ar : brand.serviceArea.en}</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="relative inline-block text-sm font-black">
                {section.title}
                <span className="absolute -bottom-1 left-0 h-0.5 w-8 rounded-full bg-primary rtl:left-auto rtl:right-0" />
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={withLocale(link.href)}
                      className="group relative inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      <span className="absolute -left-2 h-1.5 w-1.5 rounded-full bg-primary opacity-0 transition-all duration-300 group-hover:opacity-100 rtl:-right-2 rtl:left-auto" />
                      <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 space-y-6 border-t border-border/40 pt-8">
          {/* Main Bottom Content */}
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex flex-col items-center gap-2 md:items-start">
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                © {new Date().getFullYear()} {t("brandLine")}. {t("allRightsReserved")}
              </p>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground/80">
                {t("madeInKSA")} 
                <Heart className="h-3 w-3 fill-red-500 text-red-500" />
              </p>
            </div>

            {/* Quality Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-bold text-primary backdrop-blur-sm">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                {t("certifiedAccounting")}
              </div>
              <div className="flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1.5 text-xs font-bold text-accent backdrop-blur-sm">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                {t("zatcaCompliant")}
              </div>
            </div>
          </div>

          {/* Payment Methods or Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0">
            <div className="text-xs text-muted-foreground">{t("paymentMethodsLabel")}</div>
            {/* Add payment method icons here if needed */}
          </div>
        </div>
      </div>
    </footer>
  );
}


