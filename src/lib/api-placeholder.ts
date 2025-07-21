import type { FunctionReference } from "convex/server";

// This is a temporary placeholder for the Convex API
// It will be replaced by the real API once Convex generates it

export const api = {
  pmLeaders: {
    getAll: {} as FunctionReference<"query">,
    getById: {} as FunctionReference<"query">,
    getBySearch: {} as FunctionReference<"query">,
    getVerificationQueue: {} as FunctionReference<"query">,
    add: {} as FunctionReference<"mutation">,
    update: {} as FunctionReference<"mutation">,
    verifyField: {} as FunctionReference<"mutation">
  },
  suggestedEdits: {
    getAll: {} as FunctionReference<"query">,
    getForLeader: {} as FunctionReference<"query">,
    suggest: {} as FunctionReference<"mutation">,
    approve: {} as FunctionReference<"mutation">,
    reject: {} as FunctionReference<"mutation">
  }
};