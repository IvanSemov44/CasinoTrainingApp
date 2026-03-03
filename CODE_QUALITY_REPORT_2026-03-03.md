# Casino Training App - Code Quality Analysis Report 2026-03-03

**Analysis Date:** March 3, 2026  
**Status:** QUALITY ISSUES DETECTED - Requires Action  
**Priority:** CRITICAL + HIGH

---

## Executive Summary

**Code Quality Status:** 🔴 DECLINING - New Issues Introduced

Your recent refactoring session (color consolidation + streak colors) has **introduced critical TypeScript errors** that break the build. While the original improvements (hooks, error boundaries, logger service) were solid, the latest commits have:

1. ✅ **854 ESLint warnings** (mostly unused styles + test `any` types - acceptable)
2. ❌ **102+ TypeScript errors** - CRITICAL (newly introduced)
3. ❌ **10/30 test suites failing** - Tests cannot resolve modules

---

## 📊 Test Results

### Jest Status: ❌ FAILING

```
Test Suites: 10 failed, 20 passed, 30 total
Tests:       392 passed, 392 total
Time:        6.567 s
Exit Code:   1 (FAILURE)
```

**Failed Test Suites (10):**
- ❌ src/features/cash-conversion-training/screens/__tests__/CashConversionMenuScreen.test.tsx
- ❌ src/features/roulette-game/screens/__tests__/RouletteGameScreen.test.tsx
- ❌ src/features/call-bets-training/screens/__tests__/CallBetsTrainingScreen.test.tsx
- ❌ src/features/call-bets-training/components/__tests__/ResultFeedback.test.tsx
- ❌ src/features/call-bets-training/components/__tests__/ChallengeDisplay.test.tsx
- ❌ src/components/__tests__/ChipSelector.test.tsx
- ❌ src/features/plo-training/screens/__tests__/PLOMenuScreen.test.tsx
- ❌ 3 more suites with similar module resolution failures

**Root Cause:** Module `@contexts/ThemeContext` cannot be resolved
```
Cannot find module '@contexts/ThemeContext' from 'src/features/plo-training/screens/PLOMenuScreen.tsx'
```

---

## 🔴 CRITICAL ISSUES

### 1. TypeScript Compilation Failures - 102+ Errors

**Severity:** CRITICAL | **Count:** 102 errors | **Impact:** Build breaks

#### Issue 1.1: Type Mismatch in useDrillState Hook Usage
**Files Affected:**
- `src/features/blackjack-training/screens/BJDrillScreen.tsx` - 24 errors
- `src/features/caribbean-poker-training/screens/CPDrillScreen.tsx` - 16 errors
- `src/features/roulette-knowledge-training/screens/RKDrillScreen.tsx` - 18 errors

**Error Pattern:**
```typescript
Error TS2345: Argument of type '(drillType: BJDrillType) => BJScenario' 
is not assignable to parameter of type '(drillType: string) => BaseDrillScenario'.
    Types of parameters 'drillType' and 'drillType' are incompatible.
    Type 'string' is not assignable to type 'BJDrillType'.
```

**Root Cause:** Hook signature expects `(drillType: string)` but receives typed enum functions

**Location:** `src/hooks/useDrillState.ts` line 25 - Generic type parameter not properly constrained

---

#### Issue 1.2: Variable Redeclaration in Drill Screens
**Error Pattern:**
```typescript
src/features/blackjack-training/screens/BJDrillScreen.tsx:38:5: error TS2451: 
Cannot redeclare block-scoped variable 'accuracy'.
```

**Problem:** Destructuring from `drillState` hook, then declaring duplicate variables:
```typescript
const drillState = useDrillState(generateBJScenario, drillType);
const {
  // ... destructures 'accuracy', 'upcomingMultiplier', 'canSubmit', etc.
  accuracy,
  upcomingMultiplier,
  canSubmit,
} = drillState;

// Then redeclares the SAME variables:
const canSubmit = scenario.answerType === 'multiple-choice'
  ? selectedOption !== null
  : userAmountStr.length > 0;  // ❌ DUPLICATE DECLARATION
const accuracy = /* ... */;    // ❌ DUPLICATE DECLARATION
```

