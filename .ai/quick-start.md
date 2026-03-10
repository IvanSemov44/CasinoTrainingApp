# Quick Start for AI Assistants

Updated: 2026-03-10
Owner: @ivans

## Goal
Get enough project context in under 5 minutes to make safe, pattern-aligned code changes.

## Read in This Order
1. `.ai/README.md`
2. `.ai/workflows/adding-feature.md`
3. `.ai/workflows/testing-strategy.md`
4. `.ai/workflows/deployment.md` (for Expo/release changes)
5. `.ai/workflows/troubleshooting.md`
6. `.ai/reference/common-mistakes.md`

## Module Read Order (State + Storage Work)
1. `.ai/frontend/redux.md`
2. `.ai/frontend/type-safety.md`
3. `.ai/frontend/hooks.md`

## Hard Rules
- Redux Toolkit slices manage feature state (train progress, settings, chip stacks).
- AsyncThunk for async operations (persisting to AsyncStorage, if needed).
- Selectors use `createSelector` for derived state.
- Keep components focused on rendering; pull state via custom hooks.
- Use TypeScript strictly; no `any` types in features.
- Local feature folders follow: component, hooks, types, store (slice/thunks).
- AsyncStorage for local persistence; schema migrations in storage.service.ts.

## Before You Code
- Confirm the target pattern from real references in `.ai/workflows/adding-feature.md`.
- Scan `.ai/reference/common-mistakes.md` and ensure none will be introduced.
- Understand the feature folder structure in `.ai/reference/file-structure.md`.
- If behavior changes, choose test scope using `.ai/workflows/testing-strategy.md`.

## Definition of Done
- Code follows established patterns.
- Tests updated as needed.
- If a pattern changed, `.ai` docs are updated in the same PR.
