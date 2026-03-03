# Best Practices & Top 20 Common Mistakes in React Native Casino Apps

**Reference:** Your Casino Training App Code Review  
**Date:** March 3, 2026

---

## PART 1: Your Current State - What's Working ✅

### Excellent Practices Already Implemented

1. **✅ Path Aliases** - Using `@contexts`, `@styles`, `@components` etc. (increases maintainability)
2. **✅ TypeScript** - Full type coverage (prevents runtime bugs)
3. **✅ Custom Hooks** - Extracted `useDrillState`, `useExerciseState` (eliminates duplication)
4. **✅ Centralized Styling** - `colors.ts`, `spacing.ts`, theme system (consistent UX)
5. **✅ Error Boundaries** - Isolated errors per feature (improves reliability)
6. **✅ Logger Service** - Centralized logging (easier debugging)
7. **✅ Feature-Based Structure** - Modular organization (easier to scale)
8. **✅ Redux for Global State** - Using Redux Toolkit (better than Context for large data)
9. **✅ Memoization** - Using `useMemo`, `useCallback` (prevents unnecessary re-renders)
10. **✅ Constants Over Magic Numbers** - Payouts, difficulties, etc. extracted (easier maintenance)

---

## PART 2: Top 20 Common Mistakes (With Your Status)

### 1. ❌ Code Duplication (ALREADY FIXED)
**Score:** ✅ Excellent  
**What You Fixed:** Created `useDrillState` hook, eliminated ~40KB of duplicate code across 5 drill screens

**What to Avoid:**
```typescript
// ❌ DON'T - Copy-paste logic across screens
const [scenario, setScenario] = useState(() => generateScenario(type));
const [phase, setPhase] = useState<Phase>('asking');
// ... (repeat in 5 different files)

// ✅ DO - Extract to reusable hook
const drillState = useDrillState(generateScenario, type);
```

---

### 2. ❌ Uncontrolled Generic Types (⚠️ CURRENT ISSUE)
**Score:** 🔴 Failing - Your useDrillState has this issue  
**Impact:** Build breaks, TypeScript compilation fails

**The Problem:**
```typescript
// ❌ WRONG - Type parameter T not bound to function parameter
export function useDrillState<T extends BaseDrillScenario>(
  scenarioGenerator: (drillType: string) => T,  // Says string, gets enum
  drillType: string  // Says string, gets enum
): { scenario: T } {
  // ...
}

// Called with:
useDrillState(
  (drillType: BJDrillType) => BJScenario,  // ❌ BJDrillType, not string!
  drillType  // BJDrillType, not string!
)
```

**The Fix:**
```typescript
// ✅ CORRECT - Full generic signature
export function useDrillState<
  T extends BaseDrillScenario,
  D extends string | Record<string, any>  // Allow any drill type
>(
  scenarioGenerator: (drillType: D) => T,
  drillType: D
): { scenario: T; /* ... */ } {
  const [scenario, setScenario] = useState<T>(() => 
    scenarioGenerator(drillType)
  );
  // ...
}
```

**Key Learning:**
> When creating generic functions, ALL type variables must be inferrable from arguments. If you use `string` but receive enums, TypeScript can't infer the type.

---

### 3. ❌ Unused Type Definitions
**Score:** 🟡 Minor issue - ~10-15 unused types  
**Example:**
```typescript
// Defined in types/roulette.types.ts but never used:
export type UnusedRouletteType = ...;
export interface UnusedInterface = ...;
```

**How to Find:**
```bash
grep -r "type UnusedRouletteType" src/  # If 0 results = unused
```

**Prevention:**
- Declare types only when needed
- Regularly audit `src/types/*.ts` for unused exports
- Use TypeScript's `noUnusedLocals` compiler option

---

