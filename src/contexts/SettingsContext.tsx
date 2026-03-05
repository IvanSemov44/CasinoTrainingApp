import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
          AsyncStorage.getItem('@app_settings_sound'),
          AsyncStorage.getItem('@app_settings_haptic'),
        ]);
        if (sound !== null) setSoundEnabledState(sound === 'true');
        if (haptic !== null) setHapticEnabledState(haptic === 'true');
      } catch {
        // Use defaults if load fails
      } finally {
        setIsLoaded(true);
      }
    };
    loadSettings();
  }, []);

  const setSoundEnabled = async (enabled: boolean) => {
    setSoundEnabledState(enabled);
    try {
      await AsyncStorage.setItem('@app_settings_sound', String(enabled));
    } catch {
      // Fail silently
    }
  };

  const setHapticEnabled = async (enabled: boolean) => {
    setHapticEnabledState(enabled);
    try {
      await AsyncStorage.setItem('@app_settings_haptic', String(enabled));
    } catch {
      // Fail silently
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
