import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { RouletteNumber, BetType } from '@app-types/roulette.types';
import RouletteChip from './RouletteChip';
import { getOutsideBetsStyles, getRouletteStyles } from './styles/roulette.styles';
import {
  getCallBetsOutsideBetsStyles,
  getCallBetsRouletteStyles,
} from './styles/callBetsRouletteStyles';

interface RouletteOutsideBetsProps {
  cellSize: number;
  getBetAmount: (numbers: RouletteNumber[]) => number;
  onBetAreaPress?: (betType: BetType, numbers: RouletteNumber[]) => void;
  useCallBetsStyles?: boolean;
}

interface OutsideBetConfig {
  label: string;
  numbers: RouletteNumber[];
  betType: BetType;
  accessibilityLabel: string;
  styleType?: 'red' | 'black' | 'dozen' | 'even';
}

// Export number arrays for testing
export const LOW_NUMBERS = Array.from({ length: 18 }, (_, i) => (i + 1) as RouletteNumber);
export const EVEN_NUMBERS = Array.from({ length: 18 }, (_, i) => ((i + 1) * 2) as RouletteNumber);
export const RED_NUMBERS: RouletteNumber[] = [
  1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
];
export const BLACK_NUMBERS: RouletteNumber[] = [
  2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35,
];
export const ODD_NUMBERS = Array.from({ length: 18 }, (_, i) => (i * 2 + 1) as RouletteNumber);
export const HIGH_NUMBERS = Array.from({ length: 18 }, (_, i) => (i + 19) as RouletteNumber);
export const FIRST_DOZEN = Array.from({ length: 12 }, (_, i) => (i + 1) as RouletteNumber);
export const SECOND_DOZEN = Array.from({ length: 12 }, (_, i) => (i + 13) as RouletteNumber);
export const THIRD_DOZEN = Array.from({ length: 12 }, (_, i) => (i + 25) as RouletteNumber);

const EVEN_MONEY_BETS: OutsideBetConfig[] = [
  {
    label: '1-18',
    numbers: LOW_NUMBERS,
    betType: BetType.HIGH_LOW,
    accessibilityLabel: 'Low, 1 to 18',
    styleType: 'even',
  },
  {
    label: 'EVEN',
    numbers: EVEN_NUMBERS,
    betType: BetType.EVEN_ODD,
    accessibilityLabel: 'Even numbers',
    styleType: 'even',
  },
  {
    label: '◆',
    numbers: RED_NUMBERS,
    betType: BetType.RED_BLACK,
    accessibilityLabel: 'Red numbers',
    styleType: 'red',
  },
  {
    label: '◆',
    numbers: BLACK_NUMBERS,
    betType: BetType.RED_BLACK,
    accessibilityLabel: 'Black numbers',
    styleType: 'black',
  },
  {
    label: 'ODD',
    numbers: ODD_NUMBERS,
    betType: BetType.EVEN_ODD,
    accessibilityLabel: 'Odd numbers',
    styleType: 'even',
  },
  {
    label: '19-36',
    numbers: HIGH_NUMBERS,
    betType: BetType.HIGH_LOW,
    accessibilityLabel: 'High, 19 to 36',
    styleType: 'even',
  },
];

const DOZEN_BETS: OutsideBetConfig[] = [
  {
    label: '1st 12',
    numbers: FIRST_DOZEN,
    betType: BetType.DOZEN,
    accessibilityLabel: 'First dozen, 1 to 12',
    styleType: 'dozen',
  },
  {
    label: '2nd 12',
    numbers: SECOND_DOZEN,
    betType: BetType.DOZEN,
    accessibilityLabel: 'Second dozen, 13 to 24',
    styleType: 'dozen',
  },
  {
    label: '3rd 12',
    numbers: THIRD_DOZEN,
    betType: BetType.DOZEN,
    accessibilityLabel: 'Third dozen, 25 to 36',
    styleType: 'dozen',
  },
];

const RouletteOutsideBets: React.FC<RouletteOutsideBetsProps> = ({
  cellSize,
  getBetAmount,
  onBetAreaPress,
  useCallBetsStyles = false,
}) => {
  const getOutsideFunc = useCallBetsStyles ? getCallBetsOutsideBetsStyles : getOutsideBetsStyles;
  const getRouletteFunc = useCallBetsStyles ? getCallBetsRouletteStyles : getRouletteStyles;
  const styles = { ...getOutsideFunc(cellSize), ...getRouletteFunc(cellSize) };
  const chipSize = cellSize * 0.4;

  const getBetStyle = (styleType?: OutsideBetConfig['styleType']) => {
    if (styleType === 'red') return [styles.evenMoneyBet, styles.redCell];
    if (styleType === 'black') return [styles.evenMoneyBet, styles.blackCell];
    if (styleType === 'dozen') return styles.dozenBet;
    return styles.evenMoneyBet;
  };

  const renderOutsideBet = (config: OutsideBetConfig) => {
    const amount = getBetAmount(config.numbers);
    return (
      <TouchableOpacity
        key={config.accessibilityLabel}
        style={getBetStyle(config.styleType)}
        accessibilityLabel={config.accessibilityLabel}
        accessibilityRole="button"
        accessibilityState={amount > 0 ? { selected: true } : undefined}
        onPress={() => {
          if (onBetAreaPress) {
            onBetAreaPress(config.betType, config.numbers);
          }
        }}
      >
        <Text style={styles.outsideBetText}>{config.label}</Text>
        <RouletteChip amount={amount} size={chipSize} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      {/* Even money bets row */}
      <View style={styles.outsideBetsRow}>
        <View style={styles.emptyCorner} />

        <View style={styles.evenMoneyRow}>{EVEN_MONEY_BETS.map(renderOutsideBet)}</View>

        <View style={styles.emptyCorner} />
      </View>

      {/* Dozens row */}
      <View style={styles.outsideBetsRow}>
        <View style={styles.emptyCorner} />

        <View style={styles.dozensRow}>{DOZEN_BETS.map(renderOutsideBet)}</View>

        <View style={styles.emptyCorner} />
      </View>
    </>
  );
};

export default RouletteOutsideBets;
