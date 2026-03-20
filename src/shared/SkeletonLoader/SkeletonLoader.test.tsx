import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import SkeletonLoader from './SkeletonLoader';

describe('SkeletonLoader', () => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider>{children}</ThemeProvider>
  );

  it('renders without crashing', () => {
    const { root } = render(
      <Wrapper>
        <SkeletonLoader width={100} height={20} />
      </Wrapper>
    );

    expect(root).toBeTruthy();
  });

  it('renders with percentage width', () => {
    const { root } = render(
      <Wrapper>
        <SkeletonLoader width="80%" height={40} />
      </Wrapper>
    );

    expect(root).toBeTruthy();
  });

  it('renders with custom border radius', () => {
    const { root } = render(
      <Wrapper>
        <SkeletonLoader width={150} height={30} borderRadius={10} />
      </Wrapper>
    );

    expect(root).toBeTruthy();
  });

  it('renders with custom style', () => {
    const customStyle = { marginVertical: 10 };
    const { root } = render(
      <Wrapper>
        <SkeletonLoader width={200} height={50} style={customStyle} />
      </Wrapper>
    );

    expect(root).toBeTruthy();
  });

  it('renders with default border radius when not specified', () => {
    const { root } = render(
      <Wrapper>
        <SkeletonLoader width={120} height={25} />
      </Wrapper>
    );

    expect(root).toBeTruthy();
  });

  it('handles numeric width values', () => {
    const { root } = render(
      <Wrapper>
        <SkeletonLoader width={300} height={60} />
      </Wrapper>
    );

    expect(root).toBeTruthy();
  });

  it('handles different height values', () => {
    const heights = [20, 40, 100, 200];

    heights.forEach(height => {
      const { unmount } = render(
        <Wrapper>
          <SkeletonLoader width={100} height={height} />
        </Wrapper>
      );

      unmount();
    });
  });
});
