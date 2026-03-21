import React from 'react';
import Svg, { Path, Text as SvgText } from 'react-native-svg';
import {
  TOP_NUMBERS,
  BOTTOM_NUMBERS,
  LEFT_NUMBERS,
  RIGHT_NUMBERS,
  BOTTOM_CELL_BOUNDARIES,
  VIEWBOX,
  SECTION_LABELS,
} from '../../constants';
import { getTopNumberCenterX, getBottomNumberCenterX } from '../../utils';
import { RacetrackTrackSvgProps } from './RacetrackTrackSvg.types';

export default function RacetrackTrackSvg({ width, height }: RacetrackTrackSvgProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`${VIEWBOX.x} ${VIEWBOX.y} ${VIEWBOX.width} ${VIEWBOX.height}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <Path
        d="M156 274C156 205.517 211.517 150 280 150L854.001 150C922.484 150 978.001 205.517 978.001 274L978 274C978 342.484 922.483 398.001 854 398.001L280 398C211.517 398 156 342.483 156 274Z"
        stroke="#FFD700"
        strokeWidth="2"
        fill="#1a472a"
      />

      <Path
        d="M221 272.5C221 234.116 252.116 203 290.5 203L847.5 203C885.884 203 917.001 234.116 917.001 272.5L917 272.5C917 310.884 885.884 342.001 847.5 342.001L290.5 342C252.116 342 221 310.884 221 272.5Z"
        stroke="#FFD700"
        strokeWidth="2"
        fill="#0d3320"
      />

      {TOP_NUMBERS.slice(1).map((_, index) => (
        <Path
          key={`top-line-${index}`}
          d={`M${284 + index * 40.8} 149.76 L${284 + index * 40.8} 204.48`}
          stroke="#FFD700"
          strokeWidth="2"
        />
      ))}

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

      <Path d="M406 204 L451.6 343.2" stroke="#FFD700" strokeWidth="2" />
      <Path d="M610 204 L610 343.2" stroke="#FFD700" strokeWidth="2" />
      <Path d="M815 203 L815 342.2" stroke="#FFD700" strokeWidth="2" />

      <Path d="M213 168 L247.005 215.74" stroke="#FFD700" strokeWidth="2" />
      <Path d="M167 227 L223.769 249.472" stroke="#FFD700" strokeWidth="2" />
      <Path d="M160 303.756 L220.463 286" stroke="#FFD700" strokeWidth="2" />
      <Path d="M197 367.467 L243.4 326" stroke="#FFD700" strokeWidth="2" />

      <Path d="M935.697 179 L892 219.22" stroke="#FFD700" strokeWidth="2" />
      <Path d="M970.506 234 L913 249.988" stroke="#FFD700" strokeWidth="2" />
      <Path d="M974.328 310.204 L917 291" stroke="#FFD700" strokeWidth="2" />
      <Path d="M929.001 373.75 L895 325" stroke="#FFD700" strokeWidth="2" />

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

      {LEFT_NUMBERS.map(item => (
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

      {RIGHT_NUMBERS.map(item => (
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

      {SECTION_LABELS.map(label => (
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
  );
}
