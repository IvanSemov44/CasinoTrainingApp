import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useTheme } from '@contexts/ThemeContext';
import { RouletteLayout } from '../../../components/roulette';
import { ChallengeDisplay, ResultFeedback } from '../components';
import { PlacedBet } from '../../../types/roulette.types';
import { CallBetMode, ValidationResult } from '../types';
import { validateCallBet, getRandomMode } from '../utils/validation';
import { ANNOUNCED_BETS } from '../../racetrack/constants/announcedBets.constants';
import { CallBetsStackParamList } from '../navigation';

const { width: screenWidth } = Dimensions.get('window');

type Props = StackScreenProps<CallBetsStackParamList, 'CallBetsTraining'>;

export default function CallBetsTrainingScreen({ route }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const initialMode = route.params?.mode || 'random';
  const [selectedMode, _setSelectedMode] = useState<CallBetMode>(initialMode);
  const [currentChallenge, setCurrentChallenge] = useState<Exclude<CallBetMode, 'random'>>(
    initialMode === 'random' ? getRandomMode() : (initialMode as Exclude<CallBetMode, 'random'>)
  );
  const [placedBets, setPlacedBets] = useState<PlacedBet[]>([]);
  const [selectedChipValue] = useState(5);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [stats, setStats] = useState({ correct: 0, total: 0 });

  const _availableWidth = Math.min(screenWidth - 32, 450);
  const cellSize = 50;

  const totalRequiredBets = ANNOUNCED_BETS[currentChallenge]?.bets.length || 0;

  useEffect(() => {
    // Reset when challenge changes
    setPlacedBets([]);
    setResult(null);
  }, [currentChallenge]);

  const handleBetPlaced = (betType: string, numbers: number[]) => {
    const newBet: PlacedBet = {
      id: `bet-${Date.now()}-${Math.random()}`,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: betType as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      numbers: numbers as any,
      amount: selectedChipValue,
      payout: 0,
      timestamp: Date.now(),
    };

    setPlacedBets(prev => [...prev, newBet]);
  };

  const handleCheck = () => {
    const validationResult = validateCallBet(currentChallenge, placedBets);
    setResult(validationResult);

    setStats(prev => ({
      correct: prev.correct + (validationResult.isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const handleClear = () => {
    setPlacedBets([]);
    setResult(null);
  };

  const handleUndo = () => {
    setPlacedBets(prev => prev.slice(0, -1));
  };

  const handleNext = () => {
    if (selectedMode === 'random') {
      setCurrentChallenge(getRandomMode());
    } else {
      // Same challenge again
      setPlacedBets([]);
      setResult(null);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.statsText}>
          Score: {stats.correct}/{stats.total} ({stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0}%)
        </Text>
      </View>

      <ChallengeDisplay mode={currentChallenge} totalBets={totalRequiredBets} />

      <View style={styles.infoRow}>
        <Text style={styles.infoText}>Placed: {placedBets.length}/{totalRequiredBets}</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={handleUndo}
            style={[styles.undoBtn, placedBets.length === 0 && styles.buttonDisabled]}
            disabled={placedBets.length === 0}
          >
            <Text style={styles.buttonText}>↶ Undo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleClear} style={styles.clearBtn}>
            <Text style={styles.buttonText}>Clear All</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        horizontal
        style={styles.rouletteContainer}
        contentContainerStyle={styles.rouletteContent}
        showsHorizontalScrollIndicator={true}
      >
        <RouletteLayout
          onNumberPress={() => {}}
          onBetAreaPress={handleBetPlaced}
          placedBets={placedBets}
          selectedChipValue={selectedChipValue}
          cellSize={cellSize}
          useCallBetsStyles={true}
        />
      </ScrollView>

      {!result && (
        <TouchableOpacity
          style={[styles.checkButton, placedBets.length === 0 && styles.checkButtonDisabled]}
          onPress={handleCheck}
          disabled={placedBets.length === 0}
        >
          <Text style={styles.checkButtonText}>Check Answer</Text>
        </TouchableOpacity>
      )}

      {result && (
        <ResultFeedback
          result={result}
          onNext={handleNext}
          onClear={handleClear}
        />
      )}
    </ScrollView>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
    },
    contentContainer: {
      padding: 16,
      paddingBottom: 32,
    },
    header: {
      alignItems: 'center',
      marginBottom: 16,
    },
    statsText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text.primary,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    infoText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text.primary,
    },
    buttonRow: {
      flexDirection: 'row',
      gap: 4,
    },
    undoBtn: {
      paddingHorizontal: 16,
      paddingVertical: 4,
      backgroundColor: colors.status.warning,
      borderRadius: 6,
    },
    clearBtn: {
      paddingHorizontal: 16,
      paddingVertical: 4,
      backgroundColor: colors.background.darkGray,
      borderRadius: 6,
    },
    buttonText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text.primary,
    },
    buttonDisabled: {
      opacity: 0.5,
    },
    rouletteContainer: {
      backgroundColor: colors.background.darkGray,
      borderRadius: 12,
      borderWidth: 3,
      borderColor: colors.text.gold,
      marginBottom: 16,
    },
    rouletteContent: {
      padding: 16,
    },
    checkButton: {
      backgroundColor: colors.text.gold,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 16,
    },
    checkButtonDisabled: {
      backgroundColor: colors.background.tertiary,
    },
    checkButtonText: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.background.primary,
    },
  });
}
