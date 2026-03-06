# Casino Training App — Coding Guide

**Last Updated**: March 2026 | **Status**: Production | **Stack**: React Native + Expo + TypeScript

---

## Merge Gate (P0 — must pass before review)

Run all checks below before requesting review. If any check fails, the PR is blocked.

```bash
npx tsc --noEmit
npx eslint src --ext .ts,.tsx
npx jest --passWithNoTests
```

Hard blockers:
- TypeScript errors > 0
- ESLint errors > 0
- New cross-feature imports
- Hardcoded theme colors in UI

---

## Definition of Done (Every PR)

- [ ] Merge gate commands pass locally
- [ ] No cross-feature imports (`src/features/*` must stay isolated)
- [ ] Theme colors use `colors.*` tokens only (no raw hex)
- [ ] Shared behavior is extracted when repeated in 2+ files
- [ ] User interactions are protected from rapid double-taps
- [ ] Sound/haptics respect Settings context toggles
- [ ] Updated/added logic has tests when behavior changed
- [ ] No unstable list keys (avoid array index keys for dynamic lists)
- [ ] Effects clean up subscriptions/timers/listeners
- [ ] If a touched component is not colocated, migrate it in the same PR (scope: max 1–3 components, include test file)
- [ ] All new/migrated components have a `.test.tsx` file with minimum coverage: render + one interaction test

---

## Architecture Contracts

### State Ownership Matrix

| State Type | Owner | Examples | Forbidden |
|---|---|---|---|
| App-wide settings | Context (`src/contexts/`) | Theme mode, sound toggle, haptic toggle | Duplicating theme/sound state inside screens |
| Feature runtime drill state | `useDrillState` hook | phase, streak, points, accuracy | Re-deriving `canSubmit` / `accuracy` locally |
| Feature-specific UI state | Local `useState` | modal visibility, selected chip, temporary input | Moving transient UI state into global context |
| Roulette game table state | Redux (`src/store/`) | roulette-specific table/bet state | Using Redux for one-screen temporary values |
| Persisted preferences | AsyncStorage via Context/services | `@app_theme`, haptic/sound settings | Writing AsyncStorage directly inside random components |

### Side-Effects Contract

Side effects must be isolated and predictable:
- **Sound/Haptics:** only in handlers/effects that check `useSettings()` first
- **Persistence:** AsyncStorage writes in contexts/services/hooks, not deeply in presentational components
- **Navigation:** perform in screen-level handlers, not in utility modules
- **Network/async game setup:** keep in hooks/services; keep screen components focused on rendering + event wiring

---

## Detailed Rules by Priority

### P0 — Blocking (never merge if violated)

#### 1. TypeScript Strict — Always Verify
```bash
npx tsc --noEmit
```
Run after every change. Zero errors before marking done.

#### 2. No Inline Styles — Use `makeStyles` Pattern
Every screen/component with theming MUST use the dynamic styles pattern:

```tsx
// Inside component:
const { colors } = useTheme();
const styles = useMemo(() => makeStyles(colors), [colors]);

// Outside component (bottom of file):
function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: { backgroundColor: colors.background.primary },
  });
}
```

Never hardcode colors. Always use `colors.*` from theme.

#### 3. Never Auto-Commit or Push
Always ask before `git push` or any destructive git operation.

#### 4. No Cross-Feature Imports
Features must not import from other feature folders.

```tsx
// BAD — crosses feature boundary
import NumberPad from '../../roulette-training/components/NumberPad';

// GOOD — shared components live in src/components/
import NumberPad from '@components/NumberPad';
```

If a component is used by more than one feature, it belongs in `src/components/`, not inside any feature folder.

---

### P1 — Required

#### 5. Feature-Based Folder Structure
Every game/training feature lives in `src/features/<feature-name>/`:

```
src/features/blackjack-training/
  components/
  screens/
  types/
    index.ts
  utils/
    payouts.ts
    scenarioGenerator.ts
  index.ts
```

