import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import { InstructionBox } from './InstructionBox';

function renderWithTheme(component: React.ReactElement) {
  return render(<ThemeProvider>{component}</ThemeProvider>);
}

describe('InstructionBox', () => {
  it('renders default title and instruction rows', () => {
    const instructions = ['Place chips first', 'Then confirm answer'];
    const { getByText } = renderWithTheme(<InstructionBox instructions={instructions} />);

    expect(getByText('How to Play:')).toBeTruthy();
    expect(getByText('Place chips first')).toBeTruthy();
    expect(getByText('Then confirm answer')).toBeTruthy();
  });

  it('renders a custom title', () => {
    const { getByText } = renderWithTheme(
      <InstructionBox title="Steps" instructions={['Do this']} />
    );

    expect(getByText('Steps')).toBeTruthy();
  });
});
