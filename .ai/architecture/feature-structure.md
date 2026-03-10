# Feature-Based Architecture & Colocation

Updated: 2026-03-10
Owner: @ivans

## Guiding Principles

1. **Feature-First Organization**: Code is organized around business domains (roulette, poker, etc.), not technical layers
2. **Colocation**: Code that's used together lives together (component + hook + styles + tests)
3. **Clear Boundaries**: Each feature exports a minimal public API via `index.ts`
4. **Single Responsibility**: Components handle UI, hooks handle state logic
5. **Testability**: Tests live alongside the code they test

---

## Standard Feature Layout

```
src/features/MyFeature/
├── screens/              # Screen components for this feature
│   ├── MenuScreen/
│   │   ├── MenuScreen.tsx           # Main component
│   │   ├── MenuScreen.test.tsx       # Component tests
│   │   ├── MenuScreen.styles.ts      # Optional: styles if complex
│   │   └── index.ts                 # Module export
│   └── TrainingScreen/
│       ├── TrainingScreen.tsx
│       ├── TrainingScreen.test.tsx
│       ├── useTrainingLogic.ts      # Screen-specific hook
│       ├── useTrainingLogic.test.ts
│       └── index.ts
├── components/          # Feature-level shared components (2+ screens use them)
│   ├── Card/
│   │   ├── Card.tsx
│   │   └── index.ts
│   └── index.ts         # Export all components
├── hooks/              # Feature-level shared hooks (2+ screens use them)
│   ├── useSessionState.ts
│   ├── useSessionState.test.ts
│   └── index.ts
├── utils/              # Utility functions
│   ├── validators.ts
│   ├── helpers.ts
│   └── index.ts
├── constants/          # Feature constants
├── types/              # Feature TypeScript types
│   └── training.types.ts
├── navigation.tsx      # Feature navigation configuration
├── index.ts            # Feature public API (exports all public items)
└── [feature].styles.ts # Optional: Global feature styles
```

---

## Colocation Decision Tree

**When to colocate code with a screen:**

```
Is this code used by exactly ONE screen?
├─ YES → Colocate in ScreenName/ folder
│  Examples:
│  - useCalculationQuestion (only CalculationScreen)
│  - useExerciseState (only CalculationScreen)
│  - ScreenName.styles.ts (only this screen)
│
└─ NO → Keep at feature level
   │
   Is this code used by MULTIPLE features?
   ├─ YES → Move to app-level (src/utils, src/hooks, etc.)
   │  Examples:
   │  - useAnnouncedBets (used by multiple features)
   │  - getWheelPosition (shared helper)
   │
   └─ NO → Keep at feature level
      (Used by 2+ screens within same feature)
      Examples:
      - useRoundState (PLO: menu and training share this)
      - ExerciseLayout (used by roulette-training and others)
```

---

## Screen Structure (Colocated)

Every screen folder includes:

```
ScreenName/
├── ScreenName.tsx              # ✓ Required: Main component
├── ScreenName.test.tsx         # ✓ Required: Component tests
├── useScreenLogic.ts           # ✓ If screen has state/effect logic
├── useScreenLogic.test.ts      # ✓ Test colocated hooks
├── ScreenName.styles.ts        # Optional: Styles if large/complex
└── index.ts                    # ✓ Required: Export component and hooks
```

**Example index.ts for colocated screen:**

```typescript
export { default } from './CalculationScreen';
export { useCalculationQuestion } from './useCalculationQuestion';
export { useExerciseState } from './useExerciseState';
export type { CalculationRouteParams } from './useCalculationQuestion';
```

---

## Feature-Level Exports

The feature's `index.ts` re-exports screens and shared utilities:

```typescript
// src/features/roulette-training/index.ts
export * from './screens/exercises/CalculationScreen';
export * from './screens/menu/RouletteExercisesScreen';
export * from './screens/reference/RouletteTrainingScreen';
export * from './components/ExerciseLayout';
export * from './hooks';
export { navigation } from './navigation';
```

**Why?** This maintains API stability even if internal folder structure changes.

---

## Hook Organization

### Colocated Hooks (Single Screen)
```typescript
// src/features/roulette-training/screens/exercises/CalculationScreen/useCalculationQuestion.ts
export function useCalculationQuestion(params: CalculationRouteParams) {
  // Logic only used by CalculationScreen
}
```

### Feature-Level Hooks (Multiple Screens)
```typescript
// src/features/plo-training/hooks/useSessionState.ts
export function useSessionState(initialHand: Hand) {
  // Logic shared by PLOMenuScreen and PLOTrainingScreen
}
```

### Cross-Feature Hooks (App-Level)
```typescript
// src/hooks/useAnnouncedBets.ts
// Used by:
// - racetrack-position-training
// - racetrack-sector-training
// - roulette-game (different feature)
```

**Rule**: Cross-feature hooks live at `src/hooks/`, not inside a feature.

---

## Import Patterns

### Within Same Screen
```typescript
// CalculationScreen.tsx
import { useCalculationQuestion } from './useCalculationQuestion';
import { useExerciseState } from './useExerciseState';
```

### Within Same Feature
```typescript
// src/features/roulette-training/screens/MenuScreen/MenuScreen.tsx
import { ExerciseLayout } from '../../components/ExerciseLayout';
import { useRouletteConstants } from '../../constants/roulette.constants';
import { useSessionState } from '../../hooks/useSessionState';
```

### Cross-Feature (ONLY shared/app-level)
```typescript
// ✓ Good: Importing shared component
import { LoadingSpinner } from '../../components/shared';

// ✓ Good: Importing app-level hook
import { useAnnouncedBets } from '../../hooks/useAnnouncedBets';

// ✗ Bad: Cross-feature import
import { NumberPad } from '../roulette-training/components/NumberPad';
```

---

## Real Example: roulette-training

```
src/features/roulette-training/
├── screens/
│   ├── exercises/
│   │   └── CalculationScreen/
│   │       ├── CalculationScreen.tsx
│   │       ├── CalculationScreen.test.tsx
│   │       ├── useCalculationQuestion.ts        # Colocated hook
│   │       ├── useCalculationQuestion.test.ts
│   │       ├── useExerciseState.ts             # Colocated hook
│   │       ├── useExerciseState.test.ts
│   │       └── index.ts
│   ├── menu/
│   │   └── RouletteExercisesScreen/
│   │       ├── RouletteExercisesScreen.tsx
│   │       ├── RouletteExercisesScreen.test.tsx
│   │       └── index.ts
│   └── reference/
│       └── RouletteTrainingScreen/
├── components/
│   ├── ExerciseLayout/
│   ├── HintSection/
│   └── index.ts
├── hooks/
│   └── index.ts
├── constants/
│   ├── difficulty.ts
│   └── roulette.constants.ts
├── types/
│   └── exercise.types.ts
├── utils/
│   ├── exerciseHelpers.ts
│   ├── betGenerators.ts
│   └── hintGenerators.tsx
├── navigation.tsx
└── index.ts
```

---

## Key Benefits

- **Encapsulation**: Feature changes don't leak into other features
- **Discoverability**: Related code lives together
- **Scalability**: Easy to add/remove features without refactoring
- **Testability**: Isolated feature-level testing
- **Maintainability**: Clear folder hierarchy and boundaries
