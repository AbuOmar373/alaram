"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, Globe, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const locale = useLocale();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: t("home"), href: "/" },
    { name: t("solutions"), href: "/solutions" },
    { name: t("pricing"), href: "/pricing" },
    { name: t("about"), href: "/about" },
    { name: t("contact"), href: "/contact" },
    { name: t("blog"), href: "/blog" },
  ];

  const withLocale = (href: string) => (href === "/" ? `/${locale}` : `/${locale}${href}`);

  const toggleLanguage = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    // Remove any locale prefix (/ar or /en) from the pathname
    const pathWithoutLocale = pathname.replace(/^\/(ar|en)(\/|$)/, "/");
    // Construct new path with new locale
    const newPath = pathWithoutLocale === "/"
      ? `/${newLocale}`
      : `/${newLocale}${pathWithoutLocale}`;

    window.location.href = newPath;
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/90 shadow-sm shadow-slate-900/5 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/75"
          : "border-b border-transparent bg-background/65 backdrop-blur-xl supports-[backdrop-filter]:bg-background/45"
      )}
    >
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 lg:h-20 lg:px-6">
        <Logo href={withLocale("/")} />

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex lg:gap-2">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={withLocale(item.href)}
              className={cn(
                "group relative rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300",
                pathname === withLocale(item.href)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span className="relative">{item.name}</span>
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="rounded-full border border-border/60 bg-background/70 hover:bg-muted"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
          </Button>

          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            aria-label="Toggle language"
            className="rounded-full border border-border/60 bg-background/70 hover:bg-muted"
          >
            <Globe className="h-5 w-5" />
          </Button>

          {/* CTA Button */}
          <Button
            asChild
            className="hidden rounded-full bg-slate-950 px-5 font-bold shadow-lg shadow-slate-950/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:shadow-primary/20 dark:bg-white dark:text-slate-950 dark:hover:bg-primary dark:hover:text-white md:flex"
          >
            <Link href={withLocale("/demo")} className="flex items-center gap-2">
              {t("bookDemo")}
              <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
            </Link>
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full border border-border/60 bg-background/70 hover:bg-muted lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-border/50 bg-background/95 backdrop-blur-2xl lg:hidden">
          <div className="container mx-auto space-y-1 px-4 py-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={withLocale(item.href)}
                className={cn(
                  "block rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300",
                  pathname === withLocale(item.href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button
              asChild
              className="mt-4 w-full rounded-2xl bg-slate-950 font-bold shadow-lg shadow-slate-950/10 hover:bg-primary dark:bg-white dark:text-slate-950 dark:hover:bg-primary dark:hover:text-white"
            >
              <Link href={withLocale("/demo")} onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2">
                {t("bookDemo")}
                <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

