# Technical Deep Dive: TypeScript & ESLint Issues

**Generated:** March 3, 2026  
**Scope:** Critical build-breaking issues

---

## PART 1: TypeScript Compilation Errors (102+)

### Error Category 1: useDrillState Generic Type Binding Issues

**Severity:** 🔴 CRITICAL  
**Files Affected:** 3 drain screens  
**Root Cause:** Generic type parameter `T` not properly bound from function signature

---

#### Example: BJDrillScreen Type Mismatch

**File:** `src/features/blackjack-training/screens/BJDrillScreen.tsx:25`

**Error Output:**
```
error TS2345: Argument of type '(drillType: BJDrillType) => BJScenario' 
is not assignable to parameter of type '(drillType: string) => BaseDrillScenario'.
Types of parameters 'drillType' and 'drillType' are incompatible.
    Type 'string' is not assignable to type 'BJDrillType'.
```

**Current Code:**
```typescript
// In BJDrillScreen.tsx
const drillState = useDrillState(generateBJScenario, drillType);
//                 ^^^^^^^^^^^^^^
//                 generateBJScenario has signature:
//                 (drillType: BJDrillType) => BJScenario
//
//                 But useDrillState expects:
//                 (drillType: string) => BaseDrillScenario
```

**The Issue in useDrillState:**
```typescript
// src/hooks/useDrillState.ts (PROBLEMATIC)
export function useDrillState<T extends BaseDrillScenario>(
  scenarioGenerator: (drillType: string) => T,  // ❌ Expects 'string'
  drillType: string
): {
  // ...
} {
  const [scenario, setScenario] = useState<T>(() => 
    scenarioGenerator(drillType)  // Called with 'string'
  );
  // ...
}
```

**Why It Fails:**
- `generateBJScenario` requires `BJDrillType` (enum: 'hard-decision' | 'soft-hand' | etc.)
- `useDrillState` generic says it accepts `(drillType: string) => T`
- TypeScript can't unify `BJDrillType` with `string`

**Solution:**
```typescript
// Option 1: Use function overloads (Type-safe)
export function useDrillState<T extends BaseDrillScenario>(
  scenarioGenerator: (drillType: any) => T,  // Accept any type
  drillType: unknown
): DrillStateReturn<T>;

// Option 2: Better - Constrain T more properly
export function useDrillState<
  T extends BaseDrillScenario,
  D extends string | object  // Allow flexible drill type
>(
  scenarioGenerator: (drillType: D) => T,
  drillType: D
): DrillStateReturn<T> {
  // ...
}

// Usage stays the same:
const drillState = useDrillState(generateBJScenario, drillType);
//                                                   ^^^^^^^^
//                                                   TypeScript now infers correct type
```

---

### Error Category 2: Duplicate Variable Declarations

**Severity:** 🔴 CRITICAL  
**Files Affected:** 5 drill screens  
**Count:** ~8 redeclarations per file

---

#### Example: BJDrillScreen Variable Redeclaration

**File:** `src/features/blackjack-training/screens/BJDrillScreen.tsx:38-55`

**Error Output:**
```
TS2451: Cannot redeclare block-scoped variable 'accuracy'.
TS2451: Cannot redeclare block-scoped variable 'upcomingMultiplier'.
TS2451: Cannot redeclare block-scoped variable 'canSubmit'.
TS2451: Cannot redeclare block-scoped variable 'lastEarned'.
```

