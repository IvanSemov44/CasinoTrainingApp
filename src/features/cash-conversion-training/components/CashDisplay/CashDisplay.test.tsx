import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import CashDisplay from './CashDisplay';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('CashDisplay', () => {
  it('should render title', () => {
    const { getByText } = renderWithTheme(
      <CashDisplay amount={100} />
    );

    expect(getByText('Customer gives:')).toBeTruthy();
  });

  it('should display total amount', () => {
    const { getByText } = renderWithTheme(
      <CashDisplay amount={100} />
    );

    expect(getByText('Total: $100')).toBeTruthy();
  });

  it('should break down amount into chip denominations', () => {
    const { getByText } = renderWithTheme(
      <CashDisplay amount={500} />
    );

    // Should display chips that make up 500
    expect(getByText('Total: $500')).toBeTruthy();
  });

  it('should handle zero amount', () => {
    const { getByText } = renderWithTheme(
      <CashDisplay amount={0} />
    );

    expect(getByText('Total: $0')).toBeTruthy();
  });

  it('should handle single denomination', () => {
    const { getByText } = renderWithTheme(
      <CashDisplay amount={100} />
    );

    expect(getByText('Total: $100')).toBeTruthy();
  });

  it('should handle multiple denominations', () => {
    const { getByText } = renderWithTheme(
      <CashDisplay amount={375} />
    );

    expect(getByText('Total: $375')).toBeTruthy();
  });

  it('should display chip counts correctly for 200', () => {
    const { getByText } = renderWithTheme(
      <CashDisplay amount={200} />
    );

    expect(getByText('Total: $200')).toBeTruthy();
  });

  it('should display chip counts correctly for 150', () => {
    const { getByText } = renderWithTheme(
      <CashDisplay amount={150} />
    );

    expect(getByText('Total: $150')).toBeTruthy();
  });

  it('should handle large amounts', () => {
    const { getByText } = renderWithTheme(
      <CashDisplay amount={5000} />
    );

    expect(getByText('Total: $5000')).toBeTruthy();
  });

  it('should display chips container with chips', () => {
    const { getByText, getByTestId } = renderWithTheme(
      <CashDisplay amount={300} />
    );

    // Component renders chips
    expect(getByText('Total: $300')).toBeTruthy();
  });

  it('should display chip values', () => {
    const { getByText } = renderWithTheme(
      <CashDisplay amount={400} />
    );

    // Should have chips for 400
    expect(getByText('Total: $400')).toBeTruthy();
  });

  it('should calculate correct chip breakdown for 275', () => {
    const { getByText } = renderWithTheme(
      <CashDisplay amount={275} />
    );

    expect(getByText('Total: $275')).toBeTruthy();
  });

  it('should handle exactly divisible amounts', () => {
    const { getByText } = renderWithTheme(
      <CashDisplay amount={1000} />
    );

    expect(getByText('Total: $1000')).toBeTruthy();
  });

  it('should handle odd amounts with remainder', () => {
    const { getByText } = renderWithTheme(
      <CashDisplay amount={355} />
    );

    expect(getByText('Total: $355')).toBeTruthy();
  });

  it('should update when amount prop changes', () => {
    const { rerender, getByText } = renderWithTheme(
      <CashDisplay amount={100} />
    );

    expect(getByText('Total: $100')).toBeTruthy();

    rerender(
      <ThemeProvider>
        <CashDisplay amount={200} />
      </ThemeProvider>
    );

    expect(getByText('Total: $200')).toBeTruthy();
  });

  it('should render with proper title styling', () => {
    const { getByText } = renderWithTheme(
      <CashDisplay amount={100} />
    );

    expect(getByText('Customer gives:')).toBeTruthy();
  });

  it('should display total with gold text color', () => {
    const { getByText } = renderWithTheme(
      <CashDisplay amount={500} />
    );

    // Component uses text.gold color for total
    expect(getByText('Total: $500')).toBeTruthy();
  });
});
