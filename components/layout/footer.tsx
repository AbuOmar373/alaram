import Link from "next/link";
import { useTranslations } from "next-intl";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from "lucide-react";

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
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
  ];

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">{t("description")}</p>
            <div className="mt-6 flex gap-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background transition-colors hover:bg-accent"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-sm font-semibold">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} ALaram | الأرام. {t("allRightsReserved")}
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>sales@alaram.example</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span dir="ltr">+966 XX XXX XXXX</span>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">{t("madeInKSA")}</p>
        </div>
      </div>
    </footer>
  );
}

