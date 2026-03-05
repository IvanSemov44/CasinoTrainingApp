import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';

interface InstallButtonProps {
  isInstallable: boolean;
  isInstalled: boolean;
  onInstall: () => void;
}

export function InstallButton({ isInstallable, isInstalled, onInstall }: InstallButtonProps) {
  const { colors } = useTheme();

  // Don't render if already installed or not installable
  if (!isInstallable || isInstalled) {
    return null;
  }

  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: colors.background.secondary,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: colors.border.gold,
      gap: 2,
    },
    icon: {
      fontSize: 18,
    },
    label: {
      fontSize: 10,
      fontWeight: '600',
      color: colors.text.gold,
      letterSpacing: 0.5,
    },
  });

  return (
    <Pressable style={styles.button} onPress={onInstall} android_ripple={{ color: 'rgba(255,215,0,0.2)' }}>
      <Text style={styles.icon}>⬇️</Text>
      <Text style={styles.label}>Install</Text>
    </Pressable>
  );
}