Shared logic goes in `src/utils/`. Never duplicate across features.

#### 6. Path Aliases — Always Use Them
```tsx
// Good
import { useTheme } from '@contexts/ThemeContext';
import { useSettings } from '@contexts/SettingsContext';
import { useDrillState } from '@hooks/useDrillState';
import NumberPad from '@components/NumberPad';

// Bad
import { useTheme } from '../../contexts/ThemeContext';
import NumberPad from '../../roulette-training/components/NumberPad';
```

Available aliases:
| Alias | Path |
|---|---|
| `@/*` | `src/*` |
| `@features/*` | `src/features/*` |
| `@utils/*` | `src/utils/*` |
| `@components/*` | `src/components/*` |
| `@contexts/*` | `src/contexts/*` |
| `@styles/*` | `src/styles/*` |
| `@constants/*` | `src/constants/*` |
| `@store/*` | `src/store/*` |
| `@hooks/*` | `src/hooks/*` |

#### 7. Theme Colors — Never Hardcode
```tsx
// Good
color: colors.text.gold
backgroundColor: colors.status.success
color: colors.status.streak

// Bad
color: '#FFD700'
backgroundColor: '#22c55e'
color: '#FF6B00'    // use colors.status.streak instead
```

Color tokens:
- `colors.background.{primary, secondary, tertiary, darkGray, hint}`
- `colors.text.{primary, secondary, muted, gold}`
- `colors.border.{primary, primaryDark, gold}`
- `colors.status.{success, successAlt, error, errorAlt, streak}`
- `colors.difficulty.{easy, medium, hard}`

#### 8. Never Duplicate Shared Components
If the same JSX structure or `makeStyles` block appears in more than one file, it must be extracted into a shared component or hook. The threshold is **2 files** — if it appears twice, extract it.

Current shared components that MUST be used:
- `src/components/shared/DrillMenuScreen/` — for all game menu screens (BJ, TCP, CP, THU, RK)
- `src/components/shared/DrillScreen/` — for all game drill screens (BJ, TCP, CP, THU, RK)
- `src/components/NumberPad.tsx` — numeric input pad used across multiple features
- `src/hooks/useDrillState.ts` — drill session state (scenario, phase, streak, points, handlers)

---

### P2 — Best Practice

#### 9. Drill Screens — Use `useDrillState` and `DrillScreen`
All quiz-style drill screens follow the same pattern. Do not reimplement it:

```tsx
// Good — use the shared hook and component
import DrillScreen from '@components/shared/DrillScreen';

export default function TCPDrillScreen({ route }: Props) {
  return (
    <DrillScreen
      scenarioGenerator={generateScenario}
      drillType={route.params.drillType}
    />
  );
}

// Bad — reimplementing the same 200-line component from scratch
export default function TCPDrillScreen({ route }: Props) {
  const [phase, setPhase] = useState('asking');
  const [streak, setStreak] = useState(0);
  // ... 180 more lines identical to BJ, CP, THU, RK
}
```

Do NOT re-derive values `useDrillState` already computes:
```tsx
// Bad — useDrillState already returns these
const { canSubmit, accuracy, upcomingMultiplier } = drillState;
const canSubmit = selectedOption !== null;                   // redundant
const accuracy = Math.round((correct / total) * 100);       // redundant
const upcomingMultiplier = Math.pow(2, streak);              // redundant

// Good — use what the hook gives you
const { canSubmit, accuracy, upcomingMultiplier } = drillState;
```

#### 10. Menu Screens — Use `DrillMenuScreen`
All game menu screens (list of drills) share the same layout:

```tsx
// Good
import DrillMenuScreen from '@components/shared/DrillMenuScreen';

export default function TCPMenuScreen({ navigation }: Props) {
  return (
    <DrillMenuScreen
      title="Three Card Poker"
      drills={DRILLS}
      onPress={(drillType) => navigation.navigate('TCPDrill', { drillType })}
    />
  );
}

// Bad — copy-pasting the same makeStyles block and JSX into every menu file
```

