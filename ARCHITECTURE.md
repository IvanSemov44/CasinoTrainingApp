# Casino Training App - Architecture Guide

## Overview

This application uses a **feature-based architecture** with **screen-level colocation** to maximize code organization, maintainability, and scalability. Each feature is self-contained, and related code lives together in the same folder.

## Guiding Principles

1. **Feature-First Organization**: Code is organized around business domains (roulette, poker, etc.), not technical layers
2. **Colocation**: Code that's used together lives together (component + hook + styles + tests)
3. **Clear Boundaries**: Each feature exports a minimal public API via `index.ts`
4. **Single Responsibility**: Components handle UI, hooks handle state logic
5. **Testability**: Tests live alongside the code they test

---

## Folder Structure

### Standard Feature Layout

```
src/features/MyFeature/
├── screens/              # Screen components for this feature
│   ├── MenuScreen/
│   │   ├── MenuScreen.tsx           # Main component
│   │   ├── MenuScreen.test.tsx       # Component tests
│   │   ├── MenuScreen.styles.ts      # Shared styles (optional)
│   │   └── index.ts                 # Module export
│   └── TrainingScreen/
│       ├── TrainingScreen.tsx
│       ├── TrainingScreen.test.tsx
│       ├── useTrainingLogic.ts      # Screen-specific hook
│       ├── useTrainingLogic.test.ts
│       └── index.ts
├── components/          # Feature-level shared components
│   ├── Card/
│   │   ├── Card.tsx
│   │   └── index.ts
│   └── index.ts         # Export all components
├── hooks/              # Feature-level shared hooks
│   ├── useSessionState.ts
│   ├── useSessionState.test.ts
│   └── index.ts
├── utils/              # Utility functions
│   ├── validators.ts
│   ├── helpers.ts
│   └── index.ts
├── constants/          # Feature constants
│   ├── difficulty.ts
│   └── colors.ts
├── types/              # Feature TypeScript types
│   └── training.types.ts
├── navigation.tsx      # Feature navigation configuration
├── index.ts            # Feature public API
└── [feature].styles.ts # Global feature styles (optional)
```

### Real Example: roulette-training

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
│       ├── RouletteTrainingScreen/
│       ├── RouletteLayoutViewScreen/
│       └── RouletteLayoutPracticeScreen/
├── components/
│   ├── ExerciseLayout/
│   ├── HintSection/
│   └── index.ts
├── hooks/                          # Feature-level only
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
├── index.ts
```

---

## Key Rules

### 1. Colocation Decision Tree

**When to colocate code with a screen:**

```
Is this code used by exactly ONE screen?
├─ YES → Colocate in ScreenName/ folder
│  Examples:
│  - useCalculationQuestion (only CalculationScreen)
│  - useExerciseState (only CalculationScreen)
│  - PLOGameTrainingScreen.styles.ts (only this screen)
│
└─ NO → Keep at feature level
   │
   Is this code used by MULTIPLE features?
   ├─ YES → Move to app-level (/src/utils, /src/hooks, etc.)
   │  Examples:
   │  - useAnnouncedBets (used by roulette-game AND racetrack)
   │  - getWheelPosition (used by racetrack-position AND racetrack-sector)
   │
   └─ NO → Keep at feature level
      (Used by 2+ screens within same feature)
      Examples:
      - useRoundState (PLO screens: menu and training share this)
      - ExerciseLayout component (used by roulette-training and others)
