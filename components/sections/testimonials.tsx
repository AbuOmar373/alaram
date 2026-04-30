"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  content: string;
  author: string;
  role: string;
  company: string;
}

interface TestimonialsProps {
  title: string;
  subtitle?: string;
  testimonials: Testimonial[];
}

export function Testimonials({ title, subtitle, testimonials }: TestimonialsProps) {
  return (
    <section className="relative overflow-hidden bg-muted/35 py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              className="section-subtitle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="surface-card group relative h-full overflow-hidden rounded-3xl">
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

                <CardContent className="p-8">
                  <div className="mb-6 inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
                    <Quote className="h-6 w-6" />
                  </div>

                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="mb-8 text-base leading-8 text-muted-foreground">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>

                  <div className="border-t pt-6">
                    <div className="text-lg font-black text-foreground">
                      {testimonial.author}
                    </div>
                    <div className="mt-1 text-sm font-medium text-primary">
                      {testimonial.role}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {testimonial.company}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
