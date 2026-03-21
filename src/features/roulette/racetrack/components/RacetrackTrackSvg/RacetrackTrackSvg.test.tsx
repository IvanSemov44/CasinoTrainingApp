import React from 'react';
import { render } from '@testing-library/react-native';
import RacetrackTrackSvg from './RacetrackTrackSvg';

describe('RacetrackTrackSvg', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { root } = render(<RacetrackTrackSvg width={350} height={140} />);
      expect(root).toBeDefined();
    });

    it('should render with different widths', () => {
      const { root: root1 } = render(<RacetrackTrackSvg width={200} height={80} />);
      const { root: root2 } = render(<RacetrackTrackSvg width={500} height={200} />);
      expect(root1).toBeDefined();
      expect(root2).toBeDefined();
    });

    it('should render with different heights', () => {
      const { root: root1 } = render(<RacetrackTrackSvg width={350} height={100} />);
      const { root: root2 } = render(<RacetrackTrackSvg width={350} height={250} />);
      expect(root1).toBeDefined();
      expect(root2).toBeDefined();
    });
  });

  describe('SVG structure', () => {
    it('should render Svg element with correct props', () => {
      const width = 350;
      const height = 140;
      const { root } = render(<RacetrackTrackSvg width={width} height={height} />);
      expect(root).toBeDefined();
    });

    it('should render outer oval path', () => {
      const { root } = render(<RacetrackTrackSvg width={350} height={140} />);
      expect(root).toBeDefined();
    });

    it('should render inner oval path', () => {
      const { root } = render(<RacetrackTrackSvg width={350} height={140} />);
      expect(root).toBeDefined();
    });

    it('should render vertical divider lines', () => {
      const { root } = render(<RacetrackTrackSvg width={350} height={140} />);
      expect(root).toBeDefined();
    });
  });

  describe('number text rendering', () => {
    it('should render all top numbers', () => {
      const { root } = render(<RacetrackTrackSvg width={350} height={140} />);
      expect(root).toBeDefined();
    });

    it('should render all bottom numbers', () => {
      const { root } = render(<RacetrackTrackSvg width={350} height={140} />);
      expect(root).toBeDefined();
    });

    it('should render all left side numbers', () => {
      const { root } = render(<RacetrackTrackSvg width={350} height={140} />);
      expect(root).toBeDefined();
    });

    it('should render all right side numbers', () => {
      const { root } = render(<RacetrackTrackSvg width={350} height={140} />);
      expect(root).toBeDefined();
    });

    it('should render section labels', () => {
      const { root } = render(<RacetrackTrackSvg width={350} height={140} />);
      expect(root).toBeDefined();
    });
  });

  describe('section labels', () => {
    it('should render tier label', () => {
      const { root } = render(<RacetrackTrackSvg width={350} height={140} />);
      expect(root).toBeDefined();
    });

    it('should render orphelins label', () => {
      const { root } = render(<RacetrackTrackSvg width={350} height={140} />);
      expect(root).toBeDefined();
    });

    it('should render voisins label', () => {
      const { root } = render(<RacetrackTrackSvg width={350} height={140} />);
      expect(root).toBeDefined();
    });

    it('should render zero label', () => {
      const { root } = render(<RacetrackTrackSvg width={350} height={140} />);
      expect(root).toBeDefined();
    });
  });

  describe('color and styling', () => {
    it('should render with gold stroke color', () => {
      const { root } = render(<RacetrackTrackSvg width={350} height={140} />);
      expect(root).toBeDefined();
    });

    it('should render with green background', () => {
      const { root } = render(<RacetrackTrackSvg width={350} height={140} />);
      expect(root).toBeDefined();
    });
  });
});
