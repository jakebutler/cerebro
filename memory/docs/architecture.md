# System Architecture

## Stack Overview
- **Frontend:** Vite, TypeScript, React, shadcn-ui, TailwindCSS
- **Backend:** Convex.dev (real-time sync, persistent storage)

## Core Components
- **Profile Data Model:** Structured fields for each PM thought leader (bio, roles, achievements, links, etc.)
- **Verification Dashboard:** Central UI for reviewing/editing flagged data fields
- **Edit History & Audit Trail:** Tracks all changes, timestamps, and authors
- **Contributor Suggestion System:** Allows new entries and edits, subject to verification
- **Export/Import Module:** JSON, CSV, Convex sync

## Data Flow
### Current State
- **Frontend**: Ready for implementation (Vite + React + shadcn-ui)
- **Backend**: Convex schema implemented and deployed
- **Data Source**: PM leader profiles seeded from `documentation/pm-thought-leaders.json`

### Implemented Data Flow
```
JSON Data → Preprocessing → Convex Mutation → pm_leaders Table
↓
Convex Queries ← React Frontend (to be implemented)
↓
Real-time UI Updates
```

## Security & Permissions
- Role-based permissions for contributors, editors, and admins (future)

## Integration Points
- Convex API endpoints
- UI components for data entry, verification, and export/import

## Technical Constraints
- Must use Convex for backend
- Must support real-time collaboration
- UI must be responsive and accessible
