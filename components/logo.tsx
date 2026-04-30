import Link from "next/link";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "compact";
  href?: string;
}

export function Logo({ className, variant = "default", href = "/" }: LogoProps) {
  const t = useTranslations("logo");

  return (
    <Link
      href={href}
      className={cn("group flex items-center gap-2.5 transition-all", className)}
    >
      <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-slate-950 shadow-lg shadow-primary/20 ring-1 ring-white/10 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-xl group-hover:shadow-primary/25 dark:bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary to-accent opacity-90 dark:opacity-100" />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative z-10 h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </div>
      
      {variant === "default" && (
        <div className="flex flex-col">
          <span className="text-lg font-black leading-none tracking-tight text-foreground transition-all">
            {t("primary")}
          </span>
          <span className="text-xs font-semibold leading-none text-muted-foreground transition-colors group-hover:text-primary">
            {t("secondary")}
          </span>
        </div>
      )}
    </Link>
  );
}

