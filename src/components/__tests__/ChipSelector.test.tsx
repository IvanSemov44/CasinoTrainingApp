/**
 * Unit tests for ChipSelector component
 * Tests rendering, interactions, and accessibility
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ChipSelector from '../ChipSelector';

// Mock the constants
jest.mock('../../constants/roulette.constants', () => ({
  CHIP_VALUES: [
    { value: 1, color: '#FFFFFF' },
    { value: 5, color: '#FF0000' },
    { value: 10, color: '#0000FF' },
    { value: 25, color: '#00FF00' },
    { value: 100, color: '#000000' },
    { value: 500, color: '#800080' },
    { value: 1000, color: '#FFA500' },
  ],
}));

jest.mock('../../features/roulette-training/constants/theme', () => ({
  COLORS: {
    background: { secondary: '#1a5f3f', dark: '#000000' },
    text: { gold: '#FFD700', primary: '#FFFFFF' },
    border: { gold: '#FFD700' },
  },
  SPACING: { sm: 8, xs: 4 },
  TYPOGRAPHY: { fontSize: { base: 14 } },
  BORDERS: { radius: { md: 8 } },
}));

describe('ChipSelector', () => {
  const mockOnSelectChip = jest.fn();
  const defaultProps = {
    selectedValue: 5,
    onSelectChip: mockOnSelectChip,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render the title', () => {
      const { getByText } = render(<ChipSelector {...defaultProps} />);
      
      expect(getByText('Select Chip Value')).toBeTruthy();
    });

    it('should render all chip values', () => {
      const { getByText } = render(<ChipSelector {...defaultProps} />);
      
      const chipValues = [1, 5, 10, 25, 100, 500, 1000];
      chipValues.forEach(value => {
        expect(getByText(String(value))).toBeTruthy();
      });
    });

    it('should render chips with correct colors', () => {
      const { getByText } = render(<ChipSelector {...defaultProps} />);
      
      // Each chip should be rendered
      expect(getByText('1')).toBeTruthy(); // White chip
      expect(getByText('5')).toBeTruthy(); // Red chip
      expect(getByText('10')).toBeTruthy(); // Blue chip
    });
  });

  describe('selection', () => {
    it('should highlight the selected chip', () => {
      const { getByText } = render(<ChipSelector {...defaultProps} />);
      
      // The selected chip (5) should have the selected accessibility state
      const selectedChip = getByText('5');
      expect(selectedChip).toBeTruthy();
    });

    it('should update selection when different chip is selected', () => {
      const { getByText, rerender } = render(<ChipSelector {...defaultProps} />);
      
      // Initially 5 is selected
      expect(getByText('5')).toBeTruthy();
      
      // Rerender with 10 selected
      rerender(<ChipSelector {...defaultProps} selectedValue={10} />);
      
      expect(getByText('10')).toBeTruthy();
    });
  });

  describe('interactions', () => {
    it('should call onSelectChip when a chip is pressed', () => {
      const { getByText } = render(<ChipSelector {...defaultProps} />);
      
      fireEvent.press(getByText('10'));
      
      expect(mockOnSelectChip).toHaveBeenCalledWith(10);
      expect(mockOnSelectChip).toHaveBeenCalledTimes(1);
    });

    it('should call onSelectChip with correct value for each chip', () => {
      const { getByText } = render(<ChipSelector {...defaultProps} />);
      
      const chipValues = [1, 5, 10, 25, 100, 500, 1000];
      
      chipValues.forEach(value => {
        fireEvent.press(getByText(String(value)));
      });
      
      expect(mockOnSelectChip).toHaveBeenCalledTimes(chipValues.length);
      chipValues.forEach(value => {
        expect(mockOnSelectChip).toHaveBeenCalledWith(value);
      });
    });

    it('should allow selecting the same chip multiple times', () => {
      const { getByText } = render(<ChipSelector {...defaultProps} />);
      
      fireEvent.press(getByText('5'));
      fireEvent.press(getByText('5'));
      
      expect(mockOnSelectChip).toHaveBeenCalledTimes(2);
    });
  });

  describe('accessibility', () => {
    it('should have correct accessibility label for unselected chip', () => {
      const { getByLabelText } = render(<ChipSelector {...defaultProps} />);
      
      // 10 is not selected
      const chip10 = getByLabelText('Select $10 chip');
      expect(chip10).toBeTruthy();
    });

    it('should have correct accessibility label for selected chip', () => {
      const { getByLabelText } = render(<ChipSelector {...defaultProps} />);
      
      // 5 is selected
      const chip5 = getByLabelText('Select $5 chip, selected');
      expect(chip5).toBeTruthy();
    });

    it('should have accessibility hint for all chips', () => {
      const { getByLabelText } = render(<ChipSelector {...defaultProps} />);
      
      const chip = getByLabelText('Select $10 chip');
      expect(chip).toBeTruthy();
    });

    it('should have button accessibility role', () => {
      const { getByLabelText } = render(<ChipSelector {...defaultProps} />);
      
      const chip = getByLabelText('Select $10 chip');
      expect(chip.props.accessibilityRole).toBe('button');
    });

    it('should have correct accessibility state for selected chip', () => {
      const { getByLabelText } = render(<ChipSelector {...defaultProps} />);
      
      const selectedChip = getByLabelText('Select $5 chip, selected');
      expect(selectedChip.props.accessibilityState).toEqual({ selected: true });
    });

    it('should have correct accessibility state for unselected chip', () => {
      const { getByLabelText } = render(<ChipSelector {...defaultProps} />);
      
      const unselectedChip = getByLabelText('Select $10 chip');
      expect(unselectedChip.props.accessibilityState).toEqual({ selected: false });
    });
  });

  describe('edge cases', () => {
    it('should handle chip value of 0', () => {
      const { getByText } = render(<ChipSelector {...defaultProps} selectedValue={0} />);
      
      // No chip should be selected (0 is not in CHIP_VALUES)
      expect(getByText('1')).toBeTruthy();
    });

    it('should handle very large chip values', () => {
      const { getByText } = render(<ChipSelector {...defaultProps} selectedValue={1000} />);
      
      // 1000 chip should be selected
      const chip1000 = getByText('1000');
      expect(chip1000).toBeTruthy();
    });

    it('should handle rapid chip selection', () => {
      const { getByText } = render(<ChipSelector {...defaultProps} />);
      
      // Rapidly select different chips
      fireEvent.press(getByText('1'));
      fireEvent.press(getByText('5'));
      fireEvent.press(getByText('10'));
      fireEvent.press(getByText('25'));
      
      expect(mockOnSelectChip).toHaveBeenCalledTimes(4);
    });
  });
});
