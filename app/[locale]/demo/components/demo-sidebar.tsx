"use client";

import WhatsIncludedCard from "./whats-included-card";
import ContactOptionsCard from "./contact-options-card";
import TrustBadgesCard from "./trust-badges-card";

type Props = {
  isRTL: boolean;
};

export default function DemoSidebar({ isRTL }: Props) {
  return (
    <div className="sticky top-24 space-y-6">
      <WhatsIncludedCard isRTL={isRTL} />
      <ContactOptionsCard isRTL={isRTL} />
      <TrustBadgesCard isRTL={isRTL} />
    </div>
  );
}