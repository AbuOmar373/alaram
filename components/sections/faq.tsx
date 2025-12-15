"use client";

import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title: string;
  subtitle?: string;
  items: FAQItem[];
}

export function FAQ({ title, subtitle, items }: FAQProps) {
  return (
    <section className="relative overflow-hidden py-28">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-accent/5 to-background" />

      <div className="container mx-auto px-4">
        <div className="mx-auto mb-20 max-w-4xl text-center">
          <motion.div
            className="mb-6 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary/15 via-accent/15 to-primary/15 px-6 py-3 shadow-lg backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <HelpCircle className="h-6 w-6 text-primary" />
            <span className="text-base font-bold text-primary">الأسئلة الشائعة</span>
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

        <motion.div
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {items.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="overflow-hidden rounded-2xl border-2 border-transparent bg-white/80 px-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:shadow-xl dark:bg-gray-900/80"
              >
                <AccordionTrigger className="text-right text-lg font-bold text-foreground hover:text-primary hover:no-underline">
                  <span className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20 text-sm font-bold text-primary">
                      {index + 1}
                    </span>
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-right text-base leading-relaxed text-muted-foreground">
                  <div className="border-r-4 border-primary/30 pr-6 pt-2">
                    {item.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
