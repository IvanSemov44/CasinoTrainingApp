import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CashConversionMenuScreen from './screens/CashConversionMenuScreen';
import CashConversionTrainingScreen from './screens/CashConversionTrainingScreen';
import { DifficultyLevel, SectorType } from './types';

export type CashConversionStackParamList = {
  CashConversionDifficultySelection: undefined;
  CashConversionTraining: { difficulty: DifficultyLevel; sector: SectorType; exerciseCount?: number };
};

const Stack = createStackNavigator<CashConversionStackParamList>();

export const CashConversionRoutes = () => {
  return (
    <>
      <Stack.Screen
        name="CashConversionDifficultySelection"
        component={CashConversionMenuScreen}
        options={{ title: 'Cash Conversion Training' }}
      />
      <Stack.Screen
        name="CashConversionTraining"
        component={CashConversionTrainingScreen}
        options={{ title: 'Training' }}
      />
    </>
  );
};
