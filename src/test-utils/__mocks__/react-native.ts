/**
 * Mock for react-native
 * Provides minimal implementations for testing React Native components
 */
import React from 'react';

interface ComponentProps {
  children?: React.ReactNode;
  style?: unknown;
  testID?: string;
  [key: string]: unknown;
}

interface TouchableProps extends ComponentProps {
  onPress?: () => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: string;
}

interface FlatListProps<T> extends ComponentProps {
  data?: T[];
  renderItem?: (item: T) => React.ReactNode;
  keyExtractor?: (item: T) => string;
}

interface TextInputProps extends ComponentProps {
  value?: string;
  onChangeText?: (text: string) => void;
}

// Mock View component
export const View: React.FC<ComponentProps> = ({ children, style, testID, ...props }) =>
  React.createElement('View', { style, testID, ...props }, children);

// Mock Text component
export const Text: React.FC<ComponentProps> = ({ children, style, ...props }) =>
  React.createElement('Text', { style, ...props }, children);

// Mock TouchableOpacity component
export const TouchableOpacity: React.FC<TouchableProps> = ({
  children,
  onPress,
  style,
  testID,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole,
  ...props
}) =>
  React.createElement(
    'TouchableOpacity',
    {
      onPress,
      style,
      testID,
      accessibilityLabel,
      accessibilityHint,
      accessibilityRole,
      ...props,
    },
    children
  );

// Mock TouchableHighlight component
export const TouchableHighlight: React.FC<TouchableProps> = ({
  children,
  onPress,
  style,
  ...props
}) => React.createElement('TouchableHighlight', { onPress, style, ...props }, children);

// Mock TouchableWithoutFeedback component
export const TouchableWithoutFeedback: React.FC<TouchableProps> = ({
  children,
  onPress,
  ...props
}) => React.createElement('TouchableWithoutFeedback', { onPress, ...props }, children);

// Mock ScrollView component
export const ScrollView: React.FC<ComponentProps> = ({ children, style, ...props }) =>
  React.createElement('ScrollView', { style, ...props }, children);

// Mock Image component
export const Image: React.FC<ComponentProps> = ({ source, style, testID, ...props }) =>
  React.createElement('Image', { source, style, testID, ...props });

// Mock ActivityIndicator component
export const ActivityIndicator: React.FC<ComponentProps> = ({ size, color, testID, ...props }) =>
  React.createElement('ActivityIndicator', { size, color, testID, ...props });

// Mock TextInput component
export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChangeText,
  style,
  testID,
  ...props
}) => React.createElement('TextInput', { value, onChangeText, style, testID, ...props });

// Mock FlatList component
export const FlatList: React.FC<FlatListProps<unknown>> = ({
  data,
  renderItem,
  keyExtractor,
  ...props
}) => React.createElement('FlatList', { data, renderItem, keyExtractor, ...props });

// Mock StyleSheet
export const StyleSheet = {
  create: (styles: Record<string, unknown>) => styles,
  flatten: (style: unknown) => style,
  hairlineWidth: 1,
  absoluteFill: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
};

// Mock Dimensions
export const Dimensions = {
  get: () => ({
    width: 375,
    height: 812,
    scale: 2,
    fontScale: 1,
  }),
  addEventListener: () => {},
  removeEventListener: () => {},
};

// Mock Platform
export const Platform = {
  OS: 'ios',
  Version: '14.0',
  select: (obj: Record<string, unknown>) =>
    (obj as Record<string, unknown>).ios || (obj as Record<string, unknown>).default,
};

// Mock PixelRatio
export const PixelRatio = {
  get: () => 2,
  getFontScale: () => 1,
  getPixelSizeForLayoutSize: (size: number) => size * 2,
  roundToNearestPixel: (size: number) => size,
};

// Mock AppState
export const AppState = {
  currentState: 'active',
  addEventListener: () => {},
  removeEventListener: () => {},
};

// Mock Keyboard
export const Keyboard = {
  dismiss: () => {},
  addListener: () => ({ remove: () => {} }),
  removeListener: () => {},
};

// Mock Animated
export const Animated = {
  View: View,
  Text: Text,
  Image: Image,
  createAnimatedComponent: (component: React.ComponentType<unknown>) => component,
  Value: class {
    constructor(value: number = 0) {
      this._value = value;
    }
    _value: number;
    setValue(value: number) {
      this._value = value;
    }
    interpolate(_config: unknown) {
      return this._value;
    }
  },
  timing: () => ({
    start: (callback?: (result: { finished: boolean }) => void) =>
      callback && callback({ finished: true }),
    stop: () => {},
  }),
  spring: () => ({
    start: (callback?: (result: { finished: boolean }) => void) =>
      callback && callback({ finished: true }),
    stop: () => {},
  }),
  decay: () => ({
    start: (callback?: (result: { finished: boolean }) => void) =>
      callback && callback({ finished: true }),
    stop: () => {},
  }),
  parallel: () => ({
    start: (callback?: (result: { finished: boolean }) => void) =>
      callback && callback({ finished: true }),
    stop: () => {},
  }),
  sequence: () => ({
    start: (callback?: (result: { finished: boolean }) => void) =>
      callback && callback({ finished: true }),
    stop: () => {},
  }),
  loop: () => ({
    start: () => {},
    stop: () => {},
  }),
  event: () => () => {},
  add: () => 0,
  subtract: () => 0,
  multiply: () => 0,
  divide: () => 0,
  modulo: () => 0,
};

// Mock Easing
export const Easing = {
  linear: () => {},
  ease: () => {},
  bezier: () => {},
  in: () => {},
  out: () => {},
  inOut: () => {},
};

// Mock useColorScheme
export const useColorScheme = () => 'light';

// Mock useWindowDimensions
export const useWindowDimensions = () => ({
  width: 375,
  height: 812,
  scale: 2,
  fontScale: 1,
});

// Mock StatusBar
export const StatusBar = {
  setBarStyle: () => {},
  setBackgroundColor: () => {},
  setHidden: () => {},
  setNetworkActivityIndicatorVisible: () => {},
};

// Mock SafeAreaView
export const SafeAreaView: React.FC<ComponentProps> = ({ children, style, ...props }) =>
  React.createElement('SafeAreaView', { style, ...props }, children);

// Export default
export default {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  ActivityIndicator,
  TextInput,
  FlatList,
  StyleSheet,
  Dimensions,
  Platform,
  PixelRatio,
  AppState,
  Keyboard,
  Animated,
  Easing,
  useColorScheme,
  useWindowDimensions,
  StatusBar,
  SafeAreaView,
};
