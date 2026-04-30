"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
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
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/40 to-background" />

      <div className="container mx-auto px-4">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <motion.div
            className="section-eyebrow mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <HelpCircle className="h-4 w-4" />
            <span>{locale === "ar" ? "الأسئلة الشائعة" : "Frequently asked questions"}</span>
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

        <motion.div
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-3">
            {items.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="surface-card overflow-hidden rounded-3xl px-6"
              >
                <AccordionTrigger className="text-start text-base font-black text-foreground hover:text-primary hover:no-underline md:text-lg">
                  <span className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-black text-primary">
                      {index + 1}
                    </span>
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-start text-base leading-8 text-muted-foreground">
                  <div className="border-s-2 border-primary/25 ps-6 pt-2">
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
