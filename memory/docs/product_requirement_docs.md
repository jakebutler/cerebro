# Product Requirements Document (PRD)

## Product Name
**Cerebro**
## Overview
Cerebro is a web application that stores, displays, and verifies a structured dataset of influential people in software product management. The app allows contributors to view, edit, and verify detailed profile data. The app uses Convex.dev for backend and real-time sync, and is built with Vite, TypeScript, React, shadcn-ui, and TailwindCSS.

---

## Goals

1. Store structured data on 100+ PM thought leaders.
2. Allow local and real-time viewing/editing via a modern, intuitive web interface.
3. Highlight data fields requiring verification.
4. Provide a centralized dashboard to verify and edit flagged fields.
5. Track all edits and changes to fields with timestamp and author.
6. Allow contributors to suggest edits or add new people.
7. Support export/import via JSON, CSV, or Convex sync.
8. Deliver a polished, user-friendly experience matching the Cerebro Insight Nexus design.

---

## Target Users

- Researchers studying thought leadership in product management.
- Builders creating relationship graphs or maps of PM influence.
- Internal editorial teams curating PM influencer lists.
- Developers maintaining curated data.

---

## Technology Stack

- **Frontend**: React, TypeScript, Vite
- **UI Framework**: shadcn-ui, TailwindCSS
- **Backend**: Convex.dev for database and real-time sync
- **Deployment**: Standard web hosting (TBD)
---

## Core Features

### 1. **Home Page**
- Modern hero section with application title and description
- Intuitive search functionality with real-time filtering
- Visually appealing grid layout of PM leader cards
- Easy-to-use "Add Leader" functionality via modal

### 2. **Profile Viewer**
- Clean, well-organized display of leader information
- View full structured profile: name, bio, skills, blog URLs, social handles, etc.
- Link out to original sources.
- Clear visual indicators for fields marked `needs_verification`.
- Consistent design language across all profile elements

### 3. **Inline Editing**
- Any field can be edited via simple form fields (e.g. text inputs, tag editors, URL inputs).
- Changes autosaved via Convex mutation functions.
- All changes tracked with user and timestamp.
- Intuitive edit controls with clear feedback

### 4. **Verification Workflow**
- Dedicated "Needs Verification" dashboard with modern styling.
  - Table view of all fields tagged `needs_verification`.
  - Filter by field type or person.
  - Mark as "Verified" or update the data directly.
  - Log verifier identity and timestamp.

### 5. **Search & Filter**
- Full-text search across all profiles with instant results.
- Filter by tags (e.g. podcast host, substack writer, X active).
- Responsive design for all screen sizes

### 6. **Add & Suggest**
- Add new people via full form with validation.
- Suggest edits to existing fields.
- Suggested edits stored separately and can be approved/rejected by other users.
- (Full edit access may be granted in later roles/permissions work.)

### 7. **Import/Export**
- Import JSON or CSV file to update or seed the database.
- Export data in JSON or CSV format.
- Paste/copy JSON in a field-level modal for power users.
- Convex-native syncing supported.

### 8. **Design System**
- Interactive design system page to showcase and test UI components
- Ability to adjust design tokens like colors and typography
- Consistent component library based on shadcn-ui

---

## Data Model (Convex)

```ts
// convex/schema.ts
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
```

---

## UI/UX Requirements

1. **Modern Design Language**
   - Use shadcn-ui components for a consistent, modern look and feel
   - Follow the design patterns established in Cerebro Insight Nexus
   - Implement a responsive design that works well on desktop and mobile devices

2. **User Experience**
   - Provide clear visual feedback for all user actions
   - Implement intuitive navigation and controls
   - Ensure accessible design with proper contrast and text alternatives
   - Include loading states and error handling

3. **Performance**
   - Optimize for fast initial load time
   - Implement efficient real-time updates with Convex
   - Ensure smooth interactions with no UI lag

4. **Consistency**
   - Maintain consistent spacing, typography, and color usage
   - Ensure all components follow the same visual language
   - Use standard patterns for common interactions
