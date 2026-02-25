# Comprehensive Testing System Plan for Casino Training App

## Executive Summary

This document outlines a comprehensive testing strategy for the Casino Training App, a React Native/Expo application for training casino dealers. The plan is based on 10+ years of software development experience and focuses on high-ROI testing practices.

---

## Current State Analysis (Updated: 2026-02-25)

### Existing Test Coverage

| Area | Files | Status | Coverage | Priority |
|------|-------|--------|----------|----------|
| Config Tests | 1 file | ✅ Complete | 100% | Maintain |
| Cash Conversion Utils | 1 file | ✅ Complete | 100% | Maintain |
| PLO Training | - | ⬜ Skipped | N/A | Deferred (in development) |
| Racetrack Utils | 1 file | ✅ Complete | 100% | Maintain |
| Roulette Utils | 1 file | ✅ Complete | 96.42% | Maintain |
| Bet Generators | 1 file | ✅ Good | 86.66% | Improve |
| Exercise Helpers | 1 file | ✅ Complete | 100% | Maintain |
| Call Bets Validation | 1 file | ✅ Complete | 96.29% | Maintain |
| Component Tests | 5 files | ✅ Complete | 97.43% | Maintain |
| Hook Tests | 3 files | ✅ Complete | 100% | Maintain |
| Screen Tests | 2 files | 🟡 Started | 85-100% | HIGH |
| Integration Tests | 1 file | ✅ Complete | N/A | Maintain |
| E2E Tests | 0 files | ⬜ Deferred | 0% | LOW |

### Current Overall Coverage: **94.07%** ✅

### Testing Infrastructure

- **Test Runner**: Jest 30.2.0
- **Testing Library**: @testing-library/react-native 13.3.3
- **Setup**: Custom jest.setup.js with mocks for Reanimated and AsyncStorage
- **Environment**: Node test environment
- **Total Tests**: 395 passing across 22 test suites

### Test Utilities Created

| File | Purpose | Status |
|------|---------|--------|
| [`src/test-utils/render.tsx`](src/test-utils/render.tsx) | Custom render with NavigationContainer | ✅ Complete |
| [`src/test-utils/fixtures.ts`](src/test-utils/fixtures.ts) | Mock data for CashRequest, PotRequest, etc. | ✅ Complete |
| [`src/test-utils/builders.ts`](src/test-utils/builders.ts) | Builder pattern for test data | ✅ Complete |
| [`src/test-utils/mocks.ts`](src/test-utils/mocks.ts) | Centralized mocks for navigation, storage | ✅ Complete |

### Known Coverage Gaps

| File | Coverage | Missing Lines | Priority |
|------|----------|---------------|----------|
| [`randomUtils.ts`](src/utils/randomUtils.ts) | 0% | All | HIGH |
| [`colors.ts`](src/styles/colors.ts) | 16.66% | 110-117 | LOW |
| [`betGenerators.ts`](src/features/roulette-training/utils/betGenerators.ts) | 86.66% | 74, 120, 129-131, 140-142 | MEDIUM |
| [`roulette.constants.ts`](src/constants/roulette.constants.ts) | 51.72% | 78-88, 93-95 | LOW |

---

## Expert Recommendations Applied

### 1. Skip E2E Testing Initially
E2E tests with Detox are expensive to maintain and slow to run. For a training app, **integration tests provide better ROI**. E2E will be considered only after:
- Stable UI that rarely changes
- Dedicated QA process established
- CI/CD pipeline mature enough

### 2. Coverage Thresholds
| Category | Initial Threshold | Target | Current |
|----------|-------------------|--------|---------|
| Business Logic (utils) | 80% | 100% | 92%+ ✅ |
| Hooks | 70% | 85% | 100% ✅ |
| Components | 60% | 75% | ~10% |
| Screens | 50% | 70% | 0% |
| **Overall** | **60%** | **80%** | **92.87%** ✅ |

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
        │         Unit Tests              │ ← Phases 1 & 2 ✅
        │           ~50%                  │
        └─────────────────────────────────┘
