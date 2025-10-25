"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
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
    <section className="relative overflow-hidden py-24 md:py-36 lg:py-44">
      {/* Background mesh gradient */}
      <div className="absolute inset-0 -z-10 gradient-mesh" />
      
      {/* Animated gradient orbs */}
      <div className="absolute left-1/4 top-0 -z-10 h-96 w-96 animate-pulse rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 -z-10 h-96 w-96 animate-pulse rounded-full bg-purple-500/20 blur-3xl" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 inline-block animate-pulse rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 px-5 py-2.5 text-sm font-semibold text-primary">
              ✨ حلول محاسبية مدعمة بالذكاء الصناعي
            </div>
            <h1 className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-5xl font-bold leading-tight tracking-tight text-transparent dark:from-gray-100 dark:via-white dark:to-gray-100 sm:text-6xl md:text-7xl lg:text-8xl">
              {headline}
            </h1>
          </motion.div>

          <motion.p
            className="mt-8 text-xl leading-relaxed text-muted-foreground md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {subheadline}
          </motion.p>

          <motion.div
            className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button 
              size="lg" 
              asChild 
              className="group h-14 rounded-2xl bg-gradient-to-r from-primary to-blue-600 px-10 text-lg font-semibold shadow-lg shadow-primary/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/40"
            >
              <Link href={primaryHref}>
                {primaryCta}
                <ArrowRight className="ms-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild
              className="h-14 rounded-2xl border-2 px-10 text-lg font-semibold backdrop-blur-sm transition-all hover:scale-105 hover:bg-primary/5"
            >
              <Link href={secondaryHref}>{secondaryCta}</Link>
            </Button>
          </motion.div>
          
          {/* Trust indicators */}
          <motion.div
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2">
              <Check className="h-5 w-5 text-green-500" />
              <span className="font-medium">تجربة مجانية 14 يوم</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2">
              <Check className="h-5 w-5 text-green-500" />
              <span className="font-medium">بدون بطاقة ائتمانية</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2">
              <Check className="h-5 w-5 text-green-500" />
              <span className="font-medium">إلغاء في أي وقت</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
