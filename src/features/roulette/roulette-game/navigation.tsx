import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import withErrorBoundary from '@shared/withErrorBoundary';

// Screens
import RouletteGameScreen from './screens/RouletteGameScreen';

// Type definitions
export type RouletteGameStackParamList = {
  RouletteGame: undefined;
};

const Stack = createStackNavigator();
const RouletteGameScreenWithBoundary = withErrorBoundary(RouletteGameScreen, 'Roulette Game');

// All roulette game routes
export const RouletteGameRoutes = () => {
  return (
    <>
      <Stack.Screen
        name="RouletteGame"
        component={RouletteGameScreenWithBoundary}
        options={{ title: 'Roulette Game' }}
      />
    </>
  );
};
