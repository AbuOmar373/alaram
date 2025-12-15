"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  headline: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  primaryHref?: string;
  secondaryHref?: string;
}

export function Hero({
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  primaryHref = "/demo",
  secondaryHref = "/solutions",
}: HeroProps) {
  return (
    <section className="relative overflow-hidden py-28 md:py-40 lg:py-48">
      {/* Enhanced Background with multiple layers */}
      <div className="absolute inset-0 -z-10 gradient-mesh" />

      {/* Animated gradient orbs - more vibrant */}
      <motion.div
        className="absolute left-1/4 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-primary/25 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-accent/25 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/15 via-accent/15 to-primary/15 px-6 py-3 text-base font-semibold shadow-lg backdrop-blur-sm">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="gradient-primary bg-clip-text text-transparent">
                حلول محاسبية مدعمة بالذكاء الصناعي
              </span>
              <Sparkles className="h-5 w-5 text-accent" />
            </div>

            <h1 className="bg-gradient-to-br from-gray-900 via-primary/90 to-accent/80 bg-clip-text text-6xl font-black leading-tight tracking-tight text-transparent dark:from-gray-100 dark:via-primary dark:to-accent sm:text-7xl md:text-8xl lg:text-9xl">
              {headline}
            </h1>
          </motion.div>

          <motion.p
            className="mt-8 text-lg font-medium leading-relaxed text-muted-foreground md:text-xl lg:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {subheadline}
          </motion.p>

          <motion.div
            className="mt-14 flex flex-col gap-5 sm:flex-row sm:justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button
              size="lg"
              asChild
              className="group h-16 rounded-2xl bg-gradient-to-r from-primary via-accent to-primary bg-size-200 bg-pos-0 px-12 text-xl font-bold shadow-2xl shadow-primary/40 transition-all duration-500 hover:scale-105 hover:bg-pos-100 hover:shadow-3xl hover:shadow-primary/50"
            >
              <Link href={primaryHref}>
                {primaryCta}
                <ArrowRight className="ms-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="h-16 rounded-2xl border-2 border-primary/30 bg-white/50 px-12 text-xl font-bold backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:bg-primary/10 hover:shadow-lg dark:bg-gray-900/50"
            >
              <Link href={secondaryHref}>{secondaryCta}</Link>
            </Button>
          </motion.div>

          {/* Enhanced trust indicators */}
          <motion.div
            className="mt-20 flex flex-wrap items-center justify-center gap-6 text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-6 py-3 shadow-lg backdrop-blur-sm transition-all hover:scale-105">
              <div className="rounded-full bg-green-500 p-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-green-700 dark:text-green-400">تجربة مجانية 14 يوم</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-6 py-3 shadow-lg backdrop-blur-sm transition-all hover:scale-105">
              <div className="rounded-full bg-green-500 p-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-green-700 dark:text-green-400">بدون بطاقة ائتمانية</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-6 py-3 shadow-lg backdrop-blur-sm transition-all hover:scale-105">
              <div className="rounded-full bg-green-500 p-1">
                <Check className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-green-700 dark:text-green-400">إلغاء في أي وقت</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
