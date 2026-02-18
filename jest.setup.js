/**
 * Jest setup file for Casino Training App
 * Configures testing library matchers and global test utilities
 */

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Suppress console warnings in tests (optional - can be removed for debugging)
// Uncomment the following lines to suppress console output during tests:
// global.console = {
//   ...console,
//   warn: jest.fn(),
//   error: jest.fn(),
// };
