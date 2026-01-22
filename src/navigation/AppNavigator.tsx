import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProgressScreen from '../screens/ProgressScreen';
import { RouletteTrainingRoutes, type RouletteTrainingStackParamList } from '../features/roulette-training';

export type RootStackParamList = {
  Home: undefined;
  Progress: undefined;
} & RouletteTrainingStackParamList;

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0a2f1f',
          },
          headerTintColor: '#FFD700',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Casino Dealer Training' }}
        />
        {RouletteTrainingRoutes()}
        <Stack.Screen
          name="Progress"
          component={ProgressScreen}
          options={{ title: 'My Progress' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
