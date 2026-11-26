import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError } from "convex/values";
import type { QueryCtx, MutationCtx } from "./_generated/server";
import { mutation, query } from "./_generated/server";
import { customCtx, customMutation, customQuery } from "convex-helpers/server/customFunctions";

export async function requireAdmin(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new ConvexError("يلزم تسجيل الدخول");
  const userId = await getAuthUserId(ctx);
  const user = userId ? await ctx.db.get(userId) : null;
  if (
    !user?.email ||
    !process.env.ADMIN_EMAIL ||
    user.email.toLowerCase() !== process.env.ADMIN_EMAIL.toLowerCase()
  ) {
    throw new ConvexError("غير مصرح");
  }
  return user;
}

export const adminQuery = customQuery(
  query,
  customCtx(async (ctx) => ({ admin: await requireAdmin(ctx) }))
);
export const adminMutation = customMutation(
  mutation,
  customCtx(async (ctx) => ({ admin: await requireAdmin(ctx) }))
);
