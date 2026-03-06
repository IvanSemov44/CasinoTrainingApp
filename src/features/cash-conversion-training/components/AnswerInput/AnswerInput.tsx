import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import NumberPad from '@components/NumberPad';
import type { AnswerInputProps } from './AnswerInput.types';

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
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

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

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  /* eslint-disable react-native/no-unused-styles */
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background.secondary,
      padding: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors.border.gold,
      marginBottom: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text.primary,
      marginBottom: 16,
      textAlign: 'center',
    },
    inputsContainer: {
      marginBottom: 16,
    },
    inputGroup: {
      marginBottom: 16,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text.primary,
      marginBottom: 4,
    },
    display: {
      backgroundColor: colors.background.primary,
      borderWidth: 2,
      borderColor: colors.border.gold,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
    displayActive: {
      borderColor: colors.text.gold,
      backgroundColor: colors.background.tertiary,
    },
    displayText: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text.gold,
      textAlign: 'center',
    },
  });
  /* eslint-enable react-native/no-unused-styles */
}