```

---

## Phase 1: Unit Testing Expansion

### 1.1 Missing Utility Tests - HIGH PRIORITY

| File | Location | Functions to Test | Status | Business Critical |
|------|----------|-------------------|--------|-------------------|
| [`validation.ts`](src/features/call-bets-training/utils/validation.ts) | call-bets-training | Bet validation logic | ✅ Done | ✅ Yes |
| [`betGenerators.ts`](src/features/roulette-training/utils/betGenerators.ts) | roulette-training | Bet generation functions | ✅ Done | ✅ Yes |
| [`exerciseHelpers.ts`](src/features/roulette-training/utils/exerciseHelpers.ts) | roulette-training | Exercise helper functions | ✅ Done | ✅ Yes |
| [`randomUtils.ts`](src/features/roulette-training/utils/randomUtils.ts) | roulette-training | Random number generation | ❌ Missing | ⬜ No |
| [`hintGenerators.tsx`](src/features/roulette-training/utils/hintGenerators.tsx) | roulette-training | Hint generation logic | ❌ Missing | ⬜ No |

### 1.2 Constants and Configuration Tests - MEDIUM PRIORITY

| File | Location | Tests Needed | Status |
|------|----------|--------------|--------|
| [`payouts.ts`](src/features/roulette-training/constants/payouts.ts) | roulette-training | Payout ratio validation | 🟡 Partial (75%) |
| [`betCombinations.ts`](src/features/roulette-training/constants/betCombinations.ts) | roulette-training | Combination correctness | ✅ Done (100%) |
| [`gameScenarios.ts`](src/features/plo-training/constants/gameScenarios.ts) | plo-training | Scenario validation | ✅ Done (100%) |
| [`sectors.ts`](src/features/cash-conversion-training/constants/sectors.ts) | cash-conversion | Sector definitions | ✅ Done (100%) |
| [`announcedBets.constants.ts`](src/features/racetrack/constants/announcedBets.constants.ts) | racetrack | Announced bet definitions | ✅ Done (100%) |

### 1.3 Test File Structure

```
src/features/[feature]/utils/__tests__/
├── utilityName.test.ts
└── ...
```

---

## Phase 2: Hook Testing ✅ COMPLETE

### 2.1 Custom Hooks - ALL TESTED

| Hook | Location | Test Focus | Status | Coverage |
|------|----------|------------|--------|----------|
| [`useExerciseState.ts`](src/features/roulette-training/hooks/useExerciseState.ts) | roulette-training | State management, score tracking | ✅ Done | 100% |
| [`useAnnouncedBets.ts`](src/features/racetrack/hooks/useAnnouncedBets.ts) | racetrack | Bet state management | ✅ Done | 100% |
| [`useRouletteBets.ts`](src/components/roulette/hooks/useRouletteBets.ts) | components/roulette | Bet amount calculations | ✅ Done | 100% |
| [`useModalAnimation.ts`](src/components/shared/useModalAnimation.ts) | components/shared | Animation state | ⬜ Skipped | N/A |

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

| Component | Location | Test Focus | Status | Accessibility |
|-----------|----------|------------|--------|---------------|
| [`ChipSelector.tsx`](src/components/ChipSelector.tsx) | components | Chip selection, value display | ✅ Done (18 tests) | ✅ Required |
| [`Racetrack.tsx`](src/components/Racetrack.tsx) | components | Number display, scrolling | 🟡 Partial (92%) | ✅ Required |
| [`ErrorBoundary.tsx`](src/components/ErrorBoundary.tsx) | components | Error catching, fallback UI | ✅ Done (14 tests) | ⬜ Optional |
| [`LoadingSpinner.tsx`](src/components/LoadingSpinner.tsx) | components | Rendering, accessibility | ✅ Done (15 tests) | ✅ Required |
| [`SkeletonLoader.tsx`](src/components/SkeletonLoader.tsx) | components | Animation, placeholder display | ❌ Missing | ⬜ Optional |

### 3.2 Roulette Components - MEDIUM PRIORITY

| Component | Location | Test Focus | Status |
|-----------|----------|------------|--------|
| [`RouletteLayout.tsx`](src/components/roulette/RouletteLayout.tsx) | components/roulette | Number grid, touch handling | ❌ Missing |
| [`RouletteNumberCell.tsx`](src/components/roulette/RouletteNumberCell.tsx) | components/roulette | Number display, colors | ✅ Done (100%) |
| [`RouletteChip.tsx`](src/components/roulette/RouletteChip.tsx) | components/roulette | Chip rendering | ✅ Done (22 tests) |
| [`TrainingSelectionModal.tsx`](src/components/roulette/TrainingSelectionModal.tsx) | components/roulette | Modal interactions | ❌ Missing |

### 3.3 Feature Components - MEDIUM PRIORITY

| Feature | Key Components | Status |
|---------|----------------|--------|
| call-bets-training | ChallengeDisplay, ResultFeedback | ❌ Missing |
| cash-conversion-training | AnswerInput, CashDisplay, RequestDisplay, ResultFeedback | ❌ Missing |
| plo-training | GameStateDisplay, PlayerPosition, PokerTable, PotCalculationInput | ⬜ Skipped (in development) |
| roulette-training | ExerciseLayout, ExerciseStats, FeedbackCard, HintSection, NumberPad | ❌ Missing |
| racetrack | RacetrackLayout | ❌ Missing |

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

| Flow | Test Scenarios | Status |
|------|----------------|--------|
| Roulette Training | Menu → Exercise → Answer → Feedback → Next | ❌ Missing |
| Cash Conversion | Menu → Difficulty → Exercise → Validation | ❌ Missing |
| PLO Training | Menu → Scenario → Calculation → Result | ❌ Missing |
| Call Bets | Menu → Challenge → Response → Feedback | ❌ Missing |

### 4.3 Detailed Integration Test Scenarios

#### Cash Conversion Training Flow

```typescript
// src/features/cash-conversion-training/__tests__/training-flow.integration.test.tsx

