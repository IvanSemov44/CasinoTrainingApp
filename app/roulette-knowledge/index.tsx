import { Stack } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import RKMenuScreen from '@features/roulette/roulette-knowledge-training/screens/RKMenuScreen';
import RKDrillScreen from '@features/roulette/roulette-knowledge-training/screens/RKDrillScreen';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MenuScreen = RKMenuScreen as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DrillScreen = RKDrillScreen as any;

export default function RouletteKnowledgeRoutes() {
  const { drillType } = useLocalSearchParams<{ drillType?: string }>();

  return (
    <>
      <Stack.Screen
        options={{ title: drillType ? 'Roulette Knowledge' : 'Roulette Knowledge Training' }}
      />
      {drillType ? (
        <DrillScreen route={{ params: { drillType } }} navigation={{}} />
      ) : (
        <MenuScreen route={{}} navigation={{ navigate: () => {} }} />
      )}
    </>
  );
}