#### 11. Debounce User Input in Training Screens
All training screen button handlers must guard against rapid taps:

```tsx
const [isProcessing, setIsProcessing] = useState(false);

const handlePress = useCallback(async (value: string) => {
  if (isProcessing) return;
  setIsProcessing(true);
  // ... logic ...
  setIsProcessing(false);
}, [isProcessing, ...]);
```

#### 12. Sound + Haptic via Settings Context
Always check settings before playing sound or haptic:

```tsx
const { soundEnabled, hapticEnabled } = useSettings();

if (soundEnabled) playSoundEffect('success');
if (hapticEnabled) {
  try { await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); }
  catch { /* not available */ }
}
```

Never call haptics or sound directly without checking settings.

#### 13. Safe Area Insets
All screens must respect safe area:

```tsx
const insets = useSafeAreaInsets();

<View style={[styles.container, { paddingBottom: insets.bottom, paddingRight: insets.right }]}>
```

#### 14. useCallback / useMemo for Handlers and Styles
```tsx
// Handlers
const handlePress = useCallback(() => { ... }, [deps]);

// Styles (when using theme)
const styles = useMemo(() => makeStyles(colors), [colors]);
```

#### 15. Performance Hooks — Use Intentionally
Use `useMemo` and `useCallback` for values/handlers passed to memoized children, expensive calculations, or theme-driven style creation.

**Current pattern:**
```tsx
const { colors } = useTheme();
const styles = useMemo(() => makeStyles(colors), [colors]);
const handlePress = useCallback(() => { ... }, [deps]);
```

Avoid blanket memoization everywhere; use it where identity stability or measurable render reduction matters.

#### 16. Component Colocation (for Complex Components)
When components become complex (3+ hooks, 5+ utilities, related types), organize them in a colocated folder structure for better maintainability.

**Mandatory migration rule (enforced):**
- If a PR touches a non-colocated component, migrate that component to colocation in the same PR.
- Keep migration scope small: **1–3 components per PR**.
- Migration PRs must avoid behavior changes (structure-only unless explicitly required).
- If migration cannot be completed safely, document the blocker in PR notes and open a follow-up task before merge.

**Simple component (1-2 hooks):**
```
src/features/blackjack-training/components/
├── BJCard.tsx
├── BJCard.types.ts
├── BJCard.hooks.ts
├── BJCard.styles.ts
└── index.ts
```

**Complex component (3+ hooks, 5+ utilities):**
```
src/features/blackjack-training/components/BJDrill/
├── BJDrill.tsx
├── BJDrill.types.ts
├── BJDrill.styles.ts
├── hooks/
│   ├── useValidation.ts
│   ├── useHandlers.ts
│   ├── useAnimation.ts
│   └── index.ts
├── utils/
│   ├── calculations.ts
│   ├── formatting.ts
│   └── index.ts
└── index.ts
```

**Barrel exports — minimal public API:**
```typescript
// Shared UI components (export types for external use)
export { default } from './BJCard';
export type { BJCardProps } from './BJCard.types';  // ✅ OK for shared

// Feature-specific components (export component only)
export { default } from './BJDrill';
// ❌ Don't export internal types/hooks
```

#### 17. Component Testing
Colocate tests next to their components. Use Jest + React Native Testing Library.

**Test file location:**
```
src/features/blackjack-training/components/
├── BJCard.tsx
├── BJCard.types.ts
├── BJCard.test.tsx    ← Colocated next to component
└── index.ts
```

**Minimum test coverage contract (required for new/migrated components):**
- At least one render test verifying the component mounts without crashing
- At least one user interaction test (button press, input change, selection)
- Wrap components in all required contexts (ThemeProvider, SettingsProvider, navigation wrappers)
- Assert user-visible behavior, not internal state or implementation details

