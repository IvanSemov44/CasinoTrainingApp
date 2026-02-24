# Comprehensive Testing System Plan for Casino Training App

## Executive Summary

This document outlines a comprehensive testing strategy for the Casino Training App, a React Native/Expo application for training casino dealers. The plan is based on 10+ years of software development experience and focuses on high-ROI testing practices.

---

## Current State Analysis

### Existing Test Coverage

| Area | Files | Status | Priority |
|------|-------|--------|----------|
| Config Tests | 1 file | ✅ Good coverage | Maintain |
| Cash Conversion Utils | 1 file | ✅ Good coverage | Maintain |
| PLO Utils | 1 file | ✅ Good coverage | Maintain |
| Racetrack Utils | 1 file | ✅ Good coverage | Maintain |
| Component Tests | 0 files | ❌ Missing | HIGH |
| Hook Tests | 0 files | ❌ Missing | HIGH |
| Screen Tests | 0 files | ❌ Missing | MEDIUM |
| Integration Tests | 0 files | ❌ Missing | MEDIUM |
| E2E Tests | 0 files | ⬜ Deferred | LOW |

### Testing Infrastructure

- **Test Runner**: Jest 30.2.0
- **Testing Library**: @testing-library/react-native 13.3.3
- **Setup**: Custom jest.setup.js with mocks for Reanimated and AsyncStorage
- **Environment**: Node test environment

---

## Expert Recommendations Applied

### 1. Skip E2E Testing Initially
E2E tests with Detox are expensive to maintain and slow to run. For a training app, **integration tests provide better ROI**. E2E will be considered only after:
- Stable UI that rarely changes
- Dedicated QA process established
- CI/CD pipeline mature enough

### 2. Coverage Thresholds
| Category | Initial Threshold | Target |
|----------|-------------------|--------|
| Business Logic (utils) | 80% | 100% |
| Hooks | 70% | 85% |
| Components | 60% | 75% |
| Screens | 50% | 70% |
| **Overall** | **60%** | **80%** |

### 3. No Snapshot Testing
Snapshot tests create false confidence and become maintenance burden. Instead:
- Use **explicit assertions** for UI behavior
- Test **user interactions**, not markup structure
- Focus on **accessibility** and **functionality**

### 4. Reordered Implementation Phases
Screens depend on components and hooks. Testing in this order makes screen tests simpler:

```
Phase 1: Utils → Phase 2: Hooks → Phase 3: Components → Phase 4: Integration → Phase 5: Screens
```

---

## Test Pyramid Strategy

```
                    ┌─────────┐
                    │  E2E    │ ← Deferred (Phase 6 - Optional)
                    │  ~5%    │
                ┌───┴─────────┴───┐
                │  Integration    │ ← Phase 4
                │     ~15%        │
            ┌───┴─────────────────┴───┐
            │     Component Tests     │ ← Phase 3
            │        ~30%             │
        ┌───┴─────────────────────────┴───┐
        │         Unit Tests              │ ← Phases 1 & 2
        │           ~50%                  │
        └─────────────────────────────────┘
```

---

## Phase 1: Unit Testing Expansion

### 1.1 Missing Utility Tests - HIGH PRIORITY

| File | Location | Functions to Test | Business Critical |
|------|----------|-------------------|-------------------|
| [`validation.ts`](src/features/call-bets-training/utils/validation.ts) | call-bets-training | Bet validation logic | ✅ Yes |
| [`betGenerators.ts`](src/features/roulette-training/utils/betGenerators.ts) | roulette-training | Bet generation functions | ✅ Yes |
| [`exerciseHelpers.ts`](src/features/roulette-training/utils/exerciseHelpers.ts) | roulette-training | Exercise helper functions | ✅ Yes |
| [`randomUtils.ts`](src/features/roulette-training/utils/randomUtils.ts) | roulette-training | Random number generation | ⬜ No |
| [`hintGenerators.tsx`](src/features/roulette-training/utils/hintGenerators.tsx) | roulette-training | Hint generation logic | ⬜ No |

### 1.2 Constants and Configuration Tests - MEDIUM PRIORITY

