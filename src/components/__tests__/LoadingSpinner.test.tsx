/**
 * Unit tests for LoadingSpinner component
 * Tests rendering, accessibility, and props
 */
import React from 'react';
import { render } from '@testing-library/react-native';
import { ActivityIndicator } from 'react-native';
import LoadingSpinner from '../LoadingSpinner';

// Mock the theme constants
jest.mock('../../features/roulette-training/constants/theme', () => ({
  COLORS: {
    background: { primary: '#0a2f1f' },
    text: { gold: '#FFD700', secondary: '#CCCCCC' },
  },
}));

describe('LoadingSpinner', () => {
  describe('rendering', () => {
    it('should render the ActivityIndicator', () => {
      const { UNSAFE_getByType } = render(<LoadingSpinner />);
      
      // ActivityIndicator should be present
      const activityIndicator = UNSAFE_getByType(ActivityIndicator);
      expect(activityIndicator).toBeTruthy();
    });

    it('should render with default props', () => {
      const { UNSAFE_getByType } = render(<LoadingSpinner />);
      
      const activityIndicator = UNSAFE_getByType(ActivityIndicator);
      expect(activityIndicator.props.size).toBe('large');
    });

    it('should render with small size when specified', () => {
      const { UNSAFE_getByType } = render(<LoadingSpinner size="small" />);
      
      const activityIndicator = UNSAFE_getByType(ActivityIndicator);
      expect(activityIndicator.props.size).toBe('small');
    });

    it('should render with large size when specified', () => {
      const { UNSAFE_getByType } = render(<LoadingSpinner size="large" />);
      
      const activityIndicator = UNSAFE_getByType(ActivityIndicator);
      expect(activityIndicator.props.size).toBe('large');
    });

    it('should render with custom color when specified', () => {
      const customColor = '#FF0000';
      const { UNSAFE_getByType } = render(<LoadingSpinner color={customColor} />);
      
      const activityIndicator = UNSAFE_getByType(ActivityIndicator);
      expect(activityIndicator.props.color).toBe(customColor);
    });
  });

  describe('message prop', () => {
    it('should not render message when not provided', () => {
      const { queryByText } = render(<LoadingSpinner />);
      
      expect(queryByText('Loading...')).toBeNull();
    });

    it('should render message when provided', () => {
      const message = 'Loading your training...';
      const { getByText } = render(<LoadingSpinner message={message} />);
      
      expect(getByText(message)).toBeTruthy();
    });

    it('should render different messages correctly', () => {
      const messages = [
        'Loading...',
        'Please wait',
        'Fetching data',
        'Processing your request',
      ];
      
      messages.forEach(message => {
        const { getByText } = render(<LoadingSpinner message={message} />);
        expect(getByText(message)).toBeTruthy();
      });
    });

    it('should render empty string message gracefully', () => {
      const { queryByText } = render(<LoadingSpinner message="" />);
      
      // Empty string should not render any text
      expect(queryByText('')).toBeNull();
    });
  });

  describe('accessibility', () => {
    it('should have accessible ActivityIndicator', () => {
      const { UNSAFE_getByType } = render(<LoadingSpinner />);
      
      // ActivityIndicator should be present
      const activityIndicator = UNSAFE_getByType(ActivityIndicator);
      expect(activityIndicator).toBeTruthy();
    });

    it('should be accessible with message', () => {
      const message = 'Loading training data...';
      const { getByText } = render(<LoadingSpinner message={message} />);
      
      expect(getByText(message)).toBeTruthy();
    });
  });

  describe('combinations', () => {
    it('should render with all props combined', () => {
      const props = {
        size: 'small' as const,
        color: '#00FF00',
        message: 'Custom loading message',
      };
      
      const { UNSAFE_getByType, getByText } = render(<LoadingSpinner {...props} />);
      
      const activityIndicator = UNSAFE_getByType(ActivityIndicator);
      expect(activityIndicator.props.size).toBe('small');
      expect(activityIndicator.props.color).toBe('#00FF00');
      expect(getByText('Custom loading message')).toBeTruthy();
    });

    it('should render with large size and message', () => {
      const { UNSAFE_getByType, getByText } = render(
        <LoadingSpinner size="large" message="Loading..." />
      );
      
      const activityIndicator = UNSAFE_getByType(ActivityIndicator);
      expect(activityIndicator.props.size).toBe('large');
      expect(getByText('Loading...')).toBeTruthy();
    });
  });

  describe('edge cases', () => {
    it('should handle undefined props gracefully', () => {
      const { UNSAFE_getByType } = render(
        <LoadingSpinner size={undefined} color={undefined} message={undefined} />
      );
      
      const activityIndicator = UNSAFE_getByType(ActivityIndicator);
      expect(activityIndicator).toBeTruthy();
    });

    it('should handle null message gracefully', () => {
      const { queryByText } = render(<LoadingSpinner message={null as any} />);
      
      // Should not crash and should not render any message
      expect(queryByText(/.+/)).toBeNull();
    });
  });
});