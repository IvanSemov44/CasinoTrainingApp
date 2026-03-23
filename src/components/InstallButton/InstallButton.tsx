import { useState } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';
import { useInstallPrompt } from './useInstallPrompt';

function InstallButton() {
  const [isLoading, setIsLoading] = useState(false);
  const styles = useThemedStyles(makeStyles);
  const { isInstallable, isInstalled, install } = useInstallPrompt();

  // Don't render if already installed or not installable
  if (!isInstallable || isInstalled) {
    return null;
  }

  const handlePress = async () => {
    setIsLoading(true);
    try {
      await install();
    } catch (error) {
      // Silently ignore failures
      console.error('[InstallButton] install failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Pressable
      style={[styles.button, { opacity: isLoading ? 0.6 : 1 }]}
      onPress={handlePress}
      disabled={isLoading}
      android_ripple={{ color: 'rgba(255,215,0,0.2)' }}
    >
      <Text style={styles.icon}>⬇️</Text>
      <Text style={styles.label}>Install</Text>
    </Pressable>
  );
}

export { InstallButton };

function makeStyles(colors: AppColors) {
  return StyleSheet.create({
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
}
