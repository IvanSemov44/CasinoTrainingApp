/**
 * Reusable Mocks for Casino Training App tests
 * Centralize all mock implementations here
 */

// ============================================
// Navigation Mocks
// ============================================

export const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  reset: jest.fn(),
  replace: jest.fn(),
  push: jest.fn(),
  pop: jest.fn(),
  popToTop: jest.fn(),
  setParams: jest.fn(),
  dispatch: jest.fn(),
  isFocused: jest.fn(() => true),
  canGoBack: jest.fn(() => true),
  getParent: jest.fn(),
  getState: jest.fn(),
};

export const mockRoute = {
  key: 'test-key',
  name: 'TestScreen',
  params: {},
  path: undefined,
};

export const mockNavigationProp = {
  navigation: mockNavigation,
  route: mockRoute,
};

// ============================================
// React Navigation Hook Mocks
// ============================================

export const mockUseNavigation = () => mockNavigation;
export const mockUseRoute = () => mockRoute;

// Full navigation mock setup
export const setupNavigationMocks = () => {
  jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: mockUseNavigation,
    useRoute: mockUseRoute,
    useFocusEffect: jest.fn(),
    useIsFocused: jest.fn(() => true),
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

// ============================================
// Timer Mocks
// ============================================

export const mockTimers = {
  setTimeout: jest.fn((callback: () => void, _delay: number) => {
    callback();
    return 1;
  }),
  clearTimeout: jest.fn(),
  setInterval: jest.fn(() => 1),
  clearInterval: jest.fn(),
  requestAnimationFrame: jest.fn((callback: FrameRequestCallback) => {
    callback(0);
    return 1;
  }),
  cancelAnimationFrame: jest.fn(),
};

// ============================================
// Animated Value Mock
// ============================================

interface MockAnimatedValue {
  setValue: jest.Mock;
  setOffset: jest.Mock;
  flattenOffset: jest.Mock;
  extractOffset: jest.Mock;
  addListener: jest.Mock;
  removeListener: jest.Mock;
  removeAllListeners: jest.Mock;
  stopAnimation: jest.Mock;
  resetAnimation: jest.Mock;
  interpolate: jest.Mock;
  _value: number;
  _offset: number;
  _animation: null;
  _tracking: null;
}

export const createMockAnimatedValue = (initialValue: number = 0): MockAnimatedValue => ({
  setValue: jest.fn(),
  setOffset: jest.fn(),
  flattenOffset: jest.fn(),
  extractOffset: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
  removeAllListeners: jest.fn(),
  stopAnimation: jest.fn(),
  resetAnimation: jest.fn(),
  interpolate: jest.fn(() => createMockAnimatedValue(0)),
  _value: initialValue,
  _offset: 0,
  _animation: null,
  _tracking: null,
});

// ============================================
// Gesture Handler Mocks
// ============================================

export const mockGestureHandler = {
  onGestureEvent: jest.fn(),
  onHandlerStateChange: jest.fn(),
  hitSlop: undefined,
  enabled: true,
  waitFor: undefined,
  simultaneousHandlers: undefined,
  shouldCancelWhenOutside: true,
};

// ============================================
// Sound/Audio Mocks
// ============================================

export const mockSound = {
  play: jest.fn(() => Promise.resolve()),
  pause: jest.fn(() => Promise.resolve()),
  stop: jest.fn(() => Promise.resolve()),
  unloadAsync: jest.fn(() => Promise.resolve()),
  setPositionAsync: jest.fn(() => Promise.resolve()),
  setVolumeAsync: jest.fn(() => Promise.resolve()),
  setRateAsync: jest.fn(() => Promise.resolve()),
  getStatusAsync: jest.fn(() => Promise.resolve({ isLoaded: true, isPlaying: false })),
};

export const mockAudio = {
  Sound: {
    createAsync: jest.fn(() => Promise.resolve({ sound: mockSound, status: { isLoaded: true } })),
  },
  setAudioModeAsync: jest.fn(() => Promise.resolve()),
};

// ============================================
// Haptic Feedback Mock
// ============================================

export const mockHaptics = {
  impactAsync: jest.fn(() => Promise.resolve()),
  notificationAsync: jest.fn(() => Promise.resolve()),
  selectionAsync: jest.fn(() => Promise.resolve()),
};

// ============================================
// Platform Mock
// ============================================

export const mockPlatform = (os: 'ios' | 'android' | 'web' = 'ios') => {
  jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: os,
    Version: os === 'ios' ? '14.0' : '30',
    select: jest.fn((obj: Record<string, any>) => obj[os]),
    isTV: false,
  }));
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
  addEventListener: jest.fn(() => ({ remove: jest.fn() })),
  removeEventListener: jest.fn(),
  set: jest.fn(),
};

// ============================================
// Keyboard Mock
// ============================================

export const mockKeyboard = {
  dismiss: jest.fn(),
  addListener: jest.fn(() => ({ remove: jest.fn() })),
  removeListener: jest.fn(),
  isVisible: jest.fn(() => false),
};

// ============================================
// Alert Mock
// ============================================

export const mockAlert = {
  alert: jest.fn(),
};

// ============================================
// Clipboard Mock
// ============================================

export const mockClipboard = {
  getString: jest.fn(() => Promise.resolve('')),
  setString: jest.fn(),
};

// ============================================
// Vibration Mock
// ============================================

export const mockVibration = {
  vibrate: jest.fn(),
  cancel: jest.fn(),
};

// ============================================
// Helper to reset all mocks
// ============================================

export const resetAllMocks = () => {
  // Navigation
  mockNavigation.navigate.mockClear();
  mockNavigation.goBack.mockClear();
  mockNavigation.reset.mockClear();
  mockNavigation.replace.mockClear();
  mockNavigation.push.mockClear();
  mockNavigation.pop.mockClear();
  mockNavigation.popToTop.mockClear();
  mockNavigation.setParams.mockClear();
  mockNavigation.dispatch.mockClear();
  
  // AsyncStorage
  mockAsyncStorage.getItem.mockClear();
  mockAsyncStorage.setItem.mockClear();
  mockAsyncStorage.removeItem.mockClear();
  mockAsyncStorage.clear.mockClear();
  
  // Sound
  mockSound.play.mockClear();
  mockSound.pause.mockClear();
  mockSound.stop.mockClear();
  
  // Haptics
  mockHaptics.impactAsync.mockClear();
  mockHaptics.notificationAsync.mockClear();
  mockHaptics.selectionAsync.mockClear();
};
