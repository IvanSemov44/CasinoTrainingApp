import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { RouletteNumber, BetType } from '../../types/roulette.types';
import RouletteChip from './RouletteChip';
import { getOutsideBetsStyles, getRouletteStyles } from './styles/roulette.styles';

interface RouletteOutsideBetsProps {
  cellSize: number;
  getBetAmount: (numbers: RouletteNumber[]) => number;
  onBetAreaPress?: (betType: BetType, numbers: RouletteNumber[]) => void;
}

// Export number arrays for testing
export const LOW_NUMBERS = Array.from({length: 18}, (_, i) => (i + 1) as RouletteNumber);
export const EVEN_NUMBERS = Array.from({length: 18}, (_, i) => ((i + 1) * 2) as RouletteNumber);
export const RED_NUMBERS: RouletteNumber[] = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
export const BLACK_NUMBERS: RouletteNumber[] = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
export const ODD_NUMBERS = Array.from({length: 18}, (_, i) => ((i * 2) + 1) as RouletteNumber);
export const HIGH_NUMBERS = Array.from({length: 18}, (_, i) => (i + 19) as RouletteNumber);
export const FIRST_DOZEN = Array.from({length: 12}, (_, i) => (i + 1) as RouletteNumber);
export const SECOND_DOZEN = Array.from({length: 12}, (_, i) => (i + 13) as RouletteNumber);
export const THIRD_DOZEN = Array.from({length: 12}, (_, i) => (i + 25) as RouletteNumber);

const RouletteOutsideBets: React.FC<RouletteOutsideBetsProps> = ({
  cellSize,
  getBetAmount,
  onBetAreaPress,
}) => {
  const styles = { ...getOutsideBetsStyles(cellSize), ...getRouletteStyles(cellSize) };
  const chipSize = cellSize * 0.4;

  return (
    <>
      {/* Even money bets row */}
      <View style={styles.outsideBetsRow}>
        <View style={styles.emptyCorner} />
        
        <View style={styles.evenMoneyRow}>
          <TouchableOpacity 
            style={styles.evenMoneyBet}
            accessibilityLabel="Low, 1 to 18"
            accessibilityRole="button"
            accessibilityState={getBetAmount(LOW_NUMBERS) > 0 ? { selected: true } : undefined}
            onPress={() => {
              if (onBetAreaPress) {
                onBetAreaPress(BetType.HIGH_LOW, LOW_NUMBERS);
              }
            }}
          >
            <Text style={styles.outsideBetText}>1-18</Text>
            <RouletteChip amount={getBetAmount(LOW_NUMBERS)} size={chipSize} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.evenMoneyBet}
            accessibilityLabel="Even numbers"
            accessibilityRole="button"
            accessibilityState={getBetAmount(EVEN_NUMBERS) > 0 ? { selected: true } : undefined}
            onPress={() => {
              if (onBetAreaPress) {
                onBetAreaPress(BetType.EVEN_ODD, EVEN_NUMBERS);
              }
            }}
          >
            <Text style={styles.outsideBetText}>EVEN</Text>
            <RouletteChip amount={getBetAmount(EVEN_NUMBERS)} size={chipSize} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.evenMoneyBet, styles.redCell]}
            accessibilityLabel="Red numbers"
            accessibilityRole="button"
            accessibilityState={getBetAmount(RED_NUMBERS) > 0 ? { selected: true } : undefined}
            onPress={() => {
              if (onBetAreaPress) {
                onBetAreaPress(BetType.RED_BLACK, RED_NUMBERS);
              }
            }}
          >
            <Text style={styles.outsideBetText}>◆</Text>
            <RouletteChip amount={getBetAmount(RED_NUMBERS)} size={chipSize} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.evenMoneyBet, styles.blackCell]}
            accessibilityLabel="Black numbers"
            accessibilityRole="button"
            accessibilityState={getBetAmount(BLACK_NUMBERS) > 0 ? { selected: true } : undefined}
            onPress={() => {
              if (onBetAreaPress) {
                onBetAreaPress(BetType.RED_BLACK, BLACK_NUMBERS);
              }
            }}
          >
            <Text style={styles.outsideBetText}>◆</Text>
            <RouletteChip amount={getBetAmount(BLACK_NUMBERS)} size={chipSize} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.evenMoneyBet}
            accessibilityLabel="Odd numbers"
            accessibilityRole="button"
            accessibilityState={getBetAmount(ODD_NUMBERS) > 0 ? { selected: true } : undefined}
            onPress={() => {
              if (onBetAreaPress) {
                onBetAreaPress(BetType.EVEN_ODD, ODD_NUMBERS);
              }
            }}
          >
            <Text style={styles.outsideBetText}>ODD</Text>
            <RouletteChip amount={getBetAmount(ODD_NUMBERS)} size={chipSize} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.evenMoneyBet}
            accessibilityLabel="High, 19 to 36"
            accessibilityRole="button"
            accessibilityState={getBetAmount(HIGH_NUMBERS) > 0 ? { selected: true } : undefined}
            onPress={() => {
              if (onBetAreaPress) {
                onBetAreaPress(BetType.HIGH_LOW, HIGH_NUMBERS);
              }
            }}
          >
            <Text style={styles.outsideBetText}>19-36</Text>
            <RouletteChip amount={getBetAmount(HIGH_NUMBERS)} size={chipSize} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.emptyCorner} />
      </View>

      {/* Dozens row */}
      <View style={styles.outsideBetsRow}>
        <View style={styles.emptyCorner} />
        
        <View style={styles.dozensRow}>
          <TouchableOpacity 
            style={styles.dozenBet}
            accessibilityLabel="First dozen, 1 to 12"
            accessibilityRole="button"
            accessibilityState={getBetAmount(FIRST_DOZEN) > 0 ? { selected: true } : undefined}
            onPress={() => {
              if (onBetAreaPress) {
                onBetAreaPress(BetType.DOZEN, FIRST_DOZEN);
              }
            }}
          >
            <Text style={styles.outsideBetText}>1st 12</Text>
            <RouletteChip amount={getBetAmount(FIRST_DOZEN)} size={chipSize} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.dozenBet}
            accessibilityLabel="Second dozen, 13 to 24"
            accessibilityRole="button"
            accessibilityState={getBetAmount(SECOND_DOZEN) > 0 ? { selected: true } : undefined}
            onPress={() => {
              if (onBetAreaPress) {
                onBetAreaPress(BetType.DOZEN, SECOND_DOZEN);
              }
            }}
          >
            <Text style={styles.outsideBetText}>2nd 12</Text>
            <RouletteChip amount={getBetAmount(SECOND_DOZEN)} size={chipSize} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.dozenBet}
            accessibilityLabel="Third dozen, 25 to 36"
            accessibilityRole="button"
            accessibilityState={getBetAmount(THIRD_DOZEN) > 0 ? { selected: true } : undefined}
            onPress={() => {
              if (onBetAreaPress) {
                onBetAreaPress(BetType.DOZEN, THIRD_DOZEN);
              }
            }}
          >
            <Text style={styles.outsideBetText}>3rd 12</Text>
            <RouletteChip amount={getBetAmount(THIRD_DOZEN)} size={chipSize} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.emptyCorner} />
      </View>
    </>
  );
};

export default RouletteOutsideBets;
