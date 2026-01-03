import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAppSelector } from '../store/hooks';

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
          exerciseResults.slice().reverse().map((result, index) => (
            <View key={index} style={styles.resultCard}>
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
    backgroundColor: '#0a2f1f',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1a5f3f',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 15,
  },
  resultsContainer: {
    flex: 1,
  },
  noResultsText: {
    color: '#CCCCCC',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
  resultCard: {
    backgroundColor: '#1a5f3f',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2a7f4f',
  },
  resultType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 5,
  },
  resultDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  resultScore: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  resultTime: {
    color: '#CCCCCC',
    fontSize: 14,
  },
  resultDate: {
    color: '#999999',
    fontSize: 12,
  },
});
