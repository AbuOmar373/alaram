"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  User,
  Eye,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  CheckCircle,
  BookOpen,
  Tag,
  MessageSquare,
  ThumbsUp,
  Heart,
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { getBlogPosts } from "@/data/blog-posts";
import { getBaseUrl } from "@/lib/site-url";

export default function BlogPostPage() {
  const params = useParams<{ locale: string; slug: string }>();
  const locale = params.locale;
  const slug = params.slug;
  const t = useTranslations("blog");
  const isRTL = locale === "ar";

  const posts = getBlogPosts(locale);
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }


  // Related posts (same category, excluding current)
  const relatedPosts = posts
    .filter((p) => p.categorySlug === post.categorySlug && p.slug !== post.slug)
    .slice(0, 3);

  const shareUrl = `${getBaseUrl()}/${locale}/blog/${slug}`;
  const shareTitle = post.title;

  const handleShare = (platform: string) => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`,
      copy: shareUrl,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(shareUrl);
      // Show toast notification (you can add a toast library)
      alert(isRTL ? "تم نسخ الرابط!" : "Link copied!");
    } else {
      window.open(urls[platform as keyof typeof urls], "_blank", "width=600,height=400");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/5 via-purple-500/5 to-background py-16 md:py-20">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="container relative mx-auto px-4">
          <motion.div
            className="mx-auto max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back Link */}
            <Button variant="ghost" asChild className="mb-6 group">
              <Link href={`/${locale}/blog`}>
                {isRTL ? (
                  <>
                    <ArrowRight className="me-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    العودة للمدونة
                  </>
                ) : (
                  <>
                    <ArrowLeft className="me-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Blog
                  </>
                )}
              </Link>
            </Button>

            {/* Category Badge */}
            <Badge variant="default" className="mb-6 text-sm">
              <Tag className="me-1 h-3 w-3" />
              {post.category}
            </Badge>

            {/* Title */}
            <h1 className="mb-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent dark:from-white dark:via-slate-100 dark:to-slate-400 md:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="mb-8 text-xl leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              {/* Author */}
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {post.author.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-foreground">{post.author}</div>
                  <div className="text-xs">{post.authorRole}</div>
                </div>
              </div>

              <Separator orientation="vertical" className="h-10" />

              {/* Date */}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(post.date).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              <Separator orientation="vertical" className="hidden h-10 sm:block" />

              {/* Read Time */}
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>

              <Separator orientation="vertical" className="hidden h-10 md:block" />

              {/* Views */}
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{post.views}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_300px]">
            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="overflow-hidden border-2">
                <CardContent className="prose prose-lg dark:prose-invert max-w-none p-8 md:p-12">
                  {/* Featured Image Placeholder */}
                  <div className="mb-10 -mx-8 -mt-8 md:-mx-12 md:-mt-12 flex h-96 items-center justify-center bg-gradient-to-br from-primary/10 to-purple-500/10">
                    <BookOpen className="h-32 w-32 text-primary/20" />
                  </div>

                  {/* Article Content - Rendered as Markdown-style */}
                  <div
                    className="article-content"
                    dangerouslySetInnerHTML={{
                      __html: post.content
                        .split("\n")
                        .map((line) => {
                          // H2
                          if (line.startsWith("## ")) {
                            return `<h2 class="mt-10 mb-4 text-3xl font-bold">${line.slice(3)}</h2>`;
                          }
                          // H3
                          if (line.startsWith("### ")) {
                            return `<h3 class="mt-8 mb-3 text-2xl font-bold">${line.slice(4)}</h3>`;
                          }
                          // Bold list items
                          if (line.startsWith("**") && line.includes(":")) {
                            return `<p class="my-4"><strong>${line.replace(/\*\*/g, "")}</strong></p>`;
                          }
                          // Checkmarks
                          if (line.includes("✅") || line.includes("❌")) {
                            return `<p class="my-2 flex items-start gap-2">${line}</p>`;
                          }
                          // Regular paragraphs
                          if (line.trim() && !line.startsWith("-") && !line.startsWith("```")) {
                            return `<p class="my-4 leading-relaxed">${line}</p>`;
                          }
                          // Lists
                          if (line.startsWith("- ")) {
                            return `<li class="my-2">${line.slice(2)}</li>`;
                          }
                          // Numbered lists
                          if (/^\d+\./.test(line)) {
                            return `<li class="my-2">${line.replace(/^\d+\.\s/, "")}</li>`;
                          }
                          return line;
                        })
                        .join("\n"),
                    }}
                  />
                </CardContent>
              </Card>

              {/* Engagement Section */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="lg" className="gap-2">
                    <ThumbsUp className="h-5 w-5" />
                    <span>{post.likes}</span>
                  </Button>
                  <Button variant="outline" size="lg" className="gap-2">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="lg" className="gap-2">
                    <MessageSquare className="h-5 w-5" />
                    <span>{post.comments}</span>
                  </Button>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-muted-foreground">
                    {isRTL ? "شارك:" : "Share:"}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleShare("facebook")}
                    className="hover:border-blue-600 hover:text-blue-600"
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleShare("twitter")}
                    className="hover:border-sky-500 hover:text-sky-500"
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleShare("linkedin")}
                    className="hover:border-blue-700 hover:text-blue-700"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleShare("copy")}
                    className="hover:border-primary hover:text-primary"
                  >
                    <Link2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Author Card */}
              <Card className="mt-8 border-2">
                <CardContent className="flex items-center gap-6 p-8">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                      {post.author.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="mb-1 text-xl font-bold">{post.author}</h3>
                    <p className="mb-3 text-sm text-muted-foreground">{post.authorRole}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {isRTL
                        ? "كاتب متخصص في مجال الأعمال والتكنولوجيا، يسعى لمشاركة المعرفة ومساعدة الشركات على النمو."
                        : "Specialized writer in business and technology, striving to share knowledge and help companies grow."}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-16">
                  <h2 className="mb-8 text-3xl font-bold">
                    {isRTL ? "مقالات ذات صلة" : "Related Articles"}
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {relatedPosts.map((relatedPost, index) => (
                      <motion.div
                        key={relatedPost.slug}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="group h-full overflow-hidden border-2 transition-all hover:border-primary/50 hover:shadow-xl">
                          <div className="relative h-40 bg-gradient-to-br from-primary/5 to-purple-500/5">
                            <div className="flex h-full items-center justify-center">
                              <BookOpen className="h-16 w-16 text-primary/20 transition-transform group-hover:scale-110" />
                            </div>
                          </div>
                          <CardHeader className="space-y-3">
                            <Badge variant="secondary" className="w-fit text-xs">
                              {relatedPost.category}
                            </Badge>
                            <CardTitle className="line-clamp-2 text-lg leading-tight">
                              {relatedPost.title}
                            </CardTitle>
                            <CardDescription className="line-clamp-2 text-sm">
                              {relatedPost.excerpt}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Button variant="ghost" asChild className="group/btn w-full">
                              <Link href={`/${locale}/blog/${relatedPost.slug}`}>
                                {t("readMore")}
                                <ArrowRight className="ms-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.aside
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="sticky top-24 space-y-6">
                {/* CTA Card */}
                <Card className="overflow-hidden border-2 border-primary/50 bg-gradient-to-br from-primary/10 to-purple-500/10">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-blue-600 mx-auto text-white">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                    <h3 className="mb-3 text-xl font-bold">
                      {isRTL ? "جرب الأرام مجاناً" : "Try ALaram Free"}
                    </h3>
                    <p className="mb-6 text-sm text-muted-foreground">
                      {isRTL
                        ? "اكتشف كيف يمكن لنظام الأرام تحسين إدارة أعمالك"
                        : "Discover how ALaram can improve your business management"}
                    </p>
                    <Button
                      size="lg"
                      asChild
                      className="w-full rounded-xl bg-gradient-to-r from-primary to-blue-600 font-semibold shadow-lg"
                    >
                      <Link href={`/${locale}/demo`}>
                        {isRTL ? "احجز عرضاً" : "Book Demo"}
                        <ArrowRight className="ms-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Table of Contents */}
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {isRTL ? "محتويات المقال" : "Table of Contents"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                      {isRTL ? "مقدمة" : "Introduction"}
                    </a>
                    <a href="#" className="block text-muted-foreground hover:text-primary transition-colors ps-3">
                      {isRTL ? "النقاط الرئيسية" : "Key Points"}
                    </a>
                    <a href="#" className="block text-muted-foreground hover:text-primary transition-colors ps-3">
                      {isRTL ? "التطبيق العملي" : "Practical Application"}
                    </a>
                    <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                      {isRTL ? "الخلاصة" : "Conclusion"}
                    </a>
                  </CardContent>
                </Card>

                {/* Popular Tags */}
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {isRTL ? "المواضيع الشائعة" : "Popular Topics"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{isRTL ? "الامتثال" : "Compliance"}</Badge>
                      <Badge variant="secondary">{isRTL ? "نقاط البيع" : "POS"}</Badge>
                      <Badge variant="secondary">{isRTL ? "المخزون" : "Inventory"}</Badge>
                      <Badge variant="secondary">{isRTL ? "المحاسبة" : "Accounting"}</Badge>
                      <Badge variant="secondary">{isRTL ? "ZATCA" : "ZATCA"}</Badge>
                      <Badge variant="secondary">{isRTL ? "التجارة الإلكترونية" : "E-commerce"}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              {isRTL ? "هل استفدت من هذا المقال؟" : "Did You Find This Article Helpful?"}
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              {isRTL
                ? "اشترك في نشرتنا البريدية لتصلك المزيد من المقالات المفيدة"
                : "Subscribe to our newsletter to receive more helpful articles"}
            </p>
            <div className="mx-auto flex max-w-md gap-3">
              <input
                type="email"
                placeholder={isRTL ? "بريدك الإلكتروني" : "Your email"}
                className="flex-1 rounded-xl border-2 px-4 py-3"
              />
              <Button size="lg" className="rounded-xl bg-gradient-to-r from-primary to-blue-600 px-8">
                {isRTL ? "اشترك" : "Subscribe"}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


