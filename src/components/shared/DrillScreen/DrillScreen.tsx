import React, { useMemo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import PlayingCard from '@components/PlayingCard';
import type { Card } from '@utils/cardUtils';
import { useDrillState, BaseDrillScenario } from '@hooks/useDrillState';
import type { DrillScreenProps } from './DrillScreen.types';
import { makeStyles } from './DrillScreen.styles';
import DrillAskingPhase from './DrillAskingPhase';
import DrillResultPhase from './DrillResultPhase';

// Constants for streak multiplier calculation
const STREAK_MULTIPLIER_BASE = 2;

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

/**
 * Generic drill screen component for training modules.
 *
 * @example
 * ```tsx
 * <DrillScreen
 *   scenarioGenerator={generateTCPScenario}
 *   drillType="tcp"
 *   betChipLabel={() => 'ANTE'}
 *   dealerLabel={() => 'DEALER'}
 * />
 * ```
 */
export default function DrillScreen<
  TScenario extends BaseDrillScenario = BaseDrillScenario,
  TDrillType = unknown,
>({
  scenarioGenerator,
  drillType,
  betChipLabel = () => 'BET',
  dealerLabel = () => 'DEALER',
}: DrillScreenProps<TScenario, TDrillType>) {
  const styles = useThemedStyles(makeStyles);

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
  } = useDrillState(scenarioGenerator, drillType);

  // Memoize expensive calculations
  const lastEarned = useMemo(
    () => (isCorrect ? Math.pow(STREAK_MULTIPLIER_BASE, streak - 1) : 0),
    [isCorrect, streak]
  );

  const viewScenario = useMemo(() => scenario as DrillScreenViewScenario, [scenario]);

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
        <DrillAskingPhase
          scenario={scenario}
          autoSubmit={autoSubmit}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          handleSubmit={handleSubmit}
          userAmountStr={userAmountStr}
          setUserAmountStr={setUserAmountStr}
          canSubmit={canSubmit}
          styles={styles}
        />
      ) : (
        <DrillResultPhase
          isCorrect={isCorrect}
          lastEarned={lastEarned}
          scenario={scenario}
          viewScenario={viewScenario}
          userAmountStr={userAmountStr}
          streak={streak}
          upcomingMultiplier={upcomingMultiplier}
          handleNext={handleNext}
          styles={styles}
        />
      )}
    </ScrollView>
  );
}
