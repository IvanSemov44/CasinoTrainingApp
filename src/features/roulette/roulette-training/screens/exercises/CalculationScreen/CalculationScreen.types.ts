import type { CalculationRouteParams } from './useCalculationQuestion';

// Simplified props for Expo Router - route params are optional
export type CalculationScreenProps = {
  route?: {
    params?: CalculationRouteParams;
  };
};