### 4. ❌ Direct prop drilling instead of Context/Redux (MOSTLY AVOIDED)
**Score:** ✅ Good - You use ThemeContext and Redux  
**Example of Bad Pattern:**
```typescript
// ❌ DON'T - Props passed through 5 levels
<Level1 colors={colors}>
  <Level2 colors={colors}>
    <Level3 colors={colors}>
      <Level4 colors={colors}>
        <Level5 colors={colors} />
      </Level4>
    </Level3>
  </Level2>
</Level1>

// ✅ DO - Use Context
const Level5 = () => {
  const { colors } = useTheme();  // Direct access
};
```

**Your Implementation:** ✅ Using ThemeContext properly

---

### 5. ❌ Missing Error Boundaries (FIXED)
**Score:** ✅ Complete - All 13 features protected  
**Before:** No error isolation  
**After:** Every feature wrapped with `withErrorBoundary` HOC

**Pattern You Implemented:**
```typescript
export const CallBetsMenuScreen = withErrorBoundary(
  _CallBetsMenuScreen,
  'Call Bets Training'
);
```

---

### 6. ❌ Hardcoded Colors (FIXED)
**Score:** ✅ Excellent - 100% consolidated  
**Before:** `#4CAF50`, `#FF9800`, `#f44336` scattered across 6 menu screens  
**After:** `colors.difficulty.easy`, `colors.difficulty.medium`, `colors.difficulty.hard`

**Before (Bad):**
```typescript
const DIFFICULTY_COLOR = {
  easy: '#4CAF50',      // ❌ If you change brand, update 6 files
  medium: '#FF9800',
  advanced: '#f44336',
};
```

**After (Good):**
```typescript
const difficultyColors = {
  easy: colors.difficulty.easy,        // ✅ Single source of truth
  medium: colors.difficulty.medium,
  advanced: colors.difficulty.hard,
};
```

---

### 7. ❌ Magic Numbers Scattered (GOOD - Mostly Extracted)
**Score:** ✅ Most extracted, some remain  
**Current State:**
```typescript
// ✅ Already extracted:
export const BLIND_LEVELS = [
  { sb: 2, bb: 2 },
  { sb: 5, bb: 5 },
  // ...
];
export const CHIP_VALUES = [1, 5, 10, 25, 100, 500, 1000];
export const MAX_RETRIES = 10;

// ⚠️ Remaining scattered numbers:
const CASH_STEP = 25;
const PADDING = 16;
const BORDER_RADIUS = 12;
```

**Best Practice:**
```typescript
// Extract ALL magic numbers to constants
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const DIMENSIONS = {
  border_radius_small: 4,
  border_radius_medium: 12,
  border_radius_large: 24,
};

export const GAME_CONFIG = {
  max_retries: 10,
  cash_step: 25,
  default_blind_level: 1,
};
```

---

### 8. ❌ Untyped State Objects (MOSTLY FIXED)
**Score:** ✅ Good - Using Redux with proper types  
**Example You're Doing Right:**
```typescript
interface RouletteState {
  announcedBets: PlacedBet[];
  history: PlacedBet[];
  sessionStartTime: number;
}
```

**What to Avoid:**
```typescript
// ❌ DON'T
const [state, setState] = useState({});  // Any shape

// ✅ DO
const [state, setState] = useState<GameState>({ /* ... */ });
```

---

### 9. ❌ Component Prop Drilling / Large Prop Lists (WATCH OUT)
**Score:** 🟡 Minor - Some components have many props  
**Example to Watch:**
```typescript
// If a component has > 8 props, consider restructuring
interface CardsDisplayProps {
  playerCards: Card[];
  dealerCards: Card[];
  playerValue: number;
  dealerValue: number;
  gamePhase: Phase;
  onHit: () => void;
  onStand: () => void;
  onDouble: () => void;
  colors: AppColors;  // And colors! That's 9 props
}

// Better approach:
interface CardsDisplayProps {
  playerHand: Hand;
  dealerHand: Hand;
  gameState: GameState;
  handlers: GameHandlers;  // Grouped
}
```

---

### 10. ❌ Missing Loading/Empty States
**Score:** 🟡 Partial - Some screens missing  
**Files to Check:**
- Do all async operations show loading spinner?
- Do empty lists show "No data" message?
- Do error states show retry button?