**Current Code (PROBLEM):**
```typescript
export default function BJDrillScreen({ route }: BJDrillScreenProps) {
  const { drillType } = route.params;
  const { colors } = useTheme();

  const drillState = useDrillState(generateBJScenario, drillType);
  const {
    scenario,
    phase,
    selectedOption,
    setSelectedOption,
    userAmountStr,
    setUserAmountStr,
    isCorrect,
    streak,
    sessionPoints,
    sessionCorrect,
    sessionTotal,
    accuracy,              // ✅ Declared from hook
    upcomingMultiplier,    // ✅ Declared from hook
    canSubmit,             // ✅ Declared from hook
    autoSubmit,
    handleSubmit,
    handleNext,
  } = drillState;

  const styles = useMemo(() => makeStyles(colors), [colors]);
  const lastEarned = isCorrect ? Math.pow(2, streak - 1) : 0; // ✅ Declared

  // ❌ THEN REDECLARE THE SAME VARIABLES:
  const canSubmit = scenario.answerType === 'multiple-choice'
    ? selectedOption !== null
    : userAmountStr.length > 0;

  const accuracy = (sessionCorrect / Math.max(sessionTotal, 1)) * 100;

  const upcomingMultiplier = Math.pow(2, streak);

  const lastEarned = isCorrect ? Math.pow(2, streak - 1) : 0;
  // ❌ DUPLICATES AT LINES 38-55
}
```

**Why It Fails:**
- Same variable declared twice in same scope
- JavaScript/TypeScript doesn't allow this
- Hook values are completely unused (wasted computation)

**Why This Happened:**
Likely during refactoring to `useDrillState` hook:
1. Added hook destructuring (all the state)
2. Then copy-pasted old local variable declarations
3. Forgot to remove the local declarations since hook now provides them

**Solutions:**

**Option A: Trust hook values (cleaner)**
```typescript
// REMOVE lines 38-55, keep only hook destructuring
const drillState = useDrillState(generateBJScenario, drillType);
const {
  scenario,
  accuracy,              // ✅ Use these
  upcomingMultiplier,    // ✅ Use these
  canSubmit,             // ✅ Use these
  // ... rest
} = drillState;

// Remove the duplicate declarations
// const canSubmit = ...  // ❌ DELETE
// const accuracy = ...   // ❌ DELETE
// const upcomingMultiplier = ...  // ❌ DELETE
```

**Option B: Don't destructure, compute locally (if hook values are wrong)**
```typescript
const drillState = useDrillState(generateBJScenario, drillType);
const {
  scenario,
  selectedOption,
  setSelectedOption,
  userAmountStr,
  isCorrect,
  streak,
  sessionCorrect,
  sessionTotal,
  // DON'T destructure the ones we'll compute locally
  // ...other props
} = drillState;

// Compute locally if logic differs:
const canSubmit = scenario.answerType === 'multiple-choice'
  ? selectedOption !== null
  : userAmountStr.length > 0;

const accuracy = (sessionCorrect / Math.max(sessionTotal, 1)) * 100;
const upcomingMultiplier = Math.pow(2, streak);
const lastEarned = isCorrect ? Math.pow(2, streak - 1) : 0;
```

**Recommendation:** Choose Option A (trust hook) if computations are equivalent, else Option B

---

### Error Category 3: Missing Properties on BaseDrillScenario

**Severity:** 🔴 CRITICAL  
**Example Files:**
- BJDrillScreen.tsx:76 - `playerCards` property
- CPDrillScreen.tsx:71 - `swapped` property  
- RKDrillScreen.tsx:91 - `winningNumber` property

---

#### Example: BJDrillScreen Missing Properties

**File:** `src/features/blackjack-training/screens/BJDrillScreen.tsx:76`

**Error Output:**
```
TS2339: Property 'playerCards' does not exist on type 'BaseDrillScenario'.
TS2339: Property 'dealerCards' does not exist on type 'BaseDrillScenario'.
TS2339: Property 'betAmount' does not exist on type 'BaseDrillScenario'.
```

**Current Code (PROBLEM):**
```typescript
const drillState = useDrillState(generateBJScenario, drillType);
const { scenario } = drillState;  // scenario has type 'BaseDrillScenario'

// But then tries to access BJ-specific properties:
{scenario.playerCards && scenario.playerCards.length > 0 && (
  // ❌ playerCards doesn't exist on BaseDrillScenario
  <View>
    {scenario.playerCards.map((card, i) => (
      // ❌ card also untyped
```

