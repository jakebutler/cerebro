import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  pm_leaders: defineTable({
    name: v.string(),
    skills: v.string(),
    bio: v.string(),
    website: v.string(),
    blogs: v.array(v.string()),
    twitter: v.string(),
    linkedin: v.optional(v.string()), // string | undefined | null
    other_social: v.array(v.string()),
    podcast: v.optional(v.string()), // string | undefined | null
    needs_verification: v.array(v.string()),
  })
});
