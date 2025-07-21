---

### ✅ `project-plan.md` — **Execution Plan**

```markdown
# Project Plan – PM Atlas

## Phase 1: Project Setup
- [ ] Initialize TypeScript + Vite project
- [ ] Set up TailwindCSS
- [ ] Install Convex + CLI
- [ ] Create Convex schema
- [ ] Set up local environment with `.env` and keys

## Phase 2: Core Backend
- [ ] Define `PMLeader` and `FieldHistory` schemas
- [ ] Implement `addPMLeader` mutation
- [ ] Implement `updatePMLeader` with history tracking
- [ ] Implement `verifyField` mutation
- [ ] Implement `getAllLeaders`, `getLeaderById` queries
- [ ] Implement `getVerificationQueue` query

## Phase 3: Profile UI
- [ ] Create home page with search + table view
- [ ] Build profile detail page with editable fields
- [ ] Inline validation and autosave to Convex
- [ ] Verification icons and inline verifier

## Phase 4: Verification System
- [ ] Build `/verify` dashboard
- [ ] Filter by field, user, or type
- [ ] Update + mark verified inline
- [ ] Log history + verifier

## Phase 5: Suggestions System
- [ ] Create `SuggestedEdit` schema
- [ ] Implement `suggestEdit` mutation
- [ ] Approve/reject workflow with status
- [ ] `/suggested-edits` dashboard

## Phase 6: Add Person Form
- [ ] Form UI for new entry
- [ ] Client-side validation
- [ ] Submit to Convex `addPMLeader`

## Phase 7: Import / Export
- [ ] File uploader UI (JSON, CSV)
- [ ] Parser + conversion logic
- [ ] Export as downloadable JSON/CSV
- [ ] Copy/paste JSON modal per profile

## Phase 8: Finishing Touches
- [ ] Layout polish + theming
- [ ] Field tooltips, hints, and icons
- [ ] Add loading, error, and empty states

## Stretch Phase (v1.5+)
- [ ] GitHub login for contributor identity
- [ ] Role-based editing permissions
- [ ] Relationship graph visualization
- [ ] AI-assisted verification (OpenAI API integration)