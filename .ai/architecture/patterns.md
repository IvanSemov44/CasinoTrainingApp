# Architecture Patterns

Updated: 2026-03-10
Owner: @ivans

## Purpose
Document the key cross-cutting patterns used in this React Native codebase.

## Redux Slice Pattern
- Each feature has a Redux slice in `store/slices/` or within the feature folder.
- Slices define state shape, reducers, and exported selectors.
- Use `createSelector` for derived/memoized state.
- AsyncThunk for async operations (e.g., loading progress from storage).

References:
- `src/store/index.ts` (root store setup)
- `src/store/rouletteSlice.ts` (slice example)
- `src/hooks/useDrillState.ts` (how to pull state in components)

## Component Pattern
- Shared components in `src/components/shared/`.
- Feature-specific components in `src/features/<feature>/components/`.
- All components TypeScript; use proper prop typing.
- Prefer functional components with hooks.

References:
- `src/components/shared/ChipSelector.tsx`
- `src/components/PlayingCard.tsx`
- `src/features/blackjack-training/components/`

## Custom Hook Pattern
- Business logic in `src/hooks/` (useModalState, useThemedStyles, etc.).
- Feature hooks in feature's `hooks/` subfolder.
- Hooks manage local state, effects, and provide reusable logic.

References:
- `src/hooks/useDrillState.ts`
- `src/hooks/useThemedStyles.ts`

## Storage/Persistence Pattern
- AsyncStorage access through `src/services/storage.service.ts`.
- Service provides `get`, `set`, `remove` methods with TypeScript safety.
- Redux AsyncThunk dispatches actions after storage operations.

References:
- `src/services/storage.service.ts`
- Usage pattern: dispatch(asyncThunk) → thunk calls storage.service → updates Redux

## Error Handling
- Components use ErrorBoundary or FeatureErrorBoundary for React errors.
- Logger service for tracking errors/analytics.
- UI error states shown via components or modals.

References:
- `src/components/ErrorBoundary.tsx`
- `src/components/withErrorBoundary/`
- `src/services/logger.service.ts`
