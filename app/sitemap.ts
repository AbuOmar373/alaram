import { MetadataRoute } from "next";
import { industries } from "@/data/industries";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Static pages
  const staticPages = [
    "",
    "/solutions",
    "/pricing",
    "/about",
    "/contact",
    "/demo",
    "/blog",
    "/legal/terms",
    "/legal/privacy",
  ];

  // Generate sitemap entries for both languages
  const pages: MetadataRoute.Sitemap = [];

  // Add static pages for both languages
  ["ar", "en"].forEach((locale) => {
    staticPages.forEach((page) => {
      pages.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: page === "" ? 1 : 0.8,
      });
    });

    // Add industry pages
    industries.forEach((industry) => {
      pages.push({
        url: `${baseUrl}/${locale}/solutions/${industry.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    });
  });

  return pages;
}

