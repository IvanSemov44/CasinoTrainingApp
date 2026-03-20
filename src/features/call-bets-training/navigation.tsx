import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import withErrorBoundary from '@shared/withErrorBoundary';
import { CallBetsMenuScreen, CallBetsTrainingScreen } from './screens';
import { useTheme } from '@contexts/ThemeContext';
import type { CallBetMode } from './types';

export type CallBetsStackParamList = {
  CallBetsMenu: undefined;
  CallBetsTraining: { mode: CallBetMode };
};

const Stack = createStackNavigator<CallBetsStackParamList>();
const CallBetsMenuScreenWithBoundary = withErrorBoundary(CallBetsMenuScreen, 'Call Bets Training');
const CallBetsTrainingScreenWithBoundary = withErrorBoundary(
  CallBetsTrainingScreen,
  'Call Bets Training'
);

export function CallBetsRoutes() {
  const { colors } = useTheme();
  return (
    <>
      <Stack.Screen
        name="CallBetsMenu"
        component={CallBetsMenuScreenWithBoundary}
        options={{
          title: 'Call Bets Training',
          headerStyle: { backgroundColor: colors.background.primary },
          headerTintColor: colors.text.gold,
        }}
      />
      <Stack.Screen
        name="CallBetsTraining"
        component={CallBetsTrainingScreenWithBoundary}
        options={{
          title: 'Training',
          headerStyle: { backgroundColor: colors.background.primary },
          headerTintColor: colors.text.gold,
        }}
      />
    </>
  );
}

export type { CallBetMode } from './types';