**Files Affected:**
- BJDrillScreen.tsx - 8 redeclarations
- CPDrillScreen.tsx - Similar pattern
- RKDrillScreen.tsx - Similar pattern

**Fix:** Remove duplicate variable declarations or don't destructure them from hook

---

#### Issue 1.3: BaseDrillScenario Type Mismatch
**Error Pattern:**
```typescript
src/features/blackjack-training/screens/BJDrillScreen.tsx:76:17: error TS2339:
Property 'playerCards' does not exist on type 'BaseDrillScenario'.
```

**Root Cause:** Hook returns generic `BaseDrillScenario` but screens expect feature-specific types:
- `BJDrillScreen` needs `BJScenario` (has `playerCards`, `dealerCards`, `betAmount`)
- `CPDrillScreen` needs `CPScenario` (has `swapped` property)
- `RKDrillScreen` needs `RKScenario` (has `winningNumber`, `bets`)

**Problem:** `useDrillState` not properly generic - returns base type instead of specific scenario type

---

#### Issue 1.4: Undefined 'streakMultiplier' Variable
**Error:**
```typescript
src/features/blackjack-training/screens/BJDrillScreen.tsx:55,34: error TS2304: 
Cannot find name 'streakMultiplier'.
```

**Problem:** Variable not declared anywhere; used directly in template

---

#### Issue 1.5: Missing colors.streak Property
**Files:** PLOGameTrainingScreen.tsx, RKDrillScreen.tsx

**Error:**
```typescript
src/features/plo-training/screens/PLOGameTrainingScreen.tsx:262,34: error TS2339:
Property 'streak' does not exist on type '{ success: string; successAlt: string; ... }'.
```

**Root Cause:** Added `colors.status.streak` to centralized colors but not to TypeScript type definition

**Location Check:** The `colors.ts` might have added the property but not to the theme type interface

---

#### Issue 1.6: Navigation Type Safety Issue
**Error:**
```typescript
src/components/roulette/TrainingSelectionModal.tsx:170,25: error TS2345:
Argument of type '[string, { betConfigKey?: string; ... }]' is not assignable 
to parameter of type 'RouletteStackParamList'.
```

**Problem:** Dynamic screen navigation with untyped parameters

---

### 2. Jest Module Resolution Failures

**Severity:** CRITICAL | **Count:** 7+ test suites failing | **Impact:** Cannot run tests

**Issue:** Path alias `@contexts/ThemeContext` not resolving in Jest

```
Cannot find module '@contexts/ThemeContext' from 'src/features/plo-training/screens/PLOMenuScreen.tsx'
```

**Affected Files:**
- All menu screens with `import { useTheme } from '@contexts/ThemeContext'`
- All drill screens using theme
- All components using ThemeContext

**Root Cause:** Jest configuration not properly mapping path aliases

**Jest Configuration Check Needed:**
```typescript
// jest.config.js should have:
moduleNameMapper: {
  '^@contexts/(.*)$': '<rootDir>/src/contexts/$1',
  '^@styles/(.*)$': '<rootDir>/src/styles/$1',
  // ... other mappings
}
```

---

## 🟠 HIGH PRIORITY ISSUES

### 3. ESLint Warnings: 854 Issues Detected

**Severity:** HIGH | **Count:** 854 warnings | **Status:** 0 errors, all warnings

#### 3.1 Unused Styles Warnings (Multiple Files)
**Pattern:**
```
C:\src\screens\ProgressScreen.tsx
  60:5  warning  Unused style detected: undefined.container
  61:5  warning  Unused style detected: undefined.title
  ...
```

**Issue:** StyleSheet definitions that are never referenced. Common in:
- ProgressScreen.tsx - 17 unused styles
- HomeScreen.tsx - 10+ unused styles
- Other screen files

