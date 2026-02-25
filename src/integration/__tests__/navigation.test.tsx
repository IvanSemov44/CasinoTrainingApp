/**
 * Integration tests for Navigation flow
 * Tests navigation callbacks and user interactions
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Define __DEV__ for tests
(global as any).__DEV__ = true;

// Mock the theme constants
jest.mock('../../features/roulette-training/constants/theme', () => ({
  COLORS: {
    background: { primary: '#0a2f1f', secondary: '#1a5f3f' },
    text: { primary: '#FFFFFF', secondary: '#CCCCCC', gold: '#FFD700' },
    status: { error: '#FF4444' },
  },
  SPACING: { sm: 8, md: 16, lg: 24, xs: 4 },
  TYPOGRAPHY: { fontSize: { sm: 12, md: 16, lg: 18 } },
  BORDERS: { radius: { sm: 4, md: 8 }, width: { thin: 1 } },
}));

// Simple test screen component
interface TestScreenProps {
  navigation: {
    navigate: jest.Mock;
    goBack: jest.Mock;
  };
}

const TestHomeScreen: React.FC<TestScreenProps> = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Casino Dealer Training</Text>
    <Text style={styles.subtitle}>Master your skills</Text>
    <TouchableOpacity 
      style={styles.button}
      onPress={() => navigation.navigate('Progress')}
      testID="progress-button"
    >
      <Text style={styles.buttonText}>My Progress</Text>
    </TouchableOpacity>
    <TouchableOpacity 
      style={styles.button}
      onPress={() => navigation.navigate('CashConversionMenu')}
      testID="cash-conversion-button"
    >
      <Text style={styles.buttonText}>Cash Conversion</Text>
    </TouchableOpacity>
  </View>
);

const TestProgressScreen: React.FC<TestScreenProps> = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>My Progress</Text>
    <TouchableOpacity 
      style={styles.button}
      onPress={() => navigation.goBack()}
      testID="back-button"
    >
      <Text style={styles.buttonText}>Go Back</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a2f1f',
    padding: 16,
  },
  title: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#CCCCCC',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#1a5f3f',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

describe('Navigation Integration', () => {
  describe('HomeScreen Navigation', () => {
    it('should render home screen with title', () => {
      const mockNavigation = {
        navigate: jest.fn(),
        goBack: jest.fn(),
      };
      
      const { getByText } = render(<TestHomeScreen navigation={mockNavigation} />);
      
      expect(getByText('Casino Dealer Training')).toBeTruthy();
    });

    it('should render navigation buttons', () => {
      const mockNavigation = {
        navigate: jest.fn(),
        goBack: jest.fn(),
      };
      
      const { getByText } = render(<TestHomeScreen navigation={mockNavigation} />);
      
      expect(getByText('My Progress')).toBeTruthy();
      expect(getByText('Cash Conversion')).toBeTruthy();
    });

    it('should call navigate with Progress when My Progress button is pressed', () => {
      const mockNavigation = {
        navigate: jest.fn(),
        goBack: jest.fn(),
      };
      
      const { getByText } = render(<TestHomeScreen navigation={mockNavigation} />);
      
      fireEvent.press(getByText('My Progress'));
      
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Progress');
    });

    it('should call navigate with CashConversionMenu when Cash Conversion button is pressed', () => {
      const mockNavigation = {
        navigate: jest.fn(),
        goBack: jest.fn(),
      };
      
      const { getByText } = render(<TestHomeScreen navigation={mockNavigation} />);
      
      fireEvent.press(getByText('Cash Conversion'));
      
      expect(mockNavigation.navigate).toHaveBeenCalledWith('CashConversionMenu');
    });
  });

  describe('ProgressScreen Navigation', () => {
    it('should render progress screen with title', () => {
      const mockNavigation = {
        navigate: jest.fn(),
        goBack: jest.fn(),
      };
      
      const { getByText } = render(<TestProgressScreen navigation={mockNavigation} />);
      
      expect(getByText('My Progress')).toBeTruthy();
    });

    it('should call goBack when back button is pressed', () => {
      const mockNavigation = {
        navigate: jest.fn(),
        goBack: jest.fn(),
      };
      
      const { getByText } = render(<TestProgressScreen navigation={mockNavigation} />);
      
      fireEvent.press(getByText('Go Back'));
      
      expect(mockNavigation.goBack).toHaveBeenCalled();
    });
  });

  describe('Navigation Flow', () => {
    it('should support navigating from home to progress and back', () => {
      const mockNavigation = {
        navigate: jest.fn(),
        goBack: jest.fn(),
      };
      
      // Start at home
      const { getByText: getByTextHome } = render(<TestHomeScreen navigation={mockNavigation} />);
      
      // Navigate to progress
      fireEvent.press(getByTextHome('My Progress'));
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Progress');
      
      // Simulate being on progress screen (separate render)
      const { getByText: getByTextProgress } = render(<TestProgressScreen navigation={mockNavigation} />);
      
      // Go back
      fireEvent.press(getByTextProgress('Go Back'));
      expect(mockNavigation.goBack).toHaveBeenCalled();
    });

    it('should support multiple navigation calls', () => {
      const mockNavigation = {
        navigate: jest.fn(),
        goBack: jest.fn(),
      };
      
      const { getByText } = render(<TestHomeScreen navigation={mockNavigation} />);
      
      // Navigate multiple times
      fireEvent.press(getByText('My Progress'));
      fireEvent.press(getByText('Cash Conversion'));
      
      expect(mockNavigation.navigate).toHaveBeenCalledTimes(2);
      expect(mockNavigation.navigate).toHaveBeenNthCalledWith(1, 'Progress');
      expect(mockNavigation.navigate).toHaveBeenNthCalledWith(2, 'CashConversionMenu');
    });
  });
});
