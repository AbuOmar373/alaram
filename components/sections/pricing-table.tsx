"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

interface PricingTier {
  name: string;
  description: string;
  price: number;
  currency: string;
  period: string;
  popular?: boolean;
  features: string[];
  cta: string;
  ctaVariant?: "default" | "outline";
}

interface PricingTableProps {
  title: string;
  subtitle?: string;
  tiers: PricingTier[];
  popularText?: string;
}

export function PricingTable({ title, subtitle, tiers, popularText = "الأكثر شعبية" }: PricingTableProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          {subtitle && <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <Card
              key={index}
              className={`relative ${tier.popular ? "border-primary shadow-lg" : ""}`}
            >
              {tier.popular && (
                <Badge className="absolute -top-3 start-1/2 -translate-x-1/2">
                  {popularText}
                </Badge>
              )}
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    {formatCurrency(tier.price, tier.currency)}
                  </span>
                  <span className="text-muted-foreground">/{tier.period}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant={tier.ctaVariant || (tier.popular ? "default" : "outline")}
                  className="w-full"
                >
                  <Link href="/demo">{tier.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

