type LogContext = Record<string, unknown>;

import * as Sentry from '@sentry/react-native';
import { isProduction } from '../config/env';

function stringifyContext(context?: LogContext): string {
  if (!context) {
    return '';
  }

  try {
    return ` ${JSON.stringify(context)}`;
  } catch {
    return ' [context_unserializable]';
  }
}

// Add breadcrumbs in production for better debugging
function addBreadcrumb(
  level: 'error' | 'warn' | 'info',
  message: string,
  context?: LogContext
): void {
  if (isProduction) {
    Sentry.addBreadcrumb({
      category: level,
      message,
      data: context,
      level: level as 'error' | 'warning' | 'info',
    });
  }
}

export const logger = {
  error(message: string, error?: unknown, context?: LogContext): void {
    if (__DEV__) {
      if (error !== undefined) {
        console.error(`[ERROR] ${message}${stringifyContext(context)}`, error);
      } else {
        console.error(`[ERROR] ${message}${stringifyContext(context)}`);
      }
    }

    // Add breadcrumb for tracking
    addBreadcrumb('error', message, context);

    // Send to Sentry in production
    if (isProduction) {
      const errorToCapture = error ?? new Error(message);
      Sentry.captureException(errorToCapture, {
        extra: context,
      });
    }
  },

  warn(message: string, context?: LogContext): void {
    if (__DEV__) {
      console.warn(`[WARN] ${message}${stringifyContext(context)}`);
    }

    // Add breadcrumb for tracking
    addBreadcrumb('warn', message, context);
  },

  info(message: string, context?: LogContext): void {
    if (__DEV__) {
      console.log(`[INFO] ${message}${stringifyContext(context)}`);
    }

    // Add breadcrumb for tracking in production
    addBreadcrumb('info', message, context);
  },
};

export default logger;
