import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { PLODifficulty } from '../../types';
import type { PLOMenuScreenProps } from './PLOMenuScreen.types';

export default function PLOMenuScreen({ navigation }: PLOMenuScreenProps) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);

  const modes: Array<{ difficulty: PLODifficulty; label: string; description: string }> = [
    { difficulty: 'easy', label: 'Easy', description: 'Preflop pot calculations' },
    { difficulty: 'medium', label: 'Medium', description: 'Multi-street pots' },
    { difficulty: 'advanced', label: 'Advanced', description: 'Complex scenarios' },
  ];

  const getDifficultyColor = (difficulty: PLODifficulty) => {
    if (difficulty === 'advanced') return colors.difficulty.hard;
    return colors.difficulty[difficulty];
  };

  const handleSelectDifficulty = (difficulty: PLODifficulty) => {
    navigation.navigate('PLOGameTraining', { difficulty });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Pot Limit Omaha Training</Text>
        <Text style={styles.subtitle}>Learn pot calculations at the table</Text>
      </View>

      <View style={styles.modesContainer}>
        {modes.map(mode => {
          const diffColor = getDifficultyColor(mode.difficulty);
          return (
            <TouchableOpacity
              key={mode.difficulty}
              style={[
                styles.modeCard,
                {
                  borderLeftColor: diffColor,
                },
              ]}
              onPress={() => handleSelectDifficulty(mode.difficulty)}
              accessibilityLabel={`${mode.label} mode`}
              accessibilityRole="button"
            >
              <View style={styles.modeHeader}>
                <Text style={styles.modeName}>{mode.label}</Text>
                <View style={[styles.modeBadge, { backgroundColor: diffColor + '22' }]}>
                  <Text style={[styles.modeBadgeText, { color: diffColor }]}>
                    {mode.difficulty.toUpperCase()}
                  </Text>
                </View>
              </View>
              <Text style={styles.modeDescription}>{mode.description}</Text>
              <Text style={styles.modeArrow}>›</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.instructionsBox}>
        <Text style={styles.instructionsTitle}>How it works:</Text>
        <Text style={styles.instructionsText}>
          • Watch the action unfold at the table{'\n'}• Calculate the pot when asked{'\n'}• Earn
          points for correct answers{'\n'}• Build your pot calculation streak
        </Text>
      </View>
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
      padding: 16,
    },
    header: {
      alignItems: 'center',
      marginBottom: 32,
      marginTop: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text.primary,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 14,
      color: colors.text.secondary,
    },
    modesContainer: {
      marginBottom: 32,
      gap: 12,
    },
    modeCard: {
      backgroundColor: colors.background.secondary,
      borderLeftWidth: 4,
      borderRadius: 12,
      padding: 16,
      position: 'relative',
    },
    modeHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    modeName: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text.primary,
    },
    modeBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
    },
    modeBadgeText: {
      fontSize: 12,
      fontWeight: '600',
    },
    modeDescription: {
      fontSize: 14,
      color: colors.text.secondary,
      marginBottom: 8,
    },
    modeArrow: {
      position: 'absolute',
      right: 16,
      top: '50%',
      fontSize: 28,
      color: colors.text.muted,
    },
    instructionsBox: {
      backgroundColor: colors.background.secondary,
      borderRadius: 12,
      padding: 16,
      borderLeftWidth: 4,
      borderLeftColor: colors.text.gold,
    },
    instructionsTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text.gold,
      marginBottom: 8,
    },
    instructionsText: {
      fontSize: 13,
      color: colors.text.secondary,
      lineHeight: 20,
    },
  });
}
