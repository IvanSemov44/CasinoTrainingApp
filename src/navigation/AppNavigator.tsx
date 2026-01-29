import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProgressScreen from '../screens/ProgressScreen';
import { RouletteTrainingRoutes, type RouletteTrainingStackParamList } from '../features/roulette-training';
import { RacetrackRoutes, type RacetrackStackParamList } from '../features/racetrack';
import { RouletteGameRoutes, type RouletteGameStackParamList } from '../features/roulette-game';
import { AnnouncedBetsRoutes, type AnnouncedBetsStackParamList } from '../features/announced-bets-training';
import { CashConversionRoutes, type CashConversionStackParamList } from '../features/cash-conversion-training';
import { COLORS } from '../features/roulette-training/constants/theme';

export type RootStackParamList = {
  Home: undefined;
  Progress: undefined;
} & RouletteTrainingStackParamList 
  & RacetrackStackParamList 
  & RouletteGameStackParamList 
  & AnnouncedBetsStackParamList
  & CashConversionStackParamList;

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.background.primary,
          },
          headerTintColor: COLORS.text.gold,
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
        {RacetrackRoutes()}
        {RouletteGameRoutes()}
        {AnnouncedBetsRoutes()}
        {CashConversionRoutes()}
        <Stack.Screen
          name="Progress"
          component={ProgressScreen}
          options={{ title: 'My Progress' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
