import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { blogPostSlugs, getBlogPost } from "@/data/blog-posts";
import { brand } from "@/lib/brand";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  buildPageMetadata,
  getLocaleFromParam,
  localizedPath,
  organizationId,
  socialImageUrl,
} from "@/lib/seo";

type LayoutParams = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPostSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: LayoutParams): Promise<Metadata> {
  const { locale, slug } = await params;
  const currentLocale = getLocaleFromParam(locale);
  const post = getBlogPost(currentLocale, slug);

  if (!post) {
    return {};
  }

  return buildPageMetadata({
    locale: currentLocale,
    path: `/blog/${slug}`,
    title: post.title,
    description: post.excerpt,
    type: "article",
    publishedTime: post.date,
    authors: [post.author],
  });
}

export default async function BlogPostLayout({
  children,
  params,
}: LayoutParams & { children: React.ReactNode }) {
  const { locale, slug } = await params;
  const currentLocale = getLocaleFromParam(locale);
  const post = getBlogPost(currentLocale, slug);

  if (!post) {
    notFound();
  }

  const url = absoluteUrl(localizedPath(currentLocale, `/blog/${slug}`));
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: socialImageUrl(currentLocale),
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: currentLocale,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    // Posts by "فريق الأرام" / "ALaram Team" are attributed to the organization itself.
    author: /فريق|Team/.test(post.author)
      ? { "@type": "Organization", "@id": organizationId(), name: post.author }
      : { "@type": "Person", name: post.author, jobTitle: post.authorRole },
    publisher: {
      "@id": organizationId(),
      "@type": "Organization",
      name: currentLocale === "ar" ? brand.name.ar : brand.name.en,
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png") },
    },
    articleSection: post.category,
  };

  return (
    <>
      <JsonLd
        data={[
          articleStructuredData,
          breadcrumbJsonLd(currentLocale, [
            { name: currentLocale === "ar" ? "المدونة" : "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${slug}` },
          ]),
        ]}
      />
      {children}
    </>
  );
}
