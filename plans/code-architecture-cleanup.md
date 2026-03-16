# Code Architecture Cleanup Plan

## Context
This plan fixes architecture and consistency issues identified in a senior-level review.
Redux is intentionally kept (needed for future backend/admin features).

## Execution Rules
- Run `npx tsc --noEmit` after **every task**. Zero errors required before proceeding.
- Run `npx jest --passWithNoTests` after every task.
- Commit after each task separately. Do NOT batch tasks.
- Do not modify logic, only move/reorganize/rename.

---

## Task 1: Move `src/components/roulette/` into roulette-training feature [P0]

### Problem
Feature-specific roulette UI components live in the global `src/components/` folder.
All 5 consumers are in `src/features/roulette-training/` — no cross-feature usage.
This violates the P0 rule: no feature-specific code in shared folders.

### Step 1.1 — Move the entire folder
Move `src/components/roulette/` → `src/features/roulette-training/components/roulette-ui/`

All files to move (preserve sub-folders):
```
RouletteChip.tsx
RouletteChip.test.tsx
RouletteColumnBets.tsx
RouletteColumnBets.test.tsx
RouletteLayout.tsx
RouletteLayout.test.tsx
RouletteNumberCell.tsx
RouletteNumberCell.test.tsx
RouletteNumberGrid.tsx
RouletteNumberGrid.test.tsx
RouletteOutsideBets.tsx
RouletteOutsideBets.test.tsx
RouletteZeroColumn.tsx
RouletteZeroColumn.test.tsx
TrainingSelectionModal.tsx
TrainingSelectionModal.test.tsx
hooks/useRouletteBets.ts
hooks/__tests__/useRouletteBets.test.ts
styles/roulette.styles.ts
styles/callBetsRouletteStyles.ts
index.ts
```

### Step 1.2 — Update imports in 5 consumer files
In each file below, change:
```ts
import { ... } from '@components/roulette';
```
to:
```ts
import { ... } from '@features/roulette-training/components/roulette-ui';
```

Files to update:
1. `src/features/roulette-training/components/ExerciseLayout/ExerciseVisualReference.tsx`
2. `src/features/roulette-training/screens/menu/RouletteExercisesScreen/RouletteExercisesScreen.tsx`
3. `src/features/roulette-training/screens/reference/RouletteTrainingScreen/RouletteTrainingScreen.tsx`
4. `src/features/roulette-training/screens/reference/RouletteLayoutViewScreen/RouletteLayoutViewScreen.tsx`
5. `src/features/roulette-training/screens/reference/RouletteLayoutPracticeScreen/RouletteLayoutPracticeScreen.tsx`

> Note: Styles files inside the roulette-ui folder may use relative imports between each other.
> Check and update any `../styles/` or `./styles/` relative paths inside moved files if they break.

### Step 1.3 — Delete empty folder
Delete `src/components/roulette/` (should be empty after move).

### Verification
- `npx tsc --noEmit` → 0 errors
- `npx jest --passWithNoTests` → all tests pass
- `src/components/roulette/` no longer exists

---

## Task 2: Colocate root screens AND migrate home sub-components [P0 + P1]

### Problem A — Root screens are flat files
`src/screens/HomeScreen.tsx`, `ProgressScreen.tsx`, `SettingsScreen.tsx` are flat files.
Every feature screen already uses the colocation pattern (folder + types + tsx + test + index).
Root screens should match.

### Problem B — Home sub-components are in global components folder
`src/components/home/GameCard.tsx` and `GameCategorySection.tsx` are used **only** by HomeScreen.
They belong inside HomeScreen's folder, not in the global components folder.

---

### Step 2.1 — Colocate HomeScreen

Create folder `src/screens/HomeScreen/`

Move:
- `src/screens/HomeScreen.tsx` → `src/screens/HomeScreen/HomeScreen.tsx`
- `src/screens/HomeScreen.test.tsx` → `src/screens/HomeScreen/HomeScreen.test.tsx`

Create `src/screens/HomeScreen/index.ts`:
```ts
export { default } from './HomeScreen';
```

### Step 2.2 — Move home sub-components into HomeScreen folder

