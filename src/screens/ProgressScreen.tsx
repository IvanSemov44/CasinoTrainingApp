import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAppSelector } from '../store/hooks';
import { COLORS, SPACING, TYPOGRAPHY, BORDERS } from '../features/roulette-training/constants/theme';

export default function ProgressScreen() {
  const exerciseResults = useAppSelector(state => state.roulette.exerciseResults);
  
  const totalExercises = exerciseResults.length;
  const totalCorrect = exerciseResults.reduce((sum, result) => sum + result.correctAnswers, 0);
  const totalQuestions = exerciseResults.reduce((sum, result) => sum + result.totalQuestions, 0);
  const averageScore = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Progress</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalExercises}</Text>
          <Text style={styles.statLabel}>Exercises Completed</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{averageScore}%</Text>
          <Text style={styles.statLabel}>Average Score</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalCorrect}/{totalQuestions}</Text>
          <Text style={styles.statLabel}>Correct Answers</Text>
        </View>
      </View>
      
      <Text style={styles.sectionTitle}>Recent Results</Text>
      
      <ScrollView style={styles.resultsContainer}>
        {exerciseResults.length === 0 ? (
          <Text style={styles.noResultsText}>
            No exercises completed yet. Start practicing to see your progress!
          </Text>
        ) : (
          exerciseResults.slice().reverse().map((result) => (
            <View key={`${result.timestamp}-${result.exerciseType}`} style={styles.resultCard}>
              <Text style={styles.resultType}>{result.exerciseType.replace('_', ' ')}</Text>
              <View style={styles.resultDetails}>
                <Text style={styles.resultScore}>Score: {result.correctAnswers}/{result.totalQuestions}</Text>
                <Text style={styles.resultTime}>Time: {result.timeSpent}s</Text>
              </View>
              <Text style={styles.resultDate}>
                {new Date(result.timestamp).toLocaleDateString()}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
    padding: SPACING.lg,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.xxl,
    fontWeight: 'bold',
    color: COLORS.text.gold,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
    padding: SPACING.md,
    borderRadius: BORDERS.radius.md,
    marginHorizontal: SPACING.xs,
    alignItems: 'center',
    borderWidth: BORDERS.width.medium,
    borderColor: COLORS.border.gold,
  },
  statValue: {
    fontSize: TYPOGRAPHY.fontSize.xxl,
    fontWeight: 'bold',
    color: COLORS.text.gold,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.text.primary,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: 'bold',
    color: COLORS.text.gold,
    marginBottom: SPACING.md,
  },
  resultsContainer: {
    flex: 1,
  },
  noResultsText: {
    color: COLORS.text.secondary,
    fontSize: TYPOGRAPHY.fontSize.md,
    textAlign: 'center',
    marginTop: 50,
  },
  resultCard: {
    backgroundColor: COLORS.background.secondary,
    padding: SPACING.md,
    borderRadius: BORDERS.radius.md,
    marginBottom: SPACING.sm,
    borderWidth: BORDERS.width.thin,
    borderColor: COLORS.border.primary,
  },
  resultType: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: 'bold',
    color: COLORS.text.gold,
    marginBottom: SPACING.xs,
  },
  resultDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  resultScore: {
    color: COLORS.text.primary,
    fontSize: TYPOGRAPHY.fontSize.base,
  },
  resultTime: {
    color: COLORS.text.secondary,
    fontSize: TYPOGRAPHY.fontSize.base,
  },
  resultDate: {
    color: '#999999',
    fontSize: TYPOGRAPHY.fontSize.xs,
  },
});
