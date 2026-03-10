import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import InstallButton from './InstallButton';

function renderWithTheme(component: React.ReactElement) {
  return render(<ThemeProvider>{component}</ThemeProvider>);
}

describe('InstallButton', () => {
  it('does not render when already installed', () => {
    const onInstall = jest.fn();
    const { queryByText } = renderWithTheme(
      <InstallButton isInstallable isInstalled onInstall={onInstall} />
    );

    expect(queryByText('Install')).toBeNull();
  });
});
