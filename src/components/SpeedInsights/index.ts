/**
 * Platform-specific SpeedInsights wrapper
 * - On web: uses @vercel/speed-insights/react
 * - On native: returns null (no-op)
 */
import { Platform } from 'react-native';

// Default no-op component
const NoOpSpeedInsights: React.FC = () => null;

let SpeedInsightsComponent: React.FC = NoOpSpeedInsights;

if (Platform.OS === 'web') {
  // Dynamic import for web-only package
  try {
    const { SpeedInsights } = require('@vercel/speed-insights/react');
    SpeedInsightsComponent = SpeedInsights || NoOpSpeedInsights;
  } catch {
    // Package not available or failed to load
    SpeedInsightsComponent = NoOpSpeedInsights;
  }
}

export default SpeedInsightsComponent;
