import { v, ConvexError } from "convex/values";
import { query } from "./_generated/server";
import { adminMutation, adminQuery } from "./authz";
import { packageDoc, packageFields, product } from "./validators";
import { packageInputSchema } from "../lib/admin/models";

export const listActive = query({
  args: { product },
  returns: v.array(packageDoc),
  handler: async (ctx, args) => {
    const rows = await ctx.db
      .query("packages")
      .withIndex("by_product_active", (q) => q.eq("product", args.product).eq("active", true))
      .take(100);
    return rows.sort((a, b) => a.sortOrder - b.sortOrder);
  },
});

export const getActive = query({
  args: { product, slug: v.string() },
  returns: v.union(packageDoc, v.null()),
  handler: async (ctx, args) => {
    const row = await ctx.db
      .query("packages")
      .withIndex("by_product_slug", (q) => q.eq("product", args.product).eq("slug", args.slug))
      .unique();
    return row?.active ? row : null;
  },
});

export const list = adminQuery({
  args: {},
  returns: v.array(packageDoc),
  handler: async (ctx) => {
    return (await ctx.db.query("packages").take(200)).sort(
      (a, b) => a.product.localeCompare(b.product) || a.sortOrder - b.sortOrder
    );
  },
});

export const save = adminMutation({
  args: { id: v.optional(v.id("packages")), data: v.object(packageFields) },
  returns: v.id("packages"),
  handler: async (ctx, args) => {
    const parsed = packageInputSchema.safeParse(args.data);
    if (!parsed.success) throw new ConvexError("راجع حقول الباقة والسعر");
    const data = parsed.data;
    const duplicate = await ctx.db
      .query("packages")
      .withIndex("by_product_slug", (q) => q.eq("product", data.product).eq("slug", data.slug))
      .unique();
    if (duplicate && duplicate._id !== args.id)
      throw new ConvexError("رمز الباقة مستخدم لهذا المنتج");
    let id = args.id;
    if (id) {
      const old = await ctx.db.get(id);
      if (!old) throw new ConvexError("الباقة غير موجودة");
      if (old.slug !== data.slug || old.product !== data.product)
        throw new ConvexError("رمز الباقة والمنتج ثابتان بعد الإنشاء");
      await ctx.db.patch(id, { ...data, updatedAt: Date.now() });
    } else {
      if ((await ctx.db.query("packages").take(200)).length >= 200)
        throw new ConvexError("وصلت إلى الحد الأقصى للباقات");
      id = await ctx.db.insert("packages", { ...data, updatedAt: Date.now() });
    }
    await ctx.db.insert("audit", {
      actor: ctx.admin.email!,
      action: args.id ? "package.updated" : "package.created",
      target: id,
      at: Date.now(),
    });
    return id;
  },
});

export const setActive = adminMutation({
  args: { id: v.id("packages"), active: v.boolean() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const row = await ctx.db.get(args.id);
    if (!row) throw new ConvexError("الباقة غير موجودة");
    await ctx.db.patch(args.id, { active: args.active, updatedAt: Date.now() });
    await ctx.db.insert("audit", {
      actor: ctx.admin.email!,
      action: args.active ? "package.activated" : "package.paused",
      target: args.id,
      at: Date.now(),
    });
    return null;
  },
});
