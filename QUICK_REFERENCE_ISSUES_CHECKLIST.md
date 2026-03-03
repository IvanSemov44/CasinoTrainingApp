# Quick Reference: Code Quality Issues & Fix Checklist

**Generated:** March 3, 2026  
**Status:** Build Broken - Immediate Action Required

---

## 🚨 BUILD STATUS: CRITICAL ❌

```
TypeScript: 102 errors (BUILD FAILS)
ESLint:     854 warnings (still runs)
Tests:      10/30 suites failing (cannot run)
```

---

## ⚡ CRITICAL ISSUES (Must Fix)

### Issue 1: useDrillState Generic Type Mismatch ⏱️ 30 min

**Files:**
- `src/hooks/useDrillState.ts` (definition)
- `src/features/blackjack-training/screens/BJDrillScreen.tsx:25`
- `src/features/caribbean-poker-training/screens/CPDrillScreen.tsx:20`
- `src/features/roulette-knowledge-training/screens/RKDrillScreen.tsx:51`

**Error:**
```
Argument of type '(drillType: BJDrillType) => BJScenario' 
is not assignable to parameter of type '(drillType: string) => BaseDrillScenario'
```

**Quick Fix:**
```typescript
// In useDrillState.ts - change line 25 from:
export function useDrillState<T extends BaseDrillScenario>(
  scenarioGenerator: (drillType: string) => T,  // ❌
  drillType: string
)

// To:
export function useDrillState<T extends BaseDrillScenario>(
  scenarioGenerator: (drillType: any) => T,    // ✅ Temporary fix
  drillType: any
)

// Or better - use function overloads (see TECHNICAL_DEEP_DIVE_TS_ESLINT.md)
```

---

### Issue 2: Duplicate Variable Declarations ⏱️ 20 min per file

**Files:**
- `src/features/blackjack-training/screens/BJDrillScreen.tsx:38-55`
- `src/features/caribbean-poker-training/screens/CPDrillScreen.tsx` (similar)
- `src/features/roulette-knowledge-training/screens/RKDrillScreen.tsx` (similar)
- `src/features/texas-holdem-ultimate-training/screens/THUDrillScreen.tsx`
- `src/features/three-card-poker-training/screens/TCPDrillScreen.tsx`

**Errors:**
```
Cannot redeclare block-scoped variable 'accuracy'
Cannot redeclare block-scoped variable 'canSubmit'
Cannot redeclare block-scoped variable 'upcomingMultiplier'
```

**Quick Fix:**
```typescript
// APPROACH A: Remove duplicates, trust hook values
const drillState = useDrillState(generateBJScenario, drillType);
const { accuracy, upcomingMultiplier, canSubmit, ... } = drillState;
// DELETE lines that say:
// const accuracy = ...
// const canSubmit = ...
// const upcomingMultiplier = ...

// APPROACH B: Don't destructure what you compute locally
const drillState = useDrillState(generateBJScenario, drillType);
const { scenario, selectedOption, userAmountStr, ... } = drillState;
// Keep local computations
const canSubmit = scenario.answerType === 'multiple-choice' ? ... : ...;
const accuracy = ...;
const upcomingMultiplier = ...;
```

**Recommendation:** Go with APPROACH A (simpler)

---

### Issue 3: Missing TypeScript Theme Property ⏱️ 10 min

**Files:**
- `src/contexts/ThemeContext.tsx` (or type definition file)
- Used in: PLOGameTrainingScreen.tsx, RKDrillScreen.tsx

**Error:**
```
Property 'streak' does not exist on type 
'{ success: string; successAlt: string; ... }'
```

**Quick Fix:**
```typescript
// Find the AppColors interface definition
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

### Issue 4: Jest Module Path Mapping ⏱️ 10 min

**File:** `jest.config.js`

**Error:**
```
Cannot find module '@contexts/ThemeContext'
```

**Quick Fix:**
Check if `jest.config.js` has all path mappings. Look for `moduleNameMapper` object.

**Required Mappings:**
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
}
```

**If missing:** Add them and restart Jest

---

## ✅ Verification Checklist

After fixes, run these in order:

### Step 1: TypeScript Check
```bash
npx tsc --noEmit
```
**Expected:** `0 errors`

### Step 2: ESLint Check
```bash
npx eslint src
```
**Expected:** ~700+ warnings OK (test mocks mostly), no errors

### Step 3: Unit Tests
```bash
npm test
```
**Expected:** `Test Suites: 30 passed` and `Tests: 392 passed`

### Step 4: Full Build (if applicable)
```bash
npm run build  # If you have a build script
```
**Expected:** Build succeeds

---

## 📊 Issue Summary Table

