# Contributing

## Adding a New Training Module

This guide walks through every step needed to add a new poker-game style training module — the same pattern used by Blackjack, Three Card Poker, Caribbean Poker, Texas Hold'em Ultimate, and Roulette Knowledge.

> For coding standards and the full merge gate checklist see [`.ai/standards/coding-guide.md`](.ai/standards/coding-guide.md).

---

### Step 1: Feature folder scaffold

Create the feature directory at `src/features/<name>-training/`:

```
src/features/my-game-training/
├── constants/
│   └── drills.ts              # DrillMenuItem[] array
├── screens/
│   ├── MyGameMenuScreen/
│   │   ├── MyGameMenuScreen.tsx
│   │   ├── MyGameMenuScreen.test.tsx
│   │   ├── MyGameMenuScreen.types.ts
│   │   └── index.ts
│   └── MyGameDrillScreen/
│       ├── MyGameDrillScreen.tsx
│       ├── MyGameDrillScreen.test.tsx
│       └── index.ts
├── types/
│   └── index.ts
├── utils/
│   └── scenarioGenerator.ts
├── navigation.tsx
└── index.ts
```

---

### Step 2: Define types

Extend `BaseDrillScenario` from `src/types/drill.types.ts`:

```typescript
// src/features/my-game-training/types/index.ts
import type { BaseDrillScenario } from '@app-types/drill.types';

export type MyGameDrillType =
  | 'scenario-a'
  | 'scenario-b'
  | 'scenario-c';

export interface MyGameScenario extends BaseDrillScenario {
  drillType: MyGameDrillType;
  // add feature-specific fields here
}
```

`BaseDrillScenario` provides `answerType`, `question`, `explanation`, `correctOption`, `options`, `correctAnswer`.

---

### Step 3: Define the DRILLS constant

Use `DrillMenuItem` from the shared component — no need to define a duplicate interface. See `src/features/blackjack-training/constants/drills.ts` as the canonical example.

```typescript
// src/features/my-game-training/constants/drills.ts
import type { MyGameDrillType } from '../types';
import type { DrillMenuItem } from '@components/shared/DrillMenuScreen';

export const DRILLS: Array<DrillMenuItem & { drillType: MyGameDrillType }> = [
  {
    drillType: 'scenario-a',
    label: 'Human-Readable Label',
    description: 'One sentence describing what skill is tested.',
    difficulty: 'easy', // 'easy' | 'medium' | 'advanced'
  },
  {
    drillType: 'scenario-b',
    label: 'Another Drill',
    description: 'Description of this drill.',
    difficulty: 'medium',
  },
];
```

`difficulty` maps automatically to `colors.difficulty.{easy|medium|hard}` via `DrillMenuScreen`.

---

### Step 4: Write the ScenarioGenerator

```typescript
// src/features/my-game-training/utils/scenarioGenerator.ts
import { getRandomInt, getRandomElement } from '@utils/randomUtils';
import type { MyGameDrillType, MyGameScenario } from '../types';

export function generateMyGameScenario(drillType: MyGameDrillType): MyGameScenario {
  switch (drillType) {
    case 'scenario-a':
      return buildScenarioA();
    case 'scenario-b':
      return buildScenarioB();
    default:
      return buildScenarioA();
  }
}
```

**Use `getRandomInt` and `getRandomElement` from `@utils/randomUtils`** — never call `Math.random()` directly. This is a P0 coding standard violation.

---

### Step 5: MenuScreen

The shared `DrillMenuScreen` handles all rendering — the menu screen is 8 lines:

```typescript
// src/features/my-game-training/screens/MyGameMenuScreen/MyGameMenuScreen.tsx
import React from 'react';
import DrillMenuScreen from '@components/shared/DrillMenuScreen';
import { DRILLS } from '../../constants/drills';
import type { MyGameMenuScreenProps } from './MyGameMenuScreen.types';

export default function MyGameMenuScreen({ navigation }: MyGameMenuScreenProps) {
  return (
    <DrillMenuScreen
      title="My Game"
      drills={DRILLS}
      onPress={drillType => navigation.navigate('MyGameDrill', { drillType })}
    />
  );
}
```

```typescript
// src/features/my-game-training/screens/MyGameMenuScreen/MyGameMenuScreen.types.ts
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MyGameStackParamList } from '../../navigation';

export interface MyGameMenuScreenProps {
  navigation: NativeStackNavigationProp<MyGameStackParamList, 'MyGameMenu'>;
}
```

---

### Step 6: DrillScreen

Use the shared `DrillScreen` component with `useDrillState`:

```typescript
// src/features/my-game-training/screens/MyGameDrillScreen/MyGameDrillScreen.tsx
import React from 'react';
import DrillScreen from '@components/shared/DrillScreen';
import { useDrillState } from '@hooks/useDrillState';
import { generateMyGameScenario } from '../../utils/scenarioGenerator';
import type { MyGameDrillType } from '../../types';

interface Props {
  route: { params: { drillType: MyGameDrillType } };
}

export default function MyGameDrillScreen({ route }: Props) {
  const { drillType } = route.params;
  const drillState = useDrillState(generateMyGameScenario, drillType);

  return <DrillScreen drillState={drillState} title="My Game" />;
}
```