```

### 2. Screen Structure (Colocated)

Every screen folder includes:

```
ScreenName/
├── ScreenName.tsx              # ✓ Required: Main component
├── ScreenName.test.tsx         # ✓ Required: Component tests
├── useScreenLogic.ts           # ✓ If screen has state logic
├── useScreenLogic.test.ts      # ✓ If hook exists, test it
├── ScreenName.styles.ts        # Optional: Styles (if large/complex)
└── index.ts                    # ✓ Required: { default: ScreenName, useScreenLogic }
```

**Example index.ts for colocated screen:**

```typescript
export { default } from './CalculationScreen';
export { useCalculationQuestion } from './useCalculationQuestion';
export { useExerciseState } from './useExerciseState';
export type { CalculationRouteParams } from './useCalculationQuestion';
```

### 3. Feature-Level Exports

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

### 4. Hook Organization

#### Colocated Hooks (Single Screen)
```typescript
// src/features/roulette-training/screens/exercises/CalculationScreen/useCalculationQuestion.ts
export function useCalculationQuestion(params: CalculationRouteParams) {
  // Logic only used by CalculationScreen
}
```

#### Feature-Level Hooks (Multiple Screens)
```typescript
// src/features/plo-training/hooks/useSessionState.ts
export function useSessionState(initialHand: Hand) {
  // Logic shared by PLOMenuScreen and PLOGameTrainingScreen
}
```

#### Cross-Feature Hooks (Shared Features)
```typescript
// src/features/racetrack/hooks/useAnnouncedBets.ts
// Used by:
// - racetrack-position-training/screens/PositionTrainingScreen
// - racetrack-sector-training/screens/SectorTrainingScreen
// - roulette-game/screens/RouletteGameScreen ← different feature!
```

### 5. Imports

#### Within Screen (Colocated)
```typescript
// src/features/roulette-training/screens/exercises/CalculationScreen/CalculationScreen.tsx
import { useCalculationQuestion } from './useCalculationQuestion';      // Local colocated hook
import { useExerciseState } from './useExerciseState';                 // Local colocated hook
import ExerciseLayout from '../../../components/ExerciseLayout';       // Feature component
import { betGenerators } from '../../../utils';                        // Feature utility
import { useTheme } from '@contexts/ThemeContext';                     // App-level context
```

#### Within Feature (Feature-Level)
```typescript
// src/features/plo-training/screens/PLOGameTrainingScreen/PLOGameTrainingScreen.tsx
import { usePLOGameState } from './usePLOGameState';                   // Colocated hook
import { PLOFeedbackCard } from '../../components';                    // Feature component
import { useSessionState } from '../../hooks';                         // feature-level hook
import { gameScenarios } from '../../utils';                           // Feature utility
```

#### Cross-Feature
```typescript
// src/features/roulette-game/screens/RouletteGameScreen/RouletteGameScreen.tsx
import { useAnnouncedBets } from '../../../racetrack/hooks';           // Another feature's hook (allowed when cross-feature)
import RouletteLayout from '@components/RouletteLayout';              // App component
```

**Import Rules:**
- ✓ Import from within your screen folder
- ✓ Import from within your feature folder
- ✓ Import from app-level (/src/components, /src/contexts, etc.)
- ⚠️ Cross-feature imports only for truly shared utilities (avoid circular dependencies)
- ✗ Never import from ../../../ four or more times (indicates wrong scope)

---

## Testing Strategy

### Unit Tests (Colocated)
```typescript
// src/features/plo-training/screens/PLOGameTrainingScreen/usePLOGameState.test.ts
import { renderHook, act } from '@testing-library/react-native';
import { usePLOGameState } from './usePLOGameState';

describe('usePLOGameState', () => {
  it('should initialize with first hand', () => {
    const { result } = renderHook(() => usePLOGameState());
    expect(result.current.currentHand).toBeDefined();
  });
});
```

### Component Tests (Colocated)
```typescript
// src/features/plo-training/screens/PLOGameTrainingScreen/PLOGameTrainingScreen.test.tsx
import { render } from '@testing-library/react-native';
import PLOGameTrainingScreen from './PLOGameTrainingScreen';

