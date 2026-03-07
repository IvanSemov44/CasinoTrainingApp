import { useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setSelectedChipValue, placeBet, clearBets } from '@store/rouletteSlice';
import { getNumberColor } from '@constants/roulette.constants';
import { getPayoutForBetType } from '@features/roulette-training/constants/payouts';
import { BetType } from '@app-types/roulette.types';
import type { RouletteNumber, PlacedBet } from '@app-types/roulette.types';

interface UseLayoutPracticeSessionOptions {
  showAlert?: (title: string, message: string) => void;
}

export interface UseLayoutPracticeSessionReturn {
  selectedChipValue: number;
  placedBets: PlacedBet[];
  selectedNumber: RouletteNumber | null;
  totalBetAmount: number;
  handleNumberPress: (number: RouletteNumber) => void;
  handleBetAreaPress: (betType: BetType, numbers: RouletteNumber[]) => void;
  handleChipSelect: (value: number) => void;
  handleClearBets: () => void;
}

export function useLayoutPracticeSession(
  options: UseLayoutPracticeSessionOptions = {}
): UseLayoutPracticeSessionReturn {
  const dispatch = useAppDispatch();
  const selectedChipValue = useAppSelector((state) => state.roulette.selectedChipValue);
  const placedBets = useAppSelector((state) => state.roulette.placedBets);
  const [selectedNumber, setSelectedNumber] = useState<RouletteNumber | null>(null);

  const showAlert = options.showAlert ?? ((title: string, message: string) => {
    Alert.alert(title, message, [{ text: 'OK' }]);
  });

  const handleNumberPress = (number: RouletteNumber) => {
    setSelectedNumber(number);
  };

  const handleBetAreaPress = (betType: BetType, numbers: RouletteNumber[]) => {
    const payout = getPayoutForBetType(betType);
    const bet = {
      id: `${Date.now()}-${numbers.join('-')}`,
      type: betType,
      numbers,
      amount: 1,
      payout,
      timestamp: Date.now(),
    };

    dispatch(placeBet(bet));

    const color = getNumberColor(numbers[0]);
    const colorText = color === 'red' ? '🔴 Red' : color === 'black' ? '⚫ Black' : '🟢 Green';

    const details =
      `Numbers: ${numbers.join(', ')}\n` +
      `${numbers.length === 1 ? colorText : ''}\n` +
      `Chip Value: ${selectedChipValue}\n` +
      `Payout: ${payout}:1`;

    showAlert(`${betType} Bet`, details);
  };

  const handleChipSelect = (value: number) => {
    dispatch(setSelectedChipValue(value));
  };

  const handleClearBets = () => {
    dispatch(clearBets());
    setSelectedNumber(null);
    showAlert('Cleared', 'All bets have been cleared');
  };

  const totalBetAmount = useMemo(
    () => placedBets.reduce((sum, bet) => sum + bet.amount, 0),
    [placedBets]
  );

  return {
    selectedChipValue,
    placedBets,
    selectedNumber,
    totalBetAmount,
    handleNumberPress,
    handleBetAreaPress,
    handleChipSelect,
    handleClearBets,
  };
}
