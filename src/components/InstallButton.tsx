import { useState } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';

interface InstallButtonProps {
  isInstallable: boolean;
  isInstalled: boolean;
  onInstall: () => void;
}

export function InstallButton({ isInstalled, onInstall }: InstallButtonProps) {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  // Don't render if already installed
  if (isInstalled) {
    return null;
  }

  const handlePress = async () => {
    console.log('[InstallButton] Clicked');
    console.log('[InstallButton] window.deferredPrompt:', !!(window as any).deferredPrompt);
    setIsLoading(true);
    try {
      // Check if deferred prompt is available (set when beforeinstallprompt event fired)
      const deferredPrompt = (window as any).deferredPrompt;

      if (deferredPrompt) {
        console.log('[InstallButton] Found deferredPrompt, using native install');
        try {
          await deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          if (outcome === 'accepted') {
            console.log('[InstallButton] User accepted installation');
            (window as any).deferredPrompt = null;
            return;
          }
        } catch (promptError) {
          console.error('[InstallButton] Native prompt error:', promptError);
          // Continue to fallback
        }
      }

      // Try calling onInstall() as fallback (may try Chrome Web Store or other methods)
      console.log('[InstallButton] Trying onInstall() method');
      try {
        await onInstall();
        console.log('[InstallButton] onInstall() succeeded');
        return;
      } catch (_installError) {
        console.log('[InstallButton] Installation not available');
        // Silently fail - no popup needed
      }
    } catch (error: any) {
      console.error('[InstallButton] Unexpected error:', error);
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