**Test structure example:**
```typescript
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import { SettingsProvider } from '@contexts/SettingsContext';
import BJCard from './BJCard';

describe('BJCard', () => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider>
      <SettingsProvider>{children}</SettingsProvider>
    </ThemeProvider>
  );

  it('renders the card with correct value', () => {
    render(
      <Wrapper>
        <BJCard value="K" suit="♠" onPress={jest.fn()} />
      </Wrapper>
    );
    expect(screen.getByText('K')).toBeOnTheScreen();
  });

  it('calls onPress handler when card is tapped', () => {
    const onPress = jest.fn();
    render(
      <Wrapper>
        <BJCard value="K" suit="♠" onPress={onPress} />
      </Wrapper>
    );
    
    fireEvent.press(screen.getByText('K'));
    expect(onPress).toHaveBeenCalled();
  });
});
```

**Best practices:**
- Test user interactions, not implementation details
- Wrap components in required contexts (ThemeProvider, SettingsProvider, navigation providers)
- Use meaningful test names describing the behavior
- Keep tests colocated next to components for easier maintenance
- Mock external dependencies (hooks, child components) to isolate component logic
- Avoid testing internal state; instead, verify rendered output and behavior

---

## Component Template Contract (Required)

Use this as the default for every new component and when migrating touched components.

### Required files by component type

**Feature component (default):**
```
ComponentName/
├── ComponentName.tsx
├── ComponentName.types.ts
├── ComponentName.styles.ts
├── ComponentName.test.tsx    ← Required (minimum 2 tests)
└── index.ts
```

**Shared reusable component (`src/components/`):**
```
ComponentName/
├── ComponentName.tsx
├── ComponentName.types.ts
├── ComponentName.styles.ts
├── ComponentName.test.tsx    ← Required (minimum 2 tests)
└── index.ts
```

**Optional files (only when justified):**
- `ComponentName.hooks.ts` for 1–2 tightly-coupled hooks
- `hooks/` folder for 3+ hooks
- `ComponentName.utils.ts` or `utils/` folder for non-trivial helpers

### Required component file shape (`ComponentName.tsx`)

```tsx
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import type { ComponentNameProps } from './ComponentName.types';
import { makeStyles } from './ComponentName.styles';

export default function ComponentName({ ...props }: ComponentNameProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return <View style={styles.container}>{/* UI */}</View>;
}
```

Rules:
- Use typed props from `ComponentName.types.ts` (no `any`)
- Keep render pure (no side effects in render body)
- Use theme tokens through `makeStyles(colors)`
- Put navigation, persistence, and audio/haptic side effects in handlers/effects/hooks

### Required style file shape (`ComponentName.styles.ts`)

```ts
import { StyleSheet } from 'react-native';
import type { AppColors } from '@styles/themes';

export function makeStyles(colors: AppColors) {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background.primary,
    },
  });
}
```

Rules:
- No hardcoded UI hex values in component styles
- No `makeStyles` definition inside component files

### `index.ts` export contract (strict)

**Feature components (`src/features/*/components/`):**
```ts
export { default } from './ComponentName';
```

**Shared components (`src/components/`):**
```ts
export { default } from './ComponentName';
export type { ComponentNameProps } from './ComponentName.types';
```

Rules:
- Feature component `index.ts` exports component only
- Shared component `index.ts` may export component props types
- Do not export internal hooks/utilities from component `index.ts`

### Minimum test contract (`ComponentName.test.tsx`)

- At least one render test and one interaction/behavior test when applicable
- Wrap required providers (Theme/Settings/navigation wrappers)
- Assert user-visible behavior, not internals

---

## Anti-Patterns — Never Do These

### AP-1: Copy-paste components across screens
**The problem:** 5 drill screens have 200+ lines each that are 90% identical. 5 menu screens have identical `makeStyles` blocks.

**Why it's bad:** A bug fix or style change must be applied in 5 places. One missed = inconsistency.

**The fix:** Extract shared components. One change propagates everywhere.

```tsx
// ANTI-PATTERN: BJDrillScreen.tsx (200 lines), TCPDrillScreen.tsx (200 lines), ...
// CORRECT: shared/DrillScreen/ (colocated component folder) used by BJ, TCP, CP, THU, RK
```

