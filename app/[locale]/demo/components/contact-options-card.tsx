"use client";

import { Mail, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
          <a href="tel:+966XXXXXXXX">
            <Phone className="h-5 w-5" />
            <span dir="ltr">+966 XX XXX XXXX</span>
          </a>
        </Button>

        <Button variant="outline" className="w-full justify-start gap-3" asChild>
          <a href="mailto:demo@alaram.example">
            <Mail className="h-5 w-5" />
            <span dir="ltr">demo@alaram.example</span>
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}