/**
 * Environment configuration
 * Single import point for typed environment variable access
 */
import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra ?? {};

export const ENV = {
  sentryDsn: extra.sentryDsn as string,
  apiBaseUrl: extra.apiBaseUrl as string,
  environment: extra.environment as 'development' | 'staging' | 'production',
} as const;

export type Environment = (typeof ENV)['environment'];

/**
 * Helper to check if running in production
 */
export const isProduction = ENV.environment === 'production';

/**
 * Helper to check if running in development
 */
export const isDevelopment = ENV.environment === 'development';

/**
 * Helper to check if running in staging
 */
export const isStaging = ENV.environment === 'staging';
