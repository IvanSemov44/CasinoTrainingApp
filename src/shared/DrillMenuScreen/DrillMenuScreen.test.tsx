import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react-native';
import { render } from '@test-utils/render';
import DrillMenuScreen from './DrillMenuScreen';
import type { DrillMenuItem } from './DrillMenuScreen.types';

describe('DrillMenuScreen', () => {
  const mockOnPress = jest.fn();

  const mockDrills: DrillMenuItem[] = [
    {
      drillType: 'basic-strategy',
      label: 'Basic Strategy',
      description: 'Learn optimal playing decisions',
      difficulty: 'easy',
    },
    {
      drillType: 'card-counting',
      label: 'Card Counting',
      description: 'Practice keeping count',
      difficulty: 'advanced',
    },
    {
      drillType: 'insurance',
      label: 'Insurance Decisions',
      description: 'When to take insurance',
      difficulty: 'medium',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with title and drills', async () => {
    render(
      <DrillMenuScreen title="Blackjack Training" drills={mockDrills} onPress={mockOnPress} />
    );

    await waitFor(() => {
      const title = screen.getByText('Blackjack Training');
      expect(title).toBeTruthy();
    });
  });

  it('displays all drill items', async () => {
    render(<DrillMenuScreen title="Training Menu" drills={mockDrills} onPress={mockOnPress} />);

    await waitFor(() => {
      expect(screen.getByText('Basic Strategy')).toBeTruthy();
      expect(screen.getByText('Card Counting')).toBeTruthy();
      expect(screen.getByText('Insurance Decisions')).toBeTruthy();
    });
  });

  it('displays drill descriptions', async () => {
    render(<DrillMenuScreen title="Training Menu" drills={mockDrills} onPress={mockOnPress} />);

    await waitFor(() => {
      expect(screen.getByText('Learn optimal playing decisions')).toBeTruthy();
      expect(screen.getByText('Practice keeping count')).toBeTruthy();
      expect(screen.getByText('When to take insurance')).toBeTruthy();
    });
  });

  it('displays difficulty badges', async () => {
    render(<DrillMenuScreen title="Training Menu" drills={mockDrills} onPress={mockOnPress} />);

    await waitFor(() => {
      expect(screen.getByText('EASY')).toBeTruthy();
      expect(screen.getByText('MEDIUM')).toBeTruthy();
      expect(screen.getByText('ADVANCED')).toBeTruthy();
    });
  });

  it('calls onPress with correct drillType when drill is tapped', async () => {
    render(<DrillMenuScreen title="Training Menu" drills={mockDrills} onPress={mockOnPress} />);

    await waitFor(() => {
      expect(screen.getByText('Basic Strategy')).toBeTruthy();
    });

    fireEvent.press(screen.getByText('Basic Strategy'));

    await waitFor(() => {
      expect(mockOnPress).toHaveBeenCalledWith('basic-strategy');
    });
  });

  it('handles multiple drill presses', async () => {
    render(<DrillMenuScreen title="Training Menu" drills={mockDrills} onPress={mockOnPress} />);

    await waitFor(() => {
      expect(screen.getByText('Basic Strategy')).toBeTruthy();
    });

    fireEvent.press(screen.getByText('Basic Strategy'));
    fireEvent.press(screen.getByText('Card Counting'));

    await waitFor(() => {
      expect(mockOnPress).toHaveBeenCalledTimes(2);
      expect(mockOnPress).toHaveBeenNthCalledWith(1, 'basic-strategy');
      expect(mockOnPress).toHaveBeenNthCalledWith(2, 'card-counting');
    });
  });

  it('renders with empty drills array', async () => {
    render(<DrillMenuScreen title="Empty Menu" drills={[]} onPress={mockOnPress} />);

    await waitFor(() => {
      expect(screen.getByText('Empty Menu')).toBeTruthy();
      expect(screen.getByText('Select a drill type')).toBeTruthy();
    });
  });

  it('renders subtitle', async () => {
    render(<DrillMenuScreen title="Test Menu" drills={mockDrills} onPress={mockOnPress} />);

    await waitFor(() => {
      expect(screen.getByText('Select a drill type')).toBeTruthy();
    });
  });
});
