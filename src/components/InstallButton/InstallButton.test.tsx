import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import { InstallButton } from './InstallButton';
import * as hook from './useInstallPrompt';

function renderWithTheme(component: React.ReactElement) {
  return render(<ThemeProvider>{component}</ThemeProvider>);
}

describe('InstallButton', () => {
  it('does not render when already installed', () => {
    jest.spyOn(hook, 'useInstallPrompt').mockReturnValue({
      isInstallable: true,
      isInstalled: true,
      install: jest.fn(),
    } as any);

    const { queryByText } = renderWithTheme(<InstallButton />);
    expect(queryByText('Install')).toBeNull();
  });
});