Move (from → to):
- `src/components/home/GameCard.tsx` → `src/screens/HomeScreen/GameCard.tsx`
- `src/components/home/GameCard.test.tsx` → `src/screens/HomeScreen/GameCard.test.tsx`
- `src/components/home/GameCategorySection.tsx` → `src/screens/HomeScreen/GameCategorySection.tsx`
- `src/components/home/GameCategorySection.test.tsx` → `src/screens/HomeScreen/GameCategorySection.test.tsx`

Delete `src/components/home/` folder (including its `index.ts`).

### Step 2.3 — Fix imports inside HomeScreen.tsx

In `src/screens/HomeScreen/HomeScreen.tsx`, find the import from `@components/home`:
```ts
import { GameCard, GameCategorySection } from '@components/home';
// or
import { GameCategorySection } from '@components/home';
```
Replace with relative imports (since they are now in the same folder):
```ts
import GameCard from './GameCard';
import GameCategorySection from './GameCategorySection';
```
> Check the actual import style in HomeScreen.tsx (default vs named) and match it.

### Step 2.4 — Colocate ProgressScreen

Create folder `src/screens/ProgressScreen/`

Move:
- `src/screens/ProgressScreen.tsx` → `src/screens/ProgressScreen/ProgressScreen.tsx`
- `src/screens/ProgressScreen.test.tsx` → `src/screens/ProgressScreen/ProgressScreen.test.tsx`

Create `src/screens/ProgressScreen/index.ts`:
```ts
export { default } from './ProgressScreen';
```

### Step 2.5 — Colocate SettingsScreen

Create folder `src/screens/SettingsScreen/`

Move:
- `src/screens/SettingsScreen.tsx` → `src/screens/SettingsScreen/SettingsScreen.tsx`
- `src/screens/SettingsScreen.test.tsx` → `src/screens/SettingsScreen/SettingsScreen.test.tsx`

Create `src/screens/SettingsScreen/index.ts`:
```ts
export { default } from './SettingsScreen';
```

### Step 2.6 — Check AppNavigator.tsx imports

Open `src/navigation/AppNavigator.tsx`.
If it imports screens like:
```ts
import HomeScreen from '@screens/HomeScreen';
```
This already works via the `index.ts` barrel — **no change needed**.

If it imports with full path like:
```ts
import HomeScreen from '@screens/HomeScreen/HomeScreen';
```
Change to:
```ts
import HomeScreen from '@screens/HomeScreen';
```

### Verification
- `npx tsc --noEmit` → 0 errors
- `npx jest --passWithNoTests` → all tests pass
- `src/components/home/` no longer exists
- `src/screens/` contains only folders (HomeScreen/, ProgressScreen/, SettingsScreen/), no flat .tsx files

---

## Task 3: Colocate PLO flat components [P1]

### Problem
`PLOFeedbackCard.tsx` and `PLOScoreHeader.tsx` are flat files in
`src/features/plo-training/components/` while every other component in that
folder uses the colocation pattern (folder + tsx + test + index).
They are also missing from the components `index.ts` barrel export.

### Step 3.1 — Colocate PLOFeedbackCard

Create folder `src/features/plo-training/components/PLOFeedbackCard/`

Move:
- `src/features/plo-training/components/PLOFeedbackCard.tsx` → `src/features/plo-training/components/PLOFeedbackCard/PLOFeedbackCard.tsx`
- `src/features/plo-training/components/PLOFeedbackCard.test.tsx` → `src/features/plo-training/components/PLOFeedbackCard/PLOFeedbackCard.test.tsx`

Create `src/features/plo-training/components/PLOFeedbackCard/index.ts`:
```ts
export { default } from './PLOFeedbackCard';
```
> If `PLOFeedbackCard.tsx` exports a Props interface (e.g. `export interface PLOFeedbackCardProps`),
> also add: `export type { PLOFeedbackCardProps } from './PLOFeedbackCard';`

### Step 3.2 — Colocate PLOScoreHeader

Create folder `src/features/plo-training/components/PLOScoreHeader/`

