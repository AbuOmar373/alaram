import { MetadataRoute } from "next";
import { getBlogPosts } from "@/data/blog-posts";
import { industries } from "@/data/industries";
import { getBaseUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const locales = ["ar", "en"] as const;
  const staticPaths = [
    "",
    "/solutions",
    "/products",
    "/lms",
    "/samt",
    "/estimator",
    "/pricing",
    "/about",
    "/contact",
    "/demo",
    "/blog",
    "/legal/terms",
    "/legal/privacy",
    "/legal/refund",
    "/legal/delivery",
  ] as const;

  const buildAlternates = (path: string) => ({
    languages: {
      ar: `${baseUrl}/ar${path}`,
      en: `${baseUrl}/en${path}`,
      "x-default": `${baseUrl}/ar${path}`,
    },
  });

  const pages: MetadataRoute.Sitemap = [];

  for (const path of staticPaths) {
    for (const locale of locales) {
      pages.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "daily" : "weekly",
        priority: path === "" ? 1 : 0.8,
        alternates: buildAlternates(path),
      });
    }
  }

  for (const industry of industries) {
    const path = `/solutions/${industry.id}`;
    for (const locale of locales) {
      pages.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: buildAlternates(path),
      });
    }
  }

  for (const post of getBlogPosts("ar")) {
    const path = `/blog/${post.slug}`;
    for (const locale of locales) {
      pages.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: buildAlternates(path),
      });
    }
  }

  return pages;
}