**Fix:** Remove unused style definitions or use them in render

#### 3.2 Unexpected `any` Type Warnings (Test Files - Acceptable)
**Pattern:**
```
src/test-utils/__mocks__/react-native.ts:8:29  warning  Unexpected any
src/test-utils/builders.ts:240:21  warning  Unexpected any
src/test-utils/mocks.ts:182:42  warning  Unexpected any
```

**Status:** ✅ **ACCEPTABLE** - `any` types in test utilities are standard mocking pattern
**Note:** Already excluded from production penalties

#### 3.3 Unused Variables and Imports
```
src/test-utils/fixtures.ts:7:32  warning  'PlayerAction' is defined but never used
src/test-utils/render.tsx:42:3  warning  'navigationProps' is defined but never used  
```

**Severity:** LOW - Low-hanging fruit cleanup

---

## 📋 Code Smells & Tech Debt

### 4. Duplicate Variable Declarations (DRY Violation)

**Pattern in BJDrillScreen.tsx:**
```typescript
// Destructure from hook
const {
  accuracy,
  upcomingMultiplier,
  canSubmit,
  // ...
} = drillState;

// Then OVERWRITE with local logic:
const canSubmit = scenario.answerType === 'multiple-choice'
  ? selectedOption !== null
  : userAmountStr.length > 0;  // ❌ REDEFINES canSubmit
  
const accuracy = (sessionCorrect / sessionTotal) * 100;  // ❌ REDEFINES accuracy
```

**Impact:** 
- Hook values are unused (wasted computation)
- Confusing code flow
- Hook design issue

---

### 5. Large File Check

**Files > 500 lines:**
```
src/features/roulette-training/navigation.tsx         ~480 lines
src/features/plo-training/screens/PLOGameTrainingScreen.tsx  ~600 lines
src/features/call-bets-training/screens/CallBetsTrainingScreen.tsx  ~550 lines
```

**Status:** Borderline - approaching ideal 400-500 line limit

---

### 6. Missing Type Coverage in Menu Screens

**Pattern:** Recent color consolidation added `colors.status.streak` but TypeScript interface not updated

**Files Affected:**
- RKDrillScreen.tsx
- PLOGameTrainingScreen.tsx
- THUDrillScreen.tsx
- TCPDrillScreen.tsx

**Issue:** 
```typescript
// In colors.ts (runtime):
colors.status.streak = '#FF6B00'

// But TypeScript interface doesn't know about it:
type Colors = {
  status: {
    success: string;
    error: string;
    // ... missing 'streak'
  }
}
```

---

## 📝 Summary of Issues by Source

### From Recent Commits:
1. ❌ `useDrillState` hook has generics issue (Type parameter not properly bound)
2. ❌ Drill screens have duplicate variable declarations (should remove hook destructures OR remove local ones)
3. ❌ `colors.status.streak` added to runtime but TypeScript interface not updated
4. ⚠️ Jest path alias mapping missing for `@contexts/*`

### Pre-existing Issues (Already Documented):
5. ⚠️ 854 ESLint warnings (mostly test files and unused styles)
6. ⚠️ Test `any` types in mocks (acceptable pattern)
7. ⚠️ Unused style definitions in multiple screen files

---

## 🔧 Recommended Fixes (In Priority Order)

### CRITICAL - Fix Before Next Commit

#### Fix 1: useDrillState Generic Type Parameter
**File:** `src/hooks/useDrillState.ts`

**Current:**
```typescript
export function useDrillState<T extends BaseDrillScenario>(
  scenarioGenerator: (drillType: string) => T,
  drillType: string
) {
  // Returns T
}
```

**Problem:** Type parameter `T` not properly inferred from `scenarioGenerator` return type

**Solution:** 
```typescript
export function useDrillState<T extends BaseDrillScenario>(
  scenarioGenerator: (drillType: unknown) => T,
  drillType: unknown
): {
  // ... returns properly typed as T
} {
  // ...
}
```

