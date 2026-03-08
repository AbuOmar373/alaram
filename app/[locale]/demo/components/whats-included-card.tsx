"use client";

import { CheckCircle2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDemoConstants } from "../constants";

type Props = {
  isRTL: boolean;
};

export default function WhatsIncludedCard({ isRTL }: Props) {
  const { whatsIncluded } = getDemoConstants(isRTL);

  return (
    <Card className="border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-purple-500/5">
      <CardHeader>
        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-600 text-white">
          <CheckCircle2 className="h-6 w-6" />
        </div>

        <CardTitle className="text-xl">
          {isRTL ? "ما يشمله العرض" : "What's Included"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="space-y-3">
          {whatsIncluded.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <span className="text-sm leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}