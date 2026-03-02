import React from 'react';
import { View } from 'react-native';
import {
  VIEWBOX,
} from '../constants';
import RacetrackTrackSvg from './RacetrackTrackSvg';
import RacetrackOverlays from './RacetrackOverlays';
import { styles } from './RacetrackLayout.styles';

type SectionType = 'tier' | 'orphelins' | 'voisins' | 'zero';

interface RacetrackLayoutProps {
  width?: number;
  onNumberPress?: (number: string) => void;
  onSectionPress?: (section: SectionType) => void;
}

export default function RacetrackLayout({
  width = 350,
  onNumberPress,
  onSectionPress,
}: RacetrackLayoutProps) {
  const componentHeight = width * (VIEWBOX.height / VIEWBOX.width);

  return (
    <View style={[styles.container, { width, height: componentHeight }]}>
      <RacetrackTrackSvg width={width} height={componentHeight} />
      <RacetrackOverlays
        width={width}
        height={componentHeight}
        onSectionPress={onSectionPress}
        onNumberPress={onNumberPress}
      />
    </View>
  );
}
