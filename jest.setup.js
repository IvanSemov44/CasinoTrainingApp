global.__DEV__ = true;

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock Reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock React Navigation
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ navigate: jest.fn() }),
}));

jest.mock('@react-navigation/stack', () => {
  const React = require('react');
  return {
    createStackNavigator: () => ({
      Navigator: ({ children }) => children,
      Screen: ({ children }) => children,
    }),
  };
});

jest.mock('react-native-svg', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  const MockSvg = ({ children }) => React.createElement(View, null, children);

  return {
    __esModule: true,
    default: MockSvg,
    Svg: MockSvg,
    Path: MockSvg,
    G: MockSvg,
    Circle: MockSvg,
    Rect: MockSvg,
    Line: MockSvg,
    Polygon: MockSvg,
    Defs: MockSvg,
    Stop: MockSvg,
    LinearGradient: MockSvg,
    Text: ({ children, ...props }) => React.createElement(Text, props, children),
    SvgXml: MockSvg,
  };
});

jest.mock('expo-screen-orientation', () => ({
  lockAsync: jest.fn().mockResolvedValue(undefined),
  unlockAsync: jest.fn().mockResolvedValue(undefined),
  lockPlatformAsync: jest.fn().mockResolvedValue(undefined),
  OrientationLock: {
    PORTRAIT_UP: 'PORTRAIT_UP',
    LANDSCAPE: 'LANDSCAPE',
  },
}));

jest.mock('expo-haptics', () => ({
  notificationAsync: jest.fn().mockResolvedValue(undefined),
  impactAsync: jest.fn().mockResolvedValue(undefined),
  selectionAsync: jest.fn().mockResolvedValue(undefined),
  NotificationFeedbackType: {
    Success: 'success',
    Warning: 'warning',
    Error: 'error',
  },
  ImpactFeedbackStyle: {
    Light: 'light',
    Medium: 'medium',
    Heavy: 'heavy',
  },
}));

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  const React = require('react');
  return {
    Swipeable: React.forwardRef((props, ref) => null),
    DrawerLayout: React.forwardRef((props, ref) => null),
    State: {},
    ScrollView: React.forwardRef((props, ref) => null),
    Slider: React.forwardRef((props, ref) => null),
    Switch: React.forwardRef((props, ref) => null),
    TextInput: React.forwardRef((props, ref) => null),
    ToolbarAndroid: React.forwardRef((props, ref) => null),
    ViewPagerAndroid: React.forwardRef((props, ref) => null),
    DrawerLayoutAndroid: React.forwardRef((props, ref) => null),
    WebView: React.forwardRef((props, ref) => null),
    NativeViewGestureHandler: React.forwardRef((props, ref) => null),
    TapGestureHandler: React.forwardRef((props, ref) => null),
    FlingGestureHandler: React.forwardRef((props, ref) => null),
    ForceTouchGestureHandler: React.forwardRef((props, ref) => null),
    LongPressGestureHandler: React.forwardRef((props, ref) => null),
    PanGestureHandler: React.forwardRef((props, ref) => null),
    PinchGestureHandler: React.forwardRef((props, ref) => null),
    RotationGestureHandler: React.forwardRef((props, ref) => null),
    RawButton: React.forwardRef((props, ref) => null),
    BaseButton: React.forwardRef((props, ref) => null),
    RectButton: React.forwardRef((props, ref) => null),
    BorderlessButton: React.forwardRef((props, ref) => null),
    FlatList: React.forwardRef((props, ref) => null),
    gestureHandlerRootHOC: jest.fn((component) => component),
    Directions: {},
  };
});

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  SafeAreaView: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

// Mock react-native-screens
jest.mock('react-native-screens', () => ({
  enableScreens: jest.fn(),
}));
