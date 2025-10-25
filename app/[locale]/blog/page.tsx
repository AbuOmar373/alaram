"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock,
  Sparkles,
  BookOpen,
  TrendingUp,
  Tag,
  Search,
  Mail,
  CheckCircle2,
  User,
  Eye,
} from "lucide-react";
import Image from "next/image";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function BlogPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations("blog");
  const isRTL = locale === "ar";
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [email, setEmail] = useState("");

  // Mock blog posts - in a real app, this would come from a CMS or database
  const posts = [
    {
      slug: "zatca-einvoicing-guide",
      title:
        locale === "ar"
          ? "دليل شامل للفوترة الإلكترونية في السعودية"
          : "Comprehensive Guide to E-Invoicing in Saudi Arabia",
      excerpt:
        locale === "ar"
          ? "كل ما تحتاج معرفته عن متطلبات هيئة الزكاة والضريبة والجمارك للفوترة الإلكترونية والخطوات اللازمة للامتثال الكامل"
          : "Everything you need to know about ZATCA e-invoicing requirements and the steps necessary for full compliance",
      category: locale === "ar" ? "الامتثال" : "Compliance",
      categorySlug: "compliance",
      date: "2024-01-15",
      readTime: locale === "ar" ? "5 دقائق" : "5 min read",
      author: locale === "ar" ? "فريق الأرام" : "ALaram Team",
      views: "2.3K",
      featured: true,
      image: "/images/blog/einvoicing.jpg", // Placeholder
    },
    {
      slug: "pos-best-practices",
      title:
        locale === "ar"
          ? "أفضل الممارسات لإدارة نقاط البيع"
          : "Best Practices for POS Management",
      excerpt:
        locale === "ar"
          ? "نصائح وحيل عملية لتحسين كفاءة نقطة البيع وزيادة المبيعات وتحسين تجربة العملاء"
          : "Practical tips and tricks to improve POS efficiency, increase sales, and enhance customer experience",
      category: locale === "ar" ? "نصائح" : "Tips",
      categorySlug: "tips",
      date: "2024-01-10",
      readTime: locale === "ar" ? "4 دقائق" : "4 min read",
      author: locale === "ar" ? "أحمد السعيد" : "Ahmed Al-Saeed",
      views: "1.8K",
      featured: false,
      image: "/images/blog/pos.jpg", // Placeholder
    },
    {
      slug: "inventory-management-tips",
      title:
        locale === "ar" ? "5 نصائح لإدارة المخزون بفعالية" : "5 Tips for Effective Inventory Management",
      excerpt:
        locale === "ar"
          ? "كيف تدير مخزونك بطريقة ذكية تقلل التكاليف، تزيد الأرباح، وتمنع نفاد المخزون"
          : "How to manage your inventory smartly to reduce costs, increase profits, and prevent stockouts",
      category: locale === "ar" ? "إدارة" : "Management",
      categorySlug: "management",
      date: "2024-01-05",
      readTime: locale === "ar" ? "6 دقائق" : "6 min read",
      author: locale === "ar" ? "سارة محمد" : "Sarah Mohammed",
      views: "1.5K",
      featured: false,
      image: "/images/blog/inventory.jpg", // Placeholder
    },
    {
      slug: "customer-retention-strategies",
      title:
        locale === "ar"
          ? "استراتيجيات فعالة للحفاظ على العملاء"
          : "Effective Strategies for Customer Retention",
      excerpt:
        locale === "ar"
          ? "تعرف على أفضل الطرق للحفاظ على عملائك الحاليين وبناء ولاء طويل الأمد"
          : "Learn the best ways to retain your existing customers and build long-term loyalty",
      category: locale === "ar" ? "نصائح" : "Tips",
      categorySlug: "tips",
      date: "2024-01-03",
      readTime: locale === "ar" ? "5 دقائق" : "5 min read",
      author: locale === "ar" ? "فريق الأرام" : "ALaram Team",
      views: "2.1K",
      featured: false,
      image: "/images/blog/retention.jpg", // Placeholder
    },
    {
      slug: "financial-reporting-guide",
      title:
        locale === "ar"
          ? "دليل التقارير المالية للشركات الصغيرة"
          : "Financial Reporting Guide for Small Businesses",
      excerpt:
        locale === "ar"
          ? "كيف تعد تقارير مالية دقيقة وتفهمها لاتخاذ قرارات أعمال أفضل"
          : "How to prepare accurate financial reports and understand them to make better business decisions",
      category: locale === "ar" ? "إدارة" : "Management",
      categorySlug: "management",
      date: "2023-12-28",
      readTime: locale === "ar" ? "7 دقائق" : "7 min read",
      author: locale === "ar" ? "خالد العتيبي" : "Khaled Al-Otaibi",
      views: "1.2K",
      featured: false,
      image: "/images/blog/financial.jpg", // Placeholder
    },
    {
      slug: "vat-compliance-saudi",
      title:
        locale === "ar"
          ? "الامتثال لضريبة القيمة المضافة في السعودية"
          : "VAT Compliance in Saudi Arabia",
      excerpt:
        locale === "ar"
          ? "خطوات عملية لضمان امتثال شركتك لمتطلبات ضريبة القيمة المضافة"
          : "Practical steps to ensure your business complies with VAT requirements",
      category: locale === "ar" ? "الامتثال" : "Compliance",
      categorySlug: "compliance",
      date: "2023-12-20",
      readTime: locale === "ar" ? "6 دقائق" : "6 min read",
      author: locale === "ar" ? "فريق الأرام" : "ALaram Team",
      views: "1.9K",
      featured: false,
      image: "/images/blog/vat.jpg", // Placeholder
    },
  ];

  const categories = [
    { slug: "all", name: locale === "ar" ? "الكل" : "All", count: posts.length },
    {
      slug: "compliance",
      name: locale === "ar" ? "الامتثال" : "Compliance",
      count: posts.filter((p) => p.categorySlug === "compliance").length,
    },
    {
      slug: "tips",
      name: locale === "ar" ? "نصائح" : "Tips",
      count: posts.filter((p) => p.categorySlug === "tips").length,
    },
    {
      slug: "management",
      name: locale === "ar" ? "إدارة" : "Management",
      count: posts.filter((p) => p.categorySlug === "management").length,
    },
  ];

  const filteredPosts =
    selectedCategory === "all"
      ? posts
      : posts.filter((post) => post.categorySlug === selectedCategory);

  const featuredPost = posts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-purple-500/5 to-background py-20 md:py-28">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="container relative mx-auto px-4">
          <motion.div
            className="mx-auto max-w-4xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4" />
              <span>{isRTL ? "مدونة الأرام" : "ALaram Blog"}</span>
            </div>

            <h1 className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-5xl font-bold leading-tight tracking-tight text-transparent dark:from-gray-100 dark:via-white dark:to-gray-100 sm:text-6xl md:text-7xl">
              {t("title")}
            </h1>

            <p className="mt-6 text-xl leading-relaxed text-muted-foreground md:text-2xl">
              {t("subtitle")}
            </p>

            {/* Search Bar */}
            <div className="mx-auto mt-10 max-w-xl">
              <div className="relative">
                <Search className="absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={
                    isRTL ? "ابحث عن مقالات..." : "Search for articles..."
                  }
                  className="h-14 rounded-2xl border-2 bg-background pe-4 ps-12 text-lg shadow-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="border-b bg-background py-6 sticky top-16 z-40 backdrop-blur-lg bg-background/80">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((category, index) => (
              <motion.button
                key={category.slug}
                onClick={() => setSelectedCategory(category.slug)}
                className={cn(
                  "group relative overflow-hidden rounded-xl border-2 px-6 py-3 font-semibold transition-all duration-300",
                  selectedCategory === category.slug
                    ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "border-border bg-background hover:border-primary/50 hover:shadow-lg"
                )}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  {category.name}
                  <Badge
                    variant="secondary"
                    className={cn(
                      "ms-1",
                      selectedCategory === category.slug &&
                        "bg-primary-foreground/20 text-primary-foreground"
                    )}
                  >
                    {category.count}
                  </Badge>
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && selectedCategory === "all" && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-6xl"
            >
              <div className="mb-6 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">
                  {isRTL ? "المقال المميز" : "Featured Article"}
                </h2>
              </div>

              <Card className="group overflow-hidden border-2 border-primary/50 bg-gradient-to-br from-card to-card/50 shadow-2xl shadow-primary/10 transition-all duration-500 hover:border-primary hover:shadow-3xl hover:shadow-primary/20">
                <div className="grid gap-8 md:grid-cols-2">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden md:h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20" />
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-purple-500/10">
                      <BookOpen className="h-24 w-24 text-primary/30" />
                    </div>
                    <Badge className="absolute start-4 top-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
                      <Sparkles className="me-1 h-3 w-3" />
                      {isRTL ? "مميز" : "Featured"}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-between p-8">
                    <div>
                      <div className="mb-4 flex flex-wrap items-center gap-3">
                        <Badge variant="default" className="text-sm">
                          {featuredPost.category}
                        </Badge>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(featuredPost.date).toLocaleDateString(
                              locale === "ar" ? "ar-SA" : "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Eye className="h-4 w-4" />
                          <span>{featuredPost.views}</span>
                        </div>
                      </div>

                      <h3 className="mb-4 text-3xl font-bold leading-tight md:text-4xl">
                        {featuredPost.title}
                      </h3>

                      <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                        {featuredPost.excerpt}
                      </p>

                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>{featuredPost.author}</span>
                        <span>•</span>
                        <Clock className="h-4 w-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>

                    <Button
                      size="lg"
                      asChild
                      className="mt-6 w-full justify-between rounded-xl bg-gradient-to-r from-primary to-blue-600 font-semibold shadow-lg shadow-primary/30 transition-all hover:shadow-xl md:w-auto"
                    >
                      <Link href={`/blog/${featuredPost.slug}`}>
                        {t("readMore")}
                        <ArrowRight className="ms-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            {regularPosts.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {regularPosts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                  >
                    <Card className="group h-full overflow-hidden border-2 bg-gradient-to-br from-card to-card/50 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 opacity-0 transition-opacity duration-300 group-hover:from-primary/10 group-hover:to-purple-500/10 group-hover:opacity-100" />
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/5 to-purple-500/5">
                          <BookOpen className="h-16 w-16 text-primary/20 transition-transform duration-300 group-hover:scale-110" />
                        </div>
                      </div>

                      <CardHeader className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {post.category}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Eye className="h-3 w-3" />
                            <span>{post.views}</span>
                          </div>
                        </div>

                        <CardTitle className="line-clamp-2 text-xl leading-tight">
                          {post.title}
                        </CardTitle>

                        <CardDescription className="line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <User className="h-3 w-3" />
                          <span className="line-clamp-1">{post.author}</span>
                          <span>•</span>
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime}</span>
                        </div>

                        <div className="flex items-center justify-between gap-2 border-t pt-4">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {new Date(post.date).toLocaleDateString(
                                locale === "ar" ? "ar-SA" : "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>

                          <Button variant="ghost" size="sm" asChild className="group/btn">
                            <Link href={`/blog/${post.slug}`}>
                              {t("readMore")}
                              <ArrowRight className="ms-1 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <BookOpen className="mx-auto mb-4 h-16 w-16 text-muted-foreground/30" />
                <p className="text-xl text-muted-foreground">
                  {isRTL
                    ? "لا توجد مقالات في هذه الفئة حالياً"
                    : "No articles in this category yet"}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-blue-600 to-purple-600 py-20 text-white">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <div className="container relative mx-auto px-4">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
              <Mail className="h-4 w-4" />
              <span>{isRTL ? "النشرة البريدية" : "Newsletter"}</span>
            </div>

            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              {isRTL
                ? "اشترك في نشرتنا البريدية"
                : "Subscribe to Our Newsletter"}
            </h2>

            <p className="mb-10 text-lg opacity-90 md:text-xl">
              {isRTL
                ? "احصل على أحدث المقالات والنصائح مباشرة في بريدك الإلكتروني"
                : "Get the latest articles and tips directly in your inbox"}
            </p>

            <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                placeholder={
                  isRTL ? "بريدك الإلكتروني" : "Your email address"
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 flex-1 rounded-2xl border-2 border-white/30 bg-white/10 text-white placeholder:text-white/60 backdrop-blur-sm"
              />
              <Button
                size="lg"
                className="h-14 rounded-2xl bg-white px-8 font-semibold text-primary shadow-2xl transition-all hover:scale-105 hover:bg-white/90"
              >
                {isRTL ? "اشترك" : "Subscribe"}
                <ArrowRight className="ms-2 h-5 w-5" />
              </Button>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm opacity-90">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span>{isRTL ? "مجاناً تماماً" : "Completely free"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span>{isRTL ? "مقالات أسبوعية" : "Weekly articles"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span>{isRTL ? "إلغاء الاشتراك بسهولة" : "Easy unsubscribe"}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="mx-auto max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="overflow-hidden border-2 border-primary/50 bg-gradient-to-br from-primary/5 via-purple-500/5 to-background shadow-2xl">
              <CardContent className="p-10 text-center">
                <h3 className="mb-4 text-3xl font-bold md:text-4xl">
                  {isRTL
                    ? "هل أنت مستعد لتطوير عملك؟"
                    : "Ready to Grow Your Business?"}
                </h3>
                <p className="mb-8 text-lg text-muted-foreground">
                  {isRTL
                    ? "جرب الأرام مجاناً لمدة 14 يوماً واكتشف كيف يمكننا مساعدتك"
                    : "Try ALaram free for 14 days and discover how we can help you"}
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Button
                    size="lg"
                    asChild
                    className="rounded-xl bg-gradient-to-r from-primary to-blue-600 font-semibold shadow-lg shadow-primary/30 transition-all hover:shadow-xl"
                  >
                    <Link href="/demo">
                      {isRTL ? "احجز عرضاً مجانياً" : "Book Free Demo"}
                      <ArrowRight className="ms-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="rounded-xl border-2 font-semibold"
                  >
                    <Link href="/solutions">
                      {isRTL ? "تصفح الحلول" : "Browse Solutions"}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
