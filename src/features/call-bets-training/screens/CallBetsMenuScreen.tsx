import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useTheme } from '@contexts/ThemeContext';
import { CallBetMode } from '../types';
import type { CallBetsStackParamList } from '../navigation';

type Props = StackScreenProps<CallBetsStackParamList, 'CallBetsMenu'>;

interface ModeOption {
  mode: CallBetMode;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const MODE_OPTIONS: ModeOption[] = [
  {
    mode: 'tier',
    title: 'Tier du Cylindre',
    description: '6 split bets on the wheel opposite to zero',
    icon: '🎯',
    color: '#ef4444',
  },
  {
    mode: 'orphelins',
    title: 'Orphelins',
    description: '1 straight + 4 splits on the orphan numbers',
    icon: '🎲',
    color: '#f59e0b',
  },
  {
    mode: 'voisins',
    title: 'Voisins du Zéro',
    description: '9 bets covering neighbors of zero',
    icon: '👥',
    color: '#3b82f6',
  },
  {
    mode: 'zero',
    title: 'Jeu Zéro',
    description: '1 straight + 3 splits close to zero',
    icon: '0️⃣',
    color: '#8b5cf6',
  },
  {
    mode: 'random',
    title: 'Random Training',
    description: 'Practice all call bets randomly',
    icon: '🎰',
    color: '#10b981',
  },
];

export default function CallBetsMenuScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const handleModeSelect = (mode: CallBetMode) => {
    navigation.navigate('CallBetsTraining', { mode });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Call Bets Training</Text>
        <Text style={styles.subtitle}>
          Learn where to place chips for each racetrack bet
        </Text>
      </View>

      <View style={styles.modesContainer}>
        {MODE_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.mode}
            style={styles.modeCard}
            onPress={() => handleModeSelect(option.mode)}
            activeOpacity={0.75}
          >
            <View style={[styles.accentBar, { backgroundColor: option.color }]} />
            <View style={styles.cardBody}>
              <View style={styles.cardHeader}>
                <Text style={styles.modeTitle}>{option.title}</Text>
                <Text style={styles.arrow}>›</Text>
              </View>
              <Text style={styles.modeDescription}>{option.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>How to Play:</Text>
        <Text style={styles.infoText}>1. Select a training mode</Text>
        <Text style={styles.infoText}>2. Place chips on the roulette layout</Text>
        <Text style={styles.infoText}>3. Click &quot;Check Answer&quot; when ready</Text>
        <Text style={styles.infoText}>4. Review feedback and try the next challenge</Text>
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
      padding: 20,
      paddingBottom: 40,
    },
    header: {
      marginBottom: 32,
      alignItems: 'center',
    },
    title: {
      fontSize: 26,
      fontWeight: '800',
      color: colors.text.gold,
      marginBottom: 4,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 14,
      color: colors.text.secondary,
      textAlign: 'center',
    },
    modesContainer: {
      gap: 12,
      marginBottom: 32,
    },
    modeCard: {
      flexDirection: 'row',
      backgroundColor: colors.background.secondary,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border.primary,
      overflow: 'hidden',
      marginBottom: 12,
    },
    accentBar: {
      width: 4,
    },
    cardBody: {
      flex: 1,
      padding: 14,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    modeTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text.primary,
      flex: 1,
    },
    arrow: {
      fontSize: 20,
      color: colors.text.muted,
    },
    modeDescription: {
      fontSize: 13,
      color: colors.text.secondary,
      lineHeight: 18,
    },
    infoBox: {
      backgroundColor: colors.background.secondary,
      borderRadius: 14,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border.primary,
    },
    infoTitle: {
      fontSize: 15,
      fontWeight: '700',
      color: colors.text.gold,
      marginBottom: 8,
    },
    infoText: {
      fontSize: 13,
      color: colors.text.secondary,
      marginBottom: 4,
    },
  });
}
