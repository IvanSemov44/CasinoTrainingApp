import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { useThemedStyles } from '@hooks/useThemedStyles';
import { MenuScreenHeader, AccentModeCard, InstructionBox } from '@components/shared';
import { PLODifficulty } from '../../types';
import { PLO_MODES } from '../../constants/modes';
import type { PLOMenuScreenProps } from './PLOMenuScreen.types';

export default function PLOMenuScreen({ navigation }: PLOMenuScreenProps) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);

  const getDifficultyColor = (difficulty: PLODifficulty) => {
    if (difficulty === 'advanced') return colors.difficulty.hard;
    return colors.difficulty[difficulty];
  };

  const handleSelectDifficulty = (difficulty: PLODifficulty) => {
    navigation.navigate('PLOGameTraining', { difficulty });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <MenuScreenHeader
        title="Pot Limit Omaha Training"
        subtitle="Learn pot calculations at the table"
      />

      <View style={styles.modesContainer}>
        {PLO_MODES.map(mode => (
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

      <InstructionBox
        title="How it works:"
        instructions={[
          '• Watch the action unfold at the table',
          '• Calculate the pot when asked',
          '• Earn points for correct answers',
          '• Build your pot calculation streak',
        ]}
      />
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
  });
}
