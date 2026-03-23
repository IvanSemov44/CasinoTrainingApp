import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@contexts/ThemeContext';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';
import { InstallButton } from '@components/InstallButton';
import { GameCategorySection } from '@components/GameCategorySection';

export function HomeScreen() {
  const router = useRouter();
  const { themeId, toggleTheme } = useTheme();
  const styles = useThemedStyles(makeStyles);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Header ──────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.appTitle}>Casino Dealer</Text>
          <Text style={styles.appSubtitle}>Training Academy</Text>
        </View>
        <View style={styles.headerButtons}>
          <InstallButton />
          <Pressable style={styles.themeToggle} onPress={toggleTheme}>
            <Text style={styles.themeToggleText}>{themeId === 'midnight' ? '🟢' : '🌑'}</Text>
            <Text style={styles.themeToggleLabel}>
              {themeId === 'midnight' ? 'Casino' : 'Midnight'}
            </Text>
          </Pressable>
          <Pressable style={styles.settingsBtn} onPress={() => router.push('/settings')}>
            <Text style={styles.settingsBtnText}>⚙️</Text>
          </Pressable>
        </View>
      </View>

      {/* ── Divider ─────────────────────────────────────────────────── */}
      <View style={styles.divider} />

      {/* ── Category sections ───────────────────────────────────────── */}
      <GameCategorySection />

      {/* ── Progress button ──────────────────────────────────────────── */}
      <TouchableOpacity
        style={styles.progressBtn}
        onPress={() => router.push('/progress')}
        activeOpacity={0.8}
      >
        <Text style={styles.progressBtnText}>📊 My Progress</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function makeStyles(colors: AppColors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
    },
    content: {
      paddingHorizontal: 20,
      paddingTop: 28,
      paddingBottom: 40,
    },

    // ── Header
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginBottom: 20,
    },
    appTitle: {
      fontSize: 30,
      fontWeight: '800',
      color: colors.text.gold,
      letterSpacing: 0.3,
      lineHeight: 34,
    },
    appSubtitle: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.text.secondary,
      letterSpacing: 1.2,
      textTransform: 'uppercase',
      marginTop: 2,
    },
    themeToggle: {
      alignItems: 'center',
      backgroundColor: colors.background.secondary,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: colors.border.primary,
      gap: 2,
    },
    themeToggleText: { fontSize: 18 },
    themeToggleLabel: {
      fontSize: 10,
      fontWeight: '600',
      color: colors.text.secondary,
      letterSpacing: 0.5,
    },
    settingsBtn: {
      width: 40,
      height: 40,
      borderRadius: 8,
      backgroundColor: colors.background.secondary,
      borderWidth: 1,
      borderColor: colors.border.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    settingsBtnText: {
      fontSize: 18,
    },
    headerButtons: {
      flexDirection: 'row',
      gap: 8,
      alignItems: 'flex-end',
    },

    divider: {
      height: 1,
      backgroundColor: colors.border.primary,
      marginBottom: 24,
    },

    // ── Progress button
    progressBtn: {
      backgroundColor: colors.background.secondary,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border.gold,
      paddingVertical: 16,
      alignItems: 'center',
      marginTop: 4,
    },
    progressBtnText: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text.gold,
    },
  });
}
