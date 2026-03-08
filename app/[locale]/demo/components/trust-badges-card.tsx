"use client";

import { Award, Headphones, Shield } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Props = {
  isRTL: boolean;
};

export default function TrustBadgesCard({ isRTL }: Props) {
  const items = [
    {
      icon: Shield,
      iconWrapperClass: "bg-green-100 dark:bg-green-900/20",
      iconClass: "text-green-600 dark:text-green-400",
      title: isRTL ? "آمن 100%" : "100% Secure",
      description: isRTL ? "بياناتك محمية" : "Your data is protected",
    },
    {
      icon: Headphones,
      iconWrapperClass: "bg-blue-100 dark:bg-blue-900/20",
      iconClass: "text-blue-600 dark:text-blue-400",
      title: isRTL ? "دعم 24/7" : "24/7 Support",
      description: isRTL ? "نحن هنا لمساعدتك" : "We're here to help",
    },
    {
      icon: Award,
      iconWrapperClass: "bg-purple-100 dark:bg-purple-900/20",
      iconClass: "text-purple-600 dark:text-purple-400",
      title: isRTL ? "معتمد من ZATCA" : "ZATCA Certified",
      description: isRTL ? "متوافق 100%" : "100% Compliant",
    },
  ];

  return (
    <Card className="border-2">
      <CardContent className="space-y-4 p-6">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <div key={item.title}>
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.iconWrapperClass}`}
                >
                  <Icon className={`h-5 w-5 ${item.iconClass}`} />
                </div>

                <div>
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.description}</div>
                </div>
              </div>

              {index !== items.length - 1 && <Separator className="mt-4" />}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}