describe('Cash Conversion Training Flow', () => {
  describe('Complete Training Cycle', () => {
    it('should complete a full training session from start to finish', async () => {
      const { getByText, getByTestId, queryByText } = renderWithProviders(
        <CashConversionTrainingScreen />
      );
      
      // 1. User sees the challenge
      expect(getByText(/Cash Amount/i)).toBeTruthy();
      expect(getByText(/Sector/i)).toBeTruthy();
      
      // 2. User calculates and enters answer
      const answerInput = getByTestId('answer-input');
      fireEvent.changeText(answerInput, '300');
      
      // 3. User submits
      fireEvent.press(getByText('Submit'));
      
      // 4. User sees feedback
      await waitFor(() => {
        expect(queryByText(/Correct|Incorrect/i)).toBeTruthy();
      });
      
      // 5. User can proceed to next exercise
      expect(getByText(/Next/i)).toBeTruthy();
    });
    
    it('should track score across multiple exercises', async () => {
      const { getByText, getByTestId } = renderWithProviders(
        <CashConversionTrainingScreen />
      );
      
      // Complete first exercise
      fireEvent.changeText(getByTestId('answer-input'), '300');
      fireEvent.press(getByText('Submit'));
      
      await waitFor(() => {
        expect(getByText(/Score: 1/i)).toBeTruthy();
      });
      
      // Complete second exercise
      fireEvent.press(getByText('Next'));
      fireEvent.changeText(getByTestId('answer-input'), '500');
      fireEvent.press(getByText('Submit'));
      
      await waitFor(() => {
        expect(getByText(/Score: 2/i)).toBeTruthy();
      });
    });
  });
  
  describe('Error Recovery', () => {
    it('should allow retry after incorrect answer', async () => {
      const { getByText, getByTestId } = renderWithProviders(
        <CashConversionTrainingScreen />
      );
      
      // Enter wrong answer
      fireEvent.changeText(getByTestId('answer-input'), '0');
      fireEvent.press(getByText('Submit'));
      
      await waitFor(() => {
        expect(getByText(/Incorrect/i)).toBeTruthy();
      });
      
      // Retry should be available
      expect(getByText(/Try Again/i)).toBeTruthy();
    });
  });
});
```

---

## Phase 5: Screen Testing

### 5.1 Menu Screens - MEDIUM PRIORITY

| Screen | Location | Test Focus | Status |
|--------|----------|------------|--------|
| [`CallBetsMenuScreen.tsx`](src/features/call-bets-training/screens/CallBetsMenuScreen.tsx) | call-bets-training | Menu rendering, navigation | ❌ Missing |
| [`CashConversionMenuScreen.tsx`](src/features/cash-conversion-training/screens/CashConversionMenuScreen.tsx) | cash-conversion | Menu rendering, navigation | ✅ Done (13 tests) |
| [`PLOMenuScreen.tsx`](src/features/plo-training/screens/PLOMenuScreen.tsx) | plo-training | Menu rendering, navigation | ✅ Done (9 tests) |
| [`RouletteExercisesScreen.tsx`](src/features/roulette-training/screens/menu/RouletteExercisesScreen.tsx) | roulette-training | Exercise list, navigation | ❌ Missing |

### 5.2 Training Screens - HIGH PRIORITY

| Screen | Location | Test Focus | Status |
|--------|----------|------------|--------|
| [`CallBetsTrainingScreen.tsx`](src/features/call-bets-training/screens/CallBetsTrainingScreen.tsx) | call-bets-training | Training flow, scoring | ❌ Missing |
| [`CashConversionTrainingScreen.tsx`](src/features/cash-conversion-training/screens/CashConversionTrainingScreen.tsx) | cash-conversion | Training flow, validation | ❌ Missing |
| [`PLOPotCalculationScreen.tsx`](src/features/plo-training/screens/PLOPotCalculationScreen.tsx) | plo-training | Pot calculation, validation | ⬜ Skipped (in development) |
| [`CalculationScreen.tsx`](src/features/roulette-training/screens/exercises/CalculationScreen.tsx) | roulette-training | Exercise logic, feedback | ❌ Missing |

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
├── test-utils/                   # Testing utilities (TO BE CREATED)
│   ├── render.tsx               # Custom render with providers
│   ├── mocks.ts                 # Reusable mocks
│   ├── fixtures.ts              # Test data fixtures
│   └── builders.ts              # Test data builders
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

const AllProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <NavigationContainer>
    {children}
  </NavigationContainer>
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

### Test Data Builders

```typescript
// test-utils/builders.ts
import { CashRequest, CashAnswer } from '../features/cash-conversion-training/types';

