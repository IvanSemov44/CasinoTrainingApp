import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useThemedStyles } from '@hooks/useThemedStyles';
import { InfoSection, MenuScreenHeader } from '@components/shared';
import type { AppColors } from '@styles/themes';
import { CallBetsStackParamList } from '../../navigation';

type CallBetsMenuNavigationProp = StackNavigationProp<CallBetsStackParamList, 'CallBetsMenu'>;

export default function CallBetsMenuScreen() {
  const styles = useThemedStyles(makeStyles);
  const navigation = useNavigation<CallBetsMenuNavigationProp>();

  const modes = [
    { key: 'tier', label: 'Tier', description: 'Learn the Tier bet (12 positions)' },
    { key: 'orphelins', label: 'Orphelins', description: 'Learn the Orphelins bet (8 positions)' },
    { key: 'voisins', label: 'Voisins', description: 'Learn the Voisins bet (17 positions)' },
    { key: 'zero', label: 'Zero', description: 'Learn the Zero bet (7 positions)' },
    { key: 'random', label: 'Random Mode', description: 'Mix all call bet types' },
  ] as const;

  const handleSelectMode = useCallback(
    (mode: (typeof modes)[number]['key']) => {
      navigation.navigate('CallBetsTraining', { mode });
    },
    [navigation]
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <MenuScreenHeader title="Call Bets Training" subtitle="Master announced roulette bets" />

      <View style={styles.content}>
        {modes.map(mode => (
          <TouchableOpacity
            key={mode.key}
            style={styles.modeButton}
            onPress={() => handleSelectMode(mode.key)}
            accessibilityLabel={`Start ${mode.label} training`}
            accessibilityRole="button"
          >
            <Text style={styles.modeLabel}>{mode.label}</Text>
            <Text style={styles.modeDescription}>{mode.description}</Text>
            <Text style={styles.modeArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <InfoSection title="What Are Call Bets?">
        <Text style={styles.infoDescription}>
          Call bets (or announced bets) are roulette betting patterns based on wheel positions
          rather than the betting layout. They&apos;re common in European casinos.
        </Text>
      </InfoSection>

      <InfoSection title="Call Bet Types">
        <View style={styles.betTypesList}>
          <Text style={styles.betTypeItem}>🎯 Tier — covers 12 consecutive numbers</Text>
          <Text style={styles.betTypeItem}>🎪 Orphelins — covers 8 non-adjacent numbers</Text>
          <Text style={styles.betTypeItem}>👥 Voisins — covers 17 consecutive numbers</Text>
          <Text style={styles.betTypeItem}>⭕ Zero — covers 7 numbers around zero</Text>
        </View>
      </InfoSection>

      <InfoSection title="How To Train">
        <Text style={styles.infoDescription}>
          Select a call bet type above to start. You&apos;ll be shown the wheel positions you need
          to cover, and you&apos;ll place chips on the correct betting layout positions.
        </Text>
      </InfoSection>
    </ScrollView>
  );
}

function makeStyles(colors: AppColors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
    },
    contentContainer: {
      paddingBottom: 40,
    },
    content: {
      padding: 20,
      alignItems: 'center',
      gap: 12,
    },
    modeButton: {
      backgroundColor: colors.background.secondary,
      borderRadius: 12,
      padding: 16,
      width: '100%',
      maxWidth: 400,
      borderLeftWidth: 4,
      borderLeftColor: colors.border.gold,
      borderWidth: 1,
      borderColor: colors.border.primary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    modeLabel: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text.primary,
    },
    modeDescription: {
      fontSize: 12,
      color: colors.text.muted,
      marginTop: 4,
      flex: 1,
    },
    modeArrow: {
      fontSize: 24,
      color: colors.text.gold,
      marginLeft: 12,
    },
    infoDescription: {
      fontSize: 14,
      color: colors.text.secondary,
      lineHeight: 20,
    },
    betTypesList: {
      marginTop: 4,
    },
    betTypeItem: {
      fontSize: 14,
      color: colors.text.primary,
      marginBottom: 8,
    },
  });
}
