import { v } from "convex/values";

export const product = v.union(v.literal("lms"), v.literal("estimator"));
export const mode = v.union(v.literal("test"), v.literal("live"));
export const orderStatus = v.union(v.literal("pending"), v.literal("paid"), v.literal("failed"));
export const fulfillment = v.union(
  v.literal("unfulfilled"),
  v.literal("in_progress"),
  v.literal("fulfilled")
);
export const inquiryKind = v.union(v.literal("contact"), v.literal("demo"));
export const inquiryStatus = v.union(
  v.literal("new"),
  v.literal("in_progress"),
  v.literal("done"),
  v.literal("archived")
);
export const packageFields = {
  product,
  slug: v.string(),
  nameAr: v.string(),
  nameEn: v.string(),
  descriptionAr: v.string(),
  descriptionEn: v.string(),
  featuresAr: v.array(v.string()),
  featuresEn: v.array(v.string()),
  amountMinor: v.number(),
  interval: v.union(v.literal("once"), v.literal("month"), v.literal("year")),
  active: v.boolean(),
  featured: v.boolean(),
  sortOrder: v.number(),
};
export const inquiryFields = {
  submissionId: v.string(),
  kind: inquiryKind,
  name: v.string(),
  email: v.string(),
  phone: v.optional(v.string()),
  company: v.optional(v.string()),
  industry: v.optional(v.string()),
  message: v.string(),
  employeeCount: v.optional(v.string()),
  preferredDate: v.optional(v.string()),
  preferredTime: v.optional(v.string()),
  currentSolution: v.optional(v.string()),
  locale: v.union(v.literal("ar"), v.literal("en")),
};
export const orderFields = {
  orderId: v.string(),
  product,
  plan: v.string(),
  packageName: v.string(),
  amountMinor: v.number(),
  currency: v.literal("SAR"),
  mode,
  merchantId: v.string(),
  locale: v.union(v.literal("ar"), v.literal("en")),
  customerName: v.string(),
  customerEmail: v.string(),
  customerPhone: v.string(),
  createdAt: v.number(),
};
export const orderRecordFields = {
  ...orderFields,
  status: orderStatus,
  fulfillment,
  providerStatus: v.string(),
  chargeId: v.optional(v.string()),
  verifiedAt: v.optional(v.number()),
  notes: v.string(),
  searchText: v.string(),
};
export const inquiryRecordFields = {
  ...inquiryFields,
  status: inquiryStatus,
  notes: v.string(),
  notification: v.string(),
  updatedAt: v.number(),
  searchText: v.string(),
};
export const packageRecordFields = { ...packageFields, updatedAt: v.number() };
export const orderDoc = v.object({
  _id: v.id("orders"),
  _creationTime: v.number(),
  ...orderRecordFields,
});
export const inquiryDoc = v.object({
  _id: v.id("inquiries"),
  _creationTime: v.number(),
  ...inquiryRecordFields,
});
export const packageDoc = v.object({
  _id: v.id("packages"),
  _creationTime: v.number(),
  ...packageRecordFields,
});
