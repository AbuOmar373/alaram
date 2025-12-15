"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Building2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Industry {
  id: string;
  name: string;
  summary: string;
}

interface IndustriesCarouselProps {
  title: string;
  subtitle?: string;
  industries: Industry[];
  viewDetailsText: string;
}

export function IndustriesCarousel({
  title,
  subtitle,
  industries,
  viewDetailsText,
}: IndustriesCarouselProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background py-28">
      {/* Decorative animated elements */}
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
        <div className="mx-auto mb-20 max-w-4xl text-center">
          <motion.div
            className="mb-6 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary/15 via-accent/15 to-primary/15 px-6 py-3 shadow-lg backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-base font-bold text-primary">قطاعات الأعمال</span>
          </motion.div>

          <motion.h2
            className="bg-gradient-to-br from-gray-900 via-primary to-accent bg-clip-text text-5xl font-black tracking-tight text-transparent dark:from-gray-100 dark:via-primary dark:to-accent sm:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              className="mt-6 text-xl font-medium text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group relative h-full overflow-hidden border-2 border-transparent bg-white/80 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/20 dark:bg-gray-900/80">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/0 via-accent/0 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:from-primary/10 group-hover:via-accent/5 group-hover:to-primary/10 group-hover:opacity-100" />

                {/* Top accent line */}
                <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-primary via-accent to-primary transition-all duration-500 group-hover:w-full" />

                <CardHeader className="relative pb-4">
                  <CardTitle className="text-2xl font-bold transition-colors duration-300 group-hover:text-primary">
                    {industry.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative space-y-6 pb-6">
                  <CardDescription className="text-base leading-relaxed">
                    {industry.summary}
                  </CardDescription>
                  <Button
                    variant="ghost"
                    asChild
                    className="group/btn w-full justify-between rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 font-bold transition-all hover:from-primary/20 hover:to-accent/20 hover:shadow-lg"
                  >
                    <Link href={`/solutions/${industry.id}`}>
                      {viewDetailsText}
                      <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
