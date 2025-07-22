# Technical Details

## Stack
- **Frontend:** Vite, TypeScript, React, shadcn-ui, TailwindCSS
- **Backend:** Convex.dev

## Frontend Implementation

### Setup
- **Status**: MVP Complete - Basic functionality working
- **Stack**: Vite + React + TypeScript (shadcn-ui + TailwindCSS planned for enhancement)
- **Styling**: Custom CSS (TailwindCSS temporarily removed due to PostCSS plugin conflicts)
- **Components**: Basic React components, shadcn-ui integration planned
- **Port**: Running on http://localhost:5177

### Current Features
- PM Leaders grid display with responsive layout
- Leader cards with name, skills, bio, social links, blogs
- Verification status indicators
- Real-time Convex data integration
- Loading states and error handling

### Next Implementation Phase
- Search/filter functionality
- Add Leader modal/form
- Hero section with modern design
- Reintroduce TailwindCSS/shadcn-ui for enhanced styling

## Backend Implementation

### Convex Setup
- **Status**: Complete - Backend initialized and seeded
- **Database**: Convex.dev for real-time sync and backend logic
- **Deployment**: `tame-terrier-184.convex.cloud` (dev environment)
- **Schema**: Implemented `pm_leaders` table with full PM leader data model
- **Authentication**: TBD (may use Convex Auth or external provider)

### Convex Schema
```typescript
// convex/schema.ts
pm_leaders: defineTable({
  name: v.string(),
  skills: v.string(),
  bio: v.string(),
  website: v.string(),
  blogs: v.array(v.string()),
  twitter: v.string(),
  linkedin: v.optional(v.string()), // allows undefined
  other_social: v.array(v.string()),
  podcast: v.optional(v.string()), // allows undefined
  needs_verification: v.array(v.string()),
})
```

### Data Seeding
- **Source**: `documentation/pm-thought-leaders.json`
- **Implementation**: `convex/seed_pm_leaders.ts` with `seedPmLeaders` mutation
- **Script**: `scripts/seed_pm_leaders.ts` for one-time data import
- **Status**: Complete - 11 PM leaders successfully imported

### Key Convex Learnings
1. **Function Naming**: Convex requires fully qualified names for client calls (e.g., `seed_pm_leaders:seedPmLeaders`)
2. **Validators**: `v.optional(v.string())` accepts `undefined` but NOT `null` - preprocessing required
3. **File Structure**: Public functions must be in root of `convex/` directory, not in subdirectories
4. **Dev Server**: Must restart after adding new function files for proper registration

## Patterns & Practices
- Use React functional components and hooks
- State management via Convex and React context/hooks
- UI built with shadcn-ui and styled with TailwindCSS
- All data changes routed through Convex mutations
- Use TypeScript for type safety throughout
- Follow accessibility best practices (WCAG)

## Libraries
- React, React Router, shadcn-ui, TailwindCSS, Convex client

## Constraints
- No direct database access from frontend
- All persistent state via Convex
- No hardcoded secrets in codebase
- Use .env or Convex environment for secrets

## Testing
- Prefer Jest/React Testing Library for unit tests
- E2E tests via Playwright or Cypress (future)

## Deployment
- Vercel/Netlify or similar for frontend
- Convex Cloud for backend
