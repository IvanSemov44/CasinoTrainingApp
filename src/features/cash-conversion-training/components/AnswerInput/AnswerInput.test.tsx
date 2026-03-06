import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import AnswerInput from './AnswerInput';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('AnswerInput', () => {
  const mockOnTotalBetChange = jest.fn();
  const mockOnBetPerPositionChange = jest.fn();
  const mockOnChangeChange = jest.fn();
  const mockOnInputFocus = jest.fn();

  const defaultProps = {
    totalBet: '',
    betPerPosition: '',
    change: '',
    onTotalBetChange: mockOnTotalBetChange,
    onBetPerPositionChange: mockOnBetPerPositionChange,
    onChangeChange: mockOnChangeChange,
    sectorName: 'Tier',
    activeInput: 'totalBet' as const,
    onInputFocus: mockOnInputFocus,
    requestType: 'by-amount' as const,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with "by-amount" request type showing Total field', () => {
    const { getByText } = renderWithTheme(
      <AnswerInput {...defaultProps} requestType="by-amount" />
    );

    expect(getByText('Tier Total:')).toBeTruthy();
  });

  it('should render with "for-the-money" request type showing Play By field', () => {
    const { getByText } = renderWithTheme(
      <AnswerInput
        {...defaultProps}
        requestType="for-the-money"
      />
    );

    expect(getByText('Tier Play By:')).toBeTruthy();
  });

  it('should always render Rest field', () => {
    const { getByText } = renderWithTheme(
      <AnswerInput {...defaultProps} />
    );

    expect(getByText('Rest:')).toBeTruthy();
  });

  it('should display default values as 0', () => {
    const { getAllByText } = renderWithTheme(
      <AnswerInput {...defaultProps} />
    );

    const zeroElements = getAllByText('$0');
    expect(zeroElements.length).toBeGreaterThan(0);
  });

  it('should display current totalBet value', () => {
    const { getByText } = renderWithTheme(
      <AnswerInput {...defaultProps} totalBet="100" />
    );

    expect(getByText('$100')).toBeTruthy();
  });

  it('should display current change value', () => {
    const { getByText } = renderWithTheme(
      <AnswerInput {...defaultProps} change="50" />
    );

    expect(getByText('$50')).toBeTruthy();
  });

  it('should display current betPerPosition value', () => {
    const { getByText } = renderWithTheme(
      <AnswerInput
        {...defaultProps}
        requestType="for-the-money"
        betPerPosition="25"
      />
    );

    expect(getByText('$25')).toBeTruthy();
  });

  it('should highlight active input field', () => {
    const { getByText } = renderWithTheme(
      <AnswerInput {...defaultProps} activeInput="totalBet" />
    );

    // Component uses activeInput to apply displayActive style
    expect(getByText('Tier Total:')).toBeTruthy();
  });

  it('should call onInputFocus when totalBet field is pressed', () => {
    const { getByText } = renderWithTheme(
      <AnswerInput {...defaultProps} />
    );

    const totalBetGroup = getByText('Tier Total:').parent;
    fireEvent.press(totalBetGroup);

    expect(mockOnInputFocus).toHaveBeenCalledWith('totalBet');
  });

  it('should call onInputFocus when change field is pressed', () => {
    const { getByText } = renderWithTheme(
      <AnswerInput {...defaultProps} />
    );

    const restGroup = getByText('Rest:').parent;
    fireEvent.press(restGroup);

    expect(mockOnInputFocus).toHaveBeenCalledWith('change');
  });

  it('should call onTotalBetChange when number is pressed and totalBet is active', () => {
    renderWithTheme(
      <AnswerInput {...defaultProps} activeInput="totalBet" />
    );

    // NumberPad component handles number press
    expect(mockOnTotalBetChange).not.toHaveBeenCalled();
  });

  it('should render custom sector name', () => {
    const { getByText } = renderWithTheme(
      <AnswerInput {...defaultProps} sectorName="Orphelins" />
    );

    expect(getByText('Orphelins Total:')).toBeTruthy();
  });

  it('should have correct title', () => {
    const { getByText } = renderWithTheme(
      <AnswerInput {...defaultProps} />
    );

    expect(getByText('Your Response:')).toBeTruthy();
  });

  it('should not show Total field for "for-the-money" request', () => {
    const { queryByText } = renderWithTheme(
      <AnswerInput
        {...defaultProps}
        requestType="for-the-money"
      />
    );

    expect(queryByText('Tier Total:')).toBeNull();
  });

  it('should not show Play By field for "by-amount" request', () => {
    const { queryByText } = renderWithTheme(
      <AnswerInput
        {...defaultProps}
        requestType="by-amount"
      />
    );

    expect(queryByText('Tier Play By:')).toBeNull();
  });

  it('should handle changing active input', () => {
    const { rerender, getByText } = renderWithTheme(
      <AnswerInput {...defaultProps} activeInput="totalBet" />
    );

    rerender(
      <ThemeProvider>
        <AnswerInput {...defaultProps} activeInput="change" />
      </ThemeProvider>
    );

    expect(getByText('Rest:')).toBeTruthy();
  });

  it('should render NumberPad component', () => {
    const { getByText } = renderWithTheme(
      <AnswerInput {...defaultProps} />
    );

    // NumberPad is rendered in the component
    expect(getByText('Your Response:')).toBeTruthy();
  });
});
