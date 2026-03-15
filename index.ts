import 'react-native-gesture-handler';
import * as Sentry from '@sentry/react-native';
import { registerRootComponent } from 'expo';

import { ENV } from './src/config/env';

// Initialize Sentry for error tracking
Sentry.init({
  dsn: ENV.sentryDsn,
  environment: ENV.environment,
  enabled: !__DEV__,
  tracesSampleRate: 0.2,
});

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
