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
    <section className="relative overflow-hidden border-y bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 py-24">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <motion.div
        className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-primary/20 blur-3xl"
        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-accent/20 blur-3xl"
        animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="container relative mx-auto px-4">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="group relative text-center"
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
              <div className="relative mx-auto mb-6 inline-block">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary to-accent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40" />

                {/* Card container */}
                <div className="relative rounded-3xl bg-gradient-to-br from-white/90 to-white/70 p-8 shadow-xl backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl dark:from-gray-800/90 dark:to-gray-900/70">
                  {/* Trending icon */}
                  <div className="absolute right-4 top-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  </div>

                  <div className="bg-gradient-to-br from-primary via-accent to-primary bg-clip-text text-6xl font-black text-transparent md:text-7xl">
                    {stat.value}
                  </div>
                </div>
              </div>

              <div className="text-lg font-bold text-foreground md:text-xl">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
