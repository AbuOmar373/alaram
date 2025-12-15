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
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-20 max-w-4xl text-center">
          <motion.h2
            className="bg-gradient-to-br from-gray-900 via-primary to-accent bg-clip-text text-5xl font-black tracking-tight text-transparent dark:from-gray-100 dark:via-primary dark:to-accent sm:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              className="mt-6 text-xl font-medium text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group relative h-full overflow-hidden border-2 border-transparent bg-white/80 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/10 dark:bg-gray-900/80">
                {/* Gradient accent bar */}
                <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-primary via-accent to-primary" />

                <CardContent className="p-8">
                  {/* Quote icon with gradient background */}
                  <div className="mb-6 inline-flex rounded-2xl bg-gradient-to-br from-primary/20 via-accent/15 to-primary/20 p-4">
                    <Quote className="h-8 w-8 text-primary" />
                  </div>

                  {/* Star rating */}
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                    "{testimonial.content}"
                  </p>

                  <div className="border-t pt-6">
                    <div className="font-bold text-foreground text-lg">
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
