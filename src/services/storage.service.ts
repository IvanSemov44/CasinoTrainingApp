import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from '@services/logger.service';
import { UserProgress } from '@app-types/roulette.types';
import { STORAGE_KEYS } from '@constants/storageKeys';

export const storageService = {
  // Save user progress
  async saveProgress(progress: UserProgress): Promise<void> {
    try {
      const jsonValue = JSON.stringify(progress);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_PROGRESS, jsonValue);
    } catch (error) {
      logger.error('Error saving progress', error);
      throw error;
    }
  },

  // Load user progress
  async loadProgress(): Promise<UserProgress | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      logger.error('Error loading progress', error);
      return null;
    }
  },

  // Clear all data (for testing or reset)
  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([STORAGE_KEYS.USER_PROGRESS]);
    } catch (error) {
      logger.error('Error clearing data', error);
      throw error;
    }
  },
};
