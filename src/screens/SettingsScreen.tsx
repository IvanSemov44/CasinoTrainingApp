import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { useSettings } from '@contexts/SettingsContext';

export default function SettingsScreen() {
  const { colors } = useTheme();
  const { soundEnabled, hapticEnabled, setSoundEnabled, setHapticEnabled } = useSettings();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* ── Sound Setting ── */}
      <View style={styles.settingGroup}>
        <View style={styles.settingHeader}>
          <Text style={styles.settingLabel}>Sound Feedback</Text>
          <Text style={styles.settingDescription}>Play sounds for correct/incorrect answers</Text>
        </View>
        <Switch
          value={soundEnabled}
          onValueChange={setSoundEnabled}
          trackColor={{ false: colors.border.primary, true: colors.status.success }}
          thumbColor={soundEnabled ? colors.text.gold : colors.text.muted}
          style={styles.switch}
        />
      </View>

      {/* ── Haptic Setting ── */}
      <View style={styles.settingGroup}>
        <View style={styles.settingHeader}>
          <Text style={styles.settingLabel}>Haptic Feedback</Text>
          <Text style={styles.settingDescription}>Vibration feedback for interactions</Text>
        </View>
        <Switch
          value={hapticEnabled}
          onValueChange={setHapticEnabled}
          trackColor={{ false: colors.border.primary, true: colors.status.success }}
          thumbColor={hapticEnabled ? colors.text.gold : colors.text.muted}
          style={styles.switch}
        />
      </View>

      {/* ── Info Section ── */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>About</Text>
        <Text style={styles.infoText}>
          This app helps you practice casino dealer skills with interactive training exercises across multiple games.
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
    content: {
      padding: 16,
      paddingBottom: 32,
    },
    settingGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.background.secondary,
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border.primary,
      marginBottom: 12,
    },
    settingHeader: {
      flex: 1,
      marginRight: 12,
    },
    settingLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text.primary,
      marginBottom: 4,
    },
    settingDescription: {
      fontSize: 12,
      color: colors.text.muted,
      lineHeight: 16,
    },
    switch: {
      transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
    },
    infoSection: {
      backgroundColor: colors.background.secondary,
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border.primary,
      marginTop: 16,
    },
    infoTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text.primary,
      marginBottom: 8,
    },
    infoText: {
      fontSize: 13,
      color: colors.text.secondary,
      lineHeight: 19,
    },
  });
   
}