**Why It Fails:**
```typescript
// useDrillState returns generic scenario
export function useDrillState<T extends BaseDrillScenario>(
  scenarioGenerator: (drillType: string) => T,
  drillType: string
): {
  scenario: T,  // ✅ Should be T, not BaseDrillScenario
  // ...
} {
  // Correctly returns T, but somewhere T is lost in the return type
}

// hook returns: { scenario: BaseDrillScenario }
// but we need: { scenario: BJScenario }
```

**Solution:**
Ensure `useDrillState` properly preserves the generic type in return:

```typescript
// In useDrillState.ts
export function useDrillState<T extends BaseDrillScenario>(
  scenarioGenerator: (drillType: unknown) => T,
  drillType: unknown
): {
  scenario: T,  // ✅ Explicitly type as T, not BaseDrillScenario
  phase: Phase;
  // ... rest typed properly
  isCorrect: boolean;
  // ...
} {
  const [scenario, setScenario] = useState<T>(() => 
    scenarioGenerator(drillType)
  );
  // ...
  return {
    scenario,  // ✅ Typed as T
    // ...
  };
}
```

---

### Error Category 4: TypeScript Theme Interface Missing streak Property

**Severity:** 🟠 HIGH  
**Files Affected:**
- `src/features/plo-training/screens/PLOGameTrainingScreen.tsx:262, 264, 343`
- `src/features/roulette-knowledge-training/screens/RKDrillScreen.tsx:216, 217, 252`

---

#### Example: RKDrillScreen Missing colors.status.streak

**File:** `src/features/roulette-knowledge-training/screens/RKDrillScreen.tsx:216`

**Error Output:**
```
TS2339: Property 'streak' does not exist on type 
'{ success: string; successAlt: string; error: string; ... }'.
```

**Current Code:**
```typescript
const { colors } = useTheme();

const styles = useMemo(() => ({
  streakPill: {
    backgroundColor: colors.background.secondary,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.status.streak,  // ❌ Property doesn't exist
  },
  streakText: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.status.streak,  // ❌ Property doesn't exist
  },
  // ...
}), [colors]);
```

**Why It Fails:**
```typescript
// Runtime (colors.ts):
export const COLORS = {
  status: {
    success: '#4CAF50',
    error: '#CC0000',
    warning: '#eab308',
    info: '#3b82f6',
    streak: '#FF6B00',  // ✅ Added at runtime
  },
};

// But TypeScript type definition doesn't have it:
export interface AppColors {
  status: {
    success: string;
    successAlt: string;
    error: string;
    errorAlt: string;
    errorBorder: string;
    warning: string;
    info: string;
    // ❌ 'streak' missing!
  };
}
```

**Solution:**
Update ThemeContext interface:

```typescript
// In src/contexts/ThemeContext.tsx or type definition file
export interface AppColors {
  status: {
    success: string;
    successAlt: string;
    error: string;
    errorAlt: string;
    errorBorder: string;
    warning: string;
    info: string;
    streak: string;  // ✅ ADD THIS LINE
  };
  // ... rest of interface
}
```

---

## PART 2: Jest Test Module Resolution (10 Test Suites Failing)

**Severity:** 🔴 CRITICAL  
**Impact:** Cannot run tests - all fail to compile  
**Cause:** Jest path aliases not configured

---

### Issue: ThemeContext Path Alias Not Resolving

**Error Pattern:**
```
Cannot find module '@contexts/ThemeContext' from 'src/features/plo-training/screens/PLOMenuScreen.tsx'

Require stack:
  src/features/plo-training/screens/PLOMenuScreen.tsx
  src/features/plo-training/screens/__tests__/PLOMenuScreen.test.tsx
```

**Affected Test Suites (7):**
- CashConversionMenuScreen.test.tsx
- RouletteGameScreen.test.tsx  
- CallBetsTrainingScreen.test.tsx
- ResultFeedback.test.tsx
- ChallengeDisplay.test.tsx
- ChipSelector.test.tsx
- PLOMenuScreen.test.tsx