export class CashRequestBuilder {
  private request: Partial<CashRequest> = {
    cashAmount: 300,
    sector: 'tier',
    requestType: 'for-the-money',
  };
  
  withAmount(amount: number): this {
    this.request.cashAmount = amount;
    return this;
  }
  
  withSector(sector: 'tier' | 'voisins' | 'orphelins' | 'zero' | 'neighbors'): this {
    this.request.sector = sector;
    return this;
  }
  
  withRequestType(type: 'for-the-money' | 'by-amount'): this {
    this.request.requestType = type;
    return this;
  }
  
  withSpecifiedAmount(amount: number): this {
    this.request.specifiedAmount = amount;
    return this;
  }
  
  build(): CashRequest {
    return this.request as CashRequest;
  }
}

export class CashAnswerBuilder {
  private answer: Partial<CashAnswer> = {
    totalBet: 300,
    betPerPosition: 50,
    change: 0,
  };
  
  withTotalBet(total: number): this {
    this.answer.totalBet = total;
    return this;
  }
  
  withBetPerPosition(amount: number): this {
    this.answer.betPerPosition = amount;
    return this;
  }
  
  withChange(change: number): this {
    this.answer.change = change;
    return this;
  }
  
  build(): CashAnswer {
    return this.answer as CashAnswer;
  }
}

// Usage example:
const request = new CashRequestBuilder()
  .withAmount(500)
  .withSector('voisins')
  .build();
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

| Category | Initial | Target | Current | Status |
|----------|---------|--------|---------|--------|
| Unit Tests | 60% | 80% | 92%+ | ✅ Exceeded |
| Component Tests | 50% | 75% | ~10% | 🟡 In Progress |
| Integration Tests | Key flows | Key flows | 0% | ❌ Not Started |
| **Overall** | **60%** | **80%** | **92.87%** | ✅ Exceeded |

### Feature-Specific Targets

| Feature | Utils | Hooks | Components | Screens |
|---------|-------|-------|------------|---------|
| roulette-training | 100% ✅ | 100% ✅ | 0% | 0% |
| cash-conversion-training | 91% ✅ | N/A | 0% | 0% |
| plo-training | 100% ✅ | N/A | 0% | 0% |
| call-bets-training | 100% ✅ | N/A | 0% | 0% |
| racetrack | 100% ✅ | 100% ✅ | 0% | 0% |

---

## Implementation Roadmap

### Sprint 1: Foundation (Week 1-2) ✅ COMPLETE
- [x] Set up test utilities (custom render, fixtures, mocks)
- [x] Add missing utility tests for all features
- [x] Add constant/configuration tests
- [x] **Target: 40% coverage** → **Achieved: 92%+** ✅

### Sprint 2: Hook Testing (Week 3) ✅ COMPLETE
- [x] Test all custom hooks
- [x] Add hook testing patterns to documentation
- [x] **Target: 50% coverage** → **Achieved: 92%+** ✅

### Sprint 3: Component Testing (Week 4-5) 🟡 IN PROGRESS
- [x] Test RouletteNumberCell component
- [ ] Test ChipSelector component
- [ ] Test Racetrack component (full coverage)
- [ ] Test ErrorBoundary component
- [ ] Test LoadingSpinner component
- [ ] Test feature-specific components
- [ ] **Target: 60% coverage**

