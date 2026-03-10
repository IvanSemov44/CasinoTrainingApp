# Frontend Overview

Updated: 2026-03-10
Owner: @ivans

## Purpose
Quick orientation for React Native app frontend architecture.

## Architecture Snapshot
- React Native (Expo) + TypeScript.
- Redux Toolkit for all state management.
- AsyncStorage for persistent local data.
- Screens (navigation) → Features (self-contained modules) → Shared components.

## Non-Negotiable Rules
- All mutable state lives in Redux slices.
- Components are stateless renderers; pull state via custom hooks.
- Use typed selectors with `createSelector` to avoid re-renders.
- No `any` types in production code.
- Feature folders do not import from other feature folders.
- AsyncStorage accessed only through storage.service.ts.

## Real Code References
- Redux store: `src/store/index.ts`
- Feature slice example: `src/store/rouletteSlice.ts`
- Featured folder: `src/features/blackjack-training/`, `src/features/roulette-training/`
- Custom hook example: `src/hooks/useDrillState.ts`
- Storage service: `src/services/storage.service.ts`
- Screens: `src/screens/HomeScreen.tsx`, `src/screens/SettingsScreen.tsx`

## Read Next
- `.ai/frontend/redux.md`
- `.ai/workflows/adding-feature.md`
- `.ai/reference/common-mistakes.md`
