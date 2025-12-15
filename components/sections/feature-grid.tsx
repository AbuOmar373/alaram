"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type IconName = keyof typeof Icons;

interface Feature {
  iconName: IconName;
  title: string;
  description: string;
}

interface FeatureGridProps {
  title: string;
  subtitle?: string;
  features: Feature[];
}

export function FeatureGrid({ title, subtitle, features }: FeatureGridProps) {
  return (
    <section className="relative overflow-hidden py-28">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="container mx-auto px-4">
        <div className="mx-auto mb-20 max-w-4xl text-center">
          <motion.h2
            className="bg-gradient-to-br from-gray-900 via-primary to-accent bg-clip-text text-5xl font-black tracking-tight text-transparent dark:from-gray-100 dark:via-primary dark:to-accent sm:text-6xl md:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              className="mt-8 text-2xl font-medium text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = (Icons[feature.iconName] as LucideIcon) || Icons.Circle;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Card className="group relative h-full overflow-hidden border-2 border-transparent bg-white/80 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/20 dark:bg-gray-900/80">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/0 via-accent/0 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-10" />

                  <CardHeader className="space-y-6 pb-4">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-accent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-50" />
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 via-accent/15 to-primary/20 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl">
                        <Icon className="h-8 w-8 text-primary transition-all duration-500 group-hover:scale-110 group-hover:text-accent" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-bold transition-colors duration-300 group-hover:text-primary">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-8">
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