### Sprint 4: Integration Testing (Week 6) ⬜ PENDING
- [ ] Set up navigation integration tests
- [ ] Test complete training flows
- [ ] Add cross-feature integration tests
- [ ] **Target: 65% coverage**

### Sprint 5: Screen Testing (Week 7-8) ⬜ PENDING
- [ ] Test menu screens
- [ ] Test training screens
- [ ] Test reference screens
- [ ] **Target: 75% coverage**

### Sprint 6: Polish & Documentation (Week 9) ⬜ PENDING
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

### 6. Test Edge Cases and Error Paths

```typescript
describe('calculateCorrectAnswer - edge cases', () => {
  it('should throw error for zero cash amount', () => {
    expect(() => calculateCorrectAnswer({ cashAmount: 0, sector: 'tier', requestType: 'for-the-money' }))
      .toThrow('Cash amount must be positive');
  });
  
  it('should handle negative cash amount gracefully', () => {
    expect(() => calculateCorrectAnswer({ cashAmount: -100, sector: 'tier', requestType: 'for-the-money' }))
      .toThrow('Cash amount must be positive');
  });
  
  it('should handle invalid sector', () => {
    expect(() => calculateCorrectAnswer({ cashAmount: 300, sector: 'invalid', requestType: 'for-the-money' }))
      .toThrow('Invalid sector');
  });
});
```

### 7. Property-Based Testing for Random Logic

```typescript
// Use fast-check for generators
import fc from 'fast-check';

describe('generateRandomCashAmount', () => {
  it('should always return multiples of 25', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('easy', 'medium', 'hard'),
        fc.constantFrom('tier', 'voisins', 'orphelins'),
        (difficulty, sector) => {
          const amount = generateRandomCashAmount(difficulty, sector);
          return amount % 25 === 0;
        }
      )
    );
  });
  
  it('should always return amount within valid range', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('easy', 'medium', 'hard'),
        fc.constantFrom('tier', 'voisins', 'orphelins', 'zero', 'neighbors'),
        (difficulty, sector) => {
          const amount = generateRandomCashAmount(difficulty, sector);
          const limits = getSectorLimits(sector, difficulty);
          return amount >= limits.min && amount <= limits.max;
        }
      )
    );
  });
});
```

---

## Anti-Patterns to Avoid

### 1. Over-Mocking

```typescript
// ❌ Bad - mocking everything
jest.mock('../constants', () => ({
  getNumberColor: jest.fn(),
}));
jest.mock('../styles', () => ({ ... }));
jest.mock('../components/Chip', () => ({ ... }));

// ✅ Good - use real implementations for business logic
import { getNumberColor } from '../constants';
// Only mock external dependencies
jest.mock('react-native-reanimated');
```

### 2. Testing Private Methods

```typescript
// ❌ Bad - testing internal implementation
expect(component.instance_.privateMethod()).toBe(true);

// ✅ Good - test public behavior
fireEvent.press(component.getByText('Submit'));
expect(component.getByText('Success')).toBeTruthy();
```

### 3. Brittle Selectors

```typescript
// ❌ Bad - depends on structure
expect(container.querySelector('div > div > span').textContent).toBe('5');

// ✅ Good - use accessible queries
expect(screen.getByLabelText('Number 5')).toBeTruthy();
expect(screen.getByRole('button', { name: /submit/i })).toBeTruthy();
```

### 4. Shared State Between Tests

```typescript
// ❌ Bad - shared state
let result;
beforeAll(() => {
  result = renderHook(() => useExerciseState());
});

// ✅ Good - isolated state
beforeEach(() => {
  jest.clearAllMocks();
});
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

## Test Review Checklist

Before submitting PR, verify:

- [ ] All new code has corresponding tests
- [ ] All tests pass locally
- [ ] Coverage has not decreased
- [ ] Edge cases are tested
- [ ] Error paths are tested
- [ ] Accessibility is tested for UI components
- [ ] No test interdependencies
- [ ] Clear test descriptions
- [ ] Follows AAA pattern
- [ ] No implementation details tested

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

### Current Status Summary

| Phase | Status | Coverage |
|-------|--------|----------|
| Phase 1: Utils | ✅ Complete | 92%+ |
| Phase 2: Hooks | ✅ Complete | 100% |
| Phase 3: Components | 🟡 In Progress | ~10% |
| Phase 4: Integration | ⬜ Pending | 0% |
| Phase 5: Screens | ⬜ Pending | 0% |
| Phase 6: E2E | ⬜ Deferred | N/A |

**Overall Coverage: 92.87%** - Target of 80% exceeded! 🎉
