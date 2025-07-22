import { query } from "./_generated/server";
import { v } from "convex/values";

export const getAllPmLeaders = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("pm_leaders").collect();
  },
});

export const getPmLeaderById = query({
  args: { id: v.id("pm_leaders") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});
