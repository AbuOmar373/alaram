"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
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
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden bg-background py-24">
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
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <motion.div
            className="section-eyebrow mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Building2 className="h-4 w-4" />
            <span>{locale === "ar" ? "قطاعات الأعمال" : "Business sectors"}</span>
          </motion.div>

          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              className="section-subtitle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="surface-card group relative h-full overflow-hidden rounded-3xl">
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary to-accent opacity-70 rtl:left-auto rtl:right-0" />

                <CardHeader className="relative pb-4">
                  <CardTitle className="text-2xl font-black leading-8 transition-colors duration-300 group-hover:text-primary">
                    {industry.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative space-y-6 pb-6">
                  <CardDescription className="text-base leading-8">
                    {industry.summary}
                  </CardDescription>
                  <Button
                    variant="ghost"
                    asChild
                    className="group/btn w-full justify-between rounded-2xl bg-primary/5 font-bold text-primary transition-all hover:bg-primary hover:text-white"
                  >
                    <Link href={`/${locale}/solutions/${industry.id}`}>
                      {viewDetailsText}
                      <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1 rtl:rotate-180 rtl:group-hover/btn:-translate-x-1" />
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
