import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { inquiryRecordFields, orderRecordFields, packageRecordFields } from "./validators";

export default defineSchema({
  ...authTables,
  packages: defineTable(packageRecordFields)
    .index("by_product_slug", ["product", "slug"])
    .index("by_product_active", ["product", "active"]),
  orders: defineTable(orderRecordFields)
    .index("by_orderId", ["orderId"])
    .index("by_chargeId", ["chargeId"])
    .index("by_mode_status", ["mode", "status"])
    .index("by_status", ["status"])
    .searchIndex("search_orders", { searchField: "searchText", filterFields: ["mode", "status"] }),
  inquiries: defineTable(inquiryRecordFields)
    .index("by_submissionId", ["submissionId"])
    .index("by_kind_status", ["kind", "status"])
    .searchIndex("search_inquiries", {
      searchField: "searchText",
      filterFields: ["kind", "status"],
    }),
  purchaseEvents: defineTable({
    orderId: v.string(),
    chargeId: v.string(),
    providerStatus: v.string(),
    verifiedAt: v.number(),
  })
    .index("by_orderId", ["orderId"])
    .index("by_chargeId_providerStatus", ["chargeId", "providerStatus"]),
  audit: defineTable({ actor: v.string(), action: v.string(), target: v.string(), at: v.number() }),
});