### AP-2: Cross-feature imports
**The problem:** `BJDrillScreen` imports `NumberPad` from `roulette-training/components/`.

**Why it's bad:** Creates hidden coupling between unrelated features. Renaming or moving `NumberPad` breaks BJ silently.

**The fix:** Any component used by 2+ features lives in `src/components/`.

### AP-3: Hardcoded colors
**The problem:** `color: '#FF6B00'` in BJDrillScreen instead of `colors.status.streak`.

**Why it's bad:** Theme switching (midnight/casino-green) has no effect. The color is frozen.

**The fix:** Always use `colors.*` tokens. If the token doesn't exist, add it to `themes.ts`.

### AP-4: Re-deriving values the hook already provides
**The problem:** BJDrillScreen calls `useDrillState()` but then recalculates `canSubmit`, `accuracy`, and `upcomingMultiplier` itself.

**Why it's bad:** If the hook's logic changes, the screen's local copy won't update. Two sources of truth.

**The fix:** Use what the hook returns directly.

### AP-5: Re-export wrapper files with no logic
**The problem:** `src/features/roulette-training/utils/randomUtils.ts` only re-exports from `src/utils/randomUtils.ts`.

**Why it's bad:** Creates a false impression of two separate utilities. Pointless indirection.

**The fix:** Delete the wrapper. Update imports to point to the canonical location.

### AP-6: `makeStyles` defined inside the component
**The problem:**
```tsx
export default function MyScreen() {
  function makeStyles(colors) { ... }   // inside component = re-created every render
}
```
**Why it's bad:** `makeStyles` is recreated on every render, defeating the purpose of `useMemo`.

**The fix:** Define `makeStyles` at the bottom of the file, outside the component.

### AP-7: Static `StyleSheet.create` with theme colors
**The problem:**
```tsx
const rkStyles = StyleSheet.create({
  numberChip: { backgroundColor: '#006400' },  // hardcoded at module load
});
```
**Why it's bad:** Static `StyleSheet.create` at module level can't respond to theme changes.

**The fix:** Any style that uses a color must go through `makeStyles(colors)`.

### AP-8: Array index used as key in dynamic lists
**The problem:**
```tsx
{items.map((item, index) => (
  <Chip key={index} label={item.label} />
))}
```
**Why it's bad:** Reordering/inserting items can reuse wrong component instances and produce subtle UI bugs.

**The fix:** Use stable domain keys (`item.id`, `item.code`, etc.).

### AP-9: Side effects in render path
**The problem:**
```tsx
export default function DrillScreen() {
  if (isCorrect) playSoundEffect('success'); // runs during render
  return <View />;
}
```
**Why it's bad:** Render must stay pure; side effects in render cause duplicate calls and unpredictable behavior.

**The fix:** Trigger side effects in event handlers or in `useEffect` with explicit dependencies.

### AP-10: `useEffect` without cleanup for listeners/timers
**The problem:**
```tsx
useEffect(() => {
  const subscription = AppState.addEventListener('change', onAppStateChange);
  setInterval(tick, 1000);
}, []);
```
**Why it's bad:** Causes leaks and duplicate callbacks after remounts.

**The fix:** Always return cleanup for timers/subscriptions/listeners.

---

## Code Smells — Watch Out For

