import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import withErrorBoundary from '@components/withErrorBoundary';
import { COLORS } from '@styles';
import { CallBetsMenuScreen, CallBetsTrainingScreen } from './screens';
import { CallBetMode } from './types';

export type CallBetsStackParamList = {
  CallBetsMenu: undefined;
  CallBetsTraining: { mode: CallBetMode };
};

const Stack = createStackNavigator<CallBetsStackParamList>();
const CallBetsMenuScreenWithBoundary = withErrorBoundary(CallBetsMenuScreen, 'Call Bets Training');
const CallBetsTrainingScreenWithBoundary = withErrorBoundary(CallBetsTrainingScreen, 'Call Bets Training');

export function CallBetsRoutes() {
  return (
    <>
      <Stack.Screen
        name="CallBetsMenu"
        component={CallBetsMenuScreenWithBoundary}
        options={{
          title: 'Call Bets Training',
          headerStyle: { backgroundColor: COLORS.background.primary },
          headerTintColor: COLORS.text.gold,
        }}
      />
      <Stack.Screen
        name="CallBetsTraining"
        component={CallBetsTrainingScreenWithBoundary}
        options={{
          title: 'Training',
          headerStyle: { backgroundColor: COLORS.background.primary },
          headerTintColor: COLORS.text.gold,
        }}
      />
    </>
  );
}

export type { CallBetMode } from './types';
