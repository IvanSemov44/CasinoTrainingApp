import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, BORDERS } from '../features/roulette-training/constants/theme';

export default function HomeScreen({ navigation }: any) {
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>Casino Dealer Training</Text>
      <Text style={styles.subtitle}>Master your skills</Text>
      
      <View style={styles.menuContainer}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('RouletteLayoutView')}
        >
          <Text style={styles.menuButtonText}>🎯 View Roulette Layout</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('Racetrack')}
        >
          <Text style={styles.menuButtonText}>🏁 Racetrack</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('RouletteGame')}
        >
          <Text style={styles.menuButtonText}>🎮 Roulette Game</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('RouletteExercises')}
        >
          <Text style={styles.menuButtonText}>🎰 Roulette Training</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('AnnouncedBetsMenu')}
        >
          <Text style={styles.menuButtonText}>🎲 Announced Bets Training</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.menuButton, styles.menuButtonDisabled]}
          disabled
        >
          <Text style={styles.menuButtonText}>🃏 Card Games (Coming Soon)</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.menuButton, styles.menuButtonDisabled]}
          disabled
        >
          <Text style={styles.menuButtonText}>♠️ Poker Games (Coming Soon)</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('Progress')}
        >
          <Text style={styles.menuButtonText}>📊 My Progress</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xl * 2,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text.gold,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.text.primary,
    marginBottom: 50,
    textAlign: 'center',
  },
  menuContainer: {
    width: '100%',
    maxWidth: 400,
  },
  menuButton: {
    backgroundColor: COLORS.background.secondary,
    padding: SPACING.lg,
    borderRadius: BORDERS.radius.md,
    marginBottom: SPACING.md,
    borderWidth: BORDERS.width.medium,
    borderColor: COLORS.border.gold,
  },
  menuButtonDisabled: {
    backgroundColor: COLORS.background.tertiary,
    borderColor: '#666666',
    opacity: 0.5,
  },
  menuButtonText: {
    color: COLORS.text.primary,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: '600',
    textAlign: 'center',
  },
});