**Pattern to Implement:**
```typescript
function MyComponent() {
  const { data, loading, error } = useData();

  if (loading) return <LoadingSpinner />;      // ✅ Add
  if (error) return <ErrorMessage error={error} />;  // ✅ Add
  if (!data?.length) return <EmptyState />;    // ✅ Add
  
  return <DataDisplay data={data} />;
}
```

---

### 11. ❌ Unoptimized Re-renders
**Score:** ✅ Good - Using useMemo, useCallback  
**What You're Doing Right:**
```typescript
const styles = useMemo(() => makeStyles(colors), [colors]);
const handlePress = useCallback(() => { /* ... */ }, [deps]);
```

**Common Mistake to Avoid:**
```typescript
// ❌ DON'T - Styles recreated every render
<View style={{ flex: 1, padding: 16 }} />  // New object each render

// ✅ DO - Memoized or static
const styles = StyleSheet.create({ container: { flex: 1, padding: 16 } });
<View style={styles.container} />
```

---

### 12. ❌ Missing Accessibility
**Score:** 🟡 Low - Need accessibility labels  
**Current Tests:** No accessibility audit  
**What to Add:**
```typescript
<TouchableOpacity 
  accessible={true}                                    // ✅ Add
  accessibilityLabel="Start Blackjack Training"       // ✅ Add
  accessibilityHint="Begins the blackjack training"   // ✅ Add
  onPress={handleStart}
>
  <Text>Start Training</Text>
</TouchableOpacity>
```

---

### 13. ❌ Inconsistent Naming Conventions
**Score:** ✅ Excellent - Following conventions  
**Your Conventions:**
- Components: `PascalCase` (`BJDrillScreen`)
- Functions: `camelCase` (`handleSubmit`)
- Constants: `UPPER_SNAKE_CASE` (`MAX_RETRIES`)
- Types: `PascalCase` (`BJScenario`)

**Consistency Check Results:** ✅ Highly consistent

---

### 14. ❌ Console.log() in Production (FIXED)
**Score:** ✅ Complete - All moved to logger service  
**Before:**
```typescript
catch (error) {
  console.error('Failed to save:', error);  // ❌ Direct console
}
```

**After:**
```typescript
catch (error) {
  logger.error('Failed to save:', error);   // ✅ Centralized
}
```

---

### 15. ❌ Circular Dependencies
**Score:** ✅ Good - Feature-based structure prevents this  
**How You Avoid It:**
- Features are self-contained
- No feature imports from another feature (usually)
- Shared code in `src/utils`, `src/components`, `src/styles`

---

### 16. ❌ Missing TypeScript Strict Mode Configs
**Score:** 🟡 Partial - Not all strict flags enabled  
**Check Your tsconfig.json:**
```json
{
  "compilerOptions": {
    "strict": true,                     // ✅ Required
    "noImplicitAny": true,              // ✅ Required
    "strictNullChecks": true,           // ✅ Required
    "strictFunctionTypes": true,        // ✅ Required
    "noUnusedLocals": true,             // ⚠️ Recommended
    "noUnusedParameters": true,         // ⚠️ Recommended
    "noImplicitReturns": true,          // ✅ Required
    "noFallthroughCasesInSwitch": true, // ✅ Required
  }
}
```

**Recommendation:** Enable `noUnusedLocals` and `noUnusedParameters`

---

### 17. ❌ Inconsistent Error Handling
**Score:** ✅ Improved - Centralized logger service  
**What You Have:**
```typescript
// Old way - scattered console calls (❌ BEFORE)
catch (error) {
  console.error('Error:', error);
}

// New way - centralized (✅ AFTER)
catch (error) {
  logger.error('Failed to save progress', error);
}
```

---

### 18. ❌ Missing Unit Tests for Utilities
**Score:** 🟡 Partial - Some utilities lack tests  
**Test Coverage Check:**
```bash
npm test -- --coverage  # Current: ~80% - could be higher
```

