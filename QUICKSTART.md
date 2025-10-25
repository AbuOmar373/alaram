# 🚀 دليل البداية السريعة | Quick Start Guide

## نظرة عامة | Overview

موقع تسويقي متكامل لـ **الأرام | ALaram** - منصة برامج محاسبية متخصصة للشركات في المملكة العربية السعودية ودول الخليج.

A complete marketing website for **ALaram** - specialized accounting software platform for businesses in Saudi Arabia and the Gulf region.

---

## 📦 التثبيت | Installation

### 1. تثبيت المكتبات | Install Dependencies

```bash
pnpm install
# or
npm install
```

### 2. إعداد البيئة | Setup Environment

أنشئ ملف `.env.local` ونسخ المحتوى من `.env.local.example`:

Create `.env.local` file and copy content from `.env.local.example`:

```env
NEXT_PUBLIC_SITE_NAME="ALaram | الأرام"
NEXT_PUBLIC_DEFAULT_MARKET="KSA"
NEXT_PUBLIC_ANALYTICS_ENABLED="false"
CONTACT_INBOX="sales@alaram.example"
```

### 3. تشغيل المشروع | Run Development Server

```bash
pnpm dev
```

افتح المتصفح على: [http://localhost:3000](http://localhost:3000)

Open browser at: [http://localhost:3000](http://localhost:3000)

---

## 🎨 التخصيص السريع | Quick Customization

### تغيير الألوان | Change Colors

عدّل ملف `app/globals.css`:

Edit `app/globals.css`:

```css
:root {
  --primary: 213 94% 45%;  /* لون العلامة التجارية الرئيسي | Main brand color */
}
```

### تغيير الشعار | Change Logo

عدّل ملف `components/logo.tsx` لتغيير الشعار

Edit `components/logo.tsx` to change the logo

### إضافة قطاع جديد | Add New Industry

عدّل `data/industries.ts` وأضف قطاع جديد:

Edit `data/industries.ts` and add a new industry:

```typescript
{
  id: "new-industry",
  nameAR: "القطاع الجديد",
  nameEN: "New Industry",
  // ... المزيد من الحقول | more fields
}
```

---

## 📄 الصفحات المتاحة | Available Pages

| الصفحة | Page | الرابط | URL |
|--------|------|--------|-----|
| الرئيسية | Home | `/` | `/` |
| الحلول | Solutions | `/solutions` | `/solutions` |
| الأسعار | Pricing | `/pricing` | `/pricing` |
| من نحن | About | `/about` | `/about` |
| تواصل معنا | Contact | `/contact` | `/contact` |
| احجز عرضاً | Demo | `/demo` | `/demo` |
| المدونة | Blog | `/blog` | `/blog` |

---

## 🌍 تبديل اللغة | Language Switching

- اللغة الافتراضية: **العربية** (RTL)
- Default Language: **Arabic** (RTL)

- اللغات المتاحة: العربية والإنجليزية
- Available Languages: Arabic and English

- استخدم زر اللغة في شريط التنقل
- Use the language toggle in the navbar

---

## 🏗️ البناء للإنتاج | Build for Production

```bash
# بناء المشروع | Build
pnpm build

# تشغيل الإنتاج | Start production
pnpm start
```

---

## 🔧 الأوامر المفيدة | Useful Commands

```bash
# تنسيق الكود | Format code
pnpm format

# فحص الأخطاء | Lint
pnpm lint

# التطوير | Development
pnpm dev

# البناء | Build
pnpm build

# الإنتاج | Production
pnpm start
```

---

## 📱 المميزات الرئيسية | Key Features

### ✅ متعدد اللغات | Multi-language
- العربية (RTL) كلغة افتراضية
- Arabic (RTL) as default
- الإنجليزية (LTR)
- English (LTR)

### ✅ الوضع الليلي | Dark Mode
- تبديل تلقائي بين الوضع الليلي والنهاري
- Automatic dark/light mode switching

### ✅ متجاوب | Responsive
- متجاوب مع جميع الأجهزة
- Responsive across all devices

### ✅ محسّن لمحركات البحث | SEO Optimized
- Metadata كاملة
- Complete metadata
- Sitemap و Robots.txt
- Open Graph

### ✅ جاهز لـ KSA | KSA Ready
- ضريبة القيمة المضافة 15%
- 15% VAT
- الفوترة الإلكترونية (placeholder)
- E-invoicing (placeholder)
- طرق الدفع المحلية
- Local payment methods

---

## 🆘 الدعم | Support

### مشاكل شائعة | Common Issues

**1. خطأ في التثبيت | Installation Error**
```bash
# احذف node_modules وأعد التثبيت
# Delete node_modules and reinstall
rm -rf node_modules
pnpm install
```

**2. مشكلة في البناء | Build Issue**
```bash
# امسح ملفات .next
# Clear .next directory
rm -rf .next
pnpm build
```

**3. الخطوط لا تظهر | Fonts Not Loading**
- تأكد من اتصالك بالإنترنت لتحميل الخطوط من Google Fonts
- Ensure internet connection to load fonts from Google Fonts

---

## 📚 موارد إضافية | Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [next-intl](https://next-intl-docs.vercel.app/)

---

## 🎯 الخطوات التالية | Next Steps

1. ✅ تخصيص الألوان والشعار
   Customize colors and logo

2. ✅ إضافة محتوى حقيقي
   Add real content

3. ✅ ربط نماذج الاتصال بخدمة البريد
   Connect contact forms to email service

4. ✅ إضافة Google Analytics
   Add Google Analytics

5. ✅ نشر الموقع
   Deploy the website

---

**صُنع بـ ❤️ في السعودية | Made with ❤️ in Saudi Arabia 🇸🇦**

