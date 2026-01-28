import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import RacetrackScreen from './screens/RacetrackScreen';

// Type definitions
export type RacetrackStackParamList = {
  Racetrack: undefined;
};

const Stack = createStackNavigator();

// All racetrack routes
export const RacetrackRoutes = () => {
  return (
    <>
      <Stack.Screen
        name="Racetrack"
        component={RacetrackScreen}
        options={{ title: 'Racetrack' }}
      />
    </>
  );
};