| File | Location | Tests Needed |
|------|----------|--------------|
| [`payouts.ts`](src/features/roulette-training/constants/payouts.ts) | roulette-training | Payout ratio validation |
| [`betCombinations.ts`](src/features/roulette-training/constants/betCombinations.ts) | roulette-training | Combination correctness |
| [`gameScenarios.ts`](src/features/plo-training/constants/gameScenarios.ts) | plo-training | Scenario validation |
| [`sectors.ts`](src/features/cash-conversion-training/constants/sectors.ts) | cash-conversion | Sector definitions |
| [`announcedBets.constants.ts`](src/features/racetrack/constants/announcedBets.constants.ts) | racetrack | Announced bet definitions |

### 1.3 Test File Structure

```
src/features/[feature]/utils/__tests__/
├── utilityName.test.ts
└── ...
```

---

## Phase 2: Hook Testing

### 2.1 Custom Hooks to Test - HIGH PRIORITY

| Hook | Location | Test Focus | Business Critical |
|------|----------|------------|-------------------|
| [`useExerciseState.ts`](src/features/roulette-training/hooks/useExerciseState.ts) | roulette-training | State management, score tracking | ✅ Yes |
| [`useAnnouncedBets.ts`](src/features/racetrack/hooks/useAnnouncedBets.ts) | racetrack | Bet state management | ✅ Yes |
| [`useRouletteBets.ts`](src/components/roulette/hooks/useRouletteBets.ts) | components/roulette | Bet amount calculations | ✅ Yes |
| [`useModalAnimation.ts`](src/components/shared/useModalAnimation.ts) | components/shared | Animation state | ⬜ No |

### 2.2 Hook Testing Pattern

```typescript
// useExerciseState.test.ts
import { renderHook, act } from '@testing-library/react-native';
import { useExerciseState } from '../useExerciseState';

describe('useExerciseState', () => {
  describe('initialization', () => {
    it('should initialize with default values', () => {
      const { result } = renderHook(() => useExerciseState());
      expect(result.current.score).toBe(0);
      expect(result.current.currentExercise).toBe(0);
    });
  });

  describe('score management', () => {
    it('should increment score on correct answer', () => {
      const { result } = renderHook(() => useExerciseState());
      
      act(() => {
        result.current.handleCorrectAnswer();
      });
      
      expect(result.current.score).toBe(1);
    });

    it('should not increment score on incorrect answer', () => {
      const { result } = renderHook(() => useExerciseState());
      
      act(() => {
        result.current.handleIncorrectAnswer();
      });
      
      expect(result.current.score).toBe(0);
    });
  });

  describe('exercise progression', () => {
    it('should advance to next exercise', () => {
      const { result } = renderHook(() => useExerciseState());
      
      act(() => {
        result.current.nextExercise();
      });
      
      expect(result.current.currentExercise).toBe(1);
    });
  });
});
```

---

## Phase 3: Component Testing

### 3.1 Shared Components - HIGH PRIORITY

| Component | Location | Test Focus | Accessibility |
|-----------|----------|------------|---------------|
| [`ChipSelector.tsx`](src/components/ChipSelector.tsx) | components | Chip selection, value display | ✅ Required |
| [`Racetrack.tsx`](src/components/Racetrack.tsx) | components | Number display, scrolling | ✅ Required |
| [`ErrorBoundary.tsx`](src/components/ErrorBoundary.tsx) | components | Error catching, fallback UI | ⬜ Optional |
| [`LoadingSpinner.tsx`](src/components/LoadingSpinner.tsx) | components | Rendering, accessibility | ✅ Required |
| [`SkeletonLoader.tsx`](src/components/SkeletonLoader.tsx) | components | Animation, placeholder display | ⬜ Optional |

### 3.2 Roulette Components - MEDIUM PRIORITY

| Component | Location | Test Focus |
|-----------|----------|------------|
| [`RouletteLayout.tsx`](src/components/roulette/RouletteLayout.tsx) | components/roulette | Number grid, touch handling |
| [`RouletteNumberCell.tsx`](src/components/roulette/RouletteNumberCell.tsx) | components/roulette | Number display, colors |
| [`RouletteChip.tsx`](src/components/roulette/RouletteChip.tsx) | components/roulette | Chip rendering |
| [`TrainingSelectionModal.tsx`](src/components/roulette/TrainingSelectionModal.tsx) | components/roulette | Modal interactions |