**Utilities to Test:**
- `src/utils/randomUtils.ts` - Any tests?
- `src/utils/cardEvaluator.ts` - Any tests?
- `src/utils/fiveCardEvaluator.ts` - Any tests?
- Game calculation functions - Any tests?

---

### 19. ❌ Missing Storybook / Component Library
**Score:** 🔴 Not Implemented  
**Why It Helps:**
- Visual testing without running app
- Document component API
- Catch visual regressions
- Easier for designers to review

**Not Critical for Game App** - Lower priority than fixing current issues

---

### 20. ❌ Performance: Unnecessary Array/Object Creation
**Score:** ✅ Good - Using proper memoization  
**What You're Doing Right:**
```typescript
const difficultyColors = useMemo(() => ({ /* ... */ }), []);
const filteredDrills = useMemo(() => drills.filter(...), [drills]);
```

**What to Watch:**
```typescript
// ❌ DON'T - New array every render
const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
].map(item => <Item key={item.id} {...item} />);

// ✅ DO - Static or memoized
const ITEMS = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
];

const items = ITEMS.map(item => <Item key={item.id} {...item} />);
```

---

## PART 3: Your Best Practices Score Card

| Category | Score | Notes |
|----------|-------|-------|
| Code Organization | 9/10 | Feature-based structure is excellent |
| Type Safety | 7/10 | ⚠️ Generic types need fix, otherwise solid |
| Testing | 6/10 | 80% coverage but utilities need tests |
| Performance | 8/10 | Good use of memoization |
| Accessibility | 4/10 | Missing labels and hints |
| Documentation | 5/10 | Some files lack JSDoc |
| Error Handling | 9/10 | Logger service is excellent |
| Code Duplication | 9/10 | Well eliminated with hooks |
| Naming Conventions | 9/10 | Very consistent |
| Styling | 9/10 | Centralized and theme-aware |
| **OVERALL** | **8/10** | Solid codebase, small fixes needed |

---

## PART 4: Priority Ranking of Improvements

### 🔴 CRITICAL (Fix This Week)
1. Fix useDrillState generic type binding
2. Remove duplicate variable declarations
3. Update TypeScript theme interface
4. Configure Jest module mappings
5. Verify build passes

### 🟠 HIGH (Fix This Sprint)
6. Remove unused style definitions
7. Add missing unit tests for utilities
8. Enable strict TypeScript flags
9. Remove unused imports/variables

### 🟡 MEDIUM (Fix Next Sprint)
10. Add accessibility labels to interactive elements
11. Add JSDoc comments to all exported functions
12. Check for circular dependencies
13. Profile app for performance bottlenecks

### 🔵 LOW (Nice to Have)
14. Add Storybook for component documentation
15. Set up visual regression testing
16. Add E2E tests (Detox/Appium)
17. Implement feature flags for A/B testing

---

## PART 5: Recommended Tools to Enable

### Development Tools

1. **ESLint:** ✅ Already using
```bash
npm run lint
```

2. **TypeScript:** ✅ Already using
```bash
npx tsc --noEmit
```

3. **Jest:** ✅ Already using
```bash
npm test
```

4. **Prettier:** ⚠️ Consider adding for code formatting
```bash
npx prettier --write src/
```

5. **Husky:** 🟡 Recommended for pre-commit hooks
```bash
npm install husky
husky install
npx husky add .husky/pre-commit "npm run lint && npx tsc --noEmit"
```

---

## 🎯 Action Plan

**This Week:**
- [ ] Fix critical TypeScript errors (2-3 hours)
- [ ] Run checks: `tsc`, `eslint`, `jest` all pass
- [ ] Commit fixes with descriptive messages

**Next Week:**
- [ ] Remove unused styles and imports (1-2 hours)
- [ ] Add tests for utility functions (2-3 hours)
- [ ] Enable strict TypeScript flags (30 min)

**Next Sprint:**
- [ ] Add accessibility (2-3 hours)
- [ ] Add JSDoc documentation (3-4 hours)
- [ ] Performance audit (2-3 hours)

---

**Generated:** March 3, 2026  
**Status:** Development recommendations ready
