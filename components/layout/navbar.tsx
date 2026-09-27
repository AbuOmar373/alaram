"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  ArrowUpRight,
  Calculator,
  ChevronDown,
  FileText,
  Globe,
  GraduationCap,
  LayoutGrid,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const locale = useLocale();
  const { resolvedTheme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [programsOpen, setProgramsOpen] = React.useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = React.useState(true);

  const primaryNavigation = [
    { name: t("home"), href: "/" },
    { name: t("solutions"), href: "/solutions" },
  ];

  const programs = [
    { name: t("lms"), description: t("programsDesc.lms"), href: "/lms", icon: GraduationCap },
    { name: t("estimator"), description: t("programsDesc.estimator"), href: "/estimator", icon: Calculator },
    { name: t("samt"), description: t("programsDesc.samt"), href: "/samt", icon: FileText },
  ];

  const secondaryNavigation = [
    { name: t("pricing"), href: "/pricing" },
    { name: t("about"), href: "/about" },
    { name: t("contact"), href: "/contact" },
    { name: t("blog"), href: "/blog" },
  ];

  const withLocale = (href: string) => (href === "/" ? `/${locale}` : `/${locale}${href}`);
  const isActive = (href: string) => pathname === withLocale(href);
  const programsActive = programs.some((program) => isActive(program.href));

  const desktopLinkClass = (active: boolean) =>
    cn(
      "group relative rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300",
      active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
    );

  const mobileLinkClass = (active: boolean) =>
    cn(
      "block rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300",
      active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
    );

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
          {primaryNavigation.map((item) => (
            <Link key={item.href} href={withLocale(item.href)} className={desktopLinkClass(isActive(item.href))}>
              <span className="relative">{item.name}</span>
            </Link>
          ))}

          <DropdownMenu.Root
            open={programsOpen}
            onOpenChange={setProgramsOpen}
            modal={false}
            dir={locale === "ar" ? "rtl" : "ltr"}
          >
            <DropdownMenu.Trigger
              className={cn(
                desktopLinkClass(programsActive || programsOpen),
                "inline-flex items-center gap-1.5 outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              )}
            >
              {t("programs")}
              <ChevronDown
                className={cn("h-4 w-4 transition-transform duration-200", programsOpen && "rotate-180")}
                aria-hidden="true"
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="center"
                sideOffset={10}
                className="z-[60] w-80 rounded-3xl border border-border/70 bg-background/95 p-2 shadow-2xl shadow-slate-950/10 backdrop-blur-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
              >
                {programs.map((program) => {
                  const Icon = program.icon;
                  const active = isActive(program.href);
                  return (
                    <DropdownMenu.Item key={program.href} asChild>
                      <Link
                        href={withLocale(program.href)}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-2xl p-3 outline-none transition-colors",
                          active ? "bg-primary/10" : "hover:bg-muted focus:bg-muted"
                        )}
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="min-w-0">
                          <span className={cn("block text-sm font-black", active ? "text-primary" : "text-foreground")}>
                            {program.name}
                          </span>
                          <span className="block text-xs leading-5 text-muted-foreground">{program.description}</span>
                        </span>
                      </Link>
                    </DropdownMenu.Item>
                  );
                })}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          {secondaryNavigation.map((item) => (
            <Link key={item.href} href={withLocale(item.href)} className={desktopLinkClass(isActive(item.href))}>
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
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
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
            className="hidden rounded-full bg-slate-950 px-5 font-bold shadow-lg shadow-slate-950/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:shadow-primary/20 dark:bg-white dark:text-slate-950 dark:hover:bg-primary dark:hover:text-primary-foreground md:flex"
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
            {primaryNavigation.map((item) => (
              <Link
                key={item.href}
                href={withLocale(item.href)}
                className={mobileLinkClass(isActive(item.href))}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div>
              <button
                type="button"
                onClick={() => setMobileProgramsOpen((open) => !open)}
                aria-expanded={mobileProgramsOpen}
                className={cn(mobileLinkClass(programsActive), "flex w-full items-center justify-between")}
              >
                <span className="flex items-center gap-2">
                  <LayoutGrid className="h-4 w-4" aria-hidden="true" />
                  {t("programs")}
                </span>
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform duration-200", mobileProgramsOpen && "rotate-180")}
                  aria-hidden="true"
                />
              </button>
              {mobileProgramsOpen && (
                <div className="mt-1 space-y-1 border-s-2 border-primary/15 ps-3 ms-4">
                  {programs.map((program) => {
                    const Icon = program.icon;
                    const active = isActive(program.href);
                    return (
                      <Link
                        key={program.href}
                        href={withLocale(program.href)}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors",
                          active ? "bg-primary/10" : "hover:bg-muted"
                        )}
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="min-w-0">
                          <span className={cn("block text-sm font-bold", active ? "text-primary" : "text-foreground")}>
                            {program.name}
                          </span>
                          <span className="block text-xs text-muted-foreground">{program.description}</span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {secondaryNavigation.map((item) => (
              <Link
                key={item.href}
                href={withLocale(item.href)}
                className={mobileLinkClass(isActive(item.href))}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button
              asChild
              className="mt-4 w-full rounded-2xl bg-slate-950 font-bold shadow-lg shadow-slate-950/10 hover:bg-primary dark:bg-white dark:text-slate-950 dark:hover:bg-primary dark:hover:text-primary-foreground"
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

