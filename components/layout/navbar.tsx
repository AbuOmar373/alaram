"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Menu, Moon, Sun, Globe, X, Sparkles } from "lucide-react";
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

  const isRTL = locale === "ar";

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

  const toggleLanguage = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    const currentPath = pathname.replace(`/${locale}`, "");
    window.location.href = `/${newLocale}${currentPath}`;
  };

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled 
          ? "border-b border-border/60 bg-background/95 shadow-lg shadow-primary/5 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/75" 
          : "border-b border-border/20 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/50"
      )}
    >
      {/* Top Gradient Bar */}
      <div className="h-0.5 w-full bg-gradient-to-r from-primary via-purple-500 to-primary opacity-70" />
      
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 lg:h-20 lg:px-6">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex lg:gap-2">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative overflow-hidden rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300",
                pathname === item.href 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {/* Hover Effect Background */}
              <span className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              {/* Active Indicator */}
              {pathname === item.href && (
                <span className="absolute inset-x-1 -bottom-0 h-0.5 rounded-full bg-gradient-to-r from-primary via-purple-500 to-primary" />
              )}
              
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
            className="group relative overflow-hidden rounded-xl hover:bg-primary/10"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
            <span className="absolute inset-0 -z-10 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-blue-500/20 dark:to-purple-500/20" />
          </Button>

          {/* Language Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleLanguage} 
            aria-label="Toggle language" 
            className="group relative overflow-hidden rounded-xl hover:bg-primary/10"
          >
            <Globe className="h-5 w-5" />
            <span className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/20 to-purple-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Button>

          {/* CTA Button */}
          <Button 
            asChild 
            className="group relative hidden overflow-hidden rounded-xl bg-gradient-to-r from-primary via-purple-500 to-primary bg-size-200 font-semibold shadow-lg shadow-primary/30 transition-all duration-500 hover:bg-pos-100 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] md:flex"
          >
            <Link href="/demo" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              {t("bookDemo")}
            </Link>
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="group relative overflow-hidden rounded-xl hover:bg-primary/10 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/20 to-purple-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-border/40 bg-background/95 backdrop-blur-2xl lg:hidden">
          <div className="container mx-auto space-y-1 px-4 py-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300",
                  pathname === item.href 
                    ? "bg-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20 text-primary shadow-lg shadow-primary/10" 
                    : "text-muted-foreground hover:bg-gradient-to-r hover:from-primary/10 hover:via-purple-500/10 hover:to-primary/10 hover:text-foreground"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button 
              asChild 
              className="mt-4 w-full rounded-xl bg-gradient-to-r from-primary via-purple-500 to-primary bg-size-200 font-semibold shadow-lg shadow-primary/30 transition-all duration-500 hover:bg-pos-100 hover:shadow-xl"
            >
              <Link href="/demo" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4" />
                {t("bookDemo")}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

