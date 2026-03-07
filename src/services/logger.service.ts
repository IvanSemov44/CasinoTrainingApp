type LogContext = Record<string, unknown>;

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

export const logger = {
  error(message: string, error?: unknown, context?: LogContext): void {
    if (__DEV__) {
      if (error !== undefined) {
        console.error(`[ERROR] ${message}${stringifyContext(context)}`, error);
      } else {
        console.error(`[ERROR] ${message}${stringifyContext(context)}`);
      }
    }
  },

  warn(message: string, context?: LogContext): void {
    if (__DEV__) {
      console.warn(`[WARN] ${message}${stringifyContext(context)}`);
    }
  },

  info(message: string, context?: LogContext): void {
    if (__DEV__) {
      console.log(`[INFO] ${message}${stringifyContext(context)}`);
    }
  },
};

export default logger;
