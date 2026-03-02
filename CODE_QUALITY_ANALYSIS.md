# Casino Training App - Code Quality Analysis Report

**Date:** March 2, 2026  
**Status:** Baseline Analysis - Ready for Improvements

---

## Executive Summary

This report identifies code quality issues across the Casino Training App codebase, including code smells, technical debt, DRY violations, large files, and architectural concerns. **Total Issues Found: 45+ across multiple categories.**

### Priority Breakdown

| Severity | Count | Impact |
|----------|-------|--------|
| 🔴 Critical | 8 | Must fix - affects architecture |
| 🟠 High | 12 | Should fix soon - code maintainability |
| 🟡 Medium | 15 | Nice to fix - minor improvements |
| 🟢 Low | 10+ | Optional - technical debt reduction |

---

## 🔴 CRITICAL ISSUES (Fix First)

### 1. Massive Code Duplication: Drill Screen Components
**Severity:** CRITICAL | **Impact:** HIGH | **Effort:** MEDIUM

**Problem:** Multiple drill screen components share ~90% identical code structure:
- [TCPDrillScreen.tsx](src/features/three-card-poker-training/screens/TCPDrillScreen.tsx)
- [THUDrillScreen.tsx](src/features/texas-holdem-ultimate-training/screens/THUDrillScreen.tsx)
- [BJDrillScreen.tsx](src/features/blackjack-training/screens/BJDrillScreen.tsx)
- [CPDrillScreen.tsx](src/features/caribbean-poker-training/screens/CPDrillScreen.tsx)
- [RKDrillScreen.tsx](src/features/roulette-knowledge-training/screens/RKDrillScreen.tsx)

**Duplicated Code Patterns:**
```typescript
// ALL five files contain identical patterns:
const [scenario, setScenario] = useState(() => generateScenario(drillType));
const [phase, setPhase] = useState<Phase>('asking');
const [selectedOption, setSelectedOption] = useState<string | null>(null);
const [userAmountStr, setUserAmountStr] = useState('');
const [isCorrect, setIsCorrect] = useState(false);
const [streak, setStreak] = useState(0);
const [sessionPoints, setSessionPoints] = useState(0);
const [sessionCorrect, setSessionCorrect] = useState(0);
const [sessionTotal, setSessionTotal] = useState(0);
```

**Estimated Duplication:** ~35-40KB across 5 files

**Solution:** Create a generic `BaseDrillScreen` component or custom hook `useDrillState()`
**STATUS: ✅ FIXED** - Created `src/hooks/useDrillState.ts` and refactored all 5 drill screens

---

### 2. Multiple `any` Type Violations
**Severity:** CRITICAL | **Status:** EXISTS | **Locations:** 6+ files

