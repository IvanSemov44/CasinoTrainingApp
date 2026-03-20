import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Sentry from '@sentry/react-native';
import { store, persistor } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import ErrorBoundary from './src/shared/ErrorBoundary';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { SettingsProvider } from './src/contexts/SettingsContext';
import LoadingSpinner from './src/shared/LoadingSpinner';
import SpeedInsights from './src/components/SpeedInsights';

function AppContent() {
  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <Provider store={store}>
          <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
            <ThemeProvider>
              <SettingsProvider>
                <AppNavigator />
                <StatusBar style="light" />
                <SpeedInsights />
              </SettingsProvider>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

export default Sentry.wrap(AppContent);
