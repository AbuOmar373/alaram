"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

interface Stat {
  value: string;
  label: string;
}

interface StatsProps {
  stats: Stat[];
}

export function Stats({ stats }: StatsProps) {
  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-muted/35 py-16">
      <motion.div
        className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
        animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="container relative mx-auto px-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="surface-card group rounded-3xl p-5 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
            >
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>
              <div className="text-2xl font-black tracking-tight text-foreground md:text-3xl">
                {stat.value}
              </div>
              <div className="mt-2 text-sm font-semibold leading-6 text-muted-foreground md:text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
