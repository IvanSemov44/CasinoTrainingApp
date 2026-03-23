import React from 'react';
import { Stack } from 'expo-router';
import { ProgressScreen } from '../src/screens/ProgressScreen';

export default function ProgressRoute() {
  return (
    <>
      <Stack.Screen options={{ title: 'My Progress' }} />
      <ProgressScreen />
    </>
  );
}
