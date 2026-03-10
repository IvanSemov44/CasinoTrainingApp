# Architecture Overview

Updated: 2026-03-10
Owner: @ivans

## Purpose
Summarize system architecture and where to find implementation rules.

## System Shape
- Platform: React Native (Expo) + TypeScript + Redux Toolkit.
- State: Redux slices for feature state + Redux selectors.
- Persistence: AsyncStorage (local key-value) via storage.service.ts.
- UI Framework: React Native with styled-components or custom ThemedStyles.
- Testing: Jest + React Native Testing Library.

## Layer Organization
- **Screens**: Navigation entry points (HomeScreen, SettingsScreen, ProgressScreen).
- **Features**: Self-contained modules (blackjack-training, roulette-game, etc.).
  - Each feature has: components, hooks, types, store (slice + thunks if needed).
- **Shared**: Reusable components (ChipSelector, PlayingCard, ErrorBoundary, etc.).
- **Store**: Redux slices and root reducer configuration.
- **Services**: Business logic (logger.service.ts, storage.service.ts).
- **Utilities**: Helper functions and constants.

## Real Code References
- Redux store setup: `src/store/index.ts`
- Feature example: `src/features/roulette-training/`
- Component example: `src/components/shared/Button.tsx`
- Storage service: `src/services/storage.service.ts`
- App navigation: `src/navigation/AppNavigator.tsx`

## Read Next
1. `.ai/architecture/clean-architecture.md`
2. `.ai/architecture/patterns.md`
3. `.ai/workflows/adding-feature.md`
