"use client";

import { cn } from "@/lib/utils";

interface Logo {
  name: string;
  url?: string;
}

interface LogosMarqueeProps {
  title?: string;
  logos: Logo[];
}

export function LogosMarquee({ title, logos }: LogosMarqueeProps) {
  return (
    <section className="border-y py-12">
      <div className="container mx-auto px-4">
        {title && <h3 className="mb-8 text-center text-lg font-semibold text-muted-foreground">{title}</h3>}
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee gap-12 [--duration:30s] [--gap:3rem]">
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="flex min-w-[120px] items-center justify-center grayscale transition-all hover:grayscale-0"
              >
                <span className="text-2xl font-bold text-muted-foreground">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

