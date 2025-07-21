# Test Implementation Plan

This document outlines the automated testing strategy for the PM Atlas application.

## 1. Selected Test Framework and Libraries

- **Test Runner:** [Vitest](https://vitest.dev/) - A fast and modern test framework for Vite projects.
- **UI Testing Library:** [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - For testing React components from a user's perspective.
- **Backend Testing:** Convex's built-in testing utilities.

## 2. Test Cases

### Backend (`convex/`)

- **`pmLeaders.ts`**
  - `get`: Test that it retrieves a list of PM leaders.
  - `getById`: Test that it retrieves a single PM leader by ID.
  - `add`: Test that it adds a new PM leader.
  - `update`: Test that it updates an existing PM leader.
- **`suggestedEdits.ts`**
  - `get`: Test that it retrieves a list of suggested edits.
  - `add`: Test that it adds a new suggested edit.
  - `approve`: Test that it approves a suggested edit and updates the corresponding PM leader.
  - `reject`: Test that it rejects a suggested edit.
- **`seed.ts`**
  - `seedDatabase`: Test that it successfully seeds the database with initial data.

### Frontend (`src/`)

- **`App.tsx`**
  - Test that the correct page component is rendered for each route.
- **`components/Layout.tsx`**
  - Test that the layout component renders its children.
- **`pages/Home.tsx`**
  - Test that it displays a list of PM leaders.
  - Test that it filters the list of PM leaders based on user input.
- **`pages/ProfileDetail.tsx`**
  - Test that it displays the details of a specific PM leader.
  - Test that it allows users to suggest edits.
- **`pages/VerificationDashboard.tsx`**
  - Test that it displays a list of unverified PM leaders.
  - Test that it allows users to verify PM leaders.
- **`pages/SuggestedEdits.tsx`**
  - Test that it displays a list of suggested edits.
  - Test that it allows users to approve or reject edits.
- **`pages/AddPerson.tsx`**
  - Test that it allows users to add a new PM leader.
- **`lib/api-placeholder.ts`**
  - Test that the placeholder functions return the expected data.

## 3. Project Plan

The testing effort is divided into two parallel work streams:

### Work Stream 1: Backend Testing

**Assigned to:** Engineer A

**Tasks:**
1.  Set up Vitest and Convex test utilities.
2.  Write unit tests for `convex/pmLeaders.ts`.
3.  Write unit tests for `convex/suggestedEdits.ts`.
4.  Write unit tests for `convex/seed.ts`.

### Work Stream 2: Frontend Testing

**Assigned to:** Engineer B

**Tasks:**
1.  Set up Vitest and React Testing Library.
2.  Write unit tests for `src/components/Layout.tsx`.
3.  Write integration tests for `src/pages/Home.tsx`.
4.  Write integration tests for `src/pages/ProfileDetail.tsx`.
5.  Write integration tests for `src/pages/VerificationDashboard.tsx`.
6.  Write integration tests for `src/pages/SuggestedEdits.tsx`.
7.  Write integration tests for `src/pages/AddPerson.tsx`.
8.  Write tests for `src/lib/api-placeholder.ts`.
9.  Write tests for `src/App.tsx` routing.
