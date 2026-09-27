import Link from "next/link";

export function PurchaseLinks({ locale }: { locale: string }) {
  const isArabic = locale === "ar";
  const links = [
    {
      href: "/legal/refund",
      label: isArabic ? "سياسة الاستبدال والاسترجاع" : "Exchange & Refund Policy",
    },
    { href: "/legal/delivery", label: isArabic ? "التسليم والتفعيل" : "Delivery & Activation" },
    { href: "/contact", label: isArabic ? "تواصل معنا" : "Contact Us" },
  ];

  return (
    <nav
      aria-label={isArabic ? "معلومات الشراء والدعم" : "Purchase information and support"}
      className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm"
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={`/${locale}${link.href}`}
          className="font-semibold text-primary underline underline-offset-4 hover:text-foreground"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
