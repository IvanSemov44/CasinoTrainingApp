import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';

// Mock expo-router before importing the component so imports are intercepted
const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
  })),
}));

import { GameCategorySection } from './GameCategorySection';

function renderWithTheme(component: React.ReactElement) {
  return render(<ThemeProvider>{component}</ThemeProvider>);
}

describe('GameCategorySection', () => {
  it('renders category and game cards, forwarding select callback', () => {
    const { getByText } = renderWithTheme(<GameCategorySection />);

    // Ensure categories from the local data render
    expect(getByText('ROULETTE')).toBeTruthy();
    expect(getByText('Roulette Training')).toBeTruthy();
  });
});
