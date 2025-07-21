import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  pmLeaders: defineTable({
    name: v.string(),
    skills: v.string(),
    bio: v.string(),
    website: v.string(),
    blogs: v.array(v.string()),
    twitter: v.union(v.string(), v.null()),
    linkedin: v.union(v.string(), v.null()),
    other_social: v.array(v.string()),
    podcast: v.union(v.string(), v.null()),
    needs_verification: v.array(v.string()),
    history: v.array(v.object({
      field: v.string(),
      previousValue: v.any(),
      newValue: v.any(),
      editedBy: v.string(),
      editedAt: v.number()
    }))
  }),
  
  suggestedEdits: defineTable({
    pmId: v.id("pmLeaders"),
    field: v.string(),
    suggestedValue: v.any(),
    suggestedBy: v.string(),
    suggestedAt: v.number(),
    status: v.string() // "pending", "approved", "rejected"
  })
});