import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { getBaseUrl } from "@/lib/site-url";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "الأرام | ALaram - منصة برامج محاسبية متخصصة",
    template: "%s | الأرام | ALaram",
  },
  description:
    "منصة برامج محاسبية متعددة القطاعات — نقاط بيع، محاسبة، مستودعات، وموارد بشرية في نظام واحد",
  keywords: [
    "برامج محاسبة",
    "نقاط البيع",
    "إدارة المخزون",
    "الموارد البشرية",
    "السعودية",
    "الفوترة الإلكترونية",
  ],
  authors: [{ name: "ALaram" }],
  creator: "ALaram",
  metadataBase: new URL(getBaseUrl()),
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "/",
    title: "الأرام | ALaram - منصة برامج محاسبية متخصصة",
    description:
      "حلول مُفصّلة للسوبرماركت، الصيانة، ورش السيارات، العطور، والصالونات النسائية",
    siteName: "الأرام | ALaram",
  },
  twitter: {
    card: "summary_large_image",
    title: "الأرام | ALaram - منصة برامج محاسبية متخصصة",
    description:
      "حلول مُفصّلة للسوبرماركت، الصيانة، ورش السيارات، العطور، والصالونات النسائية",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={tajawal.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}