**Current Jest Config Issue:**
```javascript
// jest.config.js (needs checking)
module.exports = {
  testEnvironment: 'node',
  // Check if moduleNameMapper has @contexts mapping
  moduleNameMapper: {
    // Look for this entry:
    '^@contexts/(.*)$': '<rootDir>/src/contexts/$1',
    // If missing → ADD IT
  },
};
```

**Solution:**
Ensure `jest.config.js` has complete path mappings:

```javascript
module.exports = {
  preset: 'react-native',
  testEnvironment: 'node',
  moduleNameMapper: {
    // Core path aliases
    '^@contexts/(.*)$': '<rootDir>/src/contexts/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@app-types/(.*)$': '<rootDir>/src/types/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@screens/(.*)$': '<rootDir>/src/screens/$1',
    '^@navigation/(.*)$': '<rootDir>/src/navigation/$1',
    
    // Mock React Native
    '^react-native$': 'jest-mock-react-native',
    '^react-native/(.*)$': 'jest-mock-react-native/$1',
  },
  // ... rest of config
};
```

---

## PART 3: ESLint Warnings (854 Total - Mostly Non-Critical)

**Status:** 🟡 WARNING - Acceptable but should clean up  
**Breakdown:**
- Unused style definitions: ~100 warnings
- Test `any` types: ~300 warnings (acceptable in mocks)
- Unused variables/imports: ~10 warnings

---

### Top ESLint Warnings by Category

#### Category 1: Unused Style Definitions (100+ warnings)

**Example:** ProgressScreen.tsx
```typescript
const styles = StyleSheet.create({
  container: { ... },
  title: { ... },
  statsRow: { ... },
  statCard: { ... },
  progressBtn: { ... },      // ❌ Declared but never used
  progressBtnText: { ... },  // ❌ Declared but never used
});
```

**Fix:**
```typescript
// Audit the component JSX
// If not referenced anywhere → DELETE
const styles = StyleSheet.create({
  container: { ... },
  title: { ... },
  // Remove unused ones
});
```

---

#### Category 2: Test Mock `any` Types (300+ warnings - ACCEPTABLE)

**Example:** test-utils/__mocks__/react-native.ts
```typescript
export const View = (props: any) => null;    // ✅ Acceptable for mocks
export const Text = (props: any) => null;    // ✅ Acceptable for mocks
export const ScrollView = (props: any) => null;  // ✅ Acceptable for mocks
```

**Status:** These are FINE - mocking libraries inherently use `any`

---

#### Category 3: Unused Imports/Variables

**Example:** test-utils/fixtures.ts:7
```typescript
import { PlayerAction } from './types';  // ❌ Never imported in tests

// Either:
// 1. Use it
// 2. Delete import
```

---

## PART 4: Summary Table: Issues by Severity

| Issue | Severity | Type | Count | Files | Impact |
|-------|----------|------|-------|-------|--------|
| useDrillState Generic Type | 🔴 CRITICAL | TypeScript | 3 | BJDrill, CPDrill, RKDrill | BUILD BREAKS |
| Duplicate Variables | 🔴 CRITICAL | TypeScript | 8 per file | 5 drill screens | BUILD BREAKS |
| Missing Theme Properties | 🟠 HIGH | TypeScript | 3 errors | PLOGame, RKDrill | BUILD BREAKS |
| Jest Module Mapping | 🔴 CRITICAL | Config | 7 | Test suites | TESTS FAIL |
| Unused Styles | 🟡 WARNING | ESLint | 100+ | ProgressScreen, HomeScreen | Warning only |
| Test Mock `any` | ✅ OK | ESLint | 300+ | test-utils/* | Acceptable |
| Unused Imports | 🟡 WARNING | ESLint | ~10 | Various | Warning only |

---

## 🚀 Next Steps

1. **Fix useDrillState generic type** (30 min)
2. **Remove duplicate variables** (20 min per file)
3. **Update theme TypeScript interface** (10 min)
4. **Configure Jest moduleNameMapper** (10 min)
5. **Run build verification** (5 min)

**Total Fix Time:** ~2 hours

---

**Generated:** March 3, 2026
