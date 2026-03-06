# Casino Training App — Coding Guide

**Last Updated**: March 2026 | **Status**: Production | **Stack**: React Native + Expo + TypeScript

---

## Quick Rules by Priority

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
- `src/components/shared/DrillMenuScreen.tsx` — for all game menu screens (BJ, TCP, CP, THU, RK)
- `src/components/shared/DrillScreen.tsx` — for all game drill screens (BJ, TCP, CP, THU, RK)
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

---

## Anti-Patterns — Never Do These

### AP-1: Copy-paste components across screens
**The problem:** 5 drill screens have 200+ lines each that are 90% identical. 5 menu screens have identical `makeStyles` blocks.

**Why it's bad:** A bug fix or style change must be applied in 5 places. One missed = inconsistency.

**The fix:** Extract shared components. One change propagates everywhere.

```tsx
// ANTI-PATTERN: BJDrillScreen.tsx (200 lines), TCPDrillScreen.tsx (200 lines), ...
// CORRECT: DrillScreen.tsx (200 lines) used by BJ, TCP, CP, THU, RK
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
| `DrillScreen` | `src/components/shared/DrillScreen.tsx` | BJ, TCP, CP, THU, RK drill screens |
| `DrillMenuScreen` | `src/components/shared/DrillMenuScreen.tsx` | BJ, TCP, CP, THU, RK menu screens |
| `PlayingCard` | `src/components/PlayingCard.tsx` | BJ, TCP, CP, THU drill screens |
| `BaseTrainingModal` | `src/components/shared/BaseTrainingModal.tsx` | Modal-based training screens |

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
8. Run `npx tsc --noEmit` — zero errors required

---

## Refactoring Checklist (apply when touching existing code)

- [ ] No hardcoded colors — all through `colors.*`
- [ ] No cross-feature imports
- [ ] `makeStyles` defined outside the component
- [ ] No values re-derived locally that `useDrillState` already returns
- [ ] Menu screens use `DrillMenuScreen`
- [ ] Drill screens use `DrillScreen`
- [ ] `NumberPad` imported from `@components/NumberPad`
- [ ] All imports use path aliases (no `../../`)
- [ ] `npx tsc --noEmit` passes
