import { Stack } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import SectorMenuScreen from '@features/roulette/racetrack-sector-training/screens/SectorMenuScreen';
import SectorTrainingScreen from '@features/roulette/racetrack-sector-training/screens/SectorTrainingScreen';
import { SectorMode } from '@features/roulette/racetrack-sector-training/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MenuScreen = SectorMenuScreen as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TrainingScreen = SectorTrainingScreen as any;

export default function RacetrackSectorRoutes() {
  const { mode } = useLocalSearchParams<{ mode?: SectorMode }>();

  return (
    <>
      <Stack.Screen options={{ title: mode ? 'Sector Training' : 'Racetrack Sector Training' }} />
      {mode ? (
        <TrainingScreen route={{ params: { mode } }} navigation={{}} />
      ) : (
        <MenuScreen route={{}} navigation={{ navigate: () => {} }} />
      )}
    </>
  );
}
