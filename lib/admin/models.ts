import { z } from "zod";

export const productSchema = z.enum(["lms", "estimator"]);
export const packageInputSchema = z.object({
  product: productSchema,
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .max(40),
  nameAr: z.string().trim().min(2).max(120),
  nameEn: z.string().trim().min(2).max(120),
  descriptionAr: z.string().trim().max(1000),
  descriptionEn: z.string().trim().max(1000),
  featuresAr: z.array(z.string().trim().min(1).max(300)).max(30),
  featuresEn: z.array(z.string().trim().min(1).max(300)).max(30),
  amountMinor: z.number().int().min(100).max(100_000_000),
  interval: z.enum(["once", "month", "year"]),
  active: z.boolean(),
  featured: z.boolean(),
  sortOrder: z.number().int().min(0).max(1000),
});
export type StorePackage = z.infer<typeof packageInputSchema>;
export type Product = StorePackage["product"];

export const productNames = {
  lms: { ar: "منصة الدورات التدريبية", en: "ALaram LMS" },
  estimator: { ar: "مُقدّر التكلفة", en: "Cost Estimator" },
};
export const intervalNames = {
  once: { ar: "دفعة واحدة", en: "One-time payment" },
  month: { ar: "عن شهر واحد · تجديد يدوي", en: "One month · manual renewal" },
  year: { ar: "عن 12 شهرًا · تجديد يدوي", en: "12 months · manual renewal" },
};
export const inquiryStatusLabels = {
  new: "جديد",
  in_progress: "قيد المتابعة",
  done: "مكتمل",
  archived: "مؤرشف",
};
export const orderStatusLabels = { pending: "بانتظار الدفع", paid: "مدفوع", failed: "غير مكتمل" };
export const fulfillmentLabels = {
  unfulfilled: "بانتظار التسليم",
  in_progress: "جارٍ التنفيذ",
  fulfilled: "تم التسليم",
};

export function formatMoney(amountMinor: number) {
  return new Intl.NumberFormat("ar-SA-u-nu-latn", { style: "currency", currency: "SAR" }).format(
    amountMinor / 100
  );
}
