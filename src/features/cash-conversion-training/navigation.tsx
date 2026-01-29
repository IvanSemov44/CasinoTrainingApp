import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DifficultySelectionScreen from './screens/DifficultySelectionScreen';
import SectorSelectionScreen from './screens/SectorSelectionScreen';
import CashConversionTrainingScreen from './screens/CashConversionTrainingScreen';
import { DifficultyLevel, SectorType } from './types';

export type CashConversionStackParamList = {
  CashConversionDifficultySelection: undefined;
  CashConversionSectorSelection: { difficulty: DifficultyLevel };
  CashConversionTraining: { difficulty: DifficultyLevel; sector: SectorType };
};

const Stack = createStackNavigator();

export const CashConversionRoutes = () => {
  return (
    <>
      <Stack.Screen
        name="CashConversionDifficultySelection"
        component={DifficultySelectionScreen}
        options={{ title: 'Cash Conversion Training' }}
      />
      <Stack.Screen
        name="CashConversionSectorSelection"
        component={SectorSelectionScreen}
        options={{ title: 'Select Sector' }}
      />
      <Stack.Screen
        name="CashConversionTraining"
        component={CashConversionTrainingScreen}
        options={{ title: 'Training' }}
      />
    </>
  );
};
