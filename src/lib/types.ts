// Placeholder for the Id type until Convex generates it
export type ConvexId<Table extends string> = string & { __brand: Table };
export type Id<Table extends string> = ConvexId<Table>;

export interface PMLeader {
  _id: Id<"pmLeaders">;
  _creationTime: number;
  name: string;
  skills: string;
  bio: string;
  website: string;
  blogs: string[];
  twitter: string | null;
  linkedin: string | null;
  other_social: string[];
  podcast: string | null;
  needs_verification: string[];
  history: FieldHistory[];
}

export interface FieldHistory {
  field: string;
  previousValue: any;
  newValue: any;
  editedBy: string;
  editedAt: number;
}

export interface SuggestedEdit {
  _id: Id<"suggestedEdits">;
  _creationTime: number;
  pmId: Id<"pmLeaders">;
  field: string;
  suggestedValue: any;
  suggestedBy: string;
  suggestedAt: number;
  status: "pending" | "approved" | "rejected";
}

export interface VerificationQueueItem {
  id: Id<"pmLeaders">;
  name: string;
  field: string;
  value: any;
}