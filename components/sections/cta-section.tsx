"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
}

export function CTASection({ title, subtitle, primaryCta, secondaryCta }: CTASectionProps) {
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10 bg-slate-950" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.28),transparent_32rem),radial-gradient(circle_at_80%_70%,rgba(20,184,166,0.22),transparent_28rem)]" />
      <motion.div
        className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-white/10 blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 text-center shadow-2xl shadow-black/20 backdrop-blur md:p-12">
          <motion.h2
            className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/75 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {subtitle}
          </motion.p>
          <motion.div
            className="mt-9 flex flex-col gap-4 sm:flex-row sm:justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href={`/${locale}/demo`}
              className="group inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-base font-black text-slate-950 shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-white"
            >
              {primaryCta}
              <ArrowRight className="ms-2 h-5 w-5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 text-base font-bold text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15"
            >
              {secondaryCta}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
