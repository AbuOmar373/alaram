"use client";

import { motion } from "framer-motion";

interface Stat {
  value: string;
  label: string;
}

interface StatsProps {
  stats: Stat[];
}

export function Stats({ stats }: StatsProps) {
  return (
    <section className="relative border-y bg-gradient-to-r from-primary/5 via-purple-500/5 to-primary/5 py-20">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="group text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-4 inline-block rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 p-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-primary/20">
                <div className="bg-gradient-to-br from-primary to-blue-600 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
                  {stat.value}
                </div>
              </div>
              <div className="text-base font-medium text-muted-foreground md:text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