Or use function overloads for each drill type

---

#### Fix 2: Remove Duplicate Variable Declarations in Drill Screens
**Files:** BJDrillScreen.tsx, CPDrillScreen.tsx, RKDrillScreen.tsx, TCPDrillScreen.tsx, THUDrillScreen.tsx

**Pattern to fix:**
```typescript
// BEFORE (with duplicates):
const { accuracy, upcomingMultiplier, canSubmit } = drillState;
const canSubmit = /* ... new calculation */;  // ❌ DUPLICATE
const accuracy = /* ... new calculation */;   // ❌ DUPLICATE

// AFTER (choose one):
// Option A: Use hook values only (if they're correct)
const { accuracy, upcomingMultiplier, canSubmit } = drillState;

// Option B: Don't destructure, compute locally
const canSubmit = scenario.answerType === 'multiple-choice'
  ? selectedOption !== null
  : userAmountStr.length > 0;
const accuracy = sessionCorrect > 0 ? (sessionCorrect / sessionTotal) * 100 : 0;
```

---

#### Fix 3: Update TypeScript Theme Interface
**File:** `src/contexts/ThemeContext.tsx` or type definition file

**Add to status colors interface:**
```typescript
export interface AppColors {
  status: {
    success: string;
    successAlt: string;
    error: string;
    errorAlt: string;
    errorBorder: string;
    warning: string;
    info: string;
    streak: string;  // ✅ ADD THIS
  };
  // ... rest
}
```

---

#### Fix 4: Configure Jest Path Mapping
**File:** `jest.config.js`

**Ensure contains:**
```javascript
moduleNameMapper: {
  '^@contexts/(.*)$': '<rootDir>/src/contexts/$1',
  '^@styles/(.*)$': '<rootDir>/src/styles/$1',
  '^@services/(.*)$': '<rootDir>/src/services/$1',
  '^@components/(.*)$': '<rootDir>/src/components/$1',
  '^@features/(.*)$': '<rootDir>/src/features/$1',
  '^@app-types/(.*)$': '<rootDir>/src/types/$1',
  '^@utils/(.*)$': '<rootDir>/src/utils/$1',
  '^@config/(.*)$': '<rootDir>/src/config/$1',
  '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
  // ... add any missing mappings
}
```

---

### HIGH PRIORITY - Fix After Critical

#### Fix 5: Remove Unused Style Definitions
**Files:** ProgressScreen.tsx, HomeScreen.tsx

**Approach:**
1. Comment out unused style
2. Run tests
3. If no test fails, delete it

**Example:**
```typescript
// BEFORE
const styles = StyleSheet.create({
  container: { ... },
  progressBtn: { ... },      // ❌ Unused - detected by ESLint
  progressBtnText: { ... },  // ❌ Unused
});

// AFTER  
const styles = StyleSheet.create({
  container: { ... },
});
```

---

#### Fix 6: Remove Unused Imports
**Files:** test-utils/fixtures.ts, test-utils/render.tsx

```typescript
// BEFORE
import { PlayerAction } from './types';  // ❌ Never used
const navigationProps = useNavigation(); // ❌ Never used

// AFTER
// Remove import
// Remove const if not needed
```

---

## 🎯 Quality Metrics

### Current State
| Metric | Value | Status |
|--------|-------|--------|
| TypeScript Errors | 102 | 🔴 CRITICAL |
| ESLint Warnings | 854 | 🟡 Warning |
| Test Suites Passing | 20/30 (67%) | 🔴 FAILING |
| Tests Passing | 392/392 (100%) | ✅ Would Pass |
| Type Safety | BROKEN | 🔴 CRITICAL |
| Build Status | ❌ FAILS | 🔴 CRITICAL |

