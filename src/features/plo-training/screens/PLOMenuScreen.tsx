import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useTheme } from '@contexts/ThemeContext';
import { colorWithOpacity } from '@styles';
import type { PLOStackParamList } from '../navigation';
import { DIFFICULTY_INFO } from '../constants/gameScenarios';
import type { PLODifficulty } from '../types';

type PLOMenuScreenProps = StackScreenProps<PLOStackParamList, 'PLOMenu'>;

const DIFFICULTIES: PLODifficulty[] = ['easy', 'medium', 'advanced'];

export default function PLOMenuScreen({ navigation }: PLOMenuScreenProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const difficultyColors: Record<PLODifficulty, string> = {
    easy: colors.difficulty.easy,
    medium: colors.difficulty.medium,
    advanced: colors.difficulty.hard,
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Pot Limit Omaha Training</Text>
        <Text style={styles.subtitle}>Select difficulty level</Text>
      </View>

      {DIFFICULTIES.map((difficulty) => {
        const info = DIFFICULTY_INFO[difficulty];
        return (
          <TouchableOpacity
            key={difficulty}
            style={styles.card}
            onPress={() => navigation.navigate('PLOGameTraining', { difficulty })}
            activeOpacity={0.75}
          >
            <View style={[styles.accentBar, { backgroundColor: difficultyColors[difficulty] }]} />
            <View style={styles.cardBody}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{info.label}</Text>
                <View style={[styles.badge, { backgroundColor: colorWithOpacity(difficultyColors[difficulty], 0.13) }]}>
                  <Text style={[styles.badgeText, { color: difficultyColors[difficulty] }]}>
                    {difficulty.toUpperCase()}
                  </Text>
                </View>
              </View>
              <Text style={styles.cardDesc}>{info.description}</Text>
              <Text style={styles.cardArrow}>›</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background.primary },
    content: { padding: 20, paddingBottom: 40 },
    header: {
      marginBottom: 24,
    },
    title: {
      fontSize: 26,
      fontWeight: '800',
      color: colors.text.gold,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 14,
      color: colors.text.secondary,
    },
    card: {
      flexDirection: 'row',
      backgroundColor: colors.background.secondary,
      borderRadius: 12,
      marginBottom: 10,
      overflow: 'hidden',
    },
    accentBar: {
      width: 4,
    },
    cardBody: {
      flex: 1,
      padding: 16,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 6,
    },
    cardTitle: {
      fontSize: 17,
      fontWeight: '700',
      color: colors.text.primary,
      flex: 1,
      marginRight: 8,
    },
    badge: {
      borderRadius: 6,
      paddingHorizontal: 7,
      paddingVertical: 2,
    },
    badgeText: {
      fontSize: 10,
      fontWeight: '700',
      letterSpacing: 0.5,
    },
    cardDesc: {
      fontSize: 13,
      color: colors.text.secondary,
      lineHeight: 19,
      marginBottom: 8,
    },
    cardArrow: {
      fontSize: 20,
      color: colors.text.muted,
      textAlign: 'right',
    },
  });
}
