import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert, Text } from 'react-native';
import RouletteLayout from '@components/roulette/RouletteLayout';
import ChipSelector from '@components/ChipSelector';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';
import { LayoutPracticeHeader } from '../../../components/LayoutPracticeHeader';
import { LayoutPracticeGuides } from '../../../components/LayoutPracticeGuides';
import { useLayoutPracticeSession } from './useLayoutPracticeSession';
import type { RouletteLayoutPracticeScreenProps } from './RouletteLayoutPracticeScreen.types';

export default function RouletteLayoutPracticeScreen({
  navigation,
}: RouletteLayoutPracticeScreenProps) {
  const styles = useThemedStyles(makeStyles);
  const {
    selectedChipValue,
    placedBets,
    selectedNumber,
    totalBetAmount,
    handleNumberPress,
    handleBetAreaPress,
    handleChipSelect,
    handleClearBets,
  } = useLayoutPracticeSession({
    showAlert: (title, message) => Alert.alert(title, message, [{ text: 'OK' }]),
  });

  return (
    <View style={styles.container}>
      <LayoutPracticeHeader
        totalBets={placedBets.length}
        totalAmount={totalBetAmount}
        selectedNumber={selectedNumber}
      />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <ChipSelector selectedValue={selectedChipValue} onSelectChip={handleChipSelect} />

        <View style={styles.layoutContainer}>
          <RouletteLayout
            onNumberPress={handleNumberPress}
            onBetAreaPress={handleBetAreaPress}
            placedBets={placedBets}
            selectedChipValue={selectedChipValue}
          />
        </View>

        <LayoutPracticeGuides />

        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={handleClearBets}>
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

function makeStyles(colors: AppColors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      padding: 8,
    },
    layoutContainer: {
      marginTop: 8,
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
      backgroundColor: colors.status.error,
      borderColor: colors.status.error,
    },
    backButton: {
      backgroundColor: colors.background.secondary,
      borderColor: colors.border.gold,
    },
    buttonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
}