**Files with `any` Type:**
1. [RouletteTrainingScreen.tsx](src/features/roulette-training/screens/reference/RouletteTrainingScreen.tsx#L13) - Route prop
2. [RouletteLayoutPracticeScreen.tsx](src/features/roulette-training/screens/reference/RouletteLayoutPracticeScreen.tsx#L14) - Navigation prop
3. [ExerciseLayout.tsx](src/features/roulette-training/components/ExerciseLayout.tsx#L18) - placedBets array
4. [CashConversionTrainingScreen.tsx](src/features/cash-conversion-training/screens/CashConversionTrainingScreen.tsx#L16) - Route prop
5. [PLOTrainingScreen.tsx](src/features/plo-training/screens/PLOTrainingScreen.tsx#L7) - Route prop
6. [PLOMenuScreen.tsx](src/features/plo-training/screens/PLOMenuScreen.tsx#L6) - Navigation prop
7. [TrainingSelectionModal.tsx](src/components/roulette/TrainingSelectionModal.tsx#L171) - screenName casting

**Impact:** Loss of type safety, breaks catch-all type checking

**Solution:** Create proper typed interfaces for navigation and route props
**STATUS: ✅ FIXED** - All 7 production `any` types removed, full type safety restored

---

### 3. Large Files Over 10KB
**Severity:** CRITICAL | **Files:** 3 | **Total Size:** ~32KB

| File | Size | Issue |
|------|------|-------|
| [CalculationScreen.tsx](src/features/roulette-training/screens/exercises/CalculationScreen.tsx) | 10,141 chars (10.1 KB) | Complex logic, multiple concerns |
| [RacetrackLayout.tsx](src/features/racetrack/components/RacetrackLayout.tsx) | 10,809 chars (10.5 KB) | SVG + logic + styles mixed |
| calculations.test.ts | 11,277 chars (11.3 KB) | Monolithic test file |

**Root Cause:** Mixing of concerns - rendering, business logic, styling, and animation in single files

**Solution:** Extract concerns into separate files:
- Extract logic into custom hooks (`useCalculationState`, etc.)
- Extract styles into `.styles.ts` files
- Extract test suites into feature-specific test files

---

### 4. Missing Error Boundaries in Feature Modules
**Severity:** CRITICAL | **Status:** PARTIAL | **Coverage:** 1/10+ features

**Current State:**
- ✅ Global ErrorBoundary exists: [ErrorBoundary.tsx](src/components/ErrorBoundary.tsx)
- ❌ Feature-level error boundaries missing

**Missing Boundaries:**
- cash-conversion-training
- roulette-training
- racetrack
- plo-training
- blackjack-training
- caribbean-poker-training
- texas-holdem-ultimate-training
- three-card-poker-training
- roulette-knowledge-training
- call-bets-training

**Impact:** Feature crashes crash entire app

**Solution:** Wrap each feature with [FeatureErrorBoundary](src/components/FeatureErrorBoundary.tsx)

---

### 5. Cross-Feature Import Coupling
**Severity:** CRITICAL | **Instances:** 5+ | **Impact:** MEDIUM

**Problem:** Features import constants/utilities from other features:

```typescript
// src/features/call-bets-training/screens/CallBetsMenuScreen.tsx:4
import { COLORS, SPACING } from '../../roulette-training/constants/theme';
```

**Issues:**
- Creates circular dependencies risk
- Tight coupling between independent features
- Moving roulette-training breaks call-bets-training

**Solution:** Move shared constants to `src/styles/` and `src/constants/`

---

## 🟠 HIGH PRIORITY ISSUES (Fix Soon)

### 6. DRY Violation: Repeated Modal Implementation Patterns
**Severity:** HIGH | **Files:** 2+ | **Duplication:** ~80%

**Duplicated Files:**
- [TrainingSelectionModal.tsx](src/components/roulette/TrainingSelectionModal.tsx) - 22,986 chars
- [CashConversionTrainingModal.tsx](src/features/cash-conversion-training/components/CashConversionTrainingModal.tsx) - 21,230 chars

**Shared Patterns (80% duplicate):**
- Animation logic (fadeAnim, scaleAnim)
- Modal structure and layout
- Dropdown rendering pattern
- Style definitions

**Status:** ⚠️ Partially refactored to use [BaseTrainingModal](src/components/shared/BaseTrainingModal.tsx)

**Remaining Work:** 
- Update [CashConversionTrainingModal.tsx](src/features/cash-conversion-training/components/CashConversionTrainingModal.tsx) to extend BaseTrainingModal

---

### 7. Inconsistent Color Definition Usage
**Severity:** HIGH | **Files:** 20+ | **Type:** Code Smell

**Problem:** Colors defined in multiple places, not consistently used:

```typescript
// In src/styles/themes.ts and src/features/roulette-training/constants/theme.ts
export const COLORS = { ... }

// But in 20+ files:
backgroundColor: '#0a2f1f',  // Hardcoded instead of COLORS.background.primary
color: '#FFD700',           // Hardcoded instead of COLORS.text.gold
```

**Status:** ⚠️ Partially fixed in [BaseTrainingModal.tsx](src/components/shared/BaseTrainingModal.tsx) and [DropdownSelector.tsx](src/components/shared/DropdownSelector.tsx)

**Remaining Work:** Audit and replace hardcoded colors in:
- Feature menu screens
- Feature drill screens
- Utility components

---

### 8. Unused Imports Still Present
**Severity:** HIGH | **Files:** 3+ | **Impact:** Bundle size, readability

**Known Unused Imports:**
1. [CashConversionTrainingModal.tsx](src/features/cash-conversion-training/components/CashConversionTrainingModal.tsx):
   - `Pressable` - imported but removed from JSX
   - `Dimensions` - imported but `SCREEN_WIDTH`/`SCREEN_HEIGHT` not used

---

### 9. Dead Code: Unused Screen Files
**Severity:** HIGH | **Files:** 2 | **Reason:** Replaced by modal implementation

**Unused Files:**
- [DifficultySelectionScreen.tsx](src/features/cash-conversion-training/screens/DifficultySelectionScreen.tsx) - 3,531 chars
- [SectorSelectionScreen.tsx](src/features/cash-conversion-training/screens/SectorSelectionScreen.tsx) - 2,982 chars

**Status:** Not referenced in navigation, needs removal or re-enabling

---

### 10. Repeated State Management Patterns
**Severity:** HIGH | **Files:** 5 (Drill Screens) | **DRY Violation:** YES

**Pattern Repetition:**
Each drill screen file defines:
```typescript
const [scenario, setScenario] = useState(...);
const [phase, setPhase] = useState(...);
const [selectedOption, setSelectedOption] = useState(...);
const [streak, setStreak] = useState(0);
const [sessionPoints, setSessionPoints] = useState(0);
// ... 5+ more useState declarations
```

**Solution:** Extract to `useDrillScreenState(drillType, scenarioGenerator)` hook

---

### 11. Magic Numbers Scattered Throughout Code
**Severity:** HIGH | **Instances:** 15+ | **Type:** Code Smell

**Examples:**
```typescript
const possibleAmounts = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1500, 2000];
const CHIP_COUNT_OPTIONS = [1, 2, 3, 4, 5, 10, 15, 20, 25];
const streakMultiplier = streak * 0.5;  // Why 0.5?
const timeout = 500;  // Why this value?
const PADDING = 16;
const BORDER_RADIUS = 12;
```

**Files with Magic Numbers:**
- THUDrillScreen.tsx
- TCPDrillScreen.tsx
- BJDrillScreen.tsx
- CPDrillScreen.tsx

**Solution:** Extract all magic numbers to named constants with JSDoc comments

---

### 12. Console Statements in Production Code
**Severity:** HIGH | **Type:** Code Smell | **Locations:** 5+

**Files:**
- [ErrorBoundary.tsx](src/components/ErrorBoundary.tsx) - 2 console.error calls
- [withErrorBoundary.tsx](src/components/withErrorBoundary.tsx) - 2 console.error calls
- [FeatureErrorBoundary.tsx](src/components/FeatureErrorBoundary.tsx) - 2 console.error calls

**Issue:** No proper logging service exists

**Solution:** Implement centralized logger service

---

## 🟡 MEDIUM PRIORITY ISSUES (Nice to Fix)

### 13. Inconsistent Naming Conventions
**Severity:** MEDIUM | **Instances:** 10+ | **Type:** Code Quality

**Issues:**
- Mix of default and named exports
- Inconsistent hook naming patterns
- Inconsistent file suffixes

**Solution:** Audit and standardize per [DEVELOPMENT_STANDARDS.md](DEVELOPMENT_STANDARDS.md)

---

### 14. Missing Unit Tests for Utilities
**Severity:** MEDIUM | **Files:** 5+ | **Coverage Gap:** 20-30%

**Files Without Tests:**
- [validation.ts](src/features/call-bets-training/utils/validation.ts)
- [plo.utils.ts](src/features/plo-training/utils/plo.utils.ts)
- [racetrack.utils.ts](src/features/racetrack/utils/racetrack.utils.ts)
- [betGenerators.ts](src/features/roulette-training/utils/betGenerators.ts)
- [exerciseHelpers.ts](src/features/roulette-training/utils/exerciseHelpers.ts)

---

### 15. Missing Accessibility Labels
**Severity:** MEDIUM | **Type:** Accessibility | **Impact:** User Experience

**Affected Components:**
- Interactive elements lacking `accessible`, `accessibilityLabel`, `testID`
- Multiple features lack WCAG compliance

**Solution:** Add a11y props to all interactive elements

---

### 16. Inconsistent Error Handling
**Severity:** MEDIUM | **Pattern:** Divergent error handling patterns

**Issues:**
- Some utilities throw errors, others return null
- Some screens catch errors, others let them bubble
- No centralized error handling strategy

---

### 17. useState Hook Anti-patterns
**Severity:** MEDIUM | **Instances:** 3+ drill screens | **Type:** Performance

**Pattern:**
```typescript
const [sessionPoints, setSessionPoints] = useState(0);
const [sessionCorrect, setSessionCorrect] = useState(0);
const [sessionTotal, setSessionTotal] = useState(0);
```

**Better Approach:** Consolidate into single state object with `useReducer`

---

### 18. Missing JSDoc Comments
**Severity:** MEDIUM | **Coverage:** ~30% of utilities

**Utilities Missing Docs:**
- Complex utility functions without parameter documentation
- Unclear return types in type-unstable scenarios

**Solution:** Add comprehensive JSDoc to all public functions

---

### 19. Hardcoded Strings in UI
**Severity:** MEDIUM | **Instances:** 20+ | **Type:** Internationalization blocker

**Examples:**
```typescript
'Dealer doesn\'t qualify...'  // Should be in constants/i18n
'Full Outcome'  // Should be configurable
```

**Solution:** Extract to constants with proper structure for i18n support

---

### 20. Inconsistent StyleSheet Organization
**Severity:** MEDIUM | **Pattern:** Divergent style patterns

**Issues:**
- Some files define styles inline with `StyleSheet.create()`
- Some files use shared styles
- No consistent organization

**Solution:** Standardize on component-level `.styles.ts` files + shared utilities

---

## 🟢 LOW PRIORITY ISSUES (Technical Debt)

### 21-30. Additional Low-Priority Items:

- **Import ordering:** Not alphabetically sorted in many files
- **Unused variables:** Minor unused `errorInfo` in some error handlers
- **Type inference:** Over-explicit types where TS could infer
- **Empty dependencies arrays:** Ensure all effects are correctly documented
- **Callback props:** Some callbacks could use `useCallback()` wrapper
- **Re-renders:** Some components missing `React.memo()` wrapper
- **Prop drilling:** Some deeply nested component trees could use context
- **Mobile responsiveness:** Hardcoded sizes instead of responsive calculations
- **Performance:** No memoization in some expensive computed properties
- **Bundle analysis:** No tree-shaking optimization analysis

---

## 📊 METRICS SUMMARY

| Metric | Value | Status |
|--------|-------|--------|
| Total Files Analyzed | 85+ | ✅ |
| Files > 10KB | 3 | 🔴 Critical |
| `any` Type Usage | 7 instances | 🔴 Critical |
| Code Duplication | ~44KB | 🔴 Critical |
| Unused Imports | 3+ files | 🟠 High |
| Missing Tests | 5+ files | 🟠 High |
| Magic Numbers | 15+ instances | 🟠 High |
| Type Safety Issues | 12+ | 🟠 High |
| Accessibility Gaps | 20+ elements | 🟡 Medium |
| Code Coverage (Current) | 92.87% | ✅ Great |

---

## 🎯 RECOMMENDED ACTION PLAN

### Phase 1: Critical Fixes (Week 1-2)
1. ✅ Create `BaseDrillScreen` component or `useDrillState` hook to eliminate 5-file duplication
2. ✅ Remove all `any` type casts - create proper interfaces
3. ✅ Split 3 large files (>10KB)
4. ✅ Add feature-level error boundaries

### Phase 2: High Priority (Week 2-3)
5. ✅ Consolidate color usage - replace hardcoded values
6. ✅ Remove unused imports and dead code
7. ✅ Create custom hook for repeated state management
8. ✅ Extract magic numbers to named constants
9. ✅ Implement centralized logging service

### Phase 3: Medium Priority (Week 3-4)
10. ✅ Add missing unit tests
11. ✅ Fix inconsistent naming conventions
12. ✅ Add accessibility labels and props
13. ✅ Extract hardcoded strings to constants
14. ✅ Add comprehensive JSDoc documentation

### Phase 4: Low Priority / Ongoing
15. ✅ Refactor useState to useReducer where appropriate
16. ✅ Add React.memo to expensive components
17. ✅ Consolidate StyleSheet patterns
18. ✅ Performance audit and optimization

---

## 📚 Reference Documents

- [Implementation Roadmap](plans/implementation-roadmap.md)
- [Development Standards](DEVELOPMENT_STANDARDS.md)
- [Code Review Full Project](plans/code-review-full-project.md)
- [Code Review 2026-02](plans/code-review-2026-02.md)

---

**Next Step:** Review this analysis and select priority areas for implementation. Start with Phase 1 Critical Fixes for maximum impact.
