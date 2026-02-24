/**
 * Reusable mocks for Casino Training App tests
 * Provides mock functions and objects for testing
 */

// ============================================
// Navigation Mocks
// ============================================

export const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  reset: jest.fn(),
  push: jest.fn(),
  pop: jest.fn(),
  replace: jest.fn(),
  dispatch: jest.fn(),
  setParams: jest.fn(),
  isFocused: jest.fn(() => true),
  canGoBack: jest.fn(() => true),
};

export const mockRoute = {
  key: 'test-key',
  name: 'TestScreen',
  params: {},
};

/**
 * Setup mock for react-navigation
 * Call this in your test file or in a beforeEach hook
 */
export const setupNavigationMocks = () => {
  jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => mockNavigation,
    useRoute: () => mockRoute,
    useFocusEffect: jest.fn(),
    useIsFocused: () => true,
  }));
};

// ============================================
// AsyncStorage Mock
// ============================================

export const mockAsyncStorage = {
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
  multiGet: jest.fn(() => Promise.resolve([])),
  multiSet: jest.fn(() => Promise.resolve()),
  multiRemove: jest.fn(() => Promise.resolve()),
};

/**
 * Setup mock for AsyncStorage
 */
export const setupAsyncStorageMock = () => {
  jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
};

// ============================================
// Reanimated Mock
// ============================================

/**
 * Setup mock for react-native-reanimated
 * Already configured in jest.setup.js, but available for individual tests
 */
export const setupReanimatedMock = () => {
  jest.mock('react-native-reanimated', () => {
    const Reanimated = require('react-native-reanimated/mock');
    Reanimated.default.call = () => {};
    return Reanimated;
  });
};

// ============================================
// Gesture Handler Mock
// ============================================

/**
 * Setup mock for react-native-gesture-handler
 */
export const setupGestureHandlerMock = () => {
  jest.mock('react-native-gesture-handler', () => {
    const View = require('react-native').View;
    return {
      Swipeable: View,
      DrawerLayout: View,
      State: {},
      ScrollView: View,
      Slider: View,
      Switch: View,
      TextInput: View,
      ToolbarAndroid: View,
      ViewPagerAndroid: View,
      DrawerLayoutAndroid: View,
      WebView: View,
      NativeViewGestureHandler: View,
      TapGestureHandler: View,
      FlingGestureHandler: View,
      ForceTouchGestureHandler: View,
      LongPressGestureHandler: View,
      PanGestureHandler: View,
      PinchGestureHandler: View,
      RotationGestureHandler: View,
      RawButton: View,
      BaseButton: View,
      RectButton: View,
      BorderlessButton: View,
      FlatList: View,
      gestureHandlerRootHOC: jest.fn((component) => component),
      Directions: {},
    };
  });
};

// ============================================
// Alert Mock
// ============================================

export const mockAlert = {
  alert: jest.fn(),
};

/**
 * Setup mock for React Native Alert
 */
export const setupAlertMock = () => {
  jest.mock('react-native/Libraries/Alert/Alert', () => mockAlert);
};

// ============================================
// Dimensions Mock
// ============================================

export const mockDimensions = {
  get: jest.fn(() => ({
    width: 375,
    height: 812,
    scale: 2,
    fontScale: 1,
  })),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};

/**
 * Setup mock for React Native Dimensions
 */
export const setupDimensionsMock = (width = 375, height = 812) => {
  mockDimensions.get.mockReturnValue({
    width,
    height,
    scale: 2,
    fontScale: 1,
  });
  
  jest.mock('react-native/Libraries/Utilities/Dimensions', () => mockDimensions);
};

// ============================================
// Keyboard Mock
// ============================================

export const mockKeyboard = {
  dismiss: jest.fn(),
  addListener: jest.fn(() => ({ remove: jest.fn() })),
  removeListener: jest.fn(),
  removeAllListeners: jest.fn(),
};

/**
 * Setup mock for React Native Keyboard
 */
export const setupKeyboardMock = () => {
  jest.mock('react-native/Libraries/Components/Keyboard/Keyboard', () => mockKeyboard);
};

// ============================================
// Platform Mock
// ============================================

export const mockPlatform = {
  OS: 'ios',
  Version: '14.0',
  select: jest.fn((obj) => obj.ios || obj.default),
};

/**
 * Setup mock for React Native Platform
 */
export const setupPlatformMock = (os: 'ios' | 'android' = 'ios') => {
  mockPlatform.OS = os;
  jest.mock('react-native/Libraries/Utilities/Platform', () => mockPlatform);
};

// ============================================
// Timer Mocks
// ============================================

/**
 * Setup fake timers for testing timers and animations
 */
export const setupFakeTimers = () => {
  jest.useFakeTimers();
};

export const cleanupFakeTimers = () => {
  jest.useRealTimers();
};

// ============================================
// Sound Mock (for future audio features)
// ============================================

export const mockSound = {
  play: jest.fn(() => Promise.resolve()),
  pause: jest.fn(() => Promise.resolve()),
  stop: jest.fn(() => Promise.resolve()),
  release: jest.fn(),
  setVolume: jest.fn(),
  setSpeed: jest.fn(),
};

// ============================================
// Haptic Feedback Mock
// ============================================

export const mockHapticFeedback = {
  impact: jest.fn(),
  notification: jest.fn(),
  selection: jest.fn(),
};

// ============================================
// Redux Mock Store
// ============================================

import { configureStore } from '@reduxjs/toolkit';

/**
 * Create a mock Redux store for testing
 * @param reducer - The reducer to use
 * @param preloadedState - Optional preloaded state
 */
export const createMockStore = (reducer: any, preloadedState?: any) => {
  return configureStore({
    reducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      }),
  });
};

// ============================================
// Test Utilities
// ============================================

/**
 * Wait for all pending promises to resolve
 * Useful for testing async operations
 */
export const flushPromises = () => new Promise(setImmediate);

/**
 * Create a mock function that returns a specific value
 */
export const createMockFn = <T>(returnValue: T) => jest.fn(() => returnValue);

/**
 * Create a mock function that resolves to a specific value
 */
export const createMockAsyncFn = <T>(returnValue: T) => jest.fn(() => Promise.resolve(returnValue));

/**
 * Reset all mocks between tests
 * Call this in afterEach hook
 */
export const resetAllMocks = () => {
  jest.clearAllMocks();
  mockNavigation.navigate.mockClear();
  mockNavigation.goBack.mockClear();
  mockAsyncStorage.getItem.mockClear();
  mockAsyncStorage.setItem.mockClear();
};

// ============================================
// Accessibility Mocks
// ============================================

/**
 * Check if element is accessible
 */
export const isAccessible = (element: any) => {
  return element.props.accessible !== false;
};

/**
 * Get accessibility label from element
 */
export const getAccessibilityLabel = (element: any) => {
  return element.props.accessibilityLabel;
};

/**
 * Get accessibility role from element
 */
export const getAccessibilityRole = (element: any) => {
  return element.props.accessibilityRole;
};

// ============================================
// Event Mocks
// ============================================

/**
 * Create a mock event for testing event handlers
 */
export const createMockEvent = (overrides = {}) => ({
  nativeEvent: {
    timestamp: Date.now(),
    ...overrides,
  },
  preventDefault: jest.fn(),
  stopPropagation: jest.fn(),
});

/**
 * Create a mock gesture event for testing gesture handlers
 */
export const createMockGestureEvent = (overrides = {}) => ({
  nativeEvent: {
    state: 4, // BEGAN
    x: 0,
    y: 0,
    absoluteX: 0,
    absoluteY: 0,
    ...overrides,
  },
});