| Smell | Example | Fix |
|---|---|---|
| Giant screen file (>250 lines) | Any drill screen before refactor | Extract sub-components or use shared component |
| Identical `makeStyles` in 2+ files | BJ + TCP + CP menu screens | Shared component with single `makeStyles` |
| Relative import going up 2+ levels | `../../roulette-training/...` | Use path alias `@components/...` |
| `useState` for something a hook already tracks | Local `streak` when `useDrillState` has it | Use the hook |
| String literals for theme colors | `'#FF6B00'`, `'#22c55e'` | Use `colors.*` tokens |
| Feature importing from another feature | `features/bj/` imports from `features/roulette-training/` | Move to `src/components/` |
| `any` type in hook signature | `drillType: any` in `useDrillState` | Use a union type or generic |
| Re-export file with no transformation | `randomUtils.ts` just re-exporting | Delete wrapper, update imports |
| Index key for dynamic list items | `key={index}` in reorderable chips/cards | Use a stable domain key |
| Effect with broad or incorrect dependencies | `useEffect(..., [state])` when only one field is needed | Narrow dependencies; split effects by responsibility |
| Single screen owns too many concerns | rendering + scoring + haptics + persistence in one file | Move logic to hooks/services and keep screen orchestration-only |

---

## Senior-Level Guardrails (Scalable RN)

### DRY Decision Rules

Duplicate code is not always bad; unstable abstractions are worse. Use this decision rule:

| Situation | Action |
|---|---|
| Same logic/UI appears in **2+ files** with same behavior | Extract now to shared hook/component |
| Similar shape but expected to diverge by game rules soon | Keep local, add TODO + revisit at 3rd usage |
| Shared utility has more condition flags than call sites can explain | Split by domain instead of growing a “god util” |

### Complexity Budgets (Smell Thresholds)

When a file crosses these thresholds, refactor before adding more behavior:
- Screen component > ~220 lines
- Custom hook > ~160 lines
- Function > ~40 lines or >3 nested condition levels
- Component props > ~12 fields (consider grouping into typed objects)

### Hooks & Effects Hygiene

- Keep one responsibility per `useEffect` (subscription, sync, analytics, etc.)
- Prefer derived values (`useMemo`) over duplicated local state
- Use functional updates (`setState(prev => ...)`) when new state depends on previous state
- Never suppress exhaustive-deps without explaining why in a short comment and code-review discussion

### React Native Performance Baselines

- Use `FlatList`/`SectionList` for long collections (avoid `.map()` for large scroll lists)
- Memoize expensive row components and pass stable handlers
- Avoid inline object/array props in hot render paths when they trigger child re-renders
- Keep animations/native interactions off heavy synchronous JS work where possible

### API for Shared Components/Hooks

- Expose minimal public API from `index.ts` files
- Prefer domain names over generic names (`calculateRoulettePayout`, not `calculateValue`)
- Shared hooks return stable, typed contracts; avoid leaking internal mutable objects

---

## Architecture Reference

### Navigation Stack
- Root: `AppNavigator` (`src/navigation/AppNavigator.tsx`)
- Each feature has its own `*StackParamList` and `navigation.tsx`
- HomeScreen: `headerShown: false`
- AppNavigator uses `useTheme` for header background and tint color

### State Management
- **Redux**: `src/store/` — used for roulette game state
- **Context**: `src/contexts/` — theme and settings (persisted via AsyncStorage)
- **Local state**: `useState` inside screens for training session state
- **Drill sessions**: `useDrillState` hook (`src/hooks/useDrillState.ts`) — use for all quiz-style screens

### Contexts
| Context | File | Persists |
|---|---|---|
| Theme | `src/contexts/ThemeContext.tsx` | `@app_theme` |
| Settings | `src/contexts/SettingsContext.tsx` | `@app_settings_sound`, `@app_settings_haptic` |

### Shared Components
| Component | Path | Used By |
|---|---|---|
| `NumberPad` | `src/components/NumberPad.tsx` | BJ, TCP, CP, THU, RK, Cash, PLO |
| `DrillScreen` | `src/components/shared/DrillScreen/` | BJ, TCP, CP, THU, RK drill screens |
| `DrillMenuScreen` | `src/components/shared/DrillMenuScreen/` | BJ, TCP, CP, THU, RK menu screens |
| `PlayingCard` | `src/components/PlayingCard.tsx` | BJ, TCP, CP, THU drill screens |
| `BaseTrainingModal` | `src/components/shared/BaseTrainingModal/` | Modal-based training screens |