---

### Step 7: navigation.tsx

Copy exactly from `src/features/blackjack-training/navigation.tsx`:

```typescript
// src/features/my-game-training/navigation.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import withErrorBoundary from '@components/withErrorBoundary';
import MyGameMenuScreen from './screens/MyGameMenuScreen';
import MyGameDrillScreen from './screens/MyGameDrillScreen';
import type { MyGameDrillType } from './types';

export type MyGameStackParamList = {
  MyGameMenu: undefined;
  MyGameDrill: { drillType: MyGameDrillType };
};

const Stack = createStackNavigator<MyGameStackParamList>();
const MyGameMenuScreenWithBoundary = withErrorBoundary(MyGameMenuScreen, 'My Game Training');
const MyGameDrillScreenWithBoundary = withErrorBoundary(MyGameDrillScreen, 'My Game Training');

export const MyGameRoutes = () => (
  <>
    <Stack.Screen name="MyGameMenu" component={MyGameMenuScreenWithBoundary} options={{ title: 'My Game' }} />
    <Stack.Screen name="MyGameDrill" component={MyGameDrillScreenWithBoundary} options={{ title: 'Drill' }} />
  </>
);
```

```typescript
// src/features/my-game-training/index.ts
export { MyGameRoutes } from './navigation';
export type { MyGameStackParamList } from './navigation';
```

---

### Step 8: Register in AppNavigator.tsx

Three edits to `src/navigation/AppNavigator.tsx`:

**1. Add import:**
```typescript
import { MyGameRoutes, type MyGameStackParamList } from '../features/my-game-training';
```

**2. Extend the root param list type:**
```typescript
export type RootStackParamList = {
  Home: undefined;
  Progress: undefined;
  Settings: undefined;
} & /* existing feature types */ & MyGameStackParamList;  // ← add this
```

**3. Render the routes inside `<Stack.Navigator>`:**
```typescript
{MyGameRoutes()}
```

---

### Step 9: Add the HomeScreen card

Add an entry to the appropriate category in `src/constants/navigation.constants.ts`:

```typescript
{
  route: 'MyGameMenu',       // must match the name in MyGameStackParamList
  title: 'My Game',
  emoji: '🎮',
  tags: 'Skill A · Skill B',
},
```

---

### Step 10: Write tests

Each screen folder needs a `.test.tsx` file with a minimum of 10 test cases. Use the test utility from `src/test-utils/render.tsx`:

```typescript
import { renderWithProviders } from '@test-utils/render';
import MyGameMenuScreen from './MyGameMenuScreen';
import { DRILLS } from '../../constants/drills';

const mockNavigation = { navigate: jest.fn() };

describe('MyGameMenuScreen', () => {
  it('renders without crashing', () => {
    const { getByText } = renderWithProviders(
      <MyGameMenuScreen navigation={mockNavigation as any} />
    );
    expect(getByText('My Game')).toBeTruthy();
  });

  it('renders all drill labels', () => {
    const { getByText } = renderWithProviders(
      <MyGameMenuScreen navigation={mockNavigation as any} />
    );
    DRILLS.forEach(drill => {
      expect(getByText(drill.label)).toBeTruthy();
    });
  });

  // ... 8+ more cases
});
```

---

### Checklist

Before opening a PR, confirm all of the following:

- [ ] Feature folder created at `src/features/<name>-training/`
- [ ] `types/index.ts` — `MyGameDrillType` union + scenario interface extending `BaseDrillScenario`
- [ ] `constants/drills.ts` — `DRILLS` typed as `Array<DrillMenuItem & { drillType: MyGameDrillType }>`
- [ ] `utils/scenarioGenerator.ts` — uses `getRandomInt`/`getRandomElement`, never `Math.random()`
- [ ] All colors from `useTheme().colors` — no hardcoded hex strings
- [ ] `navigation.tsx` — exports `MyGameRoutes` and `MyGameStackParamList`
- [ ] `index.ts` — re-exports both from navigation.tsx
- [ ] `AppNavigator.tsx` — import added, type union extended, routes rendered
- [ ] `navigation.constants.ts` — HomeScreen card entry added
- [ ] Both screen folders have `.test.tsx` with ≥ 10 test cases each
- [ ] `npx tsc --noEmit` passes zero errors
- [ ] `npm test` passes (all 1094+ tests green)
- [ ] `npm run lint` passes zero errors

---

## Code Standards Summary

Full coding standards, P0 blockers, and the Definition of Done checklist live in:

[`.ai/standards/coding-guide.md`](.ai/standards/coding-guide.md)

Key rules at a glance:

| Rule | Enforcement |
|---|---|
| TypeScript strict — zero `any` | P0 blocker |
| No cross-feature imports | P0 blocker |
| All colors via `useTheme().colors` | P0 blocker |
| No `Math.random()` — use `randomUtils` | P1 |
| Components must have `.test.tsx` | P1 |
| Extract shared logic at 2+ usages | P2 |

## Running Tests

```bash
npm test                      # all tests
npm run test:coverage         # with HTML coverage report
npx tsc --noEmit              # TypeScript
npm run lint                  # ESLint
npm run format                # Prettier (auto-fix)
```
