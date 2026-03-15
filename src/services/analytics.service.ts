/**
 * Analytics service for tracking custom events
 *
 * This is a stub implementation that logs to console in development
 * and can be connected to PostHog or another analytics provider
 * for production use.
 */
import { isProduction } from '../config/env';

export type AnalyticsEvent = {
  name: string;
  properties?: Record<string, unknown>;
};

const MAX_QUEUE_SIZE = 100;
const eventQueue: AnalyticsEvent[] = [];

/**
 * Track a screen view
 */
export function trackScreen(name: string): void {
  trackEvent('screen_viewed', { screen_name: name });
}

/**
 * Track a custom event
 */
export function trackEvent(name: string, properties?: Record<string, unknown>): void {
  const event: AnalyticsEvent = { name, properties };

  if (__DEV__) {
    console.log(`[ANALYTICS] ${name}`, properties);
    return;
  }

  // In production, add to queue for batch sending
  // TODO: Connect to PostHog or other analytics provider
  if (isProduction) {
    eventQueue.push(event);

    // Keep queue size manageable
    if (eventQueue.length > MAX_QUEUE_SIZE) {
      eventQueue.shift();
    }

    // For now, log to console in production as fallback
    // Replace with actual analytics provider integration
    console.log(`[ANALYTICS] ${name}`, properties);
  }
}

// Pre-defined event trackers for common actions

export const analytics = {
  // Feature events
  featureOpened: (feature: string) => trackEvent('feature_opened', { feature }),

  // Drill events
  drillStarted: (game: string, difficulty: string) =>
    trackEvent('drill_started', { game, difficulty }),

  drillCompleted: (game: string, score: number, difficulty: string, duration: number) =>
    trackEvent('drill_completed', { game, score, difficulty, duration }),

  drillAbandoned: (game: string, difficulty: string, progress: number) =>
    trackEvent('drill_abandoned', { game, difficulty, progress }),

  // Settings events
  themeChanged: (theme: 'light' | 'dark') => trackEvent('theme_changed', { theme }),

  settingsToggled: (setting: string, value: boolean) =>
    trackEvent('settings_toggled', { setting, value }),

  // Navigation
  screen: trackScreen,

  // Generic event
  event: trackEvent,
};

export default analytics;
