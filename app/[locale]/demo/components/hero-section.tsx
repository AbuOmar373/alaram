"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

type Props = {
  title: string;
  isRTL: boolean;
};

export default function HeroSection({ title, isRTL }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-purple-500/5 to-background py-20 md:py-28">
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="container relative mx-auto px-4">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            <Sparkles className="h-4 w-4" />
            <span>{isRTL ? "عرض توضيحي مجاني" : "Free Demo"}</span>
          </div>

          <h1 className="mb-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-5xl font-bold leading-tight tracking-tight text-transparent dark:from-gray-100 dark:via-white dark:to-gray-100 sm:text-6xl md:text-7xl">
            {title}
          </h1>
        </motion.div>
      </div>
    </section>
  );
}