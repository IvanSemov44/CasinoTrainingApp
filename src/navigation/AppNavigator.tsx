import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import RouletteExercisesScreen from '../screens/RouletteExercisesScreen';
import RouletteTrainingScreen from '../screens/RouletteTrainingScreen';
import RouletteLayoutPracticeScreen from '../screens/RouletteLayoutPracticeScreen';
import RouletteLayoutViewScreen from '../screens/RouletteLayoutViewScreen';
import PayoutCalculationScreen from '../screens/PayoutCalculationScreen';
import ProgressScreen from '../screens/ProgressScreen';

const Stack = createStackNavigator();

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
        <Stack.Screen 
          name="RouletteExercises" 
          component={RouletteExercisesScreen}
          options={{ title: 'Roulette Exercises' }}
        />
        <Stack.Screen 
          name="RouletteTraining" 
          component={RouletteTrainingScreen}
          options={{ title: 'Training' }}
        />
        <Stack.Screen 
          name="RouletteLayoutPractice" 
          component={RouletteLayoutPracticeScreen}
          options={{ title: 'Roulette Layout Practice' }}
        />
        <Stack.Screen 
          name="RouletteLayoutView" 
          component={RouletteLayoutViewScreen}
          options={{ title: 'Roulette Layout' }}
        />
        <Stack.Screen 
          name="PayoutCalculation" 
          component={PayoutCalculationScreen}
          options={{ title: 'Payout Calculation' }}
        />
        <Stack.Screen 
          name="Progress" 
          component={ProgressScreen}
          options={{ title: 'My Progress' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
