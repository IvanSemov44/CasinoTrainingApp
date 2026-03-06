import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import withErrorBoundary from '../../components/withErrorBoundary';
import { PLOMenuScreen, PLOGameTrainingScreen } from './screens';
import type { PLODifficulty } from './types';
import { useTheme } from '@contexts/ThemeContext';

export type PLOStackParamList = {
  PLOMenu: undefined;
  PLOGameTraining: { difficulty: PLODifficulty };
};

const Stack = createStackNavigator<PLOStackParamList>();
const PLOMenuScreenWithBoundary = withErrorBoundary(PLOMenuScreen, 'PLO Training');
const PLOGameTrainingScreenWithBoundary = withErrorBoundary(PLOGameTrainingScreen, 'PLO Training');

export const PLORoutes = () => {
  const { colors } = useTheme();
  return (
    <>
      <Stack.Screen
        name="PLOMenu"
        component={PLOMenuScreenWithBoundary}
        options={{
          title: 'PLO Training',
          headerStyle: { backgroundColor: colors.background.primary },
          headerTintColor: colors.text.gold,
        }}
      />
      <Stack.Screen
        name="PLOGameTraining"
        component={PLOGameTrainingScreenWithBoundary}
        options={{
          title: 'Pot Calculation',
          headerStyle: { backgroundColor: colors.background.primary },
          headerTintColor: colors.text.gold,
        }}
      />
    </>
  );
};
