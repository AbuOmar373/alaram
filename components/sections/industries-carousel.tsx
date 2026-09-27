"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Check,
  HardHat,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  SprayCan,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Industry {
  id: string;
  name: string;
  summary: string;
  features?: string[];
}

interface IndustriesCarouselProps {
  title: string;
  subtitle?: string;
  industries: Industry[];
  viewDetailsText: string;
}

const industryVisuals: Record<string, { icon: LucideIcon; tone: string }> = {
  supermarket: { icon: ShoppingCart, tone: "from-sky-500 to-blue-600" },
  retail: { icon: ShoppingBag, tone: "from-violet-500 to-indigo-600" },
  contracting: { icon: HardHat, tone: "from-amber-400 to-orange-500" },
  perfumes: { icon: SprayCan, tone: "from-rose-400 to-fuchsia-500" },
  "beauty-salon": { icon: Sparkles, tone: "from-pink-400 to-rose-500" },
};

const fallbackVisual = { icon: Building2, tone: "from-primary to-accent" };

export function IndustriesCarousel({
  title,
  subtitle,
  industries,
  viewDetailsText,
}: IndustriesCarouselProps) {
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden bg-background py-24">
      <motion.div
        className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <motion.div
            className="section-eyebrow mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Building2 className="h-4 w-4" />
            <span>{locale === "ar" ? "قطاعات الأعمال" : "Business sectors"}</span>
          </motion.div>

          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              className="section-subtitle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {industries.map((industry, index) => {
            const { icon: Icon, tone } = industryVisuals[industry.id] ?? fallbackVisual;
            const isWide = index < 2;

            return (
              <motion.div
                key={industry.id}
                className={cn(
                  "lg:col-span-2",
                  isWide && "lg:col-span-3",
                  index === industries.length - 1 && industries.length % 2 === 1 && "md:col-span-2 lg:col-span-2"
                )}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Link
                  href={`/${locale}/solutions/${industry.id}`}
                  className="surface-card group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 md:p-7"
                >
                  <div
                    className={cn(
                      "pointer-events-none absolute -top-16 h-40 w-40 rounded-full bg-gradient-to-br opacity-10 blur-2xl transition-opacity duration-500 group-hover:opacity-25 ltr:-right-16 rtl:-left-16",
                      tone
                    )}
                  />

                  <div className="relative flex items-start justify-between gap-4">
                    <div
                      className={cn(
                        "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105",
                        tone
                      )}
                    >
                      <Icon className="h-7 w-7" strokeWidth={1.8} />
                    </div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                      <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                    </span>
                  </div>

                  <h3 className="relative mt-6 text-xl font-black leading-8 tracking-tight text-subheading transition-colors duration-300 group-hover:text-primary">
                    {industry.name}
                  </h3>
                  <p className="relative mt-3 text-base leading-8 text-muted-foreground">{industry.summary}</p>

                  {industry.features && industry.features.length > 0 && (
                    <ul className="relative mt-5 flex flex-wrap gap-2">
                      {industry.features.map((feature) => (
                        <li
                          key={feature}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-muted/50 px-3 py-1 text-xs font-semibold text-foreground/80"
                        >
                          <Check className="h-3.5 w-3.5 text-accent" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  <span className="relative mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-primary">
                    {viewDetailsText}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
