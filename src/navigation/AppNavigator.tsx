import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProgressScreen from '../screens/ProgressScreen';
import SettingsScreen from '../screens/SettingsScreen';
import {
  RouletteTrainingRoutes,
  type RouletteTrainingStackParamList,
} from '../features/roulette-training';
import { RacetrackRoutes, type RacetrackStackParamList } from '../features/racetrack';
import { RouletteGameRoutes, type RouletteGameStackParamList } from '../features/roulette-game';
import {
  RacetrackSectorRoutes,
  type RacetrackSectorStackParamList,
} from '../features/racetrack-sector-training';
import {
  RacetrackPositionRoutes,
  type RacetrackPositionStackParamList,
} from '../features/racetrack-position-training';
import {
  CashConversionRoutes,
  type CashConversionStackParamList,
} from '../features/cash-conversion-training';
import { TCPRoutes, type TCPStackParamList } from '../features/three-card-poker-training';
import { BJRoutes, type BJStackParamList } from '../features/blackjack-training';
import { CPRoutes, type CPStackParamList } from '../features/caribbean-poker-training';
import { THURoutes, type THUStackParamList } from '../features/texas-holdem-ultimate-training';
import { RKRoutes, type RKStackParamList } from '../features/roulette-knowledge-training';
import { CallBetsRoutes, type CallBetsStackParamList } from '../features/call-bets-training';
import { PLORoutes, type PLOStackParamList } from '../features/plo-training';
import { useTheme } from '../contexts/ThemeContext';

export type RootStackParamList = {
  Home: undefined;
  Progress: undefined;
  Settings: undefined;
} & RouletteTrainingStackParamList &
  RacetrackStackParamList &
  RouletteGameStackParamList &
  RacetrackSectorStackParamList &
  RacetrackPositionStackParamList &
  CashConversionStackParamList &
  TCPStackParamList &
  BJStackParamList &
  CPStackParamList &
  THUStackParamList &
  RKStackParamList &
  CallBetsStackParamList &
  PLOStackParamList;

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { colors } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background.secondary,
          },
          headerTintColor: colors.text.gold,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 17,
          },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        {RouletteTrainingRoutes()}
        {RacetrackRoutes()}
        {RouletteGameRoutes()}
        {RacetrackSectorRoutes()}
        {RacetrackPositionRoutes()}
        {CashConversionRoutes()}
        {TCPRoutes()}
        {BJRoutes()}
        {CPRoutes()}
        {THURoutes()}
        {RKRoutes()}
        {CallBetsRoutes()}
        {PLORoutes()}
        <Stack.Screen
          name="Progress"
          component={ProgressScreen}
          options={{ title: 'My Progress' }}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
