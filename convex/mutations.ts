import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const addPmLeader = mutation({
  args: {
    name: v.string(),
    skills: v.string(),
    bio: v.string(),
    website: v.string(),
    blogs: v.optional(v.array(v.string())),
    twitter: v.string(),
    linkedin: v.optional(v.string()),
    other_social: v.optional(v.array(v.string())),
    podcast: v.optional(v.string()),
    needs_verification: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    // Set default values for optional fields
    const newLeader = {
      name: args.name,
      skills: args.skills,
      bio: args.bio,
      website: args.website,
      blogs: args.blogs || [],
      twitter: args.twitter,
      linkedin: args.linkedin,
      other_social: args.other_social || [],
      podcast: args.podcast,
      needs_verification: args.needs_verification || [],
    };

    // Insert the new leader into the database
    const leaderId = await ctx.db.insert("pm_leaders", newLeader);
    
    return leaderId;
  },
});