### Shared Utilities
| File | Purpose |
|---|---|
| `src/utils/sevenCardBestHand.ts` | `bestFiveFromSeven`, `thuDealerQualifies` |
| `src/utils/cardUtils.ts` | Card deck utilities |
| `src/utils/randomUtils.ts` | `getRandomInt`, `getRandomElement`, `shuffleArray`, etc. |
| `src/utils/blackjackEvaluator.ts` | BJ hand evaluation |
| `src/utils/threeCardEvaluator.ts` | TCP hand evaluation |
| `src/utils/fiveCardEvaluator.ts` | 5-card hand evaluation |

---

## Game Rules Reference (Dealer Training)

### Blackjack
- No hole card, stand on all 17s, 6 decks
- Super Seven = same **SUIT** (not same color)
- 3:2 payout, two insurance types

### Three Card Poker
- Ante Bonus: 4:1 / 3:1 / 1:1 (not standard 5:1/4:1/1:1)
- Ante Bonus pays **even when player loses the hand**

### Caribbean Poker
- 6 boxes, Bonus bet fixed €1
- Swap costs 1 Ante, Bonus halved after swap
- A-K qualification for dealer

### Texas Hold'em Ultimate
- 6 boxes, 3×/4× pre-flop raise
- Ante always returned when dealer doesn't qualify
- Trips Plus: Flush=7:1, Straight=4:1
- Blind pushes on less than Straight wins

### Roulette
- European single 0
- Even-money bets lose on 0
- Sector validation: Zero sector (0,3,12,15,26,32,35) also counts as Voisins

---

## Common Pitfalls

| Mistake | Fix |
|---|---|
| Hardcoded colors | Use `colors.*` from `useTheme()` |
| No `tsc --noEmit` after changes | Always run before marking done |
| Forgetting `isProcessing` guard | Add to every training screen handler |
| Relative imports | Use path aliases (`@contexts/`, `@utils/`, `@hooks/`, etc.) |
| `overflow` missing on rotated views | Add `overflow: 'hidden'` to prevent scroll |
| Sound/haptic without settings check | Always check `soundEnabled` / `hapticEnabled` |
| `makeStyles` inside component | Define outside component, pass `colors` as argument |
| Cross-feature import | Move component to `src/components/` |
| Re-deriving hook values locally | Use values returned by `useDrillState` directly |
| Same component in 2+ feature folders | Extract to `src/components/shared/` |

---

## File Naming Conventions

```
screens/    → PascalCase + Screen suffix     → BlackjackTrainingScreen.tsx
components/ → PascalCase                    → PlayerPosition.tsx
utils/      → camelCase                     → scenarioGenerator.ts, payouts.ts
types/      → index.ts per feature          → types/index.ts
hooks/      → camelCase + use prefix        → useExerciseState.ts, useDrillState.ts
constants/  → camelCase                     → betConfigs.ts
```

---

## Adding a New Training Feature

1. Create `src/features/<name>-training/` with subfolders: `screens/`, `components/`, `types/`, `utils/`
2. Define types in `types/index.ts` — scenario type must implement `BaseDrillScenario`
3. Add scenario generator in `utils/scenarioGenerator.ts`
4. Build menu screen using `DrillMenuScreen` from `@components/shared/DrillMenuScreen`
5. Build drill screen using `DrillScreen` from `@components/shared/DrillScreen`
6. Add navigation: create `navigation.tsx` with param list, register in `AppNavigator`
7. Add entry card to `HomeScreen` `CATEGORIES` array
8. Run the full **Merge Gate** commands from the top of this guide

---

## Feature Refactor Focus Checks (when touching drill/menu code)

Use the top-level **Definition of Done** as the canonical PR checklist. Use this section only for drill/menu-specific refactors:

- [ ] `makeStyles` is defined outside the component
- [ ] No values are re-derived locally when `useDrillState` already returns them
- [ ] Menu screens use `DrillMenuScreen`
- [ ] Drill screens use `DrillScreen`
- [ ] `NumberPad` is imported from `@components/NumberPad`
