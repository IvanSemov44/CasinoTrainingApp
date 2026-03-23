import React from 'react';
import { render, screen } from '@testing-library/react-native';

jest.mock('@components/InstallButton', () => ({
  InstallButton: () => {
    const React = require('react');
    const { Text } = require('react-native');
    return React.createElement(Text, null, 'InstallButtonMock');
  },
}));

jest.mock('./components/GameCategorySection/GameCategorySection', () => ({
  GameCategorySection: () => {
    const React = require('react');
    const { Text } = require('react-native');
    return React.createElement(Text, null, 'GameCategorySectionMock');
  },
}));

// very small smoke render for child components used by HomeScreen
test('debug: renders mocked children', () => {
  const { getByText } = render(
    React.createElement(React.Fragment, null, [
      React.createElement(require('@components/InstallButton').InstallButton, { key: 'i' }),
      React.createElement(
        require('./components/GameCategorySection/GameCategorySection').GameCategorySection,
        { key: 'g' }
      ),
    ])
  );

  expect(getByText('InstallButtonMock')).toBeTruthy();
  expect(getByText('GameCategorySectionMock')).toBeTruthy();
});
