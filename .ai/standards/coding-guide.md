# Coding Guide & Standards

Updated: 2026-03-10
Owner: @ivans

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
- **Sound/Haptics**: only in handlers/effects that check `useSettings()` first
- **Persistence**: AsyncStorage writes in contexts/services/hooks, not deeply in presentational components
- **Navigation**: perform in screen-level handlers, not in utility modules
- **Network/async game setup**: keep in hooks/services; keep screen components focused on rendering + event wiring

---

## Detailed Rules by Priority

### P0 — Blocking (never merge if violated)

#### 1. TypeScript Strict — Always Verify
```bash
npx tsc --noEmit
```
Run after every change. Zero errors before marking done.

#### 2. No Inline Styles — Use Theme Pattern
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

// BAD — old path (src/components/ is for InstallButton/SpeedInsights only now)
import NumberPad from '@components/NumberPad';

// GOOD — use shared components via @shared alias
import NumberPad from '@shared/NumberPad';
// or barrel import:
import { NumberPad } from '@shared';
```

#### 4a. Shared Component Import Rule — Use Named Exports via `@shared`

All shared UI components live in `src/shared/`. Import them using the `@shared` alias.

```tsx
// Named exports (preferred for barrel imports):
import { NumberPad, SkeletonLoader, ChipSelector } from '@shared';

// Default imports (for single-component imports):
import NumberPad from '@shared/NumberPad';
import SkeletonLoader from '@shared/SkeletonLoader';
import ChipSelector from '@shared/ChipSelector';
import PlayingCard from '@shared/PlayingCard';
import LoadingSpinner from '@shared/LoadingSpinner';
import withErrorBoundary from '@shared/withErrorBoundary';
import ErrorBoundary from '@shared/ErrorBoundary';
import FeatureErrorBoundary from '@shared/FeatureErrorBoundary';
```

The `@components/shared` alias also resolves to `src/shared` (for backwards compatibility) but prefer `@shared` for new code.

`src/components/` now only contains `InstallButton/` and `SpeedInsights/` — do not add shared UI there.

#### 5. Code Review Blocker: Type Safety
- No `any` types in production code
- All props must be typed
- All hook return types must be explicit
- Redux state must be typed

```tsx
// BAD
const data = useSelector(state => state); // any
const handlePress = (e) => { ... }; // implicit any

// GOOD
const data = useSelector((state: RootState) => state.roulette);
const handlePress = (e: GestureResponderEvent) => { ... };
```

---

### P1 — High Priority (merge after review if code quality is high)

#### 6. Feature Folder Structure
Keep features self-contained using the standard layout:

```
src/features/MyFeature/
├── screens/
├── components/
├── hooks/
├── types/
├── constants/
├── utils/
├── navigation.tsx
└── index.ts
```

Export only public API via `index.ts`. Implementation details stay internal.

#### 7. Screen-Level Colocation
Screen-specific logic and components belong with the screen:

```tsx
// ✓ Good: Component colocated with screen
src/features/roulette-training/screens/CalculationScreen/
├── CalculationScreen.tsx
├── CalculationScreen.test.tsx
├── useCalculationQuestion.ts      // Screen-specific hook
└── useExerciseState.ts               // Screen-specific hook

// ✗ Bad: Hook floating in feature-level hooks/
src/features/roulette-training/hooks/
├── useCalculationQuestion.ts       # Used only by CalculationScreen!
```

Move to screen folder if used by one screen only.

#### 8. Component Files Must Have Tests
Every new/modified component must have a `.test.tsx` file:

```tsx
import { render, screen } from '@testing-library/react-native';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText(/hello/i)).toBeOnTheScreen();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    render(<MyComponent onPress={onPress} />);
    fireEvent.press(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalled();
  });
});
```

#### 9. Effect Cleanup is Mandatory
All effects must clean up:

```tsx
// GOOD
useEffect(() => {
  const subscription = listener.subscribe(...);
  return () => subscription.unsubscribe(); // Cleanup!
}, []);

// GOOD
useEffect(() => {
  const timer = setTimeout(() => { ... }, 1000);
  return () => clearTimeout(timer); // Cleanup!
}, []);
```

#### 10. No Array Index Keys for Dynamic Lists
Always use stable unique IDs:

```tsx
// ✗ Bad
items.map((item, index) => <Item key={index} ... />)

// ✓ Good
items.map((item) => <Item key={item.id} ... />)
```

---

### P2 — Nice to Have (discuss in review)

#### 11. Double-Tap Protection
Protect user interactions from rapid repeated taps:

```tsx
const [lastPress, setLastPress] = useState(0);

const handlePress = () => {
  const now = Date.now();
  if (now - lastPress < 300) return; // Debounce
  setLastPress(now);
  // Handle press
};
```

#### 12. Extract Shared Behavior at 2×
When the same logic or UI appears in 2+ files, extract it:

```tsx
// After copy-paste in 2 places → Extract to utility or hook
const useRoundResult = () => { ... };
```

#### 13. Memoization for Performance
Use `useMemo` and `useCallback` for expensive operations:

```tsx
// Memoize computed values to prevent unnecessary re-renders
const styles = useMemo(() => makeStyles(colors), [colors]);

// Memoize callbacks to prevent child re-renders
const handlePress = useCallback(() => { ... }, [dependency]);
```

---

## Testing Strategy

### Unit Tests
- Hooks: test in isolation with mock Redux
- Utilities: test pure functions
- Components: test render + one interaction

### Integration Tests  
- Feature workflows (multi-screen navigation)
- State flow (dispatch → reducer → selector)
- E2E (critical user journeys if time permits)

### Minimum Coverage
- Render tests for all components
- Reducer tests for all Redux logic
- Hook tests for custom selector hooks
- Happy path + one error case minimum

---

## Code Style Basics

- **Naming**: Use clear names over abbreviations (`calculateWinnings` not `calcWins`)
- **Functions**: Keep focused; refactor if > 50 lines
- **Props**: Spread carefully; explicitly list props at module boundary
- **Comments**: Explain *why*, not *what* (code shows what)
- **Imports**: Group by third-party, then relative (`src/...`), then local (`./`)

---

## Quick Checklist Before Commit

```bash
# 1. Type check
npx tsc --noEmit

# 2. Lint check
npx eslint src --ext .ts,.tsx

# 3. Test check
npx jest --passWithNoTests

# 4. Manual review checklist
- [ ] No cross-feature imports?
- [ ] No hardcoded colors?
- [ ] All components have tests?
- [ ] Effects cleaned up?
- [ ] Props/hooks typed?
- [ ] Feature is colocated properly?
```
