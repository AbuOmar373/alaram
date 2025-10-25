import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "compact";
}

export function Logo({ className, variant = "default" }: LogoProps) {
  return (
    <Link 
      href="/" 
      className={cn("group flex items-center gap-2.5 transition-all", className)}
    >
      <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary via-purple-500 to-primary shadow-lg shadow-primary/30 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/40 group-hover:scale-105">
        {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/50 to-purple-500/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 blur-xl" />
        
        {/* Logo Icon */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative z-10 h-6 w-6 text-primary-foreground transition-transform duration-300 group-hover:scale-110"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </div>
      
      {variant === "default" && (
        <div className="flex flex-col">
          <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-lg font-bold leading-none text-transparent transition-all">
            الأرام
          </span>
          <span className="text-xs font-medium leading-none text-muted-foreground transition-colors group-hover:text-foreground">
            ALaram
          </span>
        </div>
      )}
    </Link>
  );
}

