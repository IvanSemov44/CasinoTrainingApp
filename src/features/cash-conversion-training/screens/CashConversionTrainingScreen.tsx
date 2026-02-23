import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SPACING } from '../../roulette-training/constants/theme';
import { CashDisplay, RequestDisplay, AnswerInput, ResultFeedback } from '../components';
import { SectorType, CashRequest, ValidationResult } from '../types';
import { SECTOR_NAMES, SECTOR_POSITIONS } from '../constants/sectors';
import {
  generateRandomCashAmount,
  generateRandomSector,
  generateRandomRequest,
  calculateCorrectAnswer,
  validateAnswer,
} from '../utils/calculations';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CashConversionTrainingScreen({ route }: any) {
  const { difficulty, sector } = route.params;

  const [currentRequest, setCurrentRequest] = useState<CashRequest | null>(null);
  const [totalBet, setTotalBet] = useState('');
  const [betPerPosition, setBetPerPosition] = useState('');
  const [change, setChange] = useState('');
  const [activeInput, setActiveInput] = useState<'totalBet' | 'betPerPosition' | 'change'>('totalBet');
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [stats, setStats] = useState({ correct: 0, total: 0 });

  const generateNewChallenge = useCallback(() => {
    const selectedSector = sector === 'random' ? generateRandomSector() : (sector as Exclude<SectorType, 'random'>);
    const cashAmount = generateRandomCashAmount(difficulty, selectedSector);
    const request = generateRandomRequest(selectedSector, cashAmount, difficulty);
    
    setCurrentRequest(request);
    setTotalBet('');
    setBetPerPosition('');
    setChange('');
    // Set default active input based on request type
    setActiveInput(request.requestType === 'for-the-money' ? 'betPerPosition' : 'totalBet');
    setResult(null);
  }, [difficulty, sector]);

  useEffect(() => {
    generateNewChallenge();
  }, [generateNewChallenge]);

  // Check if form is complete based on request type
  const isFormComplete = currentRequest
    ? currentRequest.requestType === 'for-the-money'
      ? !!betPerPosition && !!change
      : !!totalBet && !!change
    : false;

  const handleCheck = () => {
    if (!currentRequest) return;

    // For "for-the-money": user enters betPerPosition and change
    // For "by-amount": user enters totalBet and change
    const userAnswer = {
      totalBet: currentRequest.requestType === 'for-the-money' 
        ? (parseInt(betPerPosition, 10) || 0) * (SECTOR_POSITIONS[currentRequest.sector] || 1)
        : parseInt(totalBet, 10),
      betPerPosition: currentRequest.requestType === 'for-the-money'
        ? parseInt(betPerPosition, 10)
        : (currentRequest.specifiedAmount || 0),
      change: parseInt(change, 10),
    };

    const correctAnswer = calculateCorrectAnswer(currentRequest, difficulty);
    const validationResult = validateAnswer(userAnswer, correctAnswer);

    setResult(validationResult);
    setStats(prev => ({
      correct: prev.correct + (validationResult.isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const handleNext = () => {
    generateNewChallenge();
  };

  if (!currentRequest) return null;

  const sectorName = SECTOR_NAMES[currentRequest.sector];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.difficultyText}>
          {difficulty.toUpperCase()} | {sector === 'random' ? 'Random' : SECTOR_NAMES[sector as Exclude<SectorType, 'random'>]}
        </Text>
        <Text style={styles.statsText}>
          Score: {stats.correct}/{stats.total} ({stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0}%)
        </Text>
      </View>

      <CashDisplay amount={currentRequest.cashAmount} />

      <RequestDisplay request={currentRequest} />

      {!result && (
        <>
          <AnswerInput
            totalBet={totalBet}
            betPerPosition={betPerPosition}
            change={change}
            onTotalBetChange={setTotalBet}
            onBetPerPositionChange={setBetPerPosition}
            onChangeChange={setChange}
            sectorName={sectorName}
            activeInput={activeInput}
            onInputFocus={setActiveInput}
            requestType={currentRequest.requestType}
          />

          <TouchableOpacity
            style={[styles.checkButton, !isFormComplete && styles.checkButtonDisabled]}
            onPress={handleCheck}
            disabled={!isFormComplete}
          >
            <Text style={styles.checkButtonText}>Check Answer</Text>
          </TouchableOpacity>
        </>
      )}

      {result && (
        <ResultFeedback
          result={result}
          onNext={handleNext}
          sectorName={sectorName}
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
    padding: SPACING.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  difficultyText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  statsText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
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
    color: COLORS.background.primary,
  },
});
