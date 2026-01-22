import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getBetConfig, type BetConfigKey } from '@config/betConfigs';
import { getCashConfig, type CashConfigKey } from '@config/cashConfigs';
import type { BetType } from './utils/exerciseHelpers';

// Screens
import RouletteExercisesScreen from './screens/menu/RouletteExercisesScreen';
import PositionSelectionScreen from './screens/menu/PositionSelectionScreen';
import CalculationScreen from './screens/exercises/CalculationScreen';
import RouletteLayoutViewScreen from './screens/reference/RouletteLayoutViewScreen';
import RouletteLayoutPracticeScreen from './screens/reference/RouletteLayoutPracticeScreen';
import RouletteTrainingScreen from './screens/reference/RouletteTrainingScreen';

// Type definitions
export type RouletteTrainingStackParamList = {
  RouletteExercises: undefined;
  PositionSelection: { positionType: string };
  RouletteTraining: undefined;
  RouletteLayoutPractice: undefined;
  RouletteLayoutView: undefined;
  Calculation: { betConfigKey: BetConfigKey; cashConfigKey?: CashConfigKey };
  MixedCalculation: { cashConfigKey?: CashConfigKey; betTypes?: BetType[] };
  TripleMixedCalculation: { cashConfigKey?: CashConfigKey; betTypes?: BetType[] };
  AllPositionsCalculation: { cashConfigKey?: CashConfigKey; betTypes?: BetType[] };
  CashHandling: { cashConfigKey: CashConfigKey; betConfigKey?: BetConfigKey };
};

const Stack = createStackNavigator();

// Helper to get screen title based on params
const getScreenTitle = (
  screenName: string,
  params?: {
    betConfigKey?: BetConfigKey;
    cashConfigKey?: CashConfigKey;
    positionType?: string;
  }
): string => {
  const { betConfigKey, cashConfigKey, positionType } = params || {};
  const cashInfo = cashConfigKey ? ` - $${getCashConfig(cashConfigKey).denomination}` : '';

  switch (screenName) {
    case 'Calculation':
      const betName = betConfigKey ? getBetConfig(betConfigKey).displayName : 'Calculation';
      return `${betName}${cashInfo}`;
    case 'MixedCalculation':
      return `Mixed${cashInfo}`;
    case 'TripleMixedCalculation':
      return `Triple Mix${cashInfo}`;
    case 'AllPositionsCalculation':
      return `All Positions${cashInfo}`;
    case 'CashHandling':
      const cashBetName = betConfigKey ? `${getBetConfig(betConfigKey).displayName} - ` : '';
      const cashValue = cashConfigKey ? `$${getCashConfig(cashConfigKey).denomination}` : 'Cash';
      return `${cashBetName}${cashValue}`;
    case 'PositionSelection':
      return positionType?.replace('_', ' ') || 'Select Training';
    default:
      return screenName;
  }
};

// All roulette training routes
export const RouletteTrainingRoutes = () => {
  return (
    <>
      {/* Menu Screens */}
      <Stack.Screen
        name="RouletteExercises"
        component={RouletteExercisesScreen}
        options={{ title: 'Roulette Exercises' }}
      />
      <Stack.Screen
        name="PositionSelection"
        component={PositionSelectionScreen}
        options={({ route }) => ({
          title: getScreenTitle('PositionSelection', route.params)
        })}
      />

      {/* Reference Screens */}
      <Stack.Screen
        name="RouletteTraining"
        component={RouletteTrainingScreen}
        options={{ title: 'Training' }}
      />
      <Stack.Screen
        name="RouletteLayoutPractice"
        component={RouletteLayoutPracticeScreen}
        options={{ title: 'Roulette Layout Practice' }}
      />
      <Stack.Screen
        name="RouletteLayoutView"
        component={RouletteLayoutViewScreen}
        options={{ title: 'Roulette Layout' }}
      />

      {/* Exercise Screens - All use CalculationScreen */}
      <Stack.Screen
        name="Calculation"
        component={CalculationScreen}
        options={({ route }) => ({
          title: getScreenTitle('Calculation', route.params)
        })}
      />
      <Stack.Screen
        name="MixedCalculation"
        component={CalculationScreen}
        options={({ route }) => ({
          title: getScreenTitle('MixedCalculation', route.params)
        })}
      />
      <Stack.Screen
        name="TripleMixedCalculation"
        component={CalculationScreen}
        initialParams={{ betTypes: ['STRAIGHT', 'SPLIT', 'CORNER'] }}
        options={({ route }) => ({
          title: getScreenTitle('TripleMixedCalculation', route.params)
        })}
      />
      <Stack.Screen
        name="AllPositionsCalculation"
        component={CalculationScreen}
        initialParams={{ betTypes: ['STRAIGHT', 'SPLIT', 'CORNER', 'STREET', 'SIX_LINE'] }}
        options={({ route }) => ({
          title: getScreenTitle('AllPositionsCalculation', route.params)
        })}
      />
      <Stack.Screen
        name="CashHandling"
        component={CalculationScreen}
        options={({ route }) => ({
          title: getScreenTitle('CashHandling', route.params)
        })}
      />
    </>
  );
};
