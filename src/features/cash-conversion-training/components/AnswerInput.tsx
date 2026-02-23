import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING } from '../../roulette-training/constants/theme';
import NumberPad from '../../roulette-training/components/NumberPad';
import { RequestType } from '../types';

interface AnswerInputProps {
  totalBet: string;
  betPerPosition: string;
  change: string;
  onTotalBetChange: (value: string) => void;
  onBetPerPositionChange: (value: string) => void;
  onChangeChange: (value: string) => void;
  sectorName: string;
  activeInput: 'totalBet' | 'betPerPosition' | 'change';
  onInputFocus: (input: 'totalBet' | 'betPerPosition' | 'change') => void;
  requestType: RequestType;
}

export default function AnswerInput({
  totalBet,
  betPerPosition,
  change,
  onTotalBetChange,
  onBetPerPositionChange,
  onChangeChange,
  sectorName,
  activeInput,
  onInputFocus,
  requestType,
}: AnswerInputProps) {
  const handleNumberPress = (num: string) => {
    if (activeInput === 'totalBet') {
      onTotalBetChange(totalBet + num);
    } else if (activeInput === 'betPerPosition') {
      onBetPerPositionChange(betPerPosition + num);
    } else {
      onChangeChange(change + num);
    }
  };

  const handleClear = () => {
    if (activeInput === 'totalBet') {
      onTotalBetChange('');
    } else if (activeInput === 'betPerPosition') {
      onBetPerPositionChange('');
    } else {
      onChangeChange('');
    }
  };

  const handleBackspace = () => {
    if (activeInput === 'totalBet') {
      onTotalBetChange(totalBet.slice(0, -1));
    } else if (activeInput === 'betPerPosition') {
      onBetPerPositionChange(betPerPosition.slice(0, -1));
    } else {
      onChangeChange(change.slice(0, -1));
    }
  };

  // For "for-the-money": show Play By and Rest
  // For "by-amount": show Total and Rest
  const showTotalBet = requestType === 'by-amount';
  const showBetPerPosition = requestType === 'for-the-money';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Response:</Text>
      
      <View style={styles.inputsContainer}>
        {showTotalBet && (
          <TouchableOpacity 
            style={styles.inputGroup} 
            onPress={() => onInputFocus('totalBet')}
            activeOpacity={0.7}
          >
            <Text style={styles.label}>{sectorName} Total:</Text>
            <View style={[styles.display, activeInput === 'totalBet' && styles.displayActive]}>
              <Text style={styles.displayText}>${totalBet || '0'}</Text>
            </View>
          </TouchableOpacity>
        )}

        {showBetPerPosition && (
          <TouchableOpacity 
            style={styles.inputGroup} 
            onPress={() => onInputFocus('betPerPosition')}
            activeOpacity={0.7}
          >
            <Text style={styles.label}>{sectorName} Play By:</Text>
            <View style={[styles.display, activeInput === 'betPerPosition' && styles.displayActive]}>
              <Text style={styles.displayText}>${betPerPosition || '0'}</Text>
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity 
          style={styles.inputGroup} 
          onPress={() => onInputFocus('change')}
          activeOpacity={0.7}
        >
          <Text style={styles.label}>Rest:</Text>
          <View style={[styles.display, activeInput === 'change' && styles.displayActive]}>
            <Text style={styles.displayText}>${change || '0'}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <NumberPad
        onNumberPress={handleNumberPress}
        onClear={handleClear}
        onBackspace={handleBackspace}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background.secondary,
    padding: SPACING.lg,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.text.gold,
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  inputsContainer: {
    marginBottom: SPACING.md,
  },
  inputGroup: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  display: {
    backgroundColor: COLORS.background.primary,
    borderWidth: 2,
    borderColor: COLORS.border.gold,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  displayActive: {
    borderColor: COLORS.text.gold,
    backgroundColor: '#1a1a2e',
  },
  displayText: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text.gold,
    textAlign: 'center',
  },
});
