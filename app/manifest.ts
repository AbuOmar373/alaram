import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ALaram | الأرام - منصة برامج محاسبية متخصصة",
    short_name: "ALaram",
    description:
      "منصة برامج محاسبية متعددة القطاعات — نقاط بيع، محاسبة، مستودعات، وموارد بشرية في نظام واحد",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1e40af",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

