/**
 * Performance monitoring utilities
 * Uses browser performance API and Sentry for performance tracking
 */
import * as Sentry from '@sentry/react-native';
import { isProduction } from '../config/env';

export interface PerformanceMark {
  name: string;
  startTime: number;
}

const activeMarks: Map<string, PerformanceMark> = new Map();

/**
 * Start a performance mark
 */
export function startMark(name: string): void {
  activeMarks.set(name, {
    name,
    startTime: performance.now(),
  });
}

/**
 * End a performance mark and optionally report to Sentry
 */
export function endMark(name: string, reportToSentry: boolean = false): number | null {
  const mark = activeMarks.get(name);
  if (!mark) {
    return null;
  }

  const duration = performance.now() - mark.startTime;
  activeMarks.delete(name);

  if (reportToSentry && isProduction) {
    Sentry.startSpan(
      {
        name,
        op: 'perf',
      },
      () => {
        // Span automatically captures duration
      }
    );
  }

  return duration;
}

/**
 * Measure a function's execution time
 */
export async function measureAsync<T>(
  name: string,
  fn: () => Promise<T>,
  reportToSentry: boolean = false
): Promise<T> {
  startMark(name);
  try {
    return await fn();
  } finally {
    const duration = endMark(name, reportToSentry);
    if (__DEV__) {
      console.log(`[PERF] ${name}: ${duration?.toFixed(2)}ms`);
    }
  }
}

/**
 * Measure a synchronous function's execution time
 */
export function measureSync<T>(name: string, fn: () => T, reportToSentry: boolean = false): T {
  startMark(name);
  try {
    return fn();
  } finally {
    const duration = endMark(name, reportToSentry);
    if (__DEV__) {
      console.log(`[PERF] ${name}: ${duration?.toFixed(2)}ms`);
    }
  }
}

/**
 * Report custom performance metric to Sentry
 */
export function reportMetric(name: string, value: number, unit: string = 'ms'): void {
  if (isProduction) {
    Sentry.setMeasurement(name, value, unit);
  }
}
