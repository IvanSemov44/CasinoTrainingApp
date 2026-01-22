import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setSelectedChipValue, placeBet, clearBets } from '@store/rouletteSlice';
import RouletteLayout from '@components/roulette/RouletteLayout';
import ChipSelector from '@components/ChipSelector';
import { RouletteNumber } from '@app-types/roulette.types';
import { BetType } from '@app-types/roulette.types';
import { getNumberColor } from '@constants/roulette.constants';

export default function RouletteLayoutPracticeScreen({ navigation }: any) {
  const dispatch = useAppDispatch();
  const selectedChipValue = useAppSelector(state => state.roulette.selectedChipValue);
  const placedBets = useAppSelector(state => state.roulette.placedBets);
  const [highlightedNumbers, setHighlightedNumbers] = useState<RouletteNumber[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<RouletteNumber | null>(null);

  const handleNumberPress = (number: RouletteNumber) => {
    setSelectedNumber(number);
    
    // Toggle highlight
    setHighlightedNumbers(prev => {
      if (prev.includes(number)) {
        return prev.filter(n => n !== number);
      }
      return [...prev, number];
    });
  };

  const handleBetAreaPress = (betType: BetType, numbers: RouletteNumber[]) => {
    // Create a bet
    const bet = {
      id: `${Date.now()}-${numbers.join('-')}`,
      type: betType,
      numbers: numbers,
      amount: 1,
      payout: getPayout(betType),
      timestamp: Date.now(),
    };

    dispatch(placeBet(bet));
    
    // Show bet info
    const color = getNumberColor(numbers[0]);
    const colorText = color === 'red' ? '🔴 Red' : color === 'black' ? '⚫ Black' : '🟢 Green';
    
    Alert.alert(
      `${betType} Bet`,
      `Numbers: ${numbers.join(', ')}\n${numbers.length === 1 ? colorText : ''}\nChip Value: ${selectedChipValue}\nPayout: ${getPayout(betType)}:1`,
      [{ text: 'OK' }]
    );
  };

  const getPayout = (betType: BetType) => {
    switch (betType) {
      case BetType.STRAIGHT: return 35;
      case BetType.SPLIT: return 17;
      case BetType.STREET: return 11;
      case BetType.CORNER: return 8;
      case BetType.LINE: return 5;
      case BetType.DOZEN:
      case BetType.COLUMN: return 2;
      default: return 1;
    }
  };

  const handleChipSelect = (value: number) => {
    dispatch(setSelectedChipValue(value));
  };

  const handleClearBets = () => {
    dispatch(clearBets());
    setHighlightedNumbers([]);
    setSelectedNumber(null);
    Alert.alert('Cleared', 'All bets have been cleared', [{ text: 'OK' }]);
  };

  const getTotalBetAmount = () => {
    return placedBets.reduce((sum, bet) => sum + bet.amount, 0);
  };

  return (
    <View style={styles.container}>
      {/* Header with stats */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Roulette Layout Practice</Text>
        <Text style={styles.headerSubtitle}>Learn the table layout and number positions</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Total Bets</Text>
            <Text style={styles.statValue}>{placedBets.length}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Total Amount</Text>
            <Text style={styles.statValue}>${getTotalBetAmount()}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Selected</Text>
            <Text style={styles.statValue}>{selectedNumber ?? '-'}</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Chip Selector */}
        <ChipSelector 
          selectedValue={selectedChipValue}
          onSelectChip={handleChipSelect}
        />
        
        {/* Roulette Layout */}
        <View style={styles.layoutContainer}>
          <RouletteLayout 
            onNumberPress={handleNumberPress}
            onBetAreaPress={handleBetAreaPress}
            placedBets={placedBets}
            selectedChipValue={selectedChipValue}
          />
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>💡 How to Practice:</Text>
          <Text style={styles.infoText}>
            • Tap any number to see its color and position{'\n'}
            • Select different chip values to practice betting{'\n'}
            • Numbers turn yellow when selected{'\n'}
            • Red numbers: 1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36{'\n'}
            • Black numbers: All other numbers except 0{'\n'}
            • Green: 0 (zero)
          </Text>
        </View>

        {/* Layout Guide */}
        <View style={styles.guideSection}>
          <Text style={styles.guideTitle}>📋 Table Layout Guide:</Text>
          <View style={styles.guideContent}>
            <Text style={styles.guideText}>
              <Text style={styles.guideBold}>Top Row:</Text> 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36{'\n'}
              <Text style={styles.guideBold}>Middle Row:</Text> 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35{'\n'}
              <Text style={styles.guideBold}>Bottom Row:</Text> 1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34{'\n\n'}
              <Text style={styles.guideBold}>Outside Bets:</Text>{'\n'}
              • Dozens: 1-12, 13-24, 25-36 (Pays 2:1){'\n'}
              • Columns: Top, Middle, Bottom rows (Pays 2:1){'\n'}
              • Even Money: Red/Black, Even/Odd, 1-18/19-36 (Pays 1:1)
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.button, styles.clearButton]}
            onPress={handleClearBets}
          >
            <Text style={styles.buttonText}>🗑️ Clear All Bets</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.backButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>⬅️ Back to Exercises</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a2f1f',
  },
  header: {
    backgroundColor: '#1a5f3f',
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#FFD700',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 5,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statBox: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#CCCCCC',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 10,
  },
  layoutContainer: {
    marginTop: 10,
  },
  infoSection: {
    backgroundColor: '#1a5f3f',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 22,
  },
  guideSection: {
    backgroundColor: '#1a5f3f',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    borderWidth: 2,
    borderColor: '#2a7f4f',
  },
  guideTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  guideContent: {
    backgroundColor: '#0f4f2f',
    padding: 12,
    borderRadius: 8,
  },
  guideText: {
    fontSize: 13,
    color: '#FFFFFF',
    lineHeight: 20,
  },
  guideBold: {
    fontWeight: 'bold',
    color: '#FFD700',
  },
  actionButtons: {
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
  },
  clearButton: {
    backgroundColor: '#CC0000',
    borderColor: '#FF0000',
  },
  backButton: {
    backgroundColor: '#1a5f3f',
    borderColor: '#FFD700',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
