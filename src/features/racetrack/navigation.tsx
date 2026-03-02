import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import withErrorBoundary from '@components/withErrorBoundary';

// Screens
import RacetrackScreen from './screens/RacetrackScreen';

// Type definitions
export type RacetrackStackParamList = {
  Racetrack: undefined;
};

const Stack = createStackNavigator();
const RacetrackScreenWithBoundary = withErrorBoundary(RacetrackScreen, 'Racetrack');

// All racetrack routes
export const RacetrackRoutes = () => {
  return (
    <>
      <Stack.Screen
        name="Racetrack"
        component={RacetrackScreenWithBoundary}
        options={{ title: 'Racetrack' }}
      />
    </>
  );
};
