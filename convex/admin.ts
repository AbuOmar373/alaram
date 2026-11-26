import { v, ConvexError } from "convex/values";
import { paginationOptsValidator } from "convex/server";
import { adminMutation, adminQuery } from "./authz";
import {
  fulfillment,
  inquiryDoc,
  inquiryKind,
  inquiryStatus,
  mode,
  orderDoc,
  orderStatus,
} from "./validators";
import { inquiriesAggregate, ordersAggregate } from "./aggregates";

export const me = adminQuery({
  args: {},
  returns: v.object({ email: v.string(), name: v.string() }),
  handler: async (ctx) => ({ email: ctx.admin.email!, name: ctx.admin.name || "مدير الأرام" }),
});

export const summary = adminQuery({
  args: {},
  returns: v.object({
    revenueMinor: v.number(),
    paid: v.number(),
    pending: v.number(),
    testPayments: v.number(),
    newMessages: v.number(),
    newRequests: v.number(),
  }),
  handler: async (ctx) => {
    const [revenueMinor, paid, pending, testPayments, newMessages, newRequests] = await Promise.all(
      [
        ordersAggregate.sum(ctx, { bounds: { prefix: ["live", "paid"] } }),
        ordersAggregate.count(ctx, { bounds: { prefix: ["live", "paid"] } }),
        ordersAggregate.count(ctx, { bounds: { prefix: ["live", "pending"] } }),
        ordersAggregate.count(ctx, { bounds: { prefix: ["test"] } }),
        inquiriesAggregate.count(ctx, { bounds: { prefix: ["contact", "new"] } }),
        inquiriesAggregate.count(ctx, { bounds: { prefix: ["demo", "new"] } }),
      ]
    );
    return { revenueMinor, paid, pending, testPayments, newMessages, newRequests };
  },
});

export const orders = adminQuery({
  args: {
    paginationOpts: paginationOptsValidator,
    mode: v.optional(mode),
    status: v.optional(orderStatus),
    search: v.optional(v.string()),
  },
  returns: v.object({ page: v.array(orderDoc), continueCursor: v.string(), isDone: v.boolean() }),
  handler: async (ctx, args) => {
    if ((args.search?.length ?? 0) > 120) throw new ConvexError("عبارة البحث طويلة");
    const base = ctx.db.query("orders");
    const result = args.search?.trim()
      ? await base
          .withSearchIndex("search_orders", (q) => {
            const s = q.search("searchText", args.search!.trim());
            if (args.mode && args.status) return s.eq("mode", args.mode).eq("status", args.status);
            if (args.mode) return s.eq("mode", args.mode);
            if (args.status) return s.eq("status", args.status);
            return s;
          })
          .paginate(args.paginationOpts)
      : args.mode
        ? await base
            .withIndex("by_mode_status", (q) =>
              args.status
                ? q.eq("mode", args.mode!).eq("status", args.status)
                : q.eq("mode", args.mode!)
            )
            .order("desc")
            .paginate(args.paginationOpts)
        : args.status
          ? await base
              .withIndex("by_status", (q) => q.eq("status", args.status!))
              .order("desc")
              .paginate(args.paginationOpts)
          : await base.order("desc").paginate(args.paginationOpts);
    return { page: result.page, continueCursor: result.continueCursor, isDone: result.isDone };
  },
});

export const inquiries = adminQuery({
  args: {
    kind: inquiryKind,
    status: v.optional(inquiryStatus),
    search: v.optional(v.string()),
    paginationOpts: paginationOptsValidator,
  },
  returns: v.object({ page: v.array(inquiryDoc), continueCursor: v.string(), isDone: v.boolean() }),
  handler: async (ctx, args) => {
    if ((args.search?.length ?? 0) > 120) throw new ConvexError("عبارة البحث طويلة");
    const base = ctx.db.query("inquiries");
    const result = args.search?.trim()
      ? await base
          .withSearchIndex("search_inquiries", (q) => {
            const s = q.search("searchText", args.search!.trim()).eq("kind", args.kind);
            return args.status ? s.eq("status", args.status) : s;
          })
          .paginate(args.paginationOpts)
      : await base
          .withIndex("by_kind_status", (q) =>
            args.status
              ? q.eq("kind", args.kind).eq("status", args.status)
              : q.eq("kind", args.kind)
          )
          .order("desc")
          .paginate(args.paginationOpts);
    return { page: result.page, continueCursor: result.continueCursor, isDone: result.isDone };
  },
});

export const updateInquiry = adminMutation({
  args: { id: v.id("inquiries"), status: inquiryStatus, notes: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    if (args.notes.length > 5000) throw new ConvexError("الملاحظات طويلة");
    const old = await ctx.db.get(args.id);
    if (!old) throw new ConvexError("الرسالة غير موجودة");
    await ctx.db.patch(args.id, {
      status: args.status,
      notes: args.notes.trim(),
      updatedAt: Date.now(),
    });
    await inquiriesAggregate.replace(ctx, old, (await ctx.db.get(args.id))!);
    await ctx.db.insert("audit", {
      actor: ctx.admin.email!,
      action: "inquiry.updated",
      target: args.id,
      at: Date.now(),
    });
    return null;
  },
});

export const updateOrder = adminMutation({
  args: { id: v.id("orders"), fulfillment, notes: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    if (args.notes.length > 5000) throw new ConvexError("الملاحظات طويلة");
    const old = await ctx.db.get(args.id);
    if (!old) throw new ConvexError("الطلب غير موجود");
    if (args.fulfillment !== "unfulfilled" && (old.status !== "paid" || old.mode !== "live"))
      throw new ConvexError("التسليم مخصص للمدفوعات الفعلية المؤكدة فقط");
    await ctx.db.patch(args.id, { fulfillment: args.fulfillment, notes: args.notes.trim() });
    await ordersAggregate.replace(ctx, old, (await ctx.db.get(args.id))!);
    await ctx.db.insert("audit", {
      actor: ctx.admin.email!,
      action: "order.updated",
      target: args.id,
      at: Date.now(),
    });
    return null;
  },
});
