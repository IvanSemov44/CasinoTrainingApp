module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setupAfterEnv.js'],
  setupFiles: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|expo|@expo|react-navigation|@react-navigation|@unimodules|unimodules|native-base|react-native-svg)/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  verbose: true,
  testEnvironment: 'node',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@react-native/(.*)$': '<rootDir>/node_modules/@react-native/$1',
    '^@styles$': '<rootDir>/src/styles/index.ts',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@contexts/(.*)$': '<rootDir>/src/contexts/$1',
    '^@app-types$': '<rootDir>/src/types',
    // More specific paths must come BEFORE less specific ones
    '^@components/shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@components/shared$': '<rootDir>/src/shared',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@shared$': '<rootDir>/src/shared',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@screens/(.*)$': '<rootDir>/src/screens/$1',
    '^@navigation/(.*)$': '<rootDir>/src/navigation/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@test-utils/(.*)$': '<rootDir>/src/test-utils/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/helpers/',
    '/__tests__/fixtures/',
  ],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 65,
      statements: 65,
    },
  },
};
