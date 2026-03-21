import React from 'react';
import { View, StyleSheet } from 'react-native';
import { VIEWBOX } from '../../constants';
import { RacetrackTrackSvg } from '../RacetrackTrackSvg';
import { RacetrackOverlays } from '../RacetrackOverlays';
import { RacetrackLayoutProps } from './RacetrackLayout.types';

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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
