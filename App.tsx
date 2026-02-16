import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import 'react-native-gesture-handler';

// Fix for web scrolling - inject style to override Expo's overflow:hidden
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    body { overflow: auto !important; }
  `;
  document.head.appendChild(style);
}

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
      <StatusBar style="light" />
    </Provider>
  );
}
