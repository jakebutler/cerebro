# Project Plan – Cerebro
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

## Phase 3: UI Enhancement - Core Framework
- [ ] Install and set up shadcn-ui dependencies
- [ ] Update tailwind.config.js to match Cerebro Insight Nexus configuration
- [ ] Implement responsive layout with sidebar, header, and overall page structure

## Phase 4: UI Enhancement - Home Page
- [ ] Create hero section with title and tagline
- [ ] Implement search component with real-time filtering
- [ ] Create grid layout for displaying leader cards
- [ ] Implement LeaderCard component
- [ ] Add "Add Leader" modal

## Phase 5: UI Enhancement - Profile Detail Page
- [ ] Redesign profile layout with improved styling
- [ ] Implement bio section with proper layout
- [ ] Improve social links display with proper styling
- [ ] Update verification status indicators
- [ ] Enhance edit controls with more intuitive UI

## Phase 6: UI Enhancement - Admin Pages
- [ ] Redesign verification dashboard with improved styling
- [ ] Add filter controls for verification status
- [ ] Update the design system page to use shadcn-ui components

## Phase 7: Integration and Testing
- [ ] Ensure variable names match between components and data structure
- [ ] Ensure all UI components work with Convex data structure
- [ ] Add loading indicators and states for data fetching
- [ ] Test application across different browsers and devices

## Phase 8: Suggestions System
- [ ] Create `SuggestedEdit` schema
- [ ] Implement `suggestEdit` mutation
- [ ] Approve/reject workflow with status
- [ ] `/suggested-edits` dashboard

## Phase 9: Import / Export
- [ ] File uploader UI (JSON, CSV)
- [ ] Parser + conversion logic
- [ ] Export as downloadable JSON/CSV
- [ ] Copy/paste JSON modal per profile

## Stretch Phase (v1.5+)
- [ ] GitHub login for contributor identity
- [ ] Role-based editing permissions
- [ ] Relationship graph visualization
- [ ] AI-assisted verification (OpenAI API integration)