| # | Issue | Severity | Files | Time | Status |
|---|-------|----------|-------|------|--------|
| 1 | useDrillState Generics | 🔴 CRITICAL | 1 def + 3 use | 30 min | ❌ TODO |
| 2 | Duplicate Variables | 🔴 CRITICAL | 5 screens | 1.5 hr | ❌ TODO |
| 3 | Missing Theme Property | 🟠 HIGH | 1 def + 2 use | 10 min | ❌ TODO |
| 4 | Jest Mappings | 🔴 CRITICAL | 1 file | 10 min | ❌ TODO |
| 5 | Unused Styles | 🟡 WARNING | 2-3 files | 30 min | ❌ LATER |
| 6 | Unused Imports | 🟡 WARNING | 2-3 files | 15 min | ❌ LATER |

**Total Critical Fix Time:** ~2 hours  
**Total Including Cleanup:** ~2.5 hours

---

## 🔍 Root Cause Analysis

### Why Did This Happen?

**Recent Changes:**
- Added `colors.status.streak` to `colors.ts` (runtime)
- Used `colors.status.streak` in 2 drill screens
- **Forgot** to update TypeScript interface

**Drill Screen Issues:**
- Refactored to use `useDrillState` hook
- Hook destructures all variables
- **Then** redeclared same variables locally
- Copy-paste error during refactoring

**Jest Failures:**
- Path alias `@contexts` works in TypeScript
- **But** Jest has separate path mapping config
- Likely `jest.config.js` incomplete

---

## 🎯 Quick Action Items

| Item | Type | Time | Priority |
|------|------|------|----------|
| Fix useDrillState type | Code | 30 min | CRITICAL |
| Remove duplicate vars | Code | 1.5 hr | CRITICAL |
| Update TS interface | Code | 10 min | CRITICAL |
| Fix Jest config | Config | 10 min | CRITICAL |
| Run tsc | Test | 2 min | VERIFY |
| Run eslint | Test | 2 min | VERIFY |
| Run tests | Test | 5 min | VERIFY |
| Commit fixes | Git | 2 min | FINAL |

---

## 📋 Pre-Fix Checklist

Before starting:
- [ ] Read TECHNICAL_DEEP_DIVE_TS_ESLINT.md for detailed examples
- [ ] Have git branch ready for commits
- [ ] Have IDE open with all affected files
- [ ] Have terminals ready (tsc, eslint, jest)

---

## 📋 During-Fix Checklist

For each fix:
- [ ] Read the specific section in TECHNICAL_DEEP_DIVE
- [ ] Understand the root cause
- [ ] Make the minimal change
- [ ] Run verification command
- [ ] Verify error count decreased
- [ ] Move to next issue

---

## 📋 Post-Fix Checklist

After all fixes:
- [ ] `npx tsc --noEmit` returns 0 errors
- [ ] `npm test` runs 30/30 suites, 392 tests pass
- [ ] `npx eslint src` shows < 200 warnings (test mocks OK)
- [ ] Can run build if applicable
- [ ] All changes committed with clear messages

---

## 💡 Prevention Tips

### Going Forward:

1. **Before committing:**
   ```bash
   npx tsc --noEmit && npx eslint src && npm test
   ```

2. **Pre-commit hook (optional):**
   ```bash
   npm install husky
   husky install
   npx husky add .husky/pre-commit "npm run lint && npx tsc --noEmit"
   ```

3. **TypeScript strict checks:**
   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "strict": true,
       "noUnusedLocals": true,
       "noUnusedParameters": true
     }
   }
   ```

4. **Code review focus:**
   - All generic types properly bound?
   - No duplicate variable declare?
   - TypeScript interfaces match runtime?
   - Jest config has all path aliases?

---

## 🆘 If You Get Stuck

**Question:** Still getting type error after fixing?  
**Answer:** Read TECHNICAL_DEEP_DIVE_TS_ESLINT.md section about that specific error

**Question:** Tests still failing?  
**Answer:** Check jest.config.js `moduleNameMapper` has your all aliases

**Question:** Not sure which duplicate to remove?  
**Answer:** Remove from hook destructure, keep the local computations. Safer approach.

**Question:** How to know if fix worked?  
**Answer:** Run `npx tsc --noEmit` - should show fewer errors each time

---

## 📚 Full Documentation

For detailed explanations and examples, see:

1. **CODE_QUALITY_REPORT_2026-03-03.md** - Overall analysis
2. **TECHNICAL_DEEP_DIVE_TS_ESLINT.md** - Detailed error explanations with code examples
3. **BEST_PRACTICES_AND_TOP_20_MISTAKES.md** - Learning material and patterns

---

## 📞 Quick Reference Links

- TypeScript Generics: https://www.typescriptlang.org/docs/handbook/generics.html
- Jest Path Mapping: https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring
- React Hooks Rules: https://react.dev/reference/rules/rules-of-hooks
- Your Dev Standards: DEVELOPMENT_STANDARDS.md

---

**Last Updated:** March 3, 2026  
**Status:** Ready for fixes  
**Estimated Fix Time:** 2 hours  
**Urgency:** CRITICAL - Build broken
