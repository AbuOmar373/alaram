"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background py-24">
      {/* Decorative elements */}
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl" />
      
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-4xl font-bold tracking-tight text-transparent dark:from-gray-100 dark:via-white dark:to-gray-100 sm:text-5xl">
            {title}
          </h2>
          {subtitle && <p className="mt-6 text-xl text-muted-foreground">{subtitle}</p>}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Card className="group relative h-full overflow-hidden border-2 bg-gradient-to-br from-card to-card/50 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 opacity-0 transition-opacity duration-300 group-hover:from-primary/5 group-hover:to-purple-500/5 group-hover:opacity-100" />
                
                <CardHeader className="relative">
                  <CardTitle className="text-2xl font-bold">{industry.name}</CardTitle>
                </CardHeader>
                <CardContent className="relative space-y-6 pb-6">
                  <CardDescription className="text-base leading-relaxed">{industry.summary}</CardDescription>
                  <Button 
                    variant="ghost" 
                    asChild 
                    className="group/btn w-full justify-between rounded-xl bg-primary/5 font-semibold transition-all hover:bg-primary/10"
                  >
                    <Link href={`/solutions/${industry.id}`}>
                      {viewDetailsText}
                      <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
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

