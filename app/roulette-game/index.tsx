import { Stack } from 'expo-router';
import RouletteGameScreen from '@features/roulette/roulette-game/screens/RouletteGameScreen';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GameScreen = RouletteGameScreen as any;

export default function RouletteGameRoute() {
  return (
    <>
      <Stack.Screen options={{ title: 'Roulette Game' }} />
      <GameScreen route={{}} navigation={{}} />
    </>
  );
}
