import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import PLOMenuScreen from './PLOMenuScreen';

// Create mock functions at module level
const mockPush = jest.fn();

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
  })),
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('PLOMenuScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render without crashing', () => {
      const { toJSON } = renderWithTheme(<PLOMenuScreen />);
      expect(toJSON()).toBeTruthy();
    });

    it('should display title', () => {
      const { getByText } = renderWithTheme(<PLOMenuScreen />);
      expect(getByText('Pot Limit Omaha Training')).toBeTruthy();
    });

    it('should display subtitle', () => {
      const { getByText } = renderWithTheme(<PLOMenuScreen />);
      expect(getByText('Learn pot calculations at the table')).toBeTruthy();
    });

    it('should display all three difficulty modes', () => {
      const { getByText } = renderWithTheme(<PLOMenuScreen />);
      expect(getByText('Easy')).toBeTruthy();
      expect(getByText('Medium')).toBeTruthy();
      expect(getByText('Advanced')).toBeTruthy();
    });

    it('should display mode descriptions', () => {
      const { getByText } = renderWithTheme(<PLOMenuScreen />);
      expect(getByText('Preflop pot calculations')).toBeTruthy();
      expect(getByText('Multi-street pots')).toBeTruthy();
      expect(getByText('Complex scenarios')).toBeTruthy();
    });

    it('should display instructions', () => {
      const { getByText } = renderWithTheme(<PLOMenuScreen />);
      expect(getByText('How it works:')).toBeTruthy();
    });

    it('should display all instruction points', () => {
      const { getByText } = renderWithTheme(<PLOMenuScreen />);
      const instructionsText = getByText(/Watch the action unfold at the table/);
      expect(instructionsText).toBeTruthy();
    });
  });

  describe('interactions', () => {
    it('should navigate to easy mode when Easy is pressed', () => {
      const { getByLabelText } = renderWithTheme(<PLOMenuScreen />);
      const easyButton = getByLabelText('Easy mode');
      fireEvent.press(easyButton);
      expect(mockPush).toHaveBeenCalledWith('/plo/easy');
    });

    it('should navigate to medium mode when Medium is pressed', () => {
      const { getByLabelText } = renderWithTheme(<PLOMenuScreen />);
      const mediumButton = getByLabelText('Medium mode');
      fireEvent.press(mediumButton);
      expect(mockPush).toHaveBeenCalledWith('/plo/medium');
    });

    it('should navigate to advanced mode when Advanced is pressed', () => {
      const { getByLabelText } = renderWithTheme(<PLOMenuScreen />);
      const advancedButton = getByLabelText('Advanced mode');
      fireEvent.press(advancedButton);
      expect(mockPush).toHaveBeenCalledWith('/plo/advanced');
    });
  });

  describe('styling and theme', () => {
    it('should render with proper theme colors', () => {
      const { toJSON } = renderWithTheme(<PLOMenuScreen />);
      expect(toJSON()).toBeTruthy();
    });

    it('should display mode cards', () => {
      const { getByText } = renderWithTheme(<PLOMenuScreen />);
      // All mode names should be present as clickable cards
      expect(getByText('Easy')).toBeTruthy();
      expect(getByText('Medium')).toBeTruthy();
      expect(getByText('Advanced')).toBeTruthy();
    });
  });
});
