import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import RouletteExercisesScreen from '../screens/RouletteExercisesScreen';
import PositionSelectionScreen from '../screens/PositionSelectionScreen';
import RouletteTrainingScreen from '../screens/RouletteTrainingScreen';
import RouletteLayoutPracticeScreen from '../screens/RouletteLayoutPracticeScreen';
import RouletteLayoutViewScreen from '../screens/RouletteLayoutViewScreen';
import CalculationScreen from '../screens/CalculationScreen';
import MixedCalculationScreen from '../screens/MixedCalculationScreen';
import TripleMixedCalculationScreen from '../screens/TripleMixedCalculationScreen';
import AllPositionsCalculationScreen from '../screens/AllPositionsCalculationScreen';
import CashHandlingScreen from '../screens/CashHandlingScreen';
import ProgressScreen from '../screens/ProgressScreen';
import { BetConfig } from '../config/betConfigs';
import { CashConfig } from '../config/cashConfigs';

export type RootStackParamList = {
  Home: undefined;
  RouletteExercises: undefined;
  PositionSelection: { positionType: string };
  RouletteTraining: undefined;
  RouletteLayoutPractice: undefined;
  RouletteLayoutView: undefined;
  Calculation: { betConfig: BetConfig };
  MixedCalculation: undefined;
  TripleMixedCalculation: undefined;
  AllPositionsCalculation: undefined;
  CashHandling: { cashConfig: CashConfig };
  Progress: undefined;
};

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
        <Stack.Screen
          name="RouletteExercises"
          component={RouletteExercisesScreen}
          options={{ title: 'Roulette Exercises' }}
        />
        <Stack.Screen
          name="PositionSelection"
          component={PositionSelectionScreen}
          options={({ route }) => ({
            title: route.params?.positionType?.replace('_', ' ') || 'Select Training'
          })}
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
          name="Calculation"
          component={CalculationScreen}
          options={({ route }) => ({
            title: route.params?.betConfig?.displayName || 'Calculation'
          })}
        />
        <Stack.Screen
          name="MixedCalculation"
          component={MixedCalculationScreen}
          options={{ title: 'Mixed Calculation' }}
        />
        <Stack.Screen
          name="TripleMixedCalculation"
          component={TripleMixedCalculationScreen}
          options={{ title: 'Triple Mix Calculation' }}
        />
        <Stack.Screen
          name="AllPositionsCalculation"
          component={AllPositionsCalculationScreen}
          options={{ title: 'All Positions' }}
        />
        <Stack.Screen
          name="CashHandling"
          component={CashHandlingScreen}
          options={({ route }) => ({ 
            title: route.params?.cashConfig?.displayName || 'Cash Handling'
          })}
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
