import { useLocalSearchParams, Stack } from 'expo-router';
import CashConversionTrainingScreen from '../../../src/features/cash-conversion-training/screens/CashConversionTrainingScreen';
import type {
  DifficultyLevel,
  SectorType,
} from '../../../src/features/cash-conversion-training/types';

export default function CashConversionTrainingRoute() {
  const params = useLocalSearchParams<{
    difficulty: DifficultyLevel;
    sector: SectorType;
    exerciseCount?: string;
  }>();

  const { difficulty, sector, exerciseCount } = params;

  return (
    <>
      <Stack.Screen options={{ title: 'Cash Conversion Training' }} />
      {difficulty && sector && (
        <CashConversionTrainingScreen
          difficulty={difficulty}
          sector={sector}
          exerciseCount={exerciseCount ? parseInt(exerciseCount, 10) : undefined}
        />
      )}
    </>
  );
}
