"use client";

import { Mail, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { brand } from "@/lib/brand";

type Props = {
  isRTL: boolean;
};

export default function ContactOptionsCard({ isRTL }: Props) {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-lg">
          {isRTL ? "تفضل التواصل المباشر؟" : "Prefer Direct Contact?"}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <Button variant="outline" className="w-full justify-start gap-3" asChild>
          <a href={brand.telHref}>
            <Phone className="h-5 w-5" />
            <span dir="ltr">{brand.phoneLocal}</span>
          </a>
        </Button>

        <Button variant="outline" className="w-full justify-start gap-3" asChild>
          <a href={brand.mailtoHref}>
            <Mail className="h-5 w-5" />
            <span dir="ltr">{brand.email}</span>
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}