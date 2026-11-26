import { v, ConvexError } from "convex/values";
import { internalMutation, internalQuery } from "./_generated/server";
import { inquiryDoc, inquiryFields, orderDoc, orderFields, orderStatus } from "./validators";
import { inquiriesAggregate, ordersAggregate } from "./aggregates";

export const createOrder = internalMutation({
  args: orderFields,
  returns: orderDoc,
  handler: async (ctx, args) => {
    const old = await ctx.db
      .query("orders")
      .withIndex("by_orderId", (q) => q.eq("orderId", args.orderId))
      .unique();
    if (old) {
      if (
        old.amountMinor !== args.amountMinor ||
        old.product !== args.product ||
        old.plan !== args.plan ||
        old.mode !== args.mode ||
        old.merchantId !== args.merchantId
      )
        throw new ConvexError("Order mismatch");
      return old;
    }
    const id = await ctx.db.insert("orders", {
      ...args,
      status: "pending",
      fulfillment: "unfulfilled",
      providerStatus: "CREATED",
      notes: "",
      searchText: `${args.orderId} ${args.customerName} ${args.customerEmail} ${args.packageName}`,
    });
    const doc = (await ctx.db.get(id))!;
    await ordersAggregate.insert(ctx, doc);
    return doc;
  },
});

export const getOrder = internalQuery({
  args: { orderId: v.string() },
  returns: v.union(orderDoc, v.null()),
  handler: (ctx, args) =>
    ctx.db
      .query("orders")
      .withIndex("by_orderId", (q) => q.eq("orderId", args.orderId))
      .unique(),
});

export const setOrderState = internalMutation({
  args: {
    orderId: v.string(),
    chargeId: v.string(),
    status: orderStatus,
    providerStatus: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const old = await ctx.db
      .query("orders")
      .withIndex("by_orderId", (q) => q.eq("orderId", args.orderId))
      .unique();
    if (!old) throw new ConvexError("Order not found");
    if (old.chargeId && old.chargeId !== args.chargeId) throw new ConvexError("Charge mismatch");
    const existingEvent = await ctx.db
      .query("purchaseEvents")
      .withIndex("by_chargeId_providerStatus", (q) =>
        q.eq("chargeId", args.chargeId).eq("providerStatus", args.providerStatus)
      )
      .unique();
    if (!existingEvent)
      await ctx.db.insert("purchaseEvents", {
        orderId: args.orderId,
        chargeId: args.chargeId,
        providerStatus: args.providerStatus,
        verifiedAt: Date.now(),
      });
    if (old.status === "paid" && args.status !== "paid") return null;
    await ctx.db.patch(old._id, {
      chargeId: args.chargeId,
      status: args.status,
      providerStatus: args.providerStatus,
      verifiedAt: Date.now(),
      searchText: `${old.orderId} ${args.chargeId} ${old.customerName} ${old.customerEmail} ${old.packageName}`,
    });
    await ordersAggregate.replace(ctx, old, (await ctx.db.get(old._id))!);
    return null;
  },
});

export const createInquiry = internalMutation({
  args: inquiryFields,
  returns: inquiryDoc,
  handler: async (ctx, args) => {
    const old = await ctx.db
      .query("inquiries")
      .withIndex("by_submissionId", (q) => q.eq("submissionId", args.submissionId))
      .unique();
    if (old) return old;
    const id = await ctx.db.insert("inquiries", {
      ...args,
      status: "new",
      notes: "",
      notification: args.kind === "demo" ? "pending" : "not_requested",
      updatedAt: Date.now(),
      searchText: `${args.name} ${args.email} ${args.company || ""} ${args.message}`,
    });
    const doc = (await ctx.db.get(id))!;
    await inquiriesAggregate.insert(ctx, doc);
    return doc;
  },
});

export const notification = internalMutation({
  args: { submissionId: v.string(), status: v.union(v.literal("sent"), v.literal("failed")) },
  returns: v.null(),
  handler: async (ctx, args) => {
    const doc = await ctx.db
      .query("inquiries")
      .withIndex("by_submissionId", (q) => q.eq("submissionId", args.submissionId))
      .unique();
    if (doc && doc.notification !== "sent") {
      await ctx.db.patch(doc._id, { notification: args.status });
      await inquiriesAggregate.replace(ctx, doc, (await ctx.db.get(doc._id))!);
    }
    return null;
  },
});
