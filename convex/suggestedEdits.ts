import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all suggested edits
export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("suggestedEdits").collect();
  },
});

// Get suggested edits for a specific PM leader
export const getForLeader = query({
  args: { pmId: v.id("pmLeaders") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("suggestedEdits")
      .filter((q) => q.eq(q.field("pmId"), args.pmId))
      .collect();
  },
});

// Suggest an edit for a PM leader
export const suggest = mutation({
  args: {
    pmId: v.id("pmLeaders"),
    field: v.string(),
    value: v.any(),
    suggestedBy: v.string(),
  },
  handler: async (ctx, args) => {
    const { pmId, field, value, suggestedBy } = args;
    
    // Verify that the PM leader exists
    const leader = await ctx.db.get(pmId);
    if (!leader) {
      throw new Error("PM Leader not found");
    }
    
    // Create a new suggested edit
    return await ctx.db.insert("suggestedEdits", {
      pmId,
      field,
      suggestedValue: value,
      suggestedBy,
      suggestedAt: Date.now(),
      status: "pending"
    });
  },
});

// Approve a suggested edit
export const approve = mutation({
  args: {
    id: v.id("suggestedEdits"),
    approvedBy: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, approvedBy } = args;
    
    // Get the suggested edit
    const edit = await ctx.db.get(id);
    if (!edit) {
      throw new Error("Suggested edit not found");
    }
    
    // Update the PM leader with the suggested value
    const leader = await ctx.db.get(edit.pmId);
    if (!leader) {
      throw new Error("PM Leader not found");
    }
    
    // Create a history entry for the change
    const historyEntry = {
      field: edit.field,
      previousValue: leader[edit.field as keyof typeof leader],
      newValue: edit.suggestedValue,
      editedBy: `${edit.suggestedBy} (approved by ${approvedBy})`,
      editedAt: Date.now()
    };
    
    // Update the PM leader
    await ctx.db.patch(edit.pmId, {
      [edit.field]: edit.suggestedValue,
      history: [...leader.history, historyEntry]
    });
    
    // Update the suggested edit status
    await ctx.db.patch(id, {
      status: "approved"
    });
    
    return { success: true };
  },
});

// Reject a suggested edit
export const reject = mutation({
  args: {
    id: v.id("suggestedEdits"),
    rejectedBy: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, rejectedBy } = args;
    
    // Get the suggested edit
    const edit = await ctx.db.get(id);
    if (!edit) {
      throw new Error("Suggested edit not found");
    }
    
    // Update the suggested edit status
    await ctx.db.patch(id, {
      status: "rejected"
    });
    
    return { success: true };
  },
});