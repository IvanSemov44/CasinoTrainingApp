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
    html, body { height: 100%; margin: 0; padding: 0; }
    #root { min-height: 100%; height: auto; }
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
