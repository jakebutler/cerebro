import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const seedPmLeaders = mutation({
  args: {
    leaders: v.array(
      v.object({
        name: v.string(),
        skills: v.string(),
        bio: v.string(),
        website: v.string(),
        blogs: v.array(v.string()),
        twitter: v.string(),
        linkedin: v.optional(v.string()),
        other_social: v.array(v.string()),
        podcast: v.optional(v.string()),
        needs_verification: v.array(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    for (const leader of args.leaders) {
      await ctx.db.insert("pm_leaders", leader);
    }
    return null;
  },
});
