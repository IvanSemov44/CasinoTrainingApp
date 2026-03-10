# Workflow: Adding a New Feature

Updated: 2026-03-10
Owner: @ivans

## Purpose
Implement features in a consistent order to keep the app aligned with existing project patterns.

## Feature Sequence
1. **Types**: Define feature state shape, action types, component props in `<feature>/types/`.
2. **Services** (if needed): Add business logic functions in `src/services/` or `<feature>/services/`.
3. **Redux Slice**: Create/update slice in `<feature>/store/` or `src/store/`.
   - Define state shape, reducers, and actions.
   - Create selectors using `createSelector`.
   - Add AsyncThunk if async operations needed.
4. **Custom Hooks** (if needed): Functions like `useDrillState()` that pull state and provide interfaces in `<feature>/hooks/`.
5. **Components**: Build feature UI in `<feature>/components/`.
   - Use custom hooks and selectors to pull state.
   - Handle loading/error states via Redux.
6. **Tests**: Add/update Jest tests.
   - Slice tests (reducers, selectors).
   - Component tests (mocked Redux state).
   - Integration tests if needed.

## Real Code References
- Feature folder structure:
  - `src/features/blackjack-training/` (see components, hooks, types if present)
  - `src/features/roulette-training/`
- Redux slice (minimal example):
  - `src/store/rouletteSlice.ts`
- Custom hook (state accessor):
  - `src/hooks/useDrillState.ts`
- Component using state:
  - `src/screens/HomeScreen.tsx`
  - `src/components/shared/ChipSelector.tsx`
- Service (business logic):
  - `src/services/storage.service.ts`
  - `src/services/logger.service.ts`
- Test examples:
  - `src/__tests__/fixtures/` (test data)
  - `src/features/<feature>/__tests__/` (feature tests)

## Checklist
- [ ] Feature types defined with strict TypeScript.
- [ ] Redux slice created with reducer, selectors, actions.
- [ ] AsyncThunk added if async work needed (e.g., loading from storage).
- [ ] Custom hook wraps slice selectors for component use.
- [ ] Components use hooks/selectors; no `useSelector` directly in many places.
- [ ] Error boundaries wrap feature trees.
- [ ] Tests cover slice logic and component rendering.
- [ ] Feature folder does not import from other feature folders.
- [ ] Feature is discoverable from feature folder root (index.ts exports).