### Goals for Next Session
| Metric | Current | Target |
|--------|---------|--------|
| TypeScript Errors | 102 | 0 |
| ESLint Warnings | 854 | <200 |
| Test Suites Passing | 20/30 | 30/30 |
| Type Safety | BROKEN | 100% |
| Build Status | FAILS | ✅ PASSES |

---

## 📚 Common Mistakes Identified (20 Most Common)

Based on the analysis, here are the top mistakes in similar React Native apps that appear in yours:

### TOP 20 CODE QUALITY MISTAKES

1. ✅ **Code Duplication (Solved)** - Had 40KB across 5 drill screens, fixed with `useDrillState`

2. ❌ **Generic Type Parameters Not Properly Bound** - `useDrillState<T>` should constrain `T` based on function signature

3. ❌ **Duplicate Variable Declarations** - Destructuring from hook then redefining locally

4. ✅ **Magic Numbers (Mostly Solved)** - Extracted to constants (retained in test files only)

5. ⚠️ **Unused Style Definitions** - ~17 styles in ProgressScreen never used

6. ✅ **Hardcoded Colors (Solved)** - All consolidated to theme system

7. ⚠️ **Missing Jest Module Mappings** - Path aliases not working in test environment

8. ✅ **Type Violations with `any` (Mostly Solved)** - Only in test mocks (acceptable)

9. ✅ **Cross-Feature Coupling (Solved)** - Removed feature-specific theme imports from shared components

10. ❌ **Incomplete Type Definitions** - Added `colors.status.streak` to runtime but not TypeScript interface

11. ⚠️ **Unused Imports/Variables** - ~3-4 imports/vars never referenced

12. ✅ **Error Handling Fragmentation (Solved)** - Created centralized logger service

13. ⚠️ **Large Component Files** - PLOGameTrainingScreen at ~600 lines (borderline)

14. ✅ **Navigation Type Safety (Improved)** - Some issues remain in dynamic navigation

15. ✅ **Inconsistent Hook Usage Patterns (Improved)** - Mostly standardized

16. ✅ **Missing Error Boundaries (Solved)** - All features now have error isolation

17. ⚠️ **Test Coverage Gaps** - Tests can't run due to module resolution

18. ✅ **Console Logging in Production (Solved)** - Centralized to logger service

19. ⚠️ **PropTypes vs TypeScript** - Inconsistent use of interface typing

20. ✅ **Component Composition Anti-patterns (Improved)** - Mostly using proper React patterns

---

## ✅ Completed Improvements (Since Last Analysis)

1. ✅ **useDrillState Hook** - Eliminated ~40KB code duplication
2. ✅ **Centralized Logger** - All console calls go through logger service
3. ✅ **Error Boundaries** - All 13 feature modules protected
4. ✅ **Color System** - Consolidated hardcoded colors to theme tokens
5. ✅ **Type Safety** - Removed 7 explicit `any` casts from production code
6. ✅ **File Decomposition** - Split CalculationScreen and RacetrackLayout

---

## 🚨 Action Required

### This Session:
```
1. 🔴 DO NOT COMMIT until TypeScript errors fixed
2. 🔴 FIX useDrillState generic type bounds
3. 🔴 REMOVE duplicate variable declarations in drill screens
4. 🔴 UPDATE TypeScript theme interface for colors.status.streak
5. 🔴 CONFIGURE Jest module mappings
```

### Then Verify:
```bash
# These should all pass:
npx tsc --noEmit              # 0 errors
npx eslint src                # < 200 warnings
npm test                      # 30/30 suites passing, 392 tests passing
```

---

## 📖 Reference Documentation

- **TypeScript Generics:** https://www.typescriptlang.org/docs/handbook/generics.html
- **Jest Module Mapping:** https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring
- **React Hook Rules:** https://react.dev/reference/rules/rules-of-hooks
- **Your Dev Standards:** See DEVELOPMENT_STANDARDS.md

---

**Report Generated:** March 3, 2026  
**Next Review:** After critical fixes applied  
**Severity:** 🔴 CRITICAL - Breaks build and tests
