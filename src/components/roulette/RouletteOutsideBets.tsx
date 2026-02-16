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

const RouletteOutsideBets: React.FC<RouletteOutsideBetsProps> = ({
  cellSize,
  getBetAmount,
  onBetAreaPress,
}) => {
  const styles = { ...getOutsideBetsStyles(cellSize), ...getRouletteStyles(cellSize) };
  const chipSize = cellSize * 0.4;

  const lowNumbers = Array.from({length: 18}, (_, i) => (i + 1) as RouletteNumber);
  const evenNumbers = Array.from({length: 18}, (_, i) => ((i + 1) * 2) as RouletteNumber);
  const redNumbers: RouletteNumber[] = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
  const blackNumbers: RouletteNumber[] = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
  const oddNumbers = Array.from({length: 18}, (_, i) => ((i * 2) + 1) as RouletteNumber);
  const highNumbers = Array.from({length: 18}, (_, i) => (i + 19) as RouletteNumber);

  const firstDozen = Array.from({length: 12}, (_, i) => (i + 1) as RouletteNumber);
  const secondDozen = Array.from({length: 12}, (_, i) => (i + 13) as RouletteNumber);
  const thirdDozen = Array.from({length: 12}, (_, i) => (i + 25) as RouletteNumber);

  return (
    <>
      {/* Even money bets row */}
      <View style={styles.outsideBetsRow}>
        <View style={styles.emptyCorner} />
        
        <View style={styles.evenMoneyRow}>
          <TouchableOpacity 
            style={styles.evenMoneyBet}
            onPress={() => {
              if (onBetAreaPress) {
                onBetAreaPress(BetType.HIGH_LOW, lowNumbers);
              }
            }}
          >
            <Text style={styles.outsideBetText}>1-18</Text>
            <RouletteChip amount={getBetAmount(lowNumbers)} size={chipSize} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.evenMoneyBet}
            onPress={() => {
              if (onBetAreaPress) {
                onBetAreaPress(BetType.EVEN_ODD, evenNumbers);
              }
            }}
          >
            <Text style={styles.outsideBetText}>EVEN</Text>
            <RouletteChip amount={getBetAmount(evenNumbers)} size={chipSize} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.evenMoneyBet, styles.redCell]}
            onPress={() => {
              if (onBetAreaPress) {
                onBetAreaPress(BetType.RED_BLACK, redNumbers);
              }
            }}
          >
            <Text style={styles.outsideBetText}>◆</Text>
            <RouletteChip amount={getBetAmount(redNumbers)} size={chipSize} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.evenMoneyBet, styles.blackCell]}
            onPress={() => {
              if (onBetAreaPress) {
                onBetAreaPress(BetType.RED_BLACK, blackNumbers);
              }
            }}
          >
            <Text style={styles.outsideBetText}>◆</Text>
            <RouletteChip amount={getBetAmount(blackNumbers)} size={chipSize} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.evenMoneyBet}
            onPress={() => {
              if (onBetAreaPress) {
                onBetAreaPress(BetType.EVEN_ODD, oddNumbers);
              }
            }}
          >
            <Text style={styles.outsideBetText}>ODD</Text>
            <RouletteChip amount={getBetAmount(oddNumbers)} size={chipSize} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.evenMoneyBet}
            onPress={() => {
              if (onBetAreaPress) {
                onBetAreaPress(BetType.HIGH_LOW, highNumbers);
              }
            }}
          >
            <Text style={styles.outsideBetText}>19-36</Text>
            <RouletteChip amount={getBetAmount(highNumbers)} size={chipSize} />
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
            onPress={() => {
              if (onBetAreaPress) {
                onBetAreaPress(BetType.DOZEN, firstDozen);
              }
            }}
          >
            <Text style={styles.outsideBetText}>1st 12</Text>
            <RouletteChip amount={getBetAmount(firstDozen)} size={chipSize} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.dozenBet}
            onPress={() => {
              if (onBetAreaPress) {
                onBetAreaPress(BetType.DOZEN, secondDozen);
              }
            }}
          >
            <Text style={styles.outsideBetText}>2nd 12</Text>
            <RouletteChip amount={getBetAmount(secondDozen)} size={chipSize} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.dozenBet}
            onPress={() => {
              if (onBetAreaPress) {
                onBetAreaPress(BetType.DOZEN, thirdDozen);
              }
            }}
          >
            <Text style={styles.outsideBetText}>3rd 12</Text>
            <RouletteChip amount={getBetAmount(thirdDozen)} size={chipSize} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.emptyCorner} />
      </View>
    </>
  );
};

export default RouletteOutsideBets;
