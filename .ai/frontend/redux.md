# Frontend Redux Toolkit Standard

Updated: 2026-03-10
Owner: @ivans

## Purpose
Define state-management boundaries and Redux patterns.

## Core Rules
1. Slices own all mutable state (feature state, UI state, settings).
2. Selectors use `createSelector` for derived/memoized state.
3. Reducers handle synchronous state updates.
4. AsyncThunk handles async operations (load from storage, async computations).
5. Custom hooks wrap selectors and provide feature-specific interfaces.

## Slice Pattern
- Each feature or concern has a slice: state shape, reducers, selectors, thunks.
- Selectors are exported and memoized.
- AsyncThunk dispatched from components or other thunks; result triggers reducer.
- No nested objects in selectors unless truly needed (use createSelector instead).

## Real Code References
- Root store: `src/store/index.ts`
- Roulette slice (example): `src/store/rouletteSlice.ts`
- Custom hook (wraps selectors): `src/hooks/useDrillState.ts`
- Storage service (business logic): `src/services/storage.service.ts`
- Feature folder: `src/features/<feature>/` (may have internal store/hooks)

## Common Mistakes
- Calling `useSelector` multiple times in one component instead of one custom hook.
- Not using `createSelector` for derived state (causes unnecessary re-renders).
- Storing server data in Redux when it should be in AsyncStorage cache.
- Dispatching thunks without handling the result in reducers.
- Using plain objects instead of selectors for accessing nested state.

## Checklist
- [ ] Slice has clear state shape, reducers, and selectors.
- [ ] All selectors use `createSelector` and are memoized.
- [ ] Custom hook wraps selectors and provides clean API.
- [ ] AsyncThunk properly handles loading/success/error states.
- [ ] Feature state is independent; no imports from other features.
