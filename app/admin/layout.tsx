import type { Metadata } from "next";
import { tajawal } from "@/lib/fonts";
import { AdminProvider } from "@/components/admin/admin-provider";

export const metadata: Metadata = {
  title: "لوحة الإدارة | الأرام",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  referrer: "same-origin",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={tajawal.className}>
        <AdminProvider>{children}</AdminProvider>
      </body>
    </html>
  );
}
