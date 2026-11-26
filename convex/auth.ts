import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import { ConvexError } from "convex/values";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password({
      profile(params) {
        const email = String(params.email ?? "")
          .trim()
          .toLowerCase();
        // Accounts are provisioned through an internal owner-only setup action.
        // No public sign-up, reset, or alternative flow can create an administrator.
        if (
          params.flow !== "signIn" ||
          !process.env.ADMIN_EMAIL ||
          email !== process.env.ADMIN_EMAIL.toLowerCase()
        ) {
          throw new ConvexError("بيانات الدخول غير صحيحة");
        }
        return { email };
      },
    }),
  ],
  session: { totalDurationMs: 8 * 60 * 60 * 1000, inactiveDurationMs: 2 * 60 * 60 * 1000 },
});
