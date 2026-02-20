import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CallBetsMenuScreen, CallBetsTrainingScreen } from './screens';
import { COLORS } from '../roulette-training/constants/theme';
import { CallBetMode } from './types';

export type CallBetsStackParamList = {
  CallBetsMenu: undefined;
  CallBetsTraining: { mode: CallBetMode };
};

const Stack = createStackNavigator<CallBetsStackParamList>();

export function CallBetsRoutes() {
  return (
    <>
      <Stack.Screen
        name="CallBetsMenu"
        component={CallBetsMenuScreen}
        options={{
          title: 'Call Bets Training',
          headerStyle: { backgroundColor: COLORS.background.primary },
          headerTintColor: COLORS.text.gold,
        }}
      />
      <Stack.Screen
        name="CallBetsTraining"
        component={CallBetsTrainingScreen}
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
