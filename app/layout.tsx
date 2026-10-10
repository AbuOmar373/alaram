import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import { getBaseUrl } from "@/lib/site-url";
import "./globals.css";

export const metadata: Metadata = {
  title: brand.title.ar,
  description: brand.description.ar,
  applicationName: brand.name.en,
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
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

// <html> lives in app/[locale]/layout.tsx so each locale gets the correct lang/dir.
// This pass-through layout is still required because of the root not-found page.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
