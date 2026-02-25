import React from 'react';
import { render } from '@testing-library/react-native';
import Racetrack from '../../../../components/Racetrack';

describe('Racetrack', () => {
  it('renders without crashing', () => {
    const mockOnNumberPress = jest.fn();
    render(<Racetrack onNumberPress={mockOnNumberPress} />);
  });

  it('renders all wheel numbers', () => {
    const mockOnNumberPress = jest.fn();
    const { getByText } = render(<Racetrack onNumberPress={mockOnNumberPress} />);
    
    // Check for a few key numbers
    expect(getByText('0')).toBeTruthy();
    expect(getByText('32')).toBeTruthy(); // First number in wheel order
  });

  it('renders the title', () => {
    const mockOnNumberPress = jest.fn();
    const { getByText } = render(<Racetrack onNumberPress={mockOnNumberPress} />);
    
    expect(getByText('Racetrack - Neighbor Bets')).toBeTruthy();
  });
});
