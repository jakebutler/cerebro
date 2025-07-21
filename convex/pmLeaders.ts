import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

// Query to get all PM leaders
export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("pmLeaders").collect();
  },
});

// Query to get a PM leader by ID
export const getById = query({
  args: { id: v.id("pmLeaders") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Query to get leaders by search term
export const getBySearch = query({
  args: { searchTerm: v.string() },
  handler: async (ctx, args) => {
    const leaders = await ctx.db.query("pmLeaders").collect();
    const term = args.searchTerm.toLowerCase();
    
    return leaders.filter(leader => 
      leader.name.toLowerCase().includes(term) || 
      leader.skills.toLowerCase().includes(term) || 
      leader.bio.toLowerCase().includes(term)
    );
  },
});

// Query to get fields that need verification
export const getVerificationQueue = query({
  handler: async (ctx) => {
    const leaders = await ctx.db.query("pmLeaders").collect();
    
    return leaders.flatMap(leader => 
      leader.needs_verification.map(field => ({
        id: leader._id,
        name: leader.name,
        field,
        value: leader[field as keyof typeof leader]
      }))
    );
  },
});

// Mutation to add a new PM leader
export const add = mutation({
  args: {
    name: v.string(),
    skills: v.string(),
    bio: v.string(),
    website: v.string(),
    blogs: v.array(v.string()),
    twitter: v.union(v.string(), v.null()),
    linkedin: v.union(v.string(), v.null()),
    other_social: v.array(v.string()),
    podcast: v.union(v.string(), v.null()),
    needs_verification: v.array(v.string())
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("pmLeaders", {
      ...args,
      history: []
    });
  },
});

// Mutation to update a PM leader
export const update = mutation({
  args: {
    id: v.id("pmLeaders"),
    field: v.string(),
    value: v.any(),
    editor: v.string()
  },
  handler: async (ctx, args) => {
    const { id, field, value, editor } = args;
    const leader = await ctx.db.get(id);
    
    if (!leader) {
      throw new Error("PM Leader not found");
    }
    
    const previousValue = leader[field as keyof typeof leader];
    
    // Create history entry
    const historyEntry = {
      field,
      previousValue,
      newValue: value,
      editedBy: editor,
      editedAt: Date.now()
    };
    
    // Update the document
    await ctx.db.patch(id, {
      [field]: value,
      history: [...leader.history, historyEntry]
    });
    
    return await ctx.db.get(id);
  },
});

// Mutation to verify a field
export const verifyField = mutation({
  args: {
    id: v.id("pmLeaders"),
    field: v.string(),
    verifier: v.string()
  },
  handler: async (ctx, args) => {
    const { id, field, verifier } = args;
    const leader = await ctx.db.get(id);
    
    if (!leader) {
      throw new Error("PM Leader not found");
    }
    
    const needsVerification = leader.needs_verification.filter(f => f !== field);
    
    // Create history entry for verification
    const historyEntry = {
      field: `${field}_verification`,
      previousValue: "unverified",
      newValue: "verified",
      editedBy: verifier,
      editedAt: Date.now()
    };
    
    // Update the document
    await ctx.db.patch(id, {
      needs_verification: needsVerification,
      history: [...leader.history, historyEntry]
    });
    
    return await ctx.db.get(id);
  },
});