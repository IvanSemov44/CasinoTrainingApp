import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import NumberPad from '@components/NumberPad';
import PlayingCard from '@components/PlayingCard';
import type { Card } from '@utils/cardUtils';
import { useDrillState, BaseDrillScenario } from '@hooks/useDrillState';
import type { DrillScreenProps } from './DrillScreen.types';
import { makeStyles } from './DrillScreen.styles';

type DrillCard = Card & { id?: string | number };
type DrillScreenViewScenario = BaseDrillScenario & {
  playerCards?: DrillCard[];
  dealerCards?: DrillCard[];
  betAmount?: number;
  question?: string;
  explanation?: string;
};

function getCardKey(card: DrillCard, index: number) {
  if (card.id) return String(card.id);
  return `${card.rank}-${card.suit}-${index}`;
}

export default function DrillScreen<
  TScenario extends BaseDrillScenario = BaseDrillScenario,
  TDrillType = unknown,
>({
  scenarioGenerator,
  drillType,
  betChipLabel = () => 'BET',
  dealerLabel = () => 'DEALER',
}: DrillScreenProps<TScenario, TDrillType>) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const drillState = useDrillState(scenarioGenerator, drillType);
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

  const lastEarned = isCorrect ? Math.pow(2, streak - 1) : 0;
  const viewScenario = scenario as DrillScreenViewScenario;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.topBar}>
        <View style={styles.statPill}>
          <Text style={styles.statPillText}>{sessionPoints} pts</Text>
          {accuracy !== null && (
            <Text style={styles.statPillSub}>
              {sessionCorrect}/{sessionTotal} · {accuracy}%
            </Text>
          )}
        </View>
        {streak >= 1 && (
          <View style={styles.streakPill}>
            <Text style={styles.streakText}>🔥 ×{upcomingMultiplier}</Text>
          </View>
        )}
      </View>

      {viewScenario.playerCards && viewScenario.playerCards.length > 0 && (
        <View style={styles.handBlock}>
          <Text style={styles.handLabel}>PLAYER</Text>
          <View style={styles.cardRow}>
            {viewScenario.playerCards.map((card, index) => (
              <PlayingCard key={getCardKey(card, index)} card={card} size="lg" />
            ))}
          </View>
        </View>
      )}

      {viewScenario.dealerCards && viewScenario.dealerCards.length > 0 && (
        <View style={styles.handBlock}>
          <Text style={styles.handLabel}>{dealerLabel(drillType)}</Text>
          <View style={styles.cardRow}>
            {viewScenario.dealerCards.map((card, index) => (
              <PlayingCard key={getCardKey(card, index)} card={card} size="lg" />
            ))}
          </View>
        </View>
      )}

      {viewScenario.betAmount !== undefined && (
        <View style={styles.betChip}>
          <Text style={styles.betChipLabel}>{betChipLabel(drillType)}</Text>
          <Text style={styles.betChipValue}>€{viewScenario.betAmount}</Text>
        </View>
      )}

      <View style={styles.questionBox}>
        <Text style={styles.questionText}>{viewScenario.question ?? ''}</Text>
      </View>

      {phase === 'asking' ? (
        <>
          {scenario.answerType === 'multiple-choice' && scenario.options ? (
            autoSubmit ? (
              <View style={styles.twoOptionRow}>
                {scenario.options.map(opt => (
                  <TouchableOpacity
                    key={opt}
                    style={styles.twoOptionBtn}
                    onPress={() => {
                      setSelectedOption(opt);
                      handleSubmit(opt);
                    }}
                    activeOpacity={0.75}
                  >
                    <Text style={styles.twoOptionText}>{opt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.optionList}>
                {scenario.options.map(opt => (
                  <TouchableOpacity
                    key={opt}
                    style={[styles.optionBtn, selectedOption === opt && styles.optionBtnSelected]}
                    onPress={() => setSelectedOption(opt)}
                    activeOpacity={0.75}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        selectedOption === opt && styles.optionTextSelected,
                      ]}
                    >
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
          <View
            style={[styles.resultCard, isCorrect ? styles.resultCorrect : styles.resultIncorrect]}
          >
            <View style={styles.resultHeader}>
              <Text style={styles.resultIcon}>{isCorrect ? '✓' : '✗'}</Text>
              <Text style={styles.resultTitle}>{isCorrect ? 'Correct!' : 'Incorrect'}</Text>
              {isCorrect && (
                <Text style={styles.pointsEarned}>
                  +{lastEarned} pt{lastEarned !== 1 ? 's' : ''}
                </Text>
              )}
            </View>

            {scenario.answerType === 'multiple-choice' ? (
              !isCorrect && (
                <View style={styles.answerRow}>
                  <Text style={styles.answerLabel}>Correct answer</Text>
                  <Text style={[styles.answerValue, styles.correctHL]}>
                    {scenario.correctOption}
                  </Text>
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
                    <Text style={[styles.answerValue, styles.correctHL]}>
                      €{scenario.correctAnswer}
                    </Text>
                  </View>
                )}
              </>
            )}

            <View style={styles.explanationBox}>
              <Text style={styles.explanationText}>{viewScenario.explanation ?? ''}</Text>
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
