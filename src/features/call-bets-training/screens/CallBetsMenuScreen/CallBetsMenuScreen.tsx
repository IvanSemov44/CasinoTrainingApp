import React, { useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '@contexts/ThemeContext';
import { CallBetsStackParamList } from '../../navigation';

type CallBetsMenuNavigationProp = StackNavigationProp<CallBetsStackParamList, 'CallBetsMenu'>;

export default function CallBetsMenuScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const navigation = useNavigation<CallBetsMenuNavigationProp>();

  const modes = [
    { key: 'tier', label: 'Tier', description: 'Learn the Tier bet (12 positions)' },
    { key: 'orphelins', label: 'Orphelins', description: 'Learn the Orphelins bet (8 positions)' },
    { key: 'voisins', label: 'Voisins', description: 'Learn the Voisins bet (17 positions)' },
    { key: 'zero', label: 'Zero', description: 'Learn the Zero bet (7 positions)' },
    { key: 'random', label: 'Random Mode', description: 'Mix all call bet types' },
  ] as const;

  const handleSelectMode = useCallback((mode: typeof modes[number]['key']) => {
    navigation.navigate('CallBetsTraining', { mode });
  }, [navigation]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Call Bets Training</Text>
        <Text style={styles.subtitle}>Master announced roulette bets</Text>
      </View>

      <View style={styles.content}>
        {modes.map((mode) => (
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

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>What Are Call Bets?</Text>
        <Text style={styles.infoDescription}>
          Call bets (or announced bets) are roulette betting patterns based on wheel positions rather than the betting layout. They&apos;re common in European casinos.
        </Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Call Bet Types</Text>
        <View style={styles.betTypesList}>
          <Text style={styles.betTypeItem}>🎯 Tier — covers 12 consecutive numbers</Text>
          <Text style={styles.betTypeItem}>🎪 Orphelins — covers 8 non-adjacent numbers</Text>
          <Text style={styles.betTypeItem}>👥 Voisins — covers 17 consecutive numbers</Text>
          <Text style={styles.betTypeItem}>⭕ Zero — covers 7 numbers around zero</Text>
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>How To Train</Text>
        <Text style={styles.infoDescription}>
          Select a call bet type above to start. You&apos;ll be shown the wheel positions you need to cover, and you&apos;ll place chips on the correct betting layout positions.
        </Text>
      </View>
    </ScrollView>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  /* eslint-disable react-native/no-unused-styles */
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
    },
    contentContainer: {
      paddingBottom: 40,
    },
    header: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.primary,
      alignItems: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: '800',
      color: colors.text.gold,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 14,
      color: colors.text.secondary,
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
    infoSection: {
      backgroundColor: colors.background.secondary,
      borderRadius: 12,
      padding: 16,
      marginHorizontal: 20,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border.primary,
    },
    infoTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text.gold,
      marginBottom: 12,
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
  /* eslint-enable react-native/no-unused-styles */
}