Move:
- `src/features/plo-training/components/PLOScoreHeader.tsx` → `src/features/plo-training/components/PLOScoreHeader/PLOScoreHeader.tsx`
- `src/features/plo-training/components/PLOScoreHeader.test.tsx` → `src/features/plo-training/components/PLOScoreHeader/PLOScoreHeader.test.tsx`

Create `src/features/plo-training/components/PLOScoreHeader/index.ts`:
```ts
export { default } from './PLOScoreHeader';
```

### Step 3.3 — Add to feature components barrel

Open `src/features/plo-training/components/index.ts`.

Add these two lines (match the existing export style in the file):
```ts
export { default as PLOFeedbackCard } from './PLOFeedbackCard';
export { default as PLOScoreHeader } from './PLOScoreHeader';
```

### Step 3.4 — Verify imports in PLOGameTrainingScreen

Open `src/features/plo-training/screens/PLOGameTrainingScreen/PLOGameTrainingScreen.tsx`.

Find the imports for PLOFeedbackCard and PLOScoreHeader. Check what path they use:
- If they import via relative path like `'../../components/PLOFeedbackCard'` →
  this now resolves to the new folder's `index.ts` — **no change needed**.
- If they import via relative path with `.tsx` extension like `'../../components/PLOFeedbackCard.tsx'` →
  change to `'../../components/PLOFeedbackCard'` (no extension).

### Verification
- `npx tsc --noEmit` → 0 errors
- `npx jest --passWithNoTests` → all tests pass
- No flat `.tsx` files remain directly in `src/features/plo-training/components/` (only sub-folders)
- PLOFeedbackCard and PLOScoreHeader are exported from the components `index.ts`

---

## Task 4: Standardize `useThemedStyles` pattern [P1]

### Problem
19 files use the verbose style pattern instead of the `useThemedStyles` hook that
already exists at `src/hooks/useThemedStyles.ts`. This creates two competing
patterns for the same thing.

### The two patterns

**Verbose (old) — REPLACE this:**
```tsx
import { useMemo } from 'react';
import { useTheme } from '@contexts/ThemeContext';

const { colors } = useTheme();
const styles = useMemo(() => makeStyles(colors), [colors]);
```

**Clean (new) — USE this:**
```tsx
import { useThemedStyles } from '@hooks/useThemedStyles';

const styles = useThemedStyles(makeStyles);
```

### Important: When to keep `useTheme` alongside `useThemedStyles`

Some files need `colors` at runtime for **non-style props** (e.g. React Native `Switch`
`trackColor`/`thumbColor`, or React Navigation `headerStyle`).
In these cases:
- Keep `const { colors } = useTheme()` for the runtime color values
- Use `const styles = useThemedStyles(makeStyles)` for StyleSheet styles
- Remove `useMemo` and the `makeStyles(colors)` call

### Files to update

Read each file before editing. Apply the correct transformation based on whether
the file needs `colors` for non-style runtime props.

**Group A — Pure style-only (no runtime color usage): Replace entirely**

1. `src/components/InstallButton/InstallButton.tsx`
2. `src/components/shared/AccentModeCard/AccentModeCard.tsx`
3. `src/components/shared/InfoSection/InfoSection.tsx`
4. `src/components/shared/MenuScreenHeader/MenuScreenHeader.tsx`
5. `src/components/shared/PrimaryButton/PrimaryButton.tsx`
6. `src/components/shared/StartTrainingButton/StartTrainingButton.tsx`
7. `src/features/racetrack-position-training/components/PositionSidebarFeedback.tsx`
8. `src/features/racetrack-position-training/components/PositionSidebarHeader.tsx`
9. `src/features/racetrack-position-training/components/PositionTrainingSidebar.tsx`
10. `src/features/racetrack-position-training/components/PositionWheelOrderCard.tsx`
11. `src/features/racetrack-sector-training/components/SectorReferenceCard.tsx`
12. `src/features/racetrack-sector-training/components/SectorTrainingHeader.tsx`
13. `src/features/roulette-training/components/LayoutPracticeGuides.tsx`
14. `src/features/roulette-training/components/LayoutPracticeHeader.tsx`
15. `src/features/plo-training/components/PLOFeedbackCard/PLOFeedbackCard.tsx`
16. `src/features/plo-training/components/PLOScoreHeader/PLOScoreHeader.tsx`