describe('PLOGameTrainingScreen', () => {
  it('should render asking phase initially', () => {
    const { getByText } = render(<PLOGameTrainingScreen route={...} />);
    expect(getByText(/question/i)).toBeTruthy();
  });
});
```

### Integration Tests (Feature Level)
```typescript
// src/features/plo-training/__tests__/integration.test.ts
describe('PLO Training Flow', () => {
  it('should complete a full hand', () => {
    // Test multiple screens together
  });
});
```

---

## Common Patterns

### Pattern 1: Simple Screen (No State)

```typescript
// Screen that just displays data passed via route params
const SimpleScreen: React.FC<Props> = ({ route }) => {
  return (
    <View>
      <Text>{route.params.title}</Text>
    </View>
  );
};
```

**Files needed:**
- `SimpleScreen.tsx`
- `SimpleScreen.test.tsx`
- `index.ts`

### Pattern 2: Screen with Custom Hook

```typescript
// Screen that needs state management
const MenuScreen: React.FC<Props> = () => {
  const { selectedMode, selectMode } = useMenuState();
  
  return (
    <View>
      {/* render selected mode */}
    </View>
  );
};
```

**Files needed:**
- `MenuScreen.tsx`
- `MenuScreen.test.tsx`
- `useMenuState.ts`
- `useMenuState.test.ts`
- `index.ts`

### Pattern 3: Complex Screen with Multiple Hooks

```typescript
// Screen combining multiple concerns
const TrainingScreen: React.FC<Props> = ({ route }) => {
  const questionState = useTrainingQuestion(route.params);
  const sessionState = useSessionState();
  const feedbackLogic = useFeedback();
  
  return (
    <View>
      {/* Complex UI */}
    </View>
  );
};
```

**Files needed:**
- `TrainingScreen.tsx`
- `TrainingScreen.test.tsx`
- `useTrainingQuestion.ts`
- `useTrainingQuestion.test.ts`
- `useFeedback.ts` (if screen-specific) OR import from `../../hooks/` (if shared)
- `useSessionState.ts` (same decision)
- `index.ts`

---

## Refactoring Checklist

### When Moving a Feature

- [ ] Create new feature folder under `src/features/`
- [ ] Create `screens/` subfolder
- [ ] Move screen components with their colocated hooks
- [ ] Move `components/`, `utils/`, `types/`, `constants/` folders
- [ ] Create `navigation.tsx`
- [ ] Create feature-level `index.ts` with exports
- [ ] Update route params if needed
- [ ] Run tests: `npm test -- src/features/NewFeature`
- [ ] Update app navigation to include new feature

### When Extracting a Colocated Hook

1. **Identify scope**: Is this hook used by 1 screen or multiple?
2. **If 1 screen**: Colocate in `ScreenName/useLogic.ts`
3. **If 2+ screens in same feature**: Move to `hooks/useLogic.ts`
4. **If used across features**: Move to `src/hooks/useLogic.ts`
5. **Update imports** throughout affected files
6. **Update exports** in relevant `index.ts` files
7. **Run tests** to validate

### When Creating a New Screen

1. Create `screens/ScreenName/` folder
2. Create `ScreenName.tsx` component
3. If screen has state:
   - Create `useScreenLogic.ts`
   - Create `useScreenLogic.test.ts`
4. Create `ScreenName.test.tsx`
5. Create `index.ts` with exports
6. Add to navigation
7. Export from feature's `index.ts` if public

---

## Anti-Patterns to Avoid

### ❌ Deep Nesting

```typescript
// WRONG: 5+ levels deep
import Foo from '../../../../../../../../components/Foo';
```

**Fix**: Move code to appropriate feature level or app level

### ❌ Cross-Feature Direct Imports

```typescript
// WRONG: Importing component implementation directly
import PLOGameTrainingScreen from '@features/plo-training/screens/PLOGameTrainingScreen/PLOGameTrainingScreen';
```

**Fix**: Use feature-level exports
```typescript
// CORRECT: Import from feature export
import { PLOGameTrainingScreen } from '@features/plo-training';
```

### ❌ Orphaned Hooks

```typescript
// WRONG: Hook that's not used by anything
src/features/roulette-training/hooks/useRarelyUsed.ts
```

**Fix**: Inline into screen component or delete

### ❌ Props Drilling

```typescript
// WRONG: Passing data through 5+ component levels
<GrandParent props={data}>
  <Parent props={data}>
    <Child props={data}>
      <GrandChild data={data} />
    </Child>
  </Parent>
</GrandParent>
```

**Fix**: Use context or extract shared state to hook

### ❌ Circular Dependencies

```typescript
// WRONG: Feature A imports from Feature B, B imports from A
// src/features/a/index.ts imports from 'features/b'
// src/features/b/index.ts imports from 'features/a'
```

**Fix**: Extract shared code to app-level `/src/utils/` or `/src/hooks/`

---

## File Naming Conventions

| What | Pattern | Example |
|------|---------|---------|
| Component files | `PascalCase.tsx` | `CalculationScreen.tsx` |
| Hook files | `useHookName.ts` | `useCalculationQuestion.ts` |
| Hook tests | `useHookName.test.ts` | `useExerciseState.test.ts` |
| Component tests | `Component.test.tsx` | `CalculationScreen.test.tsx` |
| Style files | `Component.styles.ts` | `CalculationScreen.styles.ts` |
| Type files | `domain.types.ts` | `exercise.types.ts` |
| Utility files | `camelCase.ts` | `betGenerators.ts` |
| Constants | `CONSTANT_NAME.ts` or `domain.constants.ts` | `difficulty.ts` |
| Folders | `camelCase/` (utilities) or `PascalCase/` (components/screens) | `src/features/` or `CalculationScreen/` |

---

## Feature Checklist

Before considering a feature "complete":

- [ ] All screens in `screens/` folder structure
- [ ] All screen-specific hooks colocated within screens
- [ ] All feature-shared hooks in `hooks/` folder
- [ ] All tests passing: `npm test -- src/features/MyFeature`
- [ ] Feature exports defined in `index.ts`
- [ ] Navigation configured in `navigation.tsx`
- [ ] TypeScript errors: `npm run lint` passes
- [ ] ESLint: `npx eslint src/features/MyFeature` passes
- [ ] README or docs updated if added new significant logic
- [ ] No dead code or orphaned files

---

## References

- [React Best Practices](https://react.dev)
- [React Native Architecture](https://reactnative.dev/docs/architecture-overview)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- Project README: [README.md](./README.md)
