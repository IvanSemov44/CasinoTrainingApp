import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { CashDisplay, RequestDisplay, AnswerInput, ResultFeedback } from '../../components';
import { SECTOR_NAMES } from '../../constants/sectors';
import { useCashConversionState } from './useCashConversionState';
import type { CashConversionTrainingScreenProps } from './CashConversionTrainingScreen.types';

export default function CashConversionTrainingScreen({ route }: CashConversionTrainingScreenProps) {
  const { difficulty, sector } = route.params;
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const {
    currentRequest,
    totalBet,
    betPerPosition,
    change,
    activeInput,
    result,
    stats,
    isFormComplete,
    setTotalBet,
    setBetPerPosition,
    setChange,
    setActiveInput,
    handleCheck,
    handleNext,
  } = useCashConversionState({ difficulty, sector });

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

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
   
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
    },
    contentContainer: {
      padding: 24,
    },
    header: {
      alignItems: 'center',
      marginBottom: 16,
    },
    difficultyText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text.secondary,
      marginBottom: 4,
    },
    statsText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text.primary,
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
