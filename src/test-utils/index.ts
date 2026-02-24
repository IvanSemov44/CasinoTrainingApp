/**
 * Test Utilities Index
 * Export all testing utilities from a single entry point
 */

// Custom render with providers
export { render } from './render';

// Test fixtures
export {
  // Cash Conversion
  mockCashRequests,
  mockCashAnswers,
  // PLO
  mockPlayerActions,
  mockPotRequests,
  // Roulette
  mockRouletteNumbers,
  mockChipValues,
  mockPayouts,
  // Racetrack
  mockSectors,
  mockNeighborBets,
  // Navigation
  mockNavigationState,
  // Difficulty
  mockDifficultySettings,
  // Exercise State
  mockExerciseState,
} from './fixtures';

// Mocks
export {
  // Navigation
  mockNavigation,
  mockRoute,
  setupNavigationMocks,
  // AsyncStorage
  mockAsyncStorage,
  setupAsyncStorageMock,
  // Reanimated
  setupReanimatedMock,
  // Gesture Handler
  setupGestureHandlerMock,
  // Alert
  mockAlert,
  setupAlertMock,
  // Dimensions
  mockDimensions,
  setupDimensionsMock,
  // Keyboard
  mockKeyboard,
  setupKeyboardMock,
  // Platform
  mockPlatform,
  setupPlatformMock,
  // Timers
  setupFakeTimers,
  cleanupFakeTimers,
  // Sound
  mockSound,
  // Haptic
  mockHapticFeedback,
  // Redux
  createMockStore,
  // Utilities
  flushPromises,
  createMockFn,
  createMockAsyncFn,
  resetAllMocks,
  // Accessibility
  isAccessible,
  getAccessibilityLabel,
  getAccessibilityRole,
  // Events
  createMockEvent,
  createMockGestureEvent,
} from './mocks';
