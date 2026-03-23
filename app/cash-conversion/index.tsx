import { Stack } from 'expo-router';
import CashConversionMenuScreen from '../../src/features/cash-conversion-training/screens/CashConversionMenuScreen';

export default function CashConversionMenuRoute() {
  return (
    <>
      <Stack.Screen options={{ title: 'Cash Conversion Training' }} />
      <CashConversionMenuScreen />
    </>
  );
}
