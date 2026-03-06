import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import CashConversionTrainingModal from './CashConversionTrainingModal';

jest.mock('@components/shared', () => {
  const React = require('react');
  const { View, Text, TouchableOpacity } = require('react-native');

  return {
    BaseTrainingModal: ({ visible, onClose, onStart, title }: { visible: boolean; onClose: () => void; onStart: () => void; title: string }) => {
      if (!visible) return null;
      return (
        <View>
          <Text>{title}</Text>
          <TouchableOpacity onPress={onStart} accessibilityLabel="start training">
            <Text>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} accessibilityLabel="close modal">
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      );
    },
  };
});

describe('CashConversionTrainingModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders when visible', () => {
    const { getByText } = render(
      <ThemeProvider>
        <CashConversionTrainingModal visible={true} onClose={mockOnClose} />
      </ThemeProvider>
    );

    expect(getByText('Cash Conversion Setup')).toBeTruthy();
  });

  it('does not render when not visible', () => {
    const { queryByText } = render(
      <ThemeProvider>
        <CashConversionTrainingModal visible={false} onClose={mockOnClose} />
      </ThemeProvider>
    );

    expect(queryByText('Cash Conversion Training')).toBeNull();
  });

  it('calls onClose when close is pressed', () => {
    const { getByLabelText } = render(
      <ThemeProvider>
        <CashConversionTrainingModal visible={true} onClose={mockOnClose} />
      </ThemeProvider>
    );

    fireEvent.press(getByLabelText('close modal'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
}
);
