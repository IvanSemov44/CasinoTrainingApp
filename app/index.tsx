import React from 'react';
import { Stack } from 'expo-router';
import { HomeScreen } from '../src/screens/HomeScreen';

export default function HomeRoute() {
  return (
    <>
      <Stack.Screen options={{ title: 'Casino Training' }} />
      <HomeScreen />
    </>
  );
}
