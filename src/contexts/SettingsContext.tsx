import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@constants/storageKeys';
import logger from '@services/logger.service';

interface SettingsContextType {
  soundEnabled: boolean;
  hapticEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => Promise<void>;
  setHapticEnabled: (enabled: boolean) => Promise<void>;
  isLoaded: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [soundEnabled, setSoundEnabledState] = useState(true);
  const [hapticEnabled, setHapticEnabledState] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load settings from storage on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const [sound, haptic] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.SETTINGS_SOUND),
          AsyncStorage.getItem(STORAGE_KEYS.SETTINGS_HAPTIC),
        ]);
        if (sound !== null) setSoundEnabledState(sound === 'true');
        if (haptic !== null) setHapticEnabledState(haptic === 'true');
      } catch (error) {
        logger.warn('Failed to load settings', { error });
      } finally {
        setIsLoaded(true);
      }
    };
    loadSettings();
  }, []);

  const setSoundEnabled = async (enabled: boolean) => {
    setSoundEnabledState(enabled);
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS_SOUND, String(enabled));
    } catch (error) {
      logger.warn('Failed to save sound setting', { error });
    }
  };

  const setHapticEnabled = async (enabled: boolean) => {
    setHapticEnabledState(enabled);
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS_HAPTIC, String(enabled));
    } catch (error) {
      logger.warn('Failed to save haptic setting', { error });
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        soundEnabled,
        hapticEnabled,
        setSoundEnabled,
        setHapticEnabled,
        isLoaded,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
}
