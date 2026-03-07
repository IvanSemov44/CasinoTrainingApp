import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { useThemedStyles } from '@hooks/useThemedStyles';
import { MenuScreenHeader, AccentModeCard } from '@components/shared';
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
      <MenuScreenHeader title="Pot Limit Omaha Training" subtitle="Learn pot calculations at the table" />

      <View style={styles.modesContainer}>
        {modes.map(mode => (
          <AccentModeCard
            key={mode.difficulty}
            title={mode.label}
            description={mode.description}
            accentColor={getDifficultyColor(mode.difficulty)}
            onPress={() => handleSelectDifficulty(mode.difficulty)}
                        accessibilityLabel={`${mode.label} mode`}
            badge={{
              label: mode.difficulty.toUpperCase(),
              color: getDifficultyColor(mode.difficulty),
            }}
          />
        ))}
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
    modesContainer: {
      marginBottom: 32,
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
