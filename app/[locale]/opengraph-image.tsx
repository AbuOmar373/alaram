import { brand } from "@/lib/brand";
import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function OpenGraphImage({ params }: Props) {
  const { locale } = await params;
  const isArabic = locale === "ar";

  const title = isArabic ? brand.title.ar : brand.title.en;
  const subtitle = isArabic ? brand.description.ar : brand.description.en;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px",
          background:
            "linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(30, 64, 175) 45%, rgb(124, 58, 237) 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "24px",
            fontSize: 28,
            opacity: 0.9,
          }}
        >
          {isArabic ? `${brand.name.ar} | ${brand.name.en}` : brand.name.en}
        </div>
        <div
          style={{
            fontSize: 58,
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: "18px",
            direction: isArabic ? "rtl" : "ltr",
            textAlign: isArabic ? "right" : "left",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 32,
            lineHeight: 1.35,
            opacity: 0.92,
            direction: isArabic ? "rtl" : "ltr",
            textAlign: isArabic ? "right" : "left",
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    size
  );
}
