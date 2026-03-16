import { useState } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';

interface InstallButtonProps {
  isInstallable: boolean;
  isInstalled: boolean;
  onInstall: () => void;
}

function InstallButton({ isInstalled, onInstall }: InstallButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const styles = useThemedStyles(makeStyles);

  // Don't render if already installed
  if (isInstalled) {
    return null;
  }

  const handlePress = async () => {
    console.log('[InstallButton] Clicked');
    const windowWithDeferred = window as unknown as {
      deferredPrompt?: {
        prompt: () => Promise<void>;
        userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
      };
    };
    console.log('[InstallButton] window.deferredPrompt:', !!windowWithDeferred.deferredPrompt);
    setIsLoading(true);
    try {
      // Check if deferred prompt is available (set when beforeinstallprompt event fired)
      const deferredPrompt = windowWithDeferred.deferredPrompt;

      if (deferredPrompt) {
        console.log('[InstallButton] Found deferredPrompt, using native install');
        try {
          await deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          if (outcome === 'accepted') {
            console.log('[InstallButton] User accepted installation');
            windowWithDeferred.deferredPrompt = undefined;
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
      } catch {
        console.log('[InstallButton] Installation not available');
        // Silently fail - no popup needed
      }
    } catch (error: unknown) {
      console.error('[InstallButton] Unexpected error:', error);
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
export default InstallButton;

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
