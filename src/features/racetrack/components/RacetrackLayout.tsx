import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path, Text as SvgText } from 'react-native-svg';
import {
  TOP_NUMBERS,
  BOTTOM_NUMBERS,
  LEFT_NUMBERS,
  RIGHT_NUMBERS,
  BOTTOM_CELL_BOUNDARIES,
  VIEWBOX,
  SECTORS,
  SECTION_LABELS,
} from '../constants';
import {
  getTopNumberCenterX,
  getBottomNumberCenterX,
} from '../utils';

type SectionType = 'tier' | 'orphelins' | 'voisins' | 'zero';

interface RacetrackLayoutProps {
  width?: number;
  onNumberPress?: (number: string) => void;
  onSectionPress?: (section: SectionType) => void;
}

// Sector button configuration
const SECTOR_BUTTONS: Array<{
  section: SectionType;
  startX: number;
  endX: number;
  radiusLeft?: number;
  radiusRight?: number;
}> = [
  { section: 'tier', startX: 221, endX: 428, radiusLeft: 30 },
  { section: 'orphelins', startX: 428, endX: 610 },
  { section: 'voisins', startX: 610, endX: 815 },
  { section: 'zero', startX: 815, endX: 917, radiusRight: 30 },
];

export default function RacetrackLayout({
  width = 350,
  onNumberPress,
  onSectionPress,
}: RacetrackLayoutProps) {
  const componentHeight = width * (VIEWBOX.height / VIEWBOX.width);

  // Helper to convert SVG coordinates to component coordinates
  const toComponentX = (svgX: number) => ((svgX - VIEWBOX.x) / VIEWBOX.width) * width;
  const toComponentY = (svgY: number) => ((svgY - VIEWBOX.y) / VIEWBOX.height) * componentHeight;
  const toComponentWidth = (svgW: number) => (svgW / VIEWBOX.width) * width;
  const toComponentHeight = (svgH: number) => (svgH / VIEWBOX.height) * componentHeight;

  // Button dimensions
  const numberButtonWidth = 36;
  const numberButtonHeight = 40;
  const sideButtonSize = 36;

  return (
    <View style={[styles.container, { width, height: componentHeight }]}>
      <Svg
        width={width}
        height={componentHeight}
        viewBox={`${VIEWBOX.x} ${VIEWBOX.y} ${VIEWBOX.width} ${VIEWBOX.height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Outer oval track */}
        <Path
          d="M156 274C156 205.517 211.517 150 280 150L854.001 150C922.484 150 978.001 205.517 978.001 274L978 274C978 342.484 922.483 398.001 854 398.001L280 398C211.517 398 156 342.483 156 274Z"
          stroke="#FFD700"
          strokeWidth="2"
          fill="#1a472a"
        />

        {/* Inner oval */}
        <Path
          d="M221 272.5C221 234.116 252.116 203 290.5 203L847.5 203C885.884 203 917.001 234.116 917.001 272.5L917 272.5C917 310.884 885.884 342.001 847.5 342.001L290.5 342C252.116 342 221 310.884 221 272.5Z"
          stroke="#FFD700"
          strokeWidth="2"
          fill="#0d3320"
        />

        {/* Top vertical divider lines */}
        {TOP_NUMBERS.slice(1).map((_, index) => (
          <Path
            key={`top-line-${index}`}
            d={`M${284 + index * 40.8} 149.76 L${284 + index * 40.8} 204.48`}
            stroke="#FFD700"
            strokeWidth="2"
          />
        ))}

        {/* Bottom vertical divider lines */}
        {BOTTOM_NUMBERS.slice(1).map((_, index) => {
          const x = BOTTOM_CELL_BOUNDARIES[index + 1] || 281.84 + index * 42.54;
          return (
            <Path
              key={`bottom-line-${index}`}
              d={`M${x} 343.68 L${x} 398.4`}
              stroke="#FFD700"
              strokeWidth="2"
            />
          );
        })}

        {/* Section divider lines */}
        <Path d="M406 204 L451.6 343.2" stroke="#FFD700" strokeWidth="2" />
        <Path d="M610 204 L610 343.2" stroke="#FFD700" strokeWidth="2" />
        <Path d="M815 203 L815 342.2" stroke="#FFD700" strokeWidth="2" />

        {/* Left side divider lines */}
        <Path d="M213 168 L247.005 215.74" stroke="#FFD700" strokeWidth="2" />
        <Path d="M167 227 L223.769 249.472" stroke="#FFD700" strokeWidth="2" />
        <Path d="M160 303.756 L220.463 286" stroke="#FFD700" strokeWidth="2" />
        <Path d="M197 367.467 L243.4 326" stroke="#FFD700" strokeWidth="2" />

        {/* Right side divider lines */}
        <Path d="M935.697 179 L892 219.22" stroke="#FFD700" strokeWidth="2" />
        <Path d="M970.506 234 L913 249.988" stroke="#FFD700" strokeWidth="2" />
        <Path d="M974.328 310.204 L917 291" stroke="#FFD700" strokeWidth="2" />
        <Path d="M929.001 373.75 L895 325" stroke="#FFD700" strokeWidth="2" />

        {/* Top row numbers */}
        {TOP_NUMBERS.map((item, index) => (
          <SvgText
            key={`top-${item.num}`}
            x={getTopNumberCenterX(index)}
            y={183}
            fill={item.color}
            fontSize="19"
            fontWeight="500"
            textAnchor="middle"
          >
            {item.num}
          </SvgText>
        ))}

        {/* Bottom row numbers */}
        {BOTTOM_NUMBERS.map((item, index) => (
          <SvgText
            key={`bottom-${item.num}`}
            x={getBottomNumberCenterX(index)}
            y={377}
            fill={item.color}
            fontSize="19"
            fontWeight="500"
            textAnchor="middle"
          >
            {item.num}
          </SvgText>
        ))}

        {/* Left side numbers */}
        {LEFT_NUMBERS.map((item) => (
          <SvgText
            key={`left-${item.num}`}
            x={item.x}
            y={item.y}
            fill={item.color}
            fontSize="19"
            fontWeight="500"
            textAnchor="middle"
          >
            {item.num}
          </SvgText>
        ))}

        {/* Right side numbers */}
        {RIGHT_NUMBERS.map((item) => (
          <SvgText
            key={`right-${item.num}`}
            x={item.x}
            y={item.y}
            fill={item.color}
            fontSize="19"
            fontWeight="500"
            textAnchor="middle"
          >
            {item.num}
          </SvgText>
        ))}

        {/* Center section labels */}
        {SECTION_LABELS.map((label) => (
          <SvgText
            key={label.name}
            x={label.x}
            y={label.y}
            fill="#FFD700"
            fontSize="22"
            fontWeight="600"
          >
            {label.name}
          </SvgText>
        ))}
      </Svg>

      {/* Section button overlays */}
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
                  ...(radiusLeft && { borderTopLeftRadius: radiusLeft, borderBottomLeftRadius: radiusLeft }),
                  ...(radiusRight && { borderTopRightRadius: radiusRight, borderBottomRightRadius: radiusRight }),
                },
              ]}
              activeOpacity={0.7}
              onPress={() => onSectionPress(section)}
            />
          ))}
        </View>
      )}

      {/* Number button overlays for neighbors bet */}
      {onNumberPress && (
        <View style={[StyleSheet.absoluteFill, { pointerEvents: 'box-none' as const }]}>
          {/* Top row */}
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

          {/* Bottom row */}
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

          {/* Left side */}
          {LEFT_NUMBERS.map((item) => (
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

          {/* Right side */}
          {RIGHT_NUMBERS.map((item) => (
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectorButton: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  numberButton: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
});
