import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProgress, ExerciseResult } from '../types/roulette.types';

const STORAGE_KEYS = {
  USER_PROGRESS: '@casino_training_progress',
  EXERCISE_RESULTS: '@casino_training_results',
};

export const storageService = {
  // Save user progress
  async saveProgress(progress: UserProgress): Promise<void> {
    try {
      const jsonValue = JSON.stringify(progress);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_PROGRESS, jsonValue);
    } catch (error) {
      console.error('Error saving progress:', error);
      throw error;
    }
  },

  // Load user progress
  async loadProgress(): Promise<UserProgress | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error loading progress:', error);
      return null;
    }
  },

  // Save exercise result
  async saveExerciseResult(result: ExerciseResult): Promise<void> {
    try {
      const existingResults = await this.loadExerciseResults();
      const updatedResults = [...existingResults, result];
      const jsonValue = JSON.stringify(updatedResults);
      await AsyncStorage.setItem(STORAGE_KEYS.EXERCISE_RESULTS, jsonValue);
    } catch (error) {
      console.error('Error saving exercise result:', error);
      throw error;
    }
  },

  // Load all exercise results
  async loadExerciseResults(): Promise<ExerciseResult[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.EXERCISE_RESULTS);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error('Error loading exercise results:', error);
      return [];
    }
  },

  // Clear all data (for testing or reset)
  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.USER_PROGRESS,
        STORAGE_KEYS.EXERCISE_RESULTS,
      ]);
    } catch (error) {
      console.error('Error clearing data:', error);
      throw error;
    }
  },
};
