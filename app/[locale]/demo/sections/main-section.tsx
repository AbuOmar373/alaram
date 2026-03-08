"use client";

import { motion } from "framer-motion";
import DemoFormCard from "../components/demo-form-card";
import DemoSidebar from "../components/demo-sidebar";

type Props = {
  locale: string;
  isRTL: boolean;
};

export default function MainSection({ locale, isRTL }: Props) {
  return (
    <section className="pb-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <DemoFormCard locale={locale} isRTL={isRTL} />
            </motion.div>

            <motion.aside
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <DemoSidebar isRTL={isRTL} />
            </motion.aside>
          </div>
        </div>
      </div>
    </section>
  );
}