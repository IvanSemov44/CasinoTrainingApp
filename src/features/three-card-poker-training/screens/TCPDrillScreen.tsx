import React, { useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useTheme } from '@contexts/ThemeContext';
import NumberPad from '../../roulette-training/components/NumberPad';
import PlayingCard from '@components/PlayingCard';
import { useDrillState } from '@hooks/useDrillState';
import { generateScenario } from '../utils/scenarioGenerator';
import type { TCPStackParamList } from '../navigation';
import type { TCPScenario } from '../types';

type TCPDrillScreenProps = StackScreenProps<TCPStackParamList, 'TCPDrill'>;

export default function TCPDrillScreen({ route }: TCPDrillScreenProps) {
  const { drillType } = route.params;
  const { colors } = useTheme();

  const drillState = useDrillState(generateScenario, drillType);
  const {
    scenario,
    phase,
    selectedOption,
    setSelectedOption,
    userAmountStr,
    setUserAmountStr,
    isCorrect,
    streak,
    sessionPoints,
    sessionCorrect,
    sessionTotal,
    accuracy,
    upcomingMultiplier,
    canSubmit,
    autoSubmit,
    handleSubmit,
    handleNext,
  } = drillState;

  const styles = useMemo(() => makeStyles(colors), [colors]);
  const lastEarned = isCorrect ? Math.pow(2, streak - 1) : 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* ── Top bar ────────────────────────────────────────── */}
      <View style={styles.topBar}>
        <View style={styles.statPill}>
          <Text style={styles.statPillText}>{sessionPoints} pts</Text>
          {accuracy !== null && (
            <Text style={styles.statPillSub}>{sessionCorrect}/{sessionTotal} · {accuracy}%</Text>
          )}
        </View>
        {streak >= 1 && (
          <View style={styles.streakPill}>
            <Text style={styles.streakText}>🔥 ×{upcomingMultiplier}</Text>
          </View>
        )}
      </View>

      {/* ── Cards ──────────────────────────────────────────── */}
      {scenario.playerCards && scenario.playerCards.length > 0 && (
        <View style={styles.handBlock}>
          <Text style={styles.handLabel}>PLAYER</Text>
          <View style={styles.cardRow}>
            {scenario.playerCards.map((card, i) => (
              <PlayingCard key={i} card={card} size="lg" />
            ))}
          </View>
        </View>
      )}
      {scenario.dealerCards && scenario.dealerCards.length > 0 && (
        <View style={styles.handBlock}>
          <Text style={styles.handLabel}>DEALER</Text>
          <View style={styles.cardRow}>
            {scenario.dealerCards.map((card, i) => (
              <PlayingCard key={i} card={card} size="lg" />
            ))}
          </View>
        </View>
      )}

      {scenario.betAmount !== undefined && (
        <View style={styles.betChip}>
          <Text style={styles.betChipLabel}>
            {scenario.drillType === 'pair-plus-payout' ? 'PAIR PLUS' : 'ANTE'}
          </Text>
          <Text style={styles.betChipValue}>€{scenario.betAmount}</Text>
        </View>
      )}

      {/* ── Question ───────────────────────────────────────── */}
      <View style={styles.questionBox}>
        <Text style={styles.questionText}>{scenario.question}</Text>
      </View>

      {/* ── Answer ─────────────────────────────────────────── */}
      {phase === 'asking' ? (
        <>
          {scenario.answerType === 'multiple-choice' && scenario.options ? (
            autoSubmit ? (
              /* 2-option: side by side large buttons */
              <View style={styles.twoOptionRow}>
                {scenario.options.map(opt => (
                  <TouchableOpacity
                    key={opt}
                    style={styles.twoOptionBtn}
                    onPress={() => { setSelectedOption(opt); handleSubmit(opt); }}
                    activeOpacity={0.75}
                  >
                    <Text style={styles.twoOptionText}>{opt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              /* 4-option: stacked */
              <View style={styles.optionList}>
                {scenario.options.map(opt => (
                  <TouchableOpacity
                    key={opt}
                    style={[styles.optionBtn, selectedOption === opt && styles.optionBtnSelected]}
                    onPress={() => setSelectedOption(opt)}
                    activeOpacity={0.75}
                  >
                    <Text style={[styles.optionText, selectedOption === opt && styles.optionTextSelected]}>
                      {opt}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )
          ) : (
            <View style={styles.numericBlock}>
              <View style={styles.amountDisplay}>
                <Text style={styles.amountLabel}>Your answer</Text>
                <Text style={styles.amountValue}>€{userAmountStr || '0'}</Text>
              </View>
              <NumberPad
                onNumberPress={num => setUserAmountStr(s => s + num)}
                onClear={() => setUserAmountStr('')}
                onBackspace={() => setUserAmountStr(s => s.slice(0, -1))}
              />
            </View>
          )}

          {!autoSubmit && (
            <TouchableOpacity
              style={[styles.submitBtn, !canSubmit && styles.submitBtnDisabled]}
              onPress={() => handleSubmit()}
              disabled={!canSubmit}
              activeOpacity={0.8}
            >
              <Text style={styles.submitBtnText}>Check Answer</Text>
            </TouchableOpacity>
          )}
        </>
      ) : (
        <>
          <View style={[styles.resultCard, isCorrect ? styles.resultCorrect : styles.resultIncorrect]}>
            <View style={styles.resultHeader}>
              <Text style={styles.resultIcon}>{isCorrect ? '✓' : '✗'}</Text>
              <Text style={styles.resultTitle}>{isCorrect ? 'Correct!' : 'Incorrect'}</Text>
              {isCorrect && (
                <Text style={styles.pointsEarned}>+{lastEarned} pt{lastEarned !== 1 ? 's' : ''}</Text>
              )}
            </View>

            {scenario.answerType === 'multiple-choice' ? (
              !isCorrect && (
                <View style={styles.answerRow}>
                  <Text style={styles.answerLabel}>Correct answer</Text>
                  <Text style={[styles.answerValue, styles.correctHL]}>{scenario.correctOption}</Text>
                </View>
              )
            ) : (
              <>
                <View style={styles.answerRow}>
                  <Text style={styles.answerLabel}>Your answer</Text>
                  <Text style={styles.answerValue}>€{userAmountStr || '0'}</Text>
                </View>
                {!isCorrect && (
                  <View style={styles.answerRow}>
                    <Text style={styles.answerLabel}>Correct answer</Text>
                    <Text style={[styles.answerValue, styles.correctHL]}>€{scenario.correctAnswer}</Text>
                  </View>
                )}
              </>
            )}

            <View style={styles.explanationBox}>
              <Text style={styles.explanationText}>{scenario.explanation}</Text>
            </View>

            {isCorrect && streak >= 2 && (
              <Text style={styles.streakNote}>
                🔥 {streak} in a row — next answer ×{upcomingMultiplier}
              </Text>
            )}
          </View>

          <TouchableOpacity style={styles.continueBtn} onPress={handleNext} activeOpacity={0.8}>
            <Text style={styles.continueBtnText}>Next Question →</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background.primary },
    content: { padding: 20, paddingBottom: 40 },

    // Top bar
    topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    statPill: { backgroundColor: colors.background.secondary, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8 },
    statPillText: { color: colors.text.gold, fontSize: 17, fontWeight: '700' },
    statPillSub: { color: colors.text.muted, fontSize: 11, marginTop: 2 },
    streakPill: {
      backgroundColor: colors.background.secondary,
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: colors.status.streak,
    },
    streakText: { fontSize: 15, fontWeight: '800', color: colors.status.streak },

    // Cards
    handBlock: { marginBottom: 16 },
    handLabel: {
      fontSize: 11,
      fontWeight: '700',
      color: colors.text.muted,
      letterSpacing: 1.5,
      marginBottom: 8,
    },
    cardRow: { flexDirection: 'row', gap: 8 },

    // Bet chip
    betChip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: colors.background.secondary,
      alignSelf: 'flex-start',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 6,
      marginBottom: 16,
    },
    betChipLabel: { fontSize: 11, fontWeight: '700', color: colors.text.muted, letterSpacing: 0.8 },
    betChipValue: { fontSize: 16, fontWeight: '700', color: colors.text.gold },

    // Question
    questionBox: {
      backgroundColor: colors.background.secondary,
      borderRadius: 12,
      padding: 18,
      marginBottom: 16,
    },
    questionText: { fontSize: 17, color: colors.text.primary, fontWeight: '600', lineHeight: 25 },

    // 2-option
    twoOptionRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
    twoOptionBtn: {
      flex: 1,
      backgroundColor: colors.background.secondary,
      borderRadius: 12,
      borderWidth: 1.5,
      borderColor: colors.border.primary,
      paddingVertical: 22,
      alignItems: 'center',
    },
    twoOptionText: { fontSize: 20, fontWeight: '700', color: colors.text.primary },

    // 4-option
    optionList: { gap: 8, marginBottom: 12 },
    optionBtn: {
      backgroundColor: colors.background.secondary,
      borderRadius: 10,
      borderWidth: 1.5,
      borderColor: colors.border.primary,
      padding: 14,
    },
    optionBtnSelected: { borderColor: colors.text.gold, backgroundColor: colors.background.hint },
    optionText: { color: colors.text.primary, fontSize: 15, fontWeight: '500', textAlign: 'center' },
    optionTextSelected: { color: colors.text.gold, fontWeight: '700' },

    // Numeric
    numericBlock: { marginBottom: 12 },
    amountDisplay: {
      backgroundColor: colors.background.darkGray,
      borderRadius: 10,
      padding: 16,
      marginBottom: 12,
      alignItems: 'center',
    },
    amountLabel: { fontSize: 12, color: colors.text.muted, marginBottom: 4 },
    amountValue: { fontSize: 38, fontWeight: '700', color: colors.text.primary },

    // Submit
    submitBtn: {
      backgroundColor: colors.status.success,
      borderRadius: 12,
      padding: 18,
      alignItems: 'center',
      marginTop: 4,
    },
    submitBtnDisabled: { backgroundColor: colors.background.tertiary, opacity: 0.5 },
    submitBtnText: { fontSize: 17, fontWeight: '700', color: '#FFF' },

    // Result card
    resultCard: { borderRadius: 14, padding: 20, marginTop: 4 },
    resultCorrect: { backgroundColor: colors.status.successAlt, borderWidth: 1.5, borderColor: colors.status.success },
    resultIncorrect: { backgroundColor: colors.status.errorAlt, borderWidth: 1.5, borderColor: colors.status.error },
    resultHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
    resultIcon: { fontSize: 22, fontWeight: '800', color: '#FFF' },
    resultTitle: { fontSize: 22, fontWeight: '700', color: '#FFF', flex: 1 },
    pointsEarned: { fontSize: 18, fontWeight: '800', color: colors.text.gold },

    answerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.primaryDark,
    },
    answerLabel: { fontSize: 14, color: colors.text.secondary },
    answerValue: { fontSize: 16, color: colors.text.primary, fontWeight: '700' },
    correctHL: { color: colors.status.success },

    explanationBox: {
      marginTop: 14,
      backgroundColor: colors.background.darkGray,
      borderRadius: 8,
      padding: 14,
    },
    explanationText: {
      fontSize: 13,
      color: colors.text.secondary,
      lineHeight: 20,
    },
    streakNote: {
      marginTop: 12,
      textAlign: 'center',
      color: colors.status.streak,
      fontSize: 13,
      fontWeight: '700',
    },

    // Continue
    continueBtn: {
      backgroundColor: colors.text.gold,
      borderRadius: 12,
      padding: 18,
      alignItems: 'center',
      marginTop: 14,
    },
    continueBtnText: { fontSize: 17, fontWeight: '700', color: '#000' },
  });
}