### 3.3 Feature Components - MEDIUM PRIORITY

| Feature | Key Components |
|---------|----------------|
| call-bets-training | ChallengeDisplay, ResultFeedback |
| cash-conversion-training | AnswerInput, CashDisplay, RequestDisplay, ResultFeedback |
| plo-training | GameStateDisplay, PlayerPosition, PokerTable, PotCalculationInput |
| roulette-training | ExerciseLayout, ExerciseStats, FeedbackCard, HintSection, NumberPad |
| racetrack | RacetrackLayout |

### 3.4 Component Testing Pattern

```typescript
// ChipSelector.test.tsx
import { render, fireEvent, screen } from '@testing-library/react-native';
import ChipSelector from '../ChipSelector';

describe('ChipSelector', () => {
  const mockOnSelect = jest.fn();
  const defaultProps = {
    selectedValue: 5,
    onSelect: mockOnSelect,
  };

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  describe('rendering', () => {
    it('renders all chip values', () => {
      render(<ChipSelector {...defaultProps} />);
      
      const chipValues = [1, 5, 10, 25, 100, 500, 1000];
      chipValues.forEach(value => {
        expect(screen.getByText(String(value))).toBeTruthy();
      });
    });

    it('highlights selected chip with gold border', () => {
      render(<ChipSelector {...defaultProps} />);
      
      const selectedChip = screen.getByTestId('chip-5');
      expect(selectedChip).toHaveStyle({ borderColor: '#FFD700' });
    });
  });

  describe('interactions', () => {
    it('calls onSelect when chip is pressed', () => {
      render(<ChipSelector {...defaultProps} />);
      
      fireEvent.press(screen.getByTestId('chip-10'));
      
      expect(mockOnSelect).toHaveBeenCalledWith(10);
      expect(mockOnSelect).toHaveBeenCalledTimes(1);
    });

    it('does not call onSelect when disabled chip is pressed', () => {
      render(<ChipSelector {...defaultProps} disabledValues={[10]} />);
      
      fireEvent.press(screen.getByTestId('chip-10'));
      
      expect(mockOnSelect).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('has accessible chips with proper labels', () => {
      render(<ChipSelector {...defaultProps} />);
      
      const chip = screen.getByTestId('chip-5');
      expect(chip).toBeAccessible();
      expect(chip).toHaveAccessibilityLabel('Chip value 5, selected');
    });
  });
});
```

---

## Phase 4: Integration Testing

### 4.1 Navigation Flow Tests

```typescript
// navigation.integration.test.tsx
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '../AppNavigator';

describe('Navigation Integration', () => {
  it('navigates from Home to Roulette Training', async () => {
    render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );
    
    fireEvent.press(screen.getByText(/Roulette Training/i));
    
    await waitFor(() => {
      expect(screen.getByText(/Exercises/i)).toBeTruthy();
    });
  });

  it('navigates through complete training flow', async () => {
    render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );
    
    // Navigate to feature
    fireEvent.press(screen.getByText(/Cash Conversion/i));
    
    // Select difficulty
    fireEvent.press(screen.getByText(/Easy/i));
    
    // Complete exercise
    await waitFor(() => {
      expect(screen.getByText(/Submit/i)).toBeTruthy();
    });
  });
});
```

### 4.2 Feature Integration Tests

| Flow | Test Scenarios |
|------|----------------|
| Roulette Training | Menu → Exercise → Answer → Feedback → Next |
| Cash Conversion | Menu → Difficulty → Exercise → Validation |
| PLO Training | Menu → Scenario → Calculation → Result |
| Call Bets | Menu → Challenge → Response → Feedback |

---

## Phase 5: Screen Testing

### 5.1 Menu Screens - MEDIUM PRIORITY

