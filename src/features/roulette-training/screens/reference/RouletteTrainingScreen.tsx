import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setSelectedChipValue, placeBet } from '@store/rouletteSlice';
import RouletteLayout from '@components/roulette/RouletteLayout';
import Racetrack from '@components/Racetrack';
import ChipSelector from '@components/ChipSelector';
import { RouletteNumber } from '@app-types/roulette.types';
import { BetType } from '@app-types/roulette.types';
import { COLORS } from '@features/roulette-training/constants/theme';

export default function RouletteTrainingScreen({ route }: any) {
  const { exercise } = route.params;
  const dispatch = useAppDispatch();
  const selectedChipValue = useAppSelector(state => state.roulette.selectedChipValue);
  const [highlightedNumbers, setHighlightedNumbers] = useState<RouletteNumber[]>([]);

  const handleNumberPress = (number: RouletteNumber) => {
    // Add number to highlighted list
    setHighlightedNumbers(prev => {
      if (prev.includes(number)) {
        return prev.filter(n => n !== number);
      }
      return [...prev, number];
    });

    // Create a bet
    const bet = {
      id: `${Date.now()}-${number}`,
      type: BetType.STRAIGHT,
      numbers: [number],
      amount: selectedChipValue,
      payout: 35,
      timestamp: Date.now(),
    };

    dispatch(placeBet(bet));
    
    Alert.alert(
      'Bet Placed',
      `${selectedChipValue} on number ${number}`,
      [{ text: 'OK' }]
    );
  };

  const handleChipSelect = (value: number) => {
    dispatch(setSelectedChipValue(value));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{exercise.title}</Text>
        <Text style={styles.description}>{exercise.description}</Text>
      </View>

      <ChipSelector 
        selectedValue={selectedChipValue}
        onSelectChip={handleChipSelect}
      />
      
      <RouletteLayout 
        onNumberPress={handleNumberPress}
      />
      
      <Racetrack 
        onNumberPress={handleNumberPress}
        highlightedNumbers={highlightedNumbers}
      />

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Tap numbers on the layout or racetrack to place bets
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  header: {
    padding: 20,
    backgroundColor: COLORS.background.secondary,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.border.gold,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.gold,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: COLORS.text.primary,
  },
  infoBox: {
    backgroundColor: COLORS.background.secondary,
    padding: 15,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border.gold,
    marginBottom: 20,
  },
  infoText: {
    color: COLORS.text.primary,
    fontSize: 14,
    textAlign: 'center',
  },
});
