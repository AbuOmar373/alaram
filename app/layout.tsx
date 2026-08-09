import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { brand } from "@/lib/brand";
import { getBaseUrl } from "@/lib/site-url";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  title: brand.title.ar,
  description: brand.description.ar,
  authors: [{ name: brand.name.en }],
  creator: brand.name.en,
  publisher: brand.name.en,
  metadataBase: new URL(getBaseUrl()),
  openGraph: {
    type: "website",
    locale: "ar_SA",
    title: brand.title.ar,
    description: brand.description.ar,
    siteName: brand.name.ar,
  },
  twitter: {
    card: "summary_large_image",
    title: brand.title.ar,
    description: brand.description.ar,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="0233ac1a-eb20-41a6-8c09-75af7318be76"
        />
      </head>
      <body className={tajawal.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}


