import React, { useState } from 'react';
import { Pressable, Text, StyleSheet, Alert } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';

interface InstallButtonProps {
  isInstallable: boolean;
  isInstalled: boolean;
  onInstall: () => void;
}

export function InstallButton({ isInstallable, isInstalled, onInstall }: InstallButtonProps) {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  // Don't render if already installed
  if (isInstalled) {
    return null;
  }

  const handlePress = async () => {
    setIsLoading(true);
    try {
      if (isInstallable) {
        // If beforeinstallprompt was captured, use it
        await onInstall();
      } else {
        // Fallback: show install instructions
        Alert.alert(
          'Install Casino Training App',
          'Tap the menu button (⋮) in your browser and select "Install app" or "Add to Home Screen".\n\nOr look for the install icon in the address bar.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Installation error:', error);
      Alert.alert('Error', 'Could not install app. Try using the browser menu instead.');
    } finally {
      setIsLoading(false);
    }
  };

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
      opacity: isLoading ? 0.6 : 1,
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
    <Pressable
      style={styles.button}
      onPress={handlePress}
      disabled={isLoading}
      android_ripple={{ color: 'rgba(255,215,0,0.2)' }}
    >
      <Text style={styles.icon}>⬇️</Text>
      <Text style={styles.label}>Install</Text>
    </Pressable>
  );
}
