# Common Mistakes in This Codebase

Updated: 2026-03-10
Owner: @ivans

## Purpose
Capture high-frequency mistakes so AI and humans avoid repeating technical debt patterns.

## Mistakes and Corrections

1. **Using `useState` for domain state**
   - Wrong: `const [progress, setProgress] = useState(0)` in component.
   - Correct: Move to Redux slice; pull via custom hook.
   - Reference: `src/store/rouletteSlice.ts`, `src/hooks/useDrillState.ts`

2. **Calling `useSelector` multiple times in one component**
   - Wrong: Multiple independent `useSelector` calls scattered in component.
   - Correct: Extract to a single custom hook wrapping all selectors.
   - Reference: `src/hooks/useDrillState.ts` (wraps multiple roulette selectors)

3. **Not using `createSelector` for derived state**
   - Wrong: Selectors return unoptimized nested objects.
   - Correct: Use `createSelector` for memoized derived values.
   - Reference: `src/store/rouletteSlice.ts` (selector patterns)

4. **Importing feature folders from other features**
   - Wrong: `import { TrainingScreen } from '../../../features/blackjack/screens/TrainingScreen'` in roulette feature.
   - Correct: Only import from shared/services; use Redux for cross-feature data.
   - Reference: Check feature imports in `src/features/*`

5. **AsyncStorage access scattered across components**
   - Wrong: Components call `AsyncStorage.getItem()` directly.
   - Correct: Dispatch thunks that call `storage.service.ts`.
   - Reference: `src/services/storage.service.ts`, `src/store/rouletteSlice.ts`

6. **No error boundaries around feature trees**
   - Wrong: Feature component tree without ErrorBoundary.
   - Correct: Wrap feature with FeatureErrorBoundary or ErrorBoundary.
   - Reference: `src/components/withErrorBoundary/withErrorBoundary.tsx`

7. **Mixing TypeScript `any` types in production code**
   - Wrong: Function signatures with `any`.
   - Correct: Define proper interfaces; use TypeScript strict mode.
   - Reference: Check `src/types/` for domain interfaces; see `tsconfig.json` strict mode.

8. **Not mocking Redux in component tests**
   - Wrong: Component tests with Redux not mocked.
   - Correct: Wrap with mock Redux provider; pass initial state.
   - Reference: `src/test-utils/index.ts` (test utilities)

9. **Storing server/persistence data in component local state**
   - Wrong: `const [chipStack, setChipStack] = useState(initialChips)`.
   - Correct: Persist to Redux and AsyncStorage via thunks.
   - Reference: `src/store/rouletteSlice.ts`, `src/services/storage.service.ts`

10. **Deeply nested object selectors without createSelector**
    - Wrong: `useSelector(state => state.feature.ui.modals.isOpen)`.
    - Correct: Create selector with `createSelector`; return memoized value.
    - Reference: `src/store/` slice patterns

11. **Forgetting TypeScript types on Redux state / reducers**
    - Wrong: `const initialState = { count: 0 }; // no type`
    - Correct: `interface DemoState { count: number }; const initialState: DemoState = { count: 0 }`
    - Reference: `src/store/rouletteSlice.ts` (typed slices)

12. **Not separating UI state from domain state**
    - Wrong: Mixing modal state, settings, and training progress in one slice.
    - Correct: Separate slices or selective properties in slice.
    - Reference: `src/store/rouletteSlice.ts` (example domain state)

13. **Large monolithic feature components**
    - Wrong: 500+ line component handling layout, state, rendering.
    - Correct: Break into smaller components; use hooks for logic extraction.
    - Reference: See breakdown in feature folders like `src/features/*/components/`

14. **Hardcoded values instead of constants**
    - Wrong: Magic numbers and strings sprinkled in code.
    - Correct: Define in `constants/`, `config/`, or types.
    - Reference: `src/constants/difficulty.ts`, `src/config/betConfigs.ts`

15. **Not handling Redux AsyncThunk fulfilled/rejected states**
    - Wrong: Dispatch thunk and ignore `rejected` state in reducer.
    - Correct: Add both `fulfilled` and `rejected` cases; track error state.
    - Reference: `src/store/` (thunk patterns)

## Usage Rule
Before implementing a feature or refactor, scan this file and explicitly check that no listed mistake is being introduced.

## Pattern Links
- Mistakes 1-3, 10-11: `.ai/frontend/redux.md`, `.ai/frontend/hooks.md`
- Mistake 4: `.ai/architecture/clean-architecture.md`
- Mistake 5: `.ai/frontend/overview.md`, `src/services/storage.service.ts`
- Mistake 6: `.ai/reference/common-mistakes.md`, `.ai/frontend/components.md`
- Mistakes 7-8: `.ai/workflows/testing-strategy.md`, `src/test-utils/`
- Mistakes 9-14: `.ai/workflows/adding-feature.md`, `.ai/frontend/overview.md`
- Full flow reference: `.ai/workflows/adding-feature.md`
