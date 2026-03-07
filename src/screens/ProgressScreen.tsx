import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAppSelector } from '../store/hooks';
import { useTheme } from '@contexts/ThemeContext';

export default function ProgressScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const exerciseResults = useAppSelector(state => state.roulette.exerciseResults);

  const totalExercises = exerciseResults.length;
  const totalCorrect = exerciseResults.reduce((sum, r) => sum + r.correctAnswers, 0);
  const totalQuestions = exerciseResults.reduce((sum, r) => sum + r.totalQuestions, 0);
  const averageScore = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Progress</Text>

      <View style={styles.statsRow}>
        {[
          { value: String(totalExercises), label: 'Completed' },
          { value: `${averageScore}%`, label: 'Accuracy' },
          { value: `${totalCorrect}/${totalQuestions}`, label: 'Correct' },
        ].map(s => (
          <View key={s.label} style={styles.statCard}>
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Recent Results</Text>

      <ScrollView style={styles.resultsContainer} showsVerticalScrollIndicator={false}>
        {exerciseResults.length === 0 ? (
          <Text style={styles.empty}>
            No exercises yet — start practicing to see your progress!
          </Text>
        ) : (
          exerciseResults
            .slice()
            .reverse()
            .map(result => (
              <View key={`${result.timestamp}-${result.exerciseType}`} style={styles.resultCard}>
                <View style={styles.resultAccent} />
                <View style={styles.resultBody}>
                  <Text style={styles.resultType}>{result.exerciseType.replace('_', ' ')}</Text>
                  <View style={styles.resultMeta}>
                    <Text style={styles.resultScore}>
                      {result.correctAnswers}/{result.totalQuestions}
                    </Text>
                    <Text style={styles.resultTime}>{result.timeSpent}s</Text>
                    <Text style={styles.resultDate}>
                      {new Date(result.timestamp).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              </View>
            ))
        )}
      </ScrollView>
    </View>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background.primary, padding: 20 },
    title: { fontSize: 26, fontWeight: '800', color: colors.text.gold, marginBottom: 24 },

    statsRow: { flexDirection: 'row', gap: 10, marginBottom: 28 },
    statCard: {
      flex: 1,
      backgroundColor: colors.background.secondary,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border.gold,
    },
    statValue: { fontSize: 22, fontWeight: '800', color: colors.text.gold, marginBottom: 4 },
    statLabel: {
      fontSize: 11,
      color: colors.text.secondary,
      textAlign: 'center',
      fontWeight: '600',
    },

    sectionTitle: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.text.muted,
      letterSpacing: 1.2,
      marginBottom: 12,
    },
    resultsContainer: { flex: 1 },

    empty: {
      color: colors.text.secondary,
      fontSize: 15,
      textAlign: 'center',
      marginTop: 48,
      lineHeight: 22,
    },

    resultCard: {
      flexDirection: 'row',
      backgroundColor: colors.background.secondary,
      borderRadius: 10,
      marginBottom: 8,
      overflow: 'hidden',
    },
    resultAccent: { width: 3, backgroundColor: colors.border.gold },
    resultBody: { flex: 1, padding: 14 },
    resultType: {
      fontSize: 15,
      fontWeight: '700',
      color: colors.text.primary,
      marginBottom: 6,
      textTransform: 'capitalize',
    },
    resultMeta: { flexDirection: 'row', gap: 12 },
    resultScore: { fontSize: 13, color: colors.text.gold, fontWeight: '600' },
    resultTime: { fontSize: 13, color: colors.text.secondary },
    resultDate: { fontSize: 13, color: colors.text.muted },
  });
}
