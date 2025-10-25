import Link from "next/link";
import { useTranslations } from "next-intl";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Send, Heart } from "lucide-react";

import { Logo } from "@/components/logo";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

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
    { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-blue-500" },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-sky-400" },
    { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-500" },
    { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:text-blue-600" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-border/40 bg-gradient-to-br from-background via-background to-muted/30">
      {/* Gradient Orbs Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      {/* Top Gradient Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-purple-500 to-primary opacity-70" />

      <div className="container mx-auto px-4 py-16 lg:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
            
            {/* Social Links */}
            <div className="mt-6 flex gap-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className={`group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-border/40 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-lg ${social.color}`}
                  aria-label={social.name}
                >
                  {/* Gradient Background on Hover */}
                  <span className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 to-purple-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <social.icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                </Link>
              ))}
            </div>

            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              <a 
                href="mailto:sales@alaram.example" 
                className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 transition-all duration-300 group-hover:bg-primary/20">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <span>sales@alaram.example</span>
              </a>
              
              <a 
                href="tel:+966XXXXXXXX" 
                className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 transition-all duration-300 group-hover:bg-primary/20">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <span dir="ltr">+966 XX XXX XXXX</span>
              </a>
              
              <div className="group flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <span>المملكة العربية السعودية</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="relative inline-block text-sm font-bold">
                {section.title}
                <span className="absolute -bottom-1 left-0 h-0.5 w-8 rounded-full bg-gradient-to-r from-primary to-purple-500" />
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group relative inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      <span className="absolute -left-2 h-1.5 w-1.5 rounded-full bg-primary opacity-0 transition-all duration-300 group-hover:opacity-100" />
                      <span className="transition-transform duration-300 group-hover:translate-x-2">
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
                © {new Date().getFullYear()} ALaram | الأرام. {t("allRightsReserved")}
              </p>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground/80">
                {t("madeInKSA")} 
                <Heart className="h-3 w-3 fill-red-500 text-red-500" />
              </p>
            </div>

            {/* Quality Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary backdrop-blur-sm">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                محاسبية معتمدة
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-purple-500/30 bg-purple-500/5 px-3 py-1.5 text-xs font-medium text-purple-600 backdrop-blur-sm dark:text-purple-400">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-500" />
                متوافق مع هيئة الزكاة
              </div>
            </div>
          </div>

          {/* Payment Methods or Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0">
            <div className="text-xs text-muted-foreground">طرق الدفع المتاحة:</div>
            {/* Add payment method icons here if needed */}
          </div>
        </div>
      </div>
    </footer>
  );
}


