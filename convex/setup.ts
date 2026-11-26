import { createAccount, retrieveAccount } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { internalAction, internalMutation } from "./_generated/server";
import { packageFields } from "./validators";
import { packageInputSchema } from "../lib/admin/models";

export const seedPackages = internalMutation({
  args: { packages: v.array(v.object(packageFields)) },
  returns: v.number(),
  handler: async (ctx, args) => {
    let created = 0;
    for (const input of args.packages) {
      const item = packageInputSchema.parse(input);
      const old = await ctx.db
        .query("packages")
        .withIndex("by_product_slug", (q) => q.eq("product", item.product).eq("slug", item.slug))
        .unique();
      if (!old) {
        await ctx.db.insert("packages", { ...item, updatedAt: Date.now() });
        created++;
      }
    }
    return created;
  },
});

// This action is internal: it can only be invoked by the deployment owner.
// The initial password is read from deployment secrets, never from public args.
export const bootstrapAdmin = internalAction({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_INITIAL_PASSWORD;
    if (!email || !password || password.length < 16)
      throw new Error("Admin setup secrets are missing");
    let exists = false;
    try {
      exists = Boolean(
        await retrieveAccount(ctx, { provider: "password", account: { id: email } })
      );
    } catch {
      /* Account has not been created yet. */
    }
    if (!exists)
      await createAccount(ctx, {
        provider: "password",
        account: { id: email, secret: password },
        profile: { email, name: "مدير الأرام" },
      });
    return null;
  },
});
