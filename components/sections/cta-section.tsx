"use client";

import { motion } from "framer-motion";

interface CTASectionProps {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
}

export function CTASection({ title, subtitle, primaryCta, secondaryCta }: CTASectionProps) {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-accent to-primary py-28">
            {/* Animated background patterns */}
            <motion.div
                className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-white/10 blur-3xl"
                animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-white/10 blur-3xl"
                animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />

            <div className="container relative mx-auto px-4 text-center">
                <motion.h2
                    className="text-5xl font-black text-white sm:text-6xl md:text-7xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {title}
                </motion.h2>
                <motion.p
                    className="mt-6 text-2xl font-medium text-white/90"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    {subtitle}
                </motion.p>
                <motion.div
                    className="mt-12 flex flex-col gap-5 sm:flex-row sm:justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <a
                        href="/demo"
                        className="inline-flex h-16 items-center justify-center rounded-2xl bg-white px-12 text-xl font-black text-primary shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl"
                    >
                        {primaryCta}
                    </a>
                    <a
                        href="/contact"
                        className="inline-flex h-16 items-center justify-center rounded-2xl border-2 border-white/30 bg-white/10 px-12 text-xl font-bold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/50 hover:bg-white/20"
                    >
                        {secondaryCta}
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
