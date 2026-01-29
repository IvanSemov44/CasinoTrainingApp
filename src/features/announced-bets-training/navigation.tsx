import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AnnouncedBetsMenuScreen, AnnouncedBetsTrainingScreen } from './screens';
import { COLORS } from '../roulette-training/constants/theme';
import { AnnouncedBetMode } from './types';

export type AnnouncedBetsStackParamList = {
  AnnouncedBetsMenu: undefined;
  AnnouncedBetsTraining: { mode: AnnouncedBetMode };
};

const Stack = createStackNavigator<AnnouncedBetsStackParamList>();

export function AnnouncedBetsRoutes() {
  return (
    <>
      <Stack.Screen
        name="AnnouncedBetsMenu"
        component={AnnouncedBetsMenuScreen}
        options={{
          title: 'Announced Bets Training',
          headerStyle: { backgroundColor: COLORS.background.primary },
          headerTintColor: COLORS.text.gold,
        }}
      />
      <Stack.Screen
        name="AnnouncedBetsTraining"
        component={AnnouncedBetsTrainingScreen}
        options={{
          title: 'Training',
          headerStyle: { backgroundColor: COLORS.background.primary },
          headerTintColor: COLORS.text.gold,
        }}
      />
    </>
  );
}

export type { AnnouncedBetMode } from './types';
