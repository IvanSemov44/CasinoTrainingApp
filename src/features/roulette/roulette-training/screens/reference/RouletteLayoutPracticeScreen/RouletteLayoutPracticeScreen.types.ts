import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouletteTrainingStackParamList } from '../../../navigation';

export type RouletteLayoutPracticeNavigationProp = StackNavigationProp<
  RouletteTrainingStackParamList,
  'RouletteLayoutPractice'
>;

export interface RouletteLayoutPracticeScreenProps {
  navigation: RouletteLayoutPracticeNavigationProp;
}