For each: replace `const { colors } = useTheme()` + `useMemo(makeStyles)` with
`const styles = useThemedStyles(makeStyles)`. Remove `useMemo` import if unused.
Add `import { useThemedStyles } from '@hooks/useThemedStyles'`.
Remove `import { useTheme } from '@contexts/ThemeContext'` if no longer used.

**Group B — Navigation files with runtime header colors: Partial update**

17. `src/features/call-bets-training/navigation.tsx`
18. `src/features/plo-training/navigation.tsx`

These use `colors` for React Navigation `headerStyle`/`headerTintColor` screen options.
They still need `const { colors } = useTheme()` for header props.

Check if there is also a `StyleSheet.create` call in these files:
- If YES → add `useThemedStyles` for that part and keep `useTheme` for header colors.
- If NO StyleSheet.create → `useThemedStyles` is not needed; just keep `useTheme`.

**Group C — AppNavigator: Keep as-is (useTheme only)**

19. `src/navigation/AppNavigator.tsx`

This file uses `colors` only for header `backgroundColor` and `tintColor` in screen options —
there is no `StyleSheet.create`. Do NOT add `useThemedStyles`. Just remove any
`useMemo(makeStyles)` pattern if it exists (it should not).

### After updating all files

Run a global search for this pattern:
```
useMemo\(\(\) => makeStyles\(colors\)
```
Result should be **0 matches** across the codebase.

### Verification
- `npx tsc --noEmit` → 0 errors
- `npx jest --passWithNoTests` → all tests pass
- Grep for `useMemo(() => makeStyles(colors)` → 0 results

---

## Task 5: Clean up AppNavigator.tsx screenOptions [P2]

### Problem
`AppNavigator.tsx` has the header `screenOptions` object inline inside the component,
mixing navigation structure with styling config. Extracting it improves readability.

### Step 5.1 — Read the file first

Read `src/navigation/AppNavigator.tsx` in full to understand the current structure.

### Step 5.2 — Extract screenOptions to a named function

The header style depends on `colors` from `useTheme()`, so it must be a function, not a constant.

**Before** (roughly):
```tsx
function AppNavigator() {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background.secondary },
        headerTintColor: colors.text.gold,
        // ... other options
      }}
    >
```

**After:**
```tsx
function buildScreenOptions(colors: AppColors) {
  return {
    headerStyle: { backgroundColor: colors.background.secondary },
    headerTintColor: colors.text.gold,
    // ... other options (copy exactly from current code)
  } as const;
}

function AppNavigator() {
  const { colors } = useTheme();
  return (
    <Stack.Navigator screenOptions={buildScreenOptions(colors)}>
```

Place `buildScreenOptions` outside the component, above it in the file.

Import `AppColors` from `@styles/themes` if not already imported:
```ts
import type { AppColors } from '@styles/themes';
```

### Verification
- `npx tsc --noEmit` → 0 errors
- `npx jest --passWithNoTests` → all tests pass
- AppNavigator.tsx is readable: the component body only contains `<Stack.Navigator>` with route children

---

## Summary Checklist

| Task | Priority | Files affected | Done? |
|------|----------|---------------|-------|
| 1. Move roulette components to roulette-training feature | P0 | ~20 moved + 5 import updates | [ ] |
| 2. Colocate root screens + migrate home components | P0+P1 | ~10 files | [ ] |
| 3. Colocate PLO flat components | P1 | 4 files + index update | [ ] |
| 4. Standardize useThemedStyles (19 files) | P1 | 19 files | [ ] |
| 5. Extract AppNavigator screenOptions | P2 | 1 file | [ ] |

**After all tasks complete:**
- `npx tsc --noEmit` → 0 errors
- `npx jest --passWithNoTests` → all green
- `src/components/roulette/` — does not exist
- `src/components/home/` — does not exist
- `src/screens/` — contains only folders (HomeScreen/, ProgressScreen/, SettingsScreen/)
- `src/features/plo-training/components/` — contains only folders, no flat .tsx files
- Grep `useMemo(() => makeStyles(colors)` → 0 results
