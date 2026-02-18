import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { COLORS, SPACING } from '../../roulette-training/constants/theme';
import { RouletteLayout } from '../../../components/roulette';
import { ChallengeDisplay, ResultFeedback } from '../components';
import { PlacedBet } from '../../../types/roulette.types';
import { AnnouncedBetMode, ValidationResult } from '../types';
import { validateAnnouncedBet, getRandomMode } from '../utils/validation';
import { ANNOUNCED_BETS } from '../../racetrack/constants/announcedBets.constants';
import { AnnouncedBetsStackParamList } from '../navigation';

const { width: screenWidth } = Dimensions.get('window');

type Props = StackScreenProps<AnnouncedBetsStackParamList, 'AnnouncedBetsTraining'>;

export default function AnnouncedBetsTrainingScreen({ route }: Props) {
  const initialMode = route.params?.mode || 'random';
  const [selectedMode, _setSelectedMode] = useState<AnnouncedBetMode>(initialMode);
  const [currentChallenge, setCurrentChallenge] = useState<Exclude<AnnouncedBetMode, 'random'>>(
    initialMode === 'random' ? getRandomMode() : (initialMode as Exclude<AnnouncedBetMode, 'random'>)
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
    const validationResult = validateAnnouncedBet(currentChallenge, placedBets);
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  contentContainer: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  statsText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  undoBtn: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    backgroundColor: '#f59e0b',
    borderRadius: 6,
  },
  clearBtn: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    backgroundColor: '#6b7280',
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  buttonDisabled: {
    backgroundColor: '#4b5563',
    opacity: 0.5,
  },
  rouletteContainer: {
    backgroundColor: '#1a472a',
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#FFD700',
    marginBottom: SPACING.md,
  },
  rouletteContent: {
    padding: SPACING.md,
  },
  checkButton: {
    backgroundColor: COLORS.text.gold,
    paddingVertical: SPACING.md,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  checkButtonDisabled: {
    backgroundColor: '#4b5563',
  },
  checkButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text.primary,
  },
});
