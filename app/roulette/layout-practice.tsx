import { Stack } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import RouletteLayoutPracticeScreen from '@features/roulette/roulette-training/screens/reference/RouletteLayoutPracticeScreen';

export default function RouletteLayoutPracticeRoute() {
  return (
    <>
      <Stack.Screen options={{ title: 'Roulette Layout Practice' }} />
      <RouletteLayoutPracticeScreen />
    </>
  );
}