| Screen | Location | Test Focus |
|--------|----------|------------|
| [`CallBetsMenuScreen.tsx`](src/features/call-bets-training/screens/CallBetsMenuScreen.tsx) | call-bets-training | Menu rendering, navigation |
| [`CashConversionMenuScreen.tsx`](src/features/cash-conversion-training/screens/CashConversionMenuScreen.tsx) | cash-conversion | Menu rendering, navigation |
| [`PLOMenuScreen.tsx`](src/features/plo-training/screens/PLOMenuScreen.tsx) | plo-training | Menu rendering, navigation |
| [`RouletteExercisesScreen.tsx`](src/features/roulette-training/screens/menu/RouletteExercisesScreen.tsx) | roulette-training | Exercise list, navigation |

### 5.2 Training Screens - HIGH PRIORITY

| Screen | Location | Test Focus |
|--------|----------|------------|
| [`CallBetsTrainingScreen.tsx`](src/features/call-bets-training/screens/CallBetsTrainingScreen.tsx) | call-bets-training | Training flow, scoring |
| [`CashConversionTrainingScreen.tsx`](src/features/cash-conversion-training/screens/CashConversionTrainingScreen.tsx) | cash-conversion | Training flow, validation |
| [`PLOPotCalculationScreen.tsx`](src/features/plo-training/screens/PLOPotCalculationScreen.tsx) | plo-training | Pot calculation, validation |
| [`CalculationScreen.tsx`](src/features/roulette-training/screens/exercises/CalculationScreen.tsx) | roulette-training | Exercise logic, feedback |

### 5.3 Screen Testing Pattern

```typescript
// CashConversionTrainingScreen.test.tsx
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import CashConversionTrainingScreen from '../CashConversionTrainingScreen';
import { NavigationContainer } from '@react-navigation/native';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ navigate: mockNavigate }),
}));

describe('CashConversionTrainingScreen', () => {
  describe('rendering', () => {
    it('renders training interface with exercise', () => {
      render(
        <NavigationContainer>
          <CashConversionTrainingScreen />
        </NavigationContainer>
      );
      
      expect(screen.getByText(/Cash Conversion/i)).toBeTruthy();
      expect(screen.getByTestId('answer-input')).toBeTruthy();
    });
  });

  describe('training flow', () => {
    it('displays correct feedback for correct answer', async () => {
      render(
        <NavigationContainer>
          <CashConversionTrainingScreen />
        </NavigationContainer>
      );
      
      // Get the expected answer from the exercise
      const expectedAnswer = screen.getByTestId('expected-answer').textContent;
      
      // Enter correct answer
      fireEvent.changeText(screen.getByTestId('answer-input'), expectedAnswer);
      fireEvent.press(screen.getByText('Submit'));
      
      await waitFor(() => {
        expect(screen.getByText(/Correct/i)).toBeTruthy();
      });
    });

    it('displays incorrect feedback for wrong answer', async () => {
      render(
        <NavigationContainer>
          <CashConversionTrainingScreen />
        </NavigationContainer>
      );
      
      // Enter wrong answer
      fireEvent.changeText(screen.getByTestId('answer-input'), '0');
      fireEvent.press(screen.getByText('Submit'));
      
      await waitFor(() => {
        expect(screen.getByText(/Incorrect/i)).toBeTruthy();
      });
    });
  });
});
```

---

## Phase 6: E2E Testing (DEFERRED)

### When to Consider E2E

E2E testing with Detox should be considered when:
1. UI is stable and rarely changes
2. Dedicated QA process is established
3. CI/CD pipeline is mature
4. Team has capacity for E2E maintenance

### Critical Paths for E2E (When Implemented)

| Journey | Steps |
|---------|-------|
| Complete Roulette Exercise | Open app → Navigate to Roulette → Select exercise → Complete → View score |
| Cash Conversion Training | Open app → Navigate to Cash Conversion → Complete training → View results |
| PLO Pot Calculation | Open app → Navigate to PLO → Calculate pot → Submit answer |

---

## Test Organization Structure

