# Product Requirements Document (PRD)

## Product Name
**PM Atlas**

## Overview
PM Atlas is a web application that stores, displays, and verifies a structured dataset of influential people in software product management. The app allows contributors to view, edit, and verify detailed profile data. The app uses Convex.dev for backend and real-time sync, and is built with TypeScript.

---

## Goals

1. Store structured data on 100+ PM thought leaders.
2. Allow local and real-time viewing/editing via a web interface.
3. Highlight data fields requiring verification.
4. Provide a centralized dashboard to verify and edit flagged fields.
5. Track all edits and changes to fields with timestamp and author.
6. Allow contributors to suggest edits or add new people.
7. Support export/import via JSON, CSV, or Convex sync.

---

## Target Users

- Researchers studying thought leadership in product management.
- Builders creating relationship graphs or maps of PM influence.
- Internal editorial teams curating PM influencer lists.
- Developers maintaining curated data.

---

## Core Features

### 1. **Profile Viewer**
- View full structured profile: name, bio, skills, blog URLs, social handles, etc.
- Link out to original sources.
- Show warning icons for fields marked `needs_verification`.

### 2. **Inline Editing**
- Any field can be edited via simple form fields (e.g. text inputs, tag editors, URL inputs).
- Changes autosaved via Convex mutation functions.
- All changes tracked with user and timestamp.

### 3. **Verification Workflow**
- Dedicated “Needs Verification” dashboard.
  - Table view of all fields tagged `needs_verification`.
  - Filter by field type or person.
  - Mark as “Verified” or update the data directly.
  - Log verifier identity and timestamp.

### 4. **Search & Filter**
- Full-text search across all profiles.
- Filter by tags (e.g. podcast host, substack writer, X active).

### 5. **Add & Suggest**
- Add new people via full form.
- Suggest edits to existing fields.
- Suggested edits stored separately and can be approved/rejected by other users.
- (Full edit access may be granted in later roles/permissions work.)

### 6. **Import/Export**
- Import JSON or CSV file to update or seed the database.
- Export data in JSON or CSV format.
- Paste/copy JSON in a field-level modal for power users.
- Convex-native syncing supported.

---

## Data Model (Convex)

```ts
// convex/schema.ts
export type PMLeader = {
  id: string;
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
  history: FieldHistory[]; // edit tracking
};

export type FieldHistory = {
  field: keyof PMLeader;
  previousValue: any;
  newValue: any;
  editedBy: string;
  editedAt: number;
};

export type SuggestedEdit = {
  id: string;
  pmId: string;
  field: keyof PMLeader;
  suggestedValue: any;
  suggestedBy: string;
  suggestedAt: number;
  status: "pending" | "approved" | "rejected";
};