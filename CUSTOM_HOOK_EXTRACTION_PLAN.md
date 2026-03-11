# Custom Hook & Utility Extraction Plan

## Strategy
- Identify logic (input handling, state toggling, calculations, etc.) repeated in 2+ components.
- Audit for custom hook opportunities: components with 3+ related useState/useEffect/useCallback.
- Remove redundant/wrapper utilities (e.g., files that only re-export another).
- Refactor to use shared components/hooks for repeated JSX/makeStyles blocks.
- Reduce duplicated derived state: use what hooks return directly.

## Next Steps
- Scan main features/components for repeated logic.
- List concrete extraction/refactor candidates.
- Update this file with findings and recommendations as scanning progresses.

---

## Extraction/Refactor Candidates

### 1. Themed makeStyles Pattern ✅ ALREADY IMPLEMENTED
- The `useThemedStyles` hook already exists at `src/hooks/useThemedStyles.ts`
- All shared components (InstructionBox, ReferenceCard, etc.) are already using it
- No further action needed

### 2. renderWithTheme Test Helper ⏳ IN PROGRESS
- Test files repeatedly define a `renderWithTheme` helper for wrapping components in ThemeProvider
- Found 300+ occurrences across test files
- **Action:** Created shared test utility at `src/test-utils/renderWithTheme.tsx`
- Usage: Replace local `renderWithTheme` definitions with:
  ```typescript
  import { renderWithTheme } from '@test-utils';
  ```
- **Next step:** Update test files to use the shared utility

### 3. getChips Calculation Logic ⏳ IN PROGRESS
- The `getChips` function (chip breakdown for cash) was in CashDisplay.tsx
- **Action:** Extracted to shared utility at `src/utils/chipUtils.ts`
- Updated CashDisplay to use `@utils/chipUtils`
- **Next step:** Check for other places with similar chip breakdown logic

### 4. useCallback Handlers for Dropdowns/Selections
- Many modals/components define similar `useCallback` handlers for dropdown selection, toggling, and reset.
- Appears in:
	- src/features/cash-conversion-training/components/CashConversionTrainingModal/CashConversionTrainingModal.tsx
	- src/features/roulette-training/components/TrainingSelectionModal.tsx
	- (Check for similar patterns in other modals)
- **Action:** Ensure all use the shared `useCascadingDropdowns` hook, and extend it if needed.

### 5. Redundant Derived State ✅ ALREADY HANDLED
- Reviewed components for redundant derived state patterns
- Found that components are already using shared utilities:
  - `calculateAccuracy` from `@utils/accuracy` is used by `ScoreAccuracyText`
  - `ExerciseStats` uses the shared `ScoreAccuracyText` component
  - No significant redundant derived state found
- No further action needed

---

## Progress Log

### 2026-03-10
- ✅ Created `src/test-utils/renderWithTheme.tsx` - shared test utility
- ✅ Created `src/test-utils/index.ts` - exports for test utilities  
- ✅ Created `src/utils/chipUtils.ts` - extracted getChips function
- ✅ Updated CashDisplay.tsx to use extracted chipUtils
- Confirmed `useThemedStyles` hook already exists at `src/hooks/useThemedStyles.ts`

### Next Steps
- [ ] Update test files to use `renderWithTheme` from `@test-utils` (optional - utility is available)
- [ ] Search for other places with chip breakdown logic to use chipUtils (optional)
