import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import {
  TOP_NUMBERS,
  BOTTOM_NUMBERS,
  LEFT_NUMBERS,
  RIGHT_NUMBERS,
  VIEWBOX,
  SECTORS,
} from '../../constants';
import { getTopNumberCenterX, getBottomNumberCenterX } from '../../utils';
import { RacetrackOverlaysProps, SectorButtonConfig } from './RacetrackOverlays.types';

const SECTOR_BUTTONS: SectorButtonConfig[] = [
  { section: 'tier', startX: 221, endX: 428, radiusLeft: 30 },
  { section: 'orphelins', startX: 428, endX: 610 },
  { section: 'voisins', startX: 610, endX: 815 },
  { section: 'zero', startX: 815, endX: 917, radiusRight: 30 },
];

export default function RacetrackOverlays({
  width,
  height,
  onNumberPress,
  onSectionPress,
}: RacetrackOverlaysProps) {
  const toComponentX = (svgX: number) => ((svgX - VIEWBOX.x) / VIEWBOX.width) * width;
  const toComponentY = (svgY: number) => ((svgY - VIEWBOX.y) / VIEWBOX.height) * height;
  const toComponentWidth = (svgW: number) => (svgW / VIEWBOX.width) * width;
  const toComponentHeight = (svgH: number) => (svgH / VIEWBOX.height) * height;

  const numberButtonWidth = 36;
  const numberButtonHeight = 40;
  const sideButtonSize = 36;

  return (
    <>
      {onSectionPress && (
        <View style={[StyleSheet.absoluteFill, { pointerEvents: 'box-none' as const }]}>
          {SECTOR_BUTTONS.map(({ section, startX, endX, radiusLeft, radiusRight }) => (
            <TouchableOpacity
              key={section}
              style={[
                styles.sectorButton,
                {
                  left: toComponentX(startX),
                  top: toComponentY(SECTORS.ovalTop),
                  width: toComponentWidth(endX - startX),
                  height: toComponentHeight(SECTORS.ovalBottom - SECTORS.ovalTop),
                  ...(radiusLeft && {
                    borderTopLeftRadius: radiusLeft,
                    borderBottomLeftRadius: radiusLeft,
                  }),
                  ...(radiusRight && {
                    borderTopRightRadius: radiusRight,
                    borderBottomRightRadius: radiusRight,
                  }),
                },
              ]}
              activeOpacity={0.7}
              onPress={() => onSectionPress(section)}
            />
          ))}
        </View>
      )}

      {onNumberPress && (
        <View style={[StyleSheet.absoluteFill, { pointerEvents: 'box-none' as const }]}>
          {TOP_NUMBERS.map((item, index) => {
            const centerX = getTopNumberCenterX(index);
            return (
              <TouchableOpacity
                key={`top-btn-${item.num}`}
                style={[
                  styles.numberButton,
                  {
                    left: toComponentX(centerX - numberButtonWidth / 2),
                    top: toComponentY(150),
                    width: toComponentWidth(numberButtonWidth),
                    height: toComponentHeight(numberButtonHeight),
                  },
                ]}
                activeOpacity={0.6}
                onPress={() => onNumberPress(item.num)}
              />
            );
          })}

          {BOTTOM_NUMBERS.map((item, index) => {
            const centerX = getBottomNumberCenterX(index);
            return (
              <TouchableOpacity
                key={`bottom-btn-${item.num}`}
                style={[
                  styles.numberButton,
                  {
                    left: toComponentX(centerX - numberButtonWidth / 2),
                    top: toComponentY(358),
                    width: toComponentWidth(numberButtonWidth),
                    height: toComponentHeight(numberButtonHeight),
                  },
                ]}
                activeOpacity={0.6}
                onPress={() => onNumberPress(item.num)}
              />
            );
          })}

          {LEFT_NUMBERS.map(item => (
            <TouchableOpacity
              key={`left-btn-${item.num}`}
              style={[
                styles.numberButton,
                {
                  left: toComponentX(item.x - sideButtonSize / 2),
                  top: toComponentY(item.y - sideButtonSize / 2),
                  width: toComponentWidth(sideButtonSize),
                  height: toComponentHeight(sideButtonSize),
                },
              ]}
              activeOpacity={0.6}
              onPress={() => onNumberPress(item.num)}
            />
          ))}

          {RIGHT_NUMBERS.map(item => (
            <TouchableOpacity
              key={`right-btn-${item.num}`}
              style={[
                styles.numberButton,
                {
                  left: toComponentX(item.x - sideButtonSize / 2),
                  top: toComponentY(item.y - sideButtonSize / 2),
                  width: toComponentWidth(sideButtonSize),
                  height: toComponentHeight(sideButtonSize),
                },
              ]}
              activeOpacity={0.6}
              onPress={() => onNumberPress(item.num)}
            />
          ))}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  sectorButton: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  numberButton: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
});
