import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';
import { TrainingHeader, PrimaryButton } from '@shared';
import { CashDisplay, RequestDisplay, AnswerInput, ResultFeedback } from '../../components';
import { SECTOR_NAMES } from '../../constants/sectors';
import { useCashConversionState } from './useCashConversionState';
import type { CashConversionTrainingScreenProps } from './CashConversionTrainingScreen.types';
import type { SectorType } from '../../types';

export default function CashConversionTrainingScreen({ route }: CashConversionTrainingScreenProps) {
  const { difficulty, sector } = route.params;
  const styles = useThemedStyles(makeStyles);

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
  const title = `${difficulty.toUpperCase()} | ${
    sector === 'random' ? 'Random' : SECTOR_NAMES[sector as Exclude<SectorType, 'random'>]
  }`;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <TrainingHeader title={title} correct={stats.correct} total={stats.total} />

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

          <PrimaryButton label="Check Answer" onPress={handleCheck} disabled={!isFormComplete} />
        </>
      )}

      {result && <ResultFeedback result={result} onNext={handleNext} sectorName={sectorName} />}
    </ScrollView>
  );
}

function makeStyles(colors: AppColors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
    },
    contentContainer: {
      padding: 24,
    },
  });
}
