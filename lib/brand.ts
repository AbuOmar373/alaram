const envBrandNameAr = process.env.NEXT_PUBLIC_BRAND_NAME_AR?.trim();
const envBrandNameEn = process.env.NEXT_PUBLIC_BRAND_NAME_EN?.trim();
const brandNameAr = envBrandNameAr && envBrandNameAr.length > 0 ? envBrandNameAr : "الأرام";
const brandNameEn = envBrandNameEn && envBrandNameEn.length > 0 ? envBrandNameEn : "ALaram";

export const brand = {
  name: {
    ar: brandNameAr,
    en: brandNameEn,
  },
  title: {
    ar: brandNameAr,
    en: brandNameEn,
  },
  titleTemplate: {
    ar: `${brandNameAr} - %s`,
    en: `${brandNameEn} - %s`,
  },
  description: {
    ar: "برنامج محاسبة ونقاط بيع وإدارة مخزون للسوبرماركت ومحلات التجزئة والعطور والصالونات النسائية والمقاولات في السعودية، مع تقارير لحظية وإدارة ضريبة القيمة المضافة.",
    en: "Accounting, POS, and inventory software for supermarkets, retail stores, perfume shops, women’s salons, and contractors in Saudi Arabia, with real-time reports and VAT management.",
  },
  footerDescription: {
    ar: "الأرام منصة لحلول الأعمال والمحاسبة مخصصة لعدة قطاعات مع تجربة سهلة وتقارير دقيقة لحظيًا.",
    en: "ALaram is a business solutions platform tailored for multiple industries, with ease of use, fast performance, and accurate real-time reporting.",
  },
  email: "info@alaram.net",
  phoneLocal: "055 123 4848",
  phoneIntl: "+966551234848",
  phoneIntlDisplay: "+966 55 123 4848",
  telHref: "tel:+966551234848",
  mailtoHref: "mailto:info@alaram.net",
  whatsapp: "https://wa.me/966551234848",
  facebook: "https://www.facebook.com/profile.php?id=61580792095638",
  serviceArea: {
    ar: "نقدم خدماتنا إلكترونيًا لعملائنا داخل السعودية",
    en: "We provide our services online to customers across Saudi Arabia",
  },
} as const;