```
src/
├── __mocks__/                    # Global mocks
│   ├── react-native-reanimated.ts
│   ├── async-storage.ts
│   └── navigation.ts
│
├── test-utils/                   # Testing utilities
│   ├── render.tsx               # Custom render with providers
│   ├── mocks.ts                 # Reusable mocks
│   └── fixtures.ts              # Test data fixtures
│
├── components/
│   └── __tests__/
│       ├── ChipSelector.test.tsx
│       └── ...
│
└── features/
    └── [feature]/
        ├── components/__tests__/
        ├── screens/__tests__/
        ├── hooks/__tests__/
        └── utils/__tests__/
```

---

## Testing Utilities Setup

### Custom Render Function

```typescript
// test-utils/render.tsx
import React from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from '@store/index';

const AllProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Provider store={store}>
    <NavigationContainer>
      {children}
    </NavigationContainer>
  </Provider>
);

const customRender = (
  ui: React.ReactElement,
  options?: RenderOptions
) => render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react-native';
export { customRender as render };
```

### Test Fixtures

```typescript
// test-utils/fixtures.ts
import { CashRequest, PotRequest } from '@features/types';

export const mockCashRequests: Record<string, CashRequest> = {
  simple: {
    cashAmount: 300,
    sector: 'tier',
    requestType: 'for-the-money',
  },
  withChange: {
    cashAmount: 350,
    sector: 'tier',
    requestType: 'for-the-money',
  },
  byAmount: {
    cashAmount: 500,
    sector: 'voisins',
    requestType: 'by-amount',
    specifiedAmount: 50,
  },
};

export const mockPotRequests: Record<string, PotRequest> = {
  simpleBet: {
    requestingPosition: 'BB',
    previousActions: [
      { position: 'UTG', action: 'bet', amount: 10 },
    ],
    smallBlind: 1,
    bigBlind: 2,
  },
  withRaise: {
    requestingPosition: 'D',
    previousActions: [
      { position: 'UTG', action: 'bet', amount: 10 },
      { position: 'MP', action: 'raise', amount: 30 },
    ],
    smallBlind: 1,
    bigBlind: 2,
  },
};

export const mockChipValues = [1, 5, 10, 25, 100, 500, 1000];

export const mockRouletteNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
```

### Reusable Mocks

```typescript
// test-utils/mocks.ts
export const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  reset: jest.fn(),
};

export const mockRoute = {
  params: {},
};

export const mockUseNavigation = () => mockNavigation;
export const mockUseRoute = () => mockRoute;

// Setup for react-navigation
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => mockUseNavigation(),
  useRoute: () => mockUseRoute(),
}));
```

---

## Coverage Targets Summary

### Overall Goals

| Category | Initial | Target | Current |
|----------|---------|--------|---------|
| Unit Tests | 60% | 80% | ~15% |
| Component Tests | 50% | 75% | 0% |
| Integration Tests | Key flows | Key flows | 0% |
| **Overall** | **60%** | **80%** | **~15%** |

### Feature-Specific Targets

| Feature | Utils | Hooks | Components | Screens |
|---------|-------|-------|------------|---------|
| roulette-training | 100% | 85% | 75% | 70% |
| cash-conversion-training | 100% | 85% | 75% | 70% |
| plo-training | 100% | 85% | 75% | 70% |
| call-bets-training | 100% | 85% | 75% | 70% |
| racetrack | 100% | 85% | 75% | 70% |

---

## Implementation Roadmap

### Sprint 1: Foundation (Week 1-2)
- [ ] Set up test utilities (custom render, fixtures, mocks)
- [ ] Add missing utility tests for all features
- [ ] Add constant/configuration tests
- [ ] **Target: 40% coverage**

### Sprint 2: Hook Testing (Week 3)
- [ ] Test all custom hooks
- [ ] Add hook testing patterns to documentation
- [ ] **Target: 50% coverage**

### Sprint 3: Component Testing (Week 4-5)
- [ ] Test shared components
- [ ] Test roulette components
- [ ] Test feature-specific components
- [ ] **Target: 60% coverage**

### Sprint 4: Integration Testing (Week 6)
- [ ] Set up navigation integration tests
- [ ] Test complete training flows
- [ ] Add cross-feature integration tests
- [ ] **Target: 65% coverage**

