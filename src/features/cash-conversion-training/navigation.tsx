import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import withErrorBoundary from '@shared/withErrorBoundary';
import CashConversionMenuScreen from './screens/CashConversionMenuScreen';
import CashConversionTrainingScreen from './screens/CashConversionTrainingScreen';
import { DifficultyLevel, SectorType } from './types';

export type CashConversionStackParamList = {
  CashConversionDifficultySelection: undefined;
  CashConversionTraining: {
    difficulty: DifficultyLevel;
    sector: SectorType;
    exerciseCount?: number;
  };
};

const Stack = createStackNavigator<CashConversionStackParamList>();
const CashConversionMenuScreenWithBoundary = withErrorBoundary(
  CashConversionMenuScreen,
  'Cash Conversion Training'
);
const CashConversionTrainingScreenWithBoundary = withErrorBoundary(
  CashConversionTrainingScreen,
  'Cash Conversion Training'
);

export const CashConversionRoutes = () => {
  return (
    <>
      <Stack.Screen
        name="CashConversionDifficultySelection"
        component={CashConversionMenuScreenWithBoundary}
        options={{ title: 'Cash Conversion Training' }}
      />
      <Stack.Screen
        name="CashConversionTraining"
        component={CashConversionTrainingScreenWithBoundary}
        options={{ title: 'Training' }}
      />
    </>
  );
};
