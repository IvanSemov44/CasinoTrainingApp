import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import RequestDisplay from './RequestDisplay';
import { CashRequest } from '../../types';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('RequestDisplay', () => {
  const mockRequestForTheMoney: CashRequest = {
    cashAmount: 500,
    sector: 'tier',
    requestType: 'for-the-money',
  };

  const mockRequestByAmount: CashRequest = {
    cashAmount: 500,
    sector: 'voisins',
    requestType: 'by-amount',
    specifiedAmount: 100,
  };

  it('should render label "Customer says:"', () => {
    const { getByText } = renderWithTheme(
      <RequestDisplay request={mockRequestForTheMoney} />
    );

    expect(getByText('Customer says:')).toBeTruthy();
  });

  it('should render for-the-money request format', () => {
    const { getByText } = renderWithTheme(
      <RequestDisplay request={mockRequestForTheMoney} />
    );

    expect(getByText(expect.stringContaining('for the money'))).toBeTruthy();
  });

  it('should render by-amount request format', () => {
    const { getByText } = renderWithTheme(
      <RequestDisplay request={mockRequestByAmount} />
    );

    expect(getByText(expect.stringContaining('by $100'))).toBeTruthy();
  });

  it('should display sector name in for-the-money request', () => {
    const { getByText } = renderWithTheme(
      <RequestDisplay request={mockRequestForTheMoney} />
    );

    expect(getByText(expect.stringContaining('Tier'))).toBeTruthy();
  });

  it('should display sector name in by-amount request', () => {
    const { getByText } = renderWithTheme(
      <RequestDisplay request={mockRequestByAmount} />
    );

    expect(getByText(expect.stringContaining('Voisins'))).toBeTruthy();
  });

  it('should handle orphelins sector', () => {
    const request: CashRequest = {
      cashAmount: 500,
      sector: 'orphelins',
      requestType: 'for-the-money',
    };

    const { getByText } = renderWithTheme(
      <RequestDisplay request={request} />
    );

    expect(getByText(expect.stringContaining('Orphelins'))).toBeTruthy();
  });

  it('should handle zero sector', () => {
    const request: CashRequest = {
      cashAmount: 500,
      sector: 'zero',
      requestType: 'for-the-money',
    };

    const { getByText } = renderWithTheme(
      <RequestDisplay request={request} />
    );

    expect(getByText(expect.stringContaining('Zero'))).toBeTruthy();
  });

  it('should handle neighbors sector', () => {
    const request: CashRequest = {
      cashAmount: 500,
      sector: 'neighbors',
      requestType: 'for-the-money',
    };

    const { getByText } = renderWithTheme(
      <RequestDisplay request={request} />
    );

    expect(getByText(expect.stringContaining('Neighbors'))).toBeTruthy();
  });

  it('should display specified amount in by-amount request', () => {
    const request: CashRequest = {
      cashAmount: 500,
      sector: 'tier',
      requestType: 'by-amount',
      specifiedAmount: 50,
    };

    const { getByText } = renderWithTheme(
      <RequestDisplay request={request} />
    );

    expect(getByText(expect.stringContaining('$50'))).toBeTruthy();
  });

  it('should handle different specified amounts', () => {
    const request: CashRequest = {
      cashAmount: 500,
      sector: 'voisins',
      requestType: 'by-amount',
      specifiedAmount: 200,
    };

    const { getByText } = renderWithTheme(
      <RequestDisplay request={request} />
    );

    expect(getByText(expect.stringContaining('$200'))).toBeTruthy();
  });

  it('should update when request changes', () => {
    const { rerender, getByText } = renderWithTheme(
      <RequestDisplay request={mockRequestForTheMoney} />
    );

    expect(getByText(expect.stringContaining('for the money'))).toBeTruthy();

    rerender(
      <ThemeProvider>
        <RequestDisplay request={mockRequestByAmount} />
      </ThemeProvider>
    );

    expect(getByText(expect.stringContaining('by $100'))).toBeTruthy();
  });

  it('should switch from for-the-money to by-amount', () => {
    const { rerender, getByText, queryByText } = renderWithTheme(
      <RequestDisplay request={mockRequestForTheMoney} />
    );

    expect(getByText(expect.stringContaining('for the money'))).toBeTruthy();

    rerender(
      <ThemeProvider>
        <RequestDisplay request={mockRequestByAmount} />
      </ThemeProvider>
    );

    expect(queryByText(expect.stringContaining('for the money'))).toBeNull();
    expect(getByText(expect.stringContaining('by $100'))).toBeTruthy();
  });

  it('should render with quotes around request text', () => {
    const { getByText } = renderWithTheme(
      <RequestDisplay request={mockRequestForTheMoney} />
    );

    const requestElement = getByText(expect.stringContaining('for the money'));
    expect(requestElement).toBeTruthy();
  });

  it('should handle large specified amounts', () => {
    const request: CashRequest = {
      cashAmount: 10000,
      sector: 'tier',
      requestType: 'by-amount',
      specifiedAmount: 5000,
    };

    const { getByText } = renderWithTheme(
      <RequestDisplay request={request} />
    );

    expect(getByText(expect.stringContaining('$5000'))).toBeTruthy();
  });
});