### Sprint 5: Screen Testing (Week 7-8)
- [ ] Test menu screens
- [ ] Test training screens
- [ ] Test reference screens
- [ ] **Target: 75% coverage**

### Sprint 6: Polish & Documentation (Week 9)
- [ ] Review and improve test coverage
- [ ] Update testing documentation
- [ ] Add testing guidelines to DEVELOPMENT_STANDARDS.md
- [ ] **Target: 80% coverage**

---

## CI/CD Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linting
        run: npm run lint
      
      - name: Run unit tests
        run: npm run test:coverage
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
      
      - name: Check coverage threshold (60%)
        run: |
          COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
          if (( $(echo "$COVERAGE < 60" | bc -l) )); then
            echo "❌ Coverage $COVERAGE% is below threshold 60%"
            exit 1
          fi
          echo "✅ Coverage $COVERAGE% meets threshold 60%"
```

---

## Pre-commit Hooks

### Husky Configuration

```json
// package.json additions
{
  "scripts": {
    "test:related": "jest --bail --findRelatedTests",
    "test:threshold": "npm run test:coverage && node scripts/check-coverage.js"
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "npm run test:related"
    ]
  }
}
```

### Coverage Check Script

```javascript
// scripts/check-coverage.js
const coverage = require('../coverage/coverage-summary.json');
const threshold = 60;
const actual = coverage.total.lines.pct;

if (actual < threshold) {
  console.error(`❌ Coverage ${actual}% is below threshold ${threshold}%`);
  process.exit(1);
}

console.log(`✅ Coverage ${actual}% meets threshold ${threshold}%`);
```

---

## Best Practices

### 1. Test Naming Convention

```typescript
// Pattern: [unit] should [expected behavior] when [condition]
it('calculatePotAmount should return correct pot when given valid request', () => {});
it('ChipSelector should highlight selected chip when rendered', () => {});
it('useExerciseState should increment score when correct answer submitted', () => {});
```

### 2. Test Structure (AAA Pattern)

```typescript
it('should increment score on correct answer', () => {
  // Arrange
  const { result } = renderHook(() => useExerciseState());
  
  // Act
  act(() => {
    result.current.handleCorrectAnswer();
  });
  
  // Assert
  expect(result.current.score).toBe(1);
});
```

### 3. Test Isolation

```typescript
describe('Feature', () => {
  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    // Reset any global state
  });
  
  afterEach(() => {
    // Cleanup if needed
    jest.restoreAllMocks();
  });
});
```

### 4. Avoid Implementation Details

```typescript
// ❌ Bad - testing implementation
expect(component.state.count).toBe(1);

// ✅ Good - testing behavior
expect(screen.getByText('Count: 1')).toBeTruthy();
```

### 5. Test User Interactions, Not Props

```typescript
// ❌ Bad - testing props
expect(component.props.onPress).toBeDefined();

// ✅ Good - testing interaction
fireEvent.press(screen.getByText('Submit'));
expect(mockOnSubmit).toHaveBeenCalled();
```

---

## Maintenance Guidelines

### 1. Keep Tests Updated
- Update tests when changing functionality
- Remove tests for deleted features
- Refactor tests alongside code refactoring

### 2. Regular Coverage Reviews
- Weekly coverage report review
- Identify untested critical paths
- Prioritize tests for bug fixes

### 3. Test Performance
- Keep unit tests fast (< 5s total)
- Use --findRelatedTests for CI
- Parallelize test runs

### 4. Flaky Test Management
- Mark flaky tests immediately
- Investigate and fix within 24 hours
- Remove if cannot be fixed

---

## Conclusion

This comprehensive testing system provides:

| Benefit | How |
|---------|-----|
| **Confidence** | Automated testing catches regressions |
| **Documentation** | Tests document expected behavior |
| **Regression Prevention** | CI/CD integration blocks bad code |
| **Maintainability** | Clear patterns and utilities |
| **Fast Feedback** | Unit tests run in seconds |

The phased approach allows incremental implementation while delivering value at each stage. Focus on business logic first (highest ROI), then expand to UI and integration testing.
