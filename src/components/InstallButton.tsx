import { useState } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
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

  const showInstallInstructions = () => {
    window.alert(
      'Install Casino Training App\n\n' +
      'Tap the menu button (⋮) in your browser and select "Install app" or "Add to Home Screen".\n\n' +
      'Or look for the install icon in the address bar.'
    );
  };

  const handlePress = async () => {
    console.log('[InstallButton] Clicked. isInstallable:', isInstallable);
    setIsLoading(true);
    try {
      if (isInstallable) {
        console.log('[InstallButton] Calling onInstall()');
        // If beforeinstallprompt was captured, use it
        await onInstall();
        console.log('[InstallButton] onInstall() completed');
      } else {
        // Fallback: show install instructions using window.alert
        console.log('[InstallButton] Using fallback instructions');
        showInstallInstructions();
      }
    } catch (error: any) {
      console.error('[InstallButton] Error:', error);
      // If error is because install prompt not available, show instructions
      if (error?.message?.includes('Install prompt not available')) {
        console.log('[InstallButton] Showing fallback instructions due to missing prompt');
        showInstallInstructions();
      } else {
        window.alert('Could not install app. Try using the browser menu instead.');
      }
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
