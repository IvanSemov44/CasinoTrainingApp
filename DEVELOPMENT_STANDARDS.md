# Development Standards & Code Style Guide

This document defines the coding standards, patterns, and best practices for the Casino Training App codebase.

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Naming Conventions](#naming-conventions)
3. [TypeScript Guidelines](#typescript-guidelines)
4. [React/React Native Patterns](#reactreact-native-patterns)
5. [State Management](#state-management)
6. [Styling Guidelines](#styling-guidelines)
7. [File Organization](#file-organization)
8. [Import Patterns](#import-patterns)
9. [Component Patterns](#component-patterns)
10. [Hook Patterns](#hook-patterns)
11. [Error Handling](#error-handling)
12. [Testing Standards](#testing-standards)

---

## Project Structure

```
src/
├── components/          # Shared/reusable components
│   ├── roulette/        # Roulette-specific components
│   │   ├── index.ts     # Barrel export
│   │   ├── RouletteLayout.tsx
│   │   ├── hooks/       # Component-specific hooks
│   │   └── styles/      # Component-specific styles
│   ├── ChipSelector.tsx
│   └── Racetrack.tsx
├── config/              # Configuration files
├── constants/           # Global constants
├── features/            # Feature-based modules
│   ├── roulette-training/
│   │   ├── index.ts     # Feature barrel export
│   │   ├── navigation.tsx
│   │   ├── components/
│   │   ├── screens/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── constants/
│   │   ├── types/
│   │   └── styles/
│   └── [other-features]/
├── hooks/               # Global shared hooks
├── navigation/          # Navigation configuration
├── screens/             # Top-level screens
├── services/            # External services (API, storage)
├── store/               # Redux store configuration
├── types/               # Global TypeScript types
└── utils/               # Global utility functions
```

---

## Naming Conventions

### Files

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `RouletteLayout.tsx` |
| Hooks | camelCase with `use` prefix | `useRouletteBets.ts` |
| Utilities | camelCase | `randomUtils.ts` |
| Constants | camelCase | `roulette.constants.ts` |
| Types | camelCase with `.types` | `roulette.types.ts` |
| Styles | camelCase with `.styles` | `roulette.styles.ts` |
| Screens | PascalCase with `Screen` suffix | `HomeScreen.tsx` |
| Config | camelCase with `Config` suffix | `betConfigs.ts` |

### Variables & Functions

```tsx
// Variables: camelCase
const selectedChipValue = 5;
const placedBets = [];

// Boolean variables: use `is`, `has`, `should` prefixes
const isLoading = true;
const hasError = false;
const shouldShowHint = true;

// Functions: camelCase, descriptive verbs
const handleNumberPress = () => {};
const calculateTotalPayout = () => {};
const generateRandomNumber = () => {};

// Event handlers: `handle` prefix
const handleChipSelect = () => {};
const handleBetPlaced = () => {};

// Callbacks passed as props: `on` prefix
interface Props {
  onNumberPress: (number: RouletteNumber) => void;
  onBetAreaPress?: (betType: BetType, numbers: RouletteNumber[]) => void;
}
```

### Types & Interfaces

```tsx
// Types: PascalCase
type RouletteNumber = 0 | 1 | 2 | ... | 36;

// Interfaces: PascalCase with descriptive names
interface RouletteLayoutProps {
  onNumberPress: (number: RouletteNumber) => void;
  placedBets?: PlacedBet[];
}

// Enums: PascalCase, values in SCREAMING_SNAKE_CASE
enum BetType {
  STRAIGHT = 'STRAIGHT',
  SPLIT = 'SPLIT',
}

// Type aliases for clarity
type ValidationResult = {
  isCorrect: boolean;
  score: number;
};
```

### Constants

```tsx
// Constants: SCREAMING_SNAKE_CASE for global, camelCase for local
export const WHEEL_ORDER: RouletteNumber[] = [0, 32, 15, ...];
export const CHIP_VALUES: ChipValue[] = [...];

// Object constants: PascalCase for the object
export const COLORS = {
  background: {
    primary: '#0a2f1f',
    secondary: '#1a5f3f',
  },
  text: {
    primary: '#FFFFFF',
    gold: '#FFD700',
  },
} as const;

// Configuration objects: PascalCase
export const BET_CONFIGS: Record<string, BetConfig> = { ... };
```

---

## TypeScript Guidelines

### Strict Typing

```tsx
// ❌ Avoid: using `any`
const params: any = {};
function process(data: any) { }

// ✅ Prefer: explicit types
const params: { betConfigKey?: string } = {};
function process(data: BetConfig) { }

// ✅ Use `unknown` when type is truly unknown, then narrow
function process(data: unknown) {
  if (typeof data === 'string') {
    // data is string
  }
}
```

### Type Exports

```tsx
// types/roulette.types.ts
export type RouletteNumber = 0 | 1 | 2 | ... | 36;

export interface Bet {
  id: string;
  type: BetType;
  numbers: RouletteNumber[];
  amount: number;
  payout: number;
}

// Importing in other files
import type { RouletteNumber, Bet } from '@app-types/roulette.types';
```

### Path Aliases

```tsx
// tsconfig.json paths are configured as follows:
// @app-types/* -> src/types/*
// @components/* -> src/components/*
// @config/* -> src/config/*
// @constants/* -> src/constants/*
// @features/* -> src/features/*
// @hooks/* -> src/hooks/*
// @screens/* -> src/screens/*
// @services/* -> src/services/*
// @store/* -> src/store/*
// @utils/* -> src/utils/*

// ✅ Use path aliases for clean imports
import { RouletteNumber } from '@app-types/roulette.types';
import RouletteLayout from '@components/roulette/RouletteLayout';
import { COLORS } from '@features/roulette-training/constants/theme';

// ❌ Avoid relative paths for deep imports
import { RouletteNumber } from '../../../types/roulette.types';
```

### Type Guards

```tsx
// ✅ Use type guards for runtime checks
function isRouletteNumber(value: unknown): value is RouletteNumber {
  return typeof value === 'number' && value >= 0 && value <= 36;
}

function isBetType(value: string): value is BetType {
  return Object.values(BetType).includes(value as BetType);
}
```

---

## React/React Native Patterns

### Component Structure

```tsx
// Standard component structure
import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';

// 1. Types/interfaces at the top
interface ComponentProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

// 2. Component definition
const Component: React.FC<ComponentProps> = ({
  title,
  onPress,
  disabled = false,
}) => {
  // 3. Hooks at the top
  const [isActive, setIsActive] = useState(false);
  
  // 4. Memoized callbacks
  const handlePress = useCallback(() => {
    if (!disabled) {
      setIsActive(true);
      onPress();
    }
  }, [disabled, onPress]);
  
  // 5. Memoized values
  const buttonStyle = useMemo(() => [
    styles.button,
    isActive && styles.buttonActive,
    disabled && styles.buttonDisabled,
  ], [isActive, disabled]);
  
  // 6. Early returns
  if (!title) return null;
  
  // 7. Main render
  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={handlePress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

// 8. Styles at the bottom
const styles = StyleSheet.create({
  button: {
    padding: SPACING.md,
    backgroundColor: COLORS.background.secondary,
  },
  buttonActive: {
    backgroundColor: COLORS.background.tertiary,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  text: {
    color: COLORS.text.primary,
  },
});

// 9. Default export
export default Component;
```

### Props Pattern

```tsx
// ✅ Destructure props with defaults
interface Props {
  required: string;
  optional?: boolean;
  withDefault?: number;
}

const Component: React.FC<Props> = ({
  required,
  optional,
  withDefault = 5,
}) => {
  // ...
};

// ✅ Use spread for passing through props
interface LayoutProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Layout: React.FC<LayoutProps> = ({ children, style, ...rest }) => (
  <View style={[styles.container, style]} {...rest}>
    {children}
  </View>
);
```

### Children Pattern

```tsx
// ✅ Use ReactNode for children
interface ContainerProps {
  children: React.ReactNode;
  title?: string;
}

const Container: React.FC<ContainerProps> = ({ children, title }) => (
  <View style={styles.container}>
    {title && <Text style={styles.title}>{title}</Text>}
    {children}
  </View>
);
```

---

## State Management

### Redux Patterns

```tsx
// store/featureSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FeatureState {
  items: Item[];
  selectedItem: Item | null;
  isLoading: boolean;
}

const initialState: FeatureState = {
  items: [],
  selectedItem: null,
  isLoading: false,
};

const featureSlice = createSlice({
  name: 'feature',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    },
    selectItem: (state, action: PayloadAction<Item | null>) => {
      state.selectedItem = action.payload;
    },
    clearItems: (state) => {
      state.items = [];
      state.selectedItem = null;
    },
  },
});

export const { setItems, selectItem, clearItems } = featureSlice.actions;
export default featureSlice.reducer;
```

### Using Redux in Components

```tsx
// ✅ Use typed hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

const Component: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(state => state.feature.items);
  const selectedItem = useAppSelector(state => state.feature.selectedItem);
  
  const handleSelect = useCallback((item: Item) => {
    dispatch(selectItem(item));
  }, [dispatch]);
  
  // ...
};
```

### Local State vs Redux

```tsx
// ✅ Use local state for UI-only concerns
const [isExpanded, setIsExpanded] = useState(false);
const [inputValue, setInputValue] = useState('');

// ✅ Use Redux for:
// - Data shared across components
// - Data that needs to persist
// - Complex state logic
// - Application-level state
```

---

## Styling Guidelines

### StyleSheet Creation

```tsx
// ✅ Static styles at module level
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  text: {
    color: COLORS.text.primary,
    fontSize: TYPOGRAPHY.fontSize.md,
  },
});

// ✅ Dynamic styles via useMemo
const dynamicStyles = useMemo(() => ({
  container: {
    width: cellSize * 3,
    height: cellSize,
  },
  text: {
    fontSize: cellSize * 0.45,
  },
}), [cellSize]);

// ❌ Avoid: StyleSheet.create in render
const Component = () => {
  const styles = StyleSheet.create({ ... }); // Creates new object every render
};

// ✅ For dynamic sizing, use style arrays
<View style={[styles.container, { width: dynamicWidth }]}>
```

### Theme Constants

```tsx
// Always use theme constants, never hardcode values
// ✅ Good
<View style={{ padding: SPACING.md, backgroundColor: COLORS.background.primary }}>

// ❌ Bad
<View style={{ padding: 15, backgroundColor: '#0a2f1f' }}>
```

### Style Composition

```tsx
// ✅ Use arrays for style composition
<View style={[
  styles.base,
  isActive && styles.active,
  isDisabled && styles.disabled,
  customStyle,
]} />

// ✅ Use StyleProp for style props
import { StyleProp, ViewStyle } from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
}
```

---

## File Organization

### Barrel Exports

```tsx
// feature/index.ts
export { default as ComponentA } from './components/ComponentA';
export { default as ComponentB } from './components/ComponentB';
export { useFeatureHook } from './hooks/useFeatureHook';
export type { FeatureType, FeatureConfig } from './types';
export { featureRoutes } from './navigation';

// Usage
import { ComponentA, useFeatureHook, type FeatureType } from '@features/feature';
```

### Feature Module Structure

```tsx
// feature/
// ├── index.ts           - Public API (barrel exports)
// ├── navigation.tsx     - Navigation routes
// ├── components/        - Feature-specific components
// │   ├── index.ts
// │   └── Component.tsx
// ├── screens/           - Screen components
// │   ├── index.ts
// │   └── Screen.tsx
// ├── hooks/             - Feature-specific hooks
// │   ├── index.ts
// │   └── useFeature.ts
// ├── utils/             - Feature-specific utilities
// │   ├── index.ts
// │   └── helpers.ts
// ├── constants/         - Feature-specific constants
// │   ├── index.ts
// │   └── constants.ts
// ├── types/             - Feature-specific types
// │   └── index.ts
// └── styles/            - Feature-specific styles
//     └── styles.ts
```

---

## Import Patterns

### Import Order

```tsx
// 1. React and React Native
import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// 2. Third-party libraries
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

// 3. Internal aliases (alphabetical)
import { COLORS, SPACING } from '@features/roulette-training/constants/theme';
import { useAppDispatch } from '@store/hooks';
import type { RouletteNumber } from '@app-types/roulette.types';

// 4. Relative imports
import { helperFunction } from '../utils/helpers';
import type { LocalType } from './types';
```

### Type Imports

```tsx
// ✅ Use `import type` for types only
import type { RouletteNumber, Bet } from '@app-types/roulette.types';

// ✅ Combine value and type imports when needed
import { BetType, type Bet } from '@app-types/roulette.types';
```

---

## Component Patterns

### Memoization

```tsx
// ✅ Use React.memo for pure components
const NumberCell: React.FC<NumberCellProps> = React.memo(({
  number,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={() => onPress(number)}>
      <Text>{number}</Text>
    </TouchableOpacity>
  );
});

// ✅ Use displayName for debugging
NumberCell.displayName = 'NumberCell';

// ✅ Custom comparison when needed
const areEqual = (prev: Props, next: Props) => {
  return prev.number === next.number && prev.isSelected === next.isSelected;
};

const MemoizedComponent = React.memo(Component, areEqual);
```

### Render Props & Compound Components

```tsx
// ✅ Render prop pattern for flexible composition
interface ListProps {
  items: Item[];
  renderItem: (item: Item, index: number) => React.ReactNode;
}

const List: React.FC<ListProps> = ({ items, renderItem }) => (
  <View>
    {items.map((item, index) => renderItem(item, index))}
  </View>
);

// ✅ Compound components for related UI
const Card: React.FC<CardProps> = ({ children }) => <View style={styles.card}>{children}</View>;
const CardHeader: React.FC<{ title: string }> = ({ title }) => <Text style={styles.header}>{title}</Text>;
const CardBody: React.FC<{ children: React.ReactNode }> = ({ children }) => <View style={styles.body}>{children}</View>;

Card.Header = CardHeader;
Card.Body = CardBody;

// Usage
<Card>
  <Card.Header title="Title" />
  <Card.Body>Content</Card.Body>
</Card>
```

---

## Hook Patterns

### Custom Hook Structure

```tsx
// hooks/useFeature.ts
import { useState, useCallback, useMemo } from 'react';

interface UseFeatureOptions {
  initialValue?: number;
  maxCount?: number;
}

interface UseFeatureReturn {
  value: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  isMax: boolean;
}

export function useFeature(options: UseFeatureOptions = {}): UseFeatureReturn {
  const { initialValue = 0, maxCount = 10 } = options;
  
  const [value, setValue] = useState(initialValue);
  
  const increment = useCallback(() => {
    setValue(prev => Math.min(prev + 1, maxCount));
  }, [maxCount]);
  
  const decrement = useCallback(() => {
    setValue(prev => Math.max(prev - 1, 0));
  }, []);
  
  const reset = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);
  
  const isMax = useMemo(() => value >= maxCount, [value, maxCount]);
  
  return {
    value,
    increment,
    decrement,
    reset,
    isMax,
  };
}
```

### Hook Rules

```tsx
// ✅ Always call hooks at the top level
const Component = () => {
  const [state, setState] = useState(0);  // ✅ Top level
  
  if (condition) {
    // const [bad, setBad] = useState(0);  // ❌ Never inside conditions
  }
  
  // ✅ Use early returns after all hooks
  const data = useData();
  
  if (!data) return null;
  
  return <View>...</View>;
};

// ✅ Use useCallback for functions passed to child components
const Parent = () => {
  const handlePress = useCallback(() => {
    // ...
  }, [dependencies]);
  
  return <Child onPress={handlePress} />;
};
```

---

## Error Handling

### Error Boundaries

```tsx
// components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.message}>{this.state.error?.message}</Text>
          <TouchableOpacity style={styles.button} onPress={this.handleReset}>
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    padding: 15,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default ErrorBoundary;
```

### Async Error Handling

```tsx
// ✅ Use try-catch for async operations
const fetchData = async () => {
  try {
    const result = await api.getData();
    setData(result);
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError('An unknown error occurred');
    }
  } finally {
    setIsLoading(false);
  }
};

// ✅ Create typed error handlers
const handleAsyncError = (error: unknown, context: string) => {
  if (error instanceof Error) {
    console.error(`${context}: ${error.message}`);
    return error.message;
  }
  console.error(`${context}: Unknown error`);
  return 'An unexpected error occurred';
};
```

---

## Testing Standards

### Test File Naming

```
Component.tsx       -> Component.test.tsx
useHook.ts          -> useHook.test.ts
utility.ts          -> utility.test.ts
```

### Test Structure

```tsx
// Component.test.tsx
import { render, fireEvent, screen } from '@testing-library/react-native';
import Component from './Component';

describe('Component', () => {
  // Setup/teardown
  beforeEach(() => {
    // Reset state, mocks, etc.
  });

  describe('rendering', () => {
    it('renders correctly with required props', () => {
      render(<Component title="Test" onPress={jest.fn()} />);
      expect(screen.getByText('Test')).toBeTruthy();
    });

    it('renders with optional props', () => {
      render(<Component title="Test" onPress={jest.fn()} optional={true} />);
      // ...
    });
  });

  describe('interactions', () => {
    it('calls onPress when pressed', () => {
      const onPress = jest.fn();
      render(<Component title="Test" onPress={onPress} />);
      
      fireEvent.press(screen.getByText('Test'));
      
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('does not call onPress when disabled', () => {
      const onPress = jest.fn();
      render(<Component title="Test" onPress={onPress} disabled />);
      
      fireEvent.press(screen.getByText('Test'));
      
      expect(onPress).not.toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    it('handles empty title gracefully', () => {
      render(<Component title="" onPress={jest.fn()} />);
      // ...
    });
  });
});
```

### Hook Testing

```tsx
// useHook.test.ts
import { renderHook, act } from '@testing-library/react-hooks';
import { useFeature } from './useFeature';

describe('useFeature', () => {
  it('returns initial value', () => {
    const { result } = renderHook(() => useFeature({ initialValue: 5 }));
    expect(result.current.value).toBe(5);
  });

  it('increments value', () => {
    const { result } = renderHook(() => useFeature());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.value).toBe(1);
  });
});
```

---

## Documentation Comments

```tsx
/**
 * Calculate the payout for a winning bet
 * 
 * @param betType - The type of bet placed
 * @param betAmount - The amount wagered
 * @returns The total payout including original bet
 * 
 * @example
 * const payout = calculatePayout(BetType.STRAIGHT, 10);
 * // Returns 360 (10 * 35 + 10)
 */
export const calculatePayout = (betType: BetType, betAmount: number): number => {
  const ratio = PAYOUT_RATIOS[betType];
  return betAmount * ratio + betAmount;
};

/**
 * Hook for managing roulette bet state
 * 
 * @param placedBets - Array of currently placed bets
 * @returns Object containing getBetAmount helper function
 * 
 * @example
 * const { getBetAmount } = useRouletteBets(placedBets);
 * const amount = getBetAmount([1, 2]); // Returns total bet on numbers 1 and 2
 */
export const useRouletteBets = (placedBets: PlacedBet[]) => {
  // ...
};
```

---

## Checklist for Code Reviews

- [ ] TypeScript: No `any` types without justification
- [ ] Components: Proper memoization where needed
- [ ] Styles: Using theme constants, not hardcoded values
- [ ] Imports: Using path aliases, proper ordering
- [ ] Props: Destructured with defaults for optional
- [ ] Hooks: Called at top level, proper dependencies
- [ ] Error handling: Try-catch for async, boundaries for UI
- [ ] Naming: Following conventions consistently
- [ ] Exports: Barrel exports for modules
- [ ] Documentation: JSDoc for public APIs
