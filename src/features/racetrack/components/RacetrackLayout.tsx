import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Svg, { Path, Text as SvgText, G } from 'react-native-svg';

// European roulette wheel order - numbers arranged as they appear on the wheel
const TOP_NUMBERS = [
  { num: '5', color: '#FF0000' },
  { num: '24', color: '#000000' },
  { num: '16', color: '#FF0000' },
  { num: '33', color: '#000000' },
  { num: '1', color: '#FF0000' },
  { num: '20', color: '#000000' },
  { num: '14', color: '#FF0000' },
  { num: '31', color: '#000000' },
  { num: '9', color: '#FF0000' },
  { num: '22', color: '#000000' },
  { num: '18', color: '#FF0000' },
  { num: '29', color: '#000000' },
  { num: '7', color: '#FF0000' },
  { num: '28', color: '#000000' },
  { num: '12', color: '#FF0000' },
  { num: '35', color: '#000000' },
];

const BOTTOM_NUMBERS = [
  { num: '30', color: '#FF0000' },
  { num: '11', color: '#000000' },
  { num: '36', color: '#FF0000' },
  { num: '13', color: '#000000' },
  { num: '27', color: '#FF0000' },
  { num: '6', color: '#000000' },
  { num: '34', color: '#FF0000' },
  { num: '17', color: '#000000' },
  { num: '25', color: '#FF0000' },
  { num: '2', color: '#000000' },
  { num: '21', color: '#FF0000' },
  { num: '4', color: '#000000' },
  { num: '19', color: '#FF0000' },
  { num: '15', color: '#000000' },
  { num: '32', color: '#FF0000' },
];

const LEFT_NUMBERS = [
  { num: '10', color: '#000000', x: 205, y: 225 },
  { num: '23', color: '#FF0000', x: 188, y: 280 },
  { num: '8', color: '#000000', x: 205, y: 335 },
];

const RIGHT_NUMBERS = [
  { num: '3', color: '#FF0000', x: 935, y: 225 },
  { num: '26', color: '#000000', x: 946, y: 280 },
  { num: '0', color: '#4EA72E', x: 935, y: 335 },
];

interface RacetrackLayoutProps {
  width?: number;
  onNumberPress?: (number: string) => void;
  onSectionPress?: (section: 'tier' | 'orphelins' | 'voisins' | 'zero') => void;
}

export default function RacetrackLayout({ 
  width = 350,
  onNumberPress,
  onSectionPress 
}: RacetrackLayoutProps) {
  // ViewBox: "140 140 880 280" means x starts at 140, y starts at 140, width=880, height=280
  const viewBoxWidth = 880;
  const viewBoxHeight = 280;
  
  // Component dimensions
  const componentHeight = width * (viewBoxHeight / viewBoxWidth);

  // Inner oval parameters (from SVG path)
  // Inner oval: radiusX ≈ 69.5 (from 290.5-221), radiusY ≈ 69.5 (272.5-203)
  // Center Y = 272.5, left center X = 290.5, right center X = 847.5
  const ovalCenterY = 272.5;
  const ovalRadiusY = 69.5;
  const ovalTop = 203;
  const ovalBottom = 342;
  
  // Sector divider X positions
  const tierEndX = 428;
  const orphelinsEndX = 610;
  const voisinsEndX = 815;
  
  // Left oval arc (Tier left edge) - from inner oval path
  const leftArcStartX = 290.5;
  const leftArcCenterX = 290.5;
  
  // Right oval arc (Zero right edge)
  const rightArcEndX = 847.5;
  const rightArcCenterX = 847.5;

  // SVG Paths for each sector that follow the oval shape
  // Tier: left curved section
  const tierPath = `
    M ${leftArcStartX} ${ovalTop}
    C 252.116 ${ovalTop} 221 234.116 221 ${ovalCenterY}
    C 221 310.884 252.116 ${ovalBottom} ${leftArcStartX} ${ovalBottom}
    L ${tierEndX} ${ovalBottom}
    L ${tierEndX} ${ovalTop}
    Z
  `;
  
  // Orphelins: middle-left rectangle
  const orphelinsPath = `
    M ${tierEndX} ${ovalTop}
    L ${tierEndX} ${ovalBottom}
    L ${orphelinsEndX} ${ovalBottom}
    L ${orphelinsEndX} ${ovalTop}
    Z
  `;
  
  // Voisins: middle-right rectangle
  const voisinsPath = `
    M ${orphelinsEndX} ${ovalTop}
    L ${orphelinsEndX} ${ovalBottom}
    L ${voisinsEndX} ${ovalBottom}
    L ${voisinsEndX} ${ovalTop}
    Z
  `;
  
  // Zero: right curved section
  const zeroPath = `
    M ${voisinsEndX} ${ovalTop}
    L ${voisinsEndX} ${ovalBottom}
    L ${rightArcEndX} ${ovalBottom}
    C 885.884 ${ovalBottom} 917 310.884 917 ${ovalCenterY}
    C 917 234.116 885.884 ${ovalTop} ${rightArcEndX} ${ovalTop}
    Z
  `;

  return (
    <View style={[styles.container, { width, height: componentHeight }]}>
      <Svg
        width={width}
        height={componentHeight}
        viewBox="140 140 880 280"
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
        {TOP_NUMBERS.slice(1).map((_, index) => {
          const x = 284 + (index * 40.8);
          return (
            <Path
              key={`top-line-${index}`}
              d={`M${x} 149.76 L${x} 204.48`}
              stroke="#FFD700"
              strokeWidth="2"
            />
          );
        })}

        {/* Bottom vertical divider lines */}
        {BOTTOM_NUMBERS.slice(1).map((_, index) => {
          const basePositions = [281.84, 324.38, 366.92, 409.46, 452, 504.8, 557.6, 610.4, 651.2, 692, 732.8, 773.6, 814.4, 855.2];
          const x = basePositions[index] || (281.84 + (index * 42.54));
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
        {/* Tier to Orphelins diagonal */}
        <Path d="M406 204 L451.6 343.2" stroke="#FFD700" strokeWidth="2" />
        {/* Orphelins to Voisins vertical */}
        <Path d="M610 204 L610 343.2" stroke="#FFD700" strokeWidth="2" />
        {/* Voisins to Zero vertical */}
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
        {TOP_NUMBERS.map((item, index) => {
          // Handle edge numbers on curved parts differently
          let centerX: number;
          if (index === 0) {
            // 5 - leftmost on curve
            centerX = 260;
          } else if (index === 15) {
            // 35 - rightmost on curve
            centerX = 888;
          } else {
            // Regular cells
            const cellStart = 284 + ((index - 1) * 40.8);
            const cellEnd = 284 + (index * 40.8);
            centerX = (cellStart + cellEnd) / 2;
          }
          return (
            <SvgText
              key={`top-${item.num}`}
              x={centerX}
              y={183}
              fill={item.color}
              fontSize="19"
              fontWeight="500"
              textAnchor="middle"
            >
              {item.num}
            </SvgText>
          );
        })}

        {/* Bottom row numbers */}
        {BOTTOM_NUMBERS.map((item, index) => {
          // Handle edge numbers on curved parts differently
          let centerX: number;
          if (index === 0) {
            // 30 - leftmost on curve
            centerX = 250;
          } else if (index === 14) {
            // 32 - rightmost on curve
            centerX = 885;
          } else {
            // Cell boundaries for bottom row
            const cellBoundaries = [239, 281.84, 324.38, 366.92, 409.46, 452, 504.8, 557.6, 610.4, 651.2, 692, 732.8, 773.6, 814.4, 855.2, 896];
            const cellStart = cellBoundaries[index];
            const cellEnd = cellBoundaries[index + 1];
            centerX = (cellStart + cellEnd) / 2;
          }
          return (
            <SvgText
              key={`bottom-${item.num}`}
              x={centerX}
              y={377}
              fill={item.color}
              fontSize="19"
              fontWeight="500"
              textAnchor="middle"
            >
              {item.num}
            </SvgText>
          );
        })}

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

        {/* Visual sector overlays - just for display, not clickable */}
        <G>
          <Path
            d={tierPath}
            fill="transparent"
            stroke="transparent"
            strokeWidth="0"
          />
          <Path
            d={orphelinsPath}
            fill="transparent"
            stroke="transparent"
            strokeWidth="0"
          />
          <Path
            d={voisinsPath}
            fill="transparent"
            stroke="transparent"
            strokeWidth="0"
          />
          <Path
            d={zeroPath}
            fill="transparent"
            stroke="transparent"
            strokeWidth="0"
          />
        </G>

        {/* Center section labels */}
        <SvgText x={311} y={277} fill="#FFD700" fontSize="22" fontWeight="600">
          Tier
        </SvgText>
        <SvgText x={462} y={275} fill="#FFD700" fontSize="22" fontWeight="600">
          Orphelins
        </SvgText>
        <SvgText x={670} y={276} fill="#FFD700" fontSize="22" fontWeight="600">
          Voisins
        </SvgText>
        <SvgText x={850} y={274} fill="#FFD700" fontSize="22" fontWeight="600">
          Zero
        </SvgText>
      </Svg>

      {/* TouchableOpacity overlays for reliable touch handling */}
      {onSectionPress && (
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
          {/* Tier button */}
          <TouchableOpacity
            style={[
              styles.sectorButton,
              {
                left: ((221 - 140) / 880) * width,
                top: ((203 - 140) / 280) * componentHeight,
                width: ((428 - 221) / 880) * width,
                height: ((342 - 203) / 280) * componentHeight,
                borderTopLeftRadius: 30,
                borderBottomLeftRadius: 30,
              }
            ]}
            activeOpacity={0.7}
            onPress={() => {
              console.log('Tier pressed!');
              onSectionPress('tier');
            }}
          />
          
          {/* Orphelins button */}
          <TouchableOpacity
            style={[
              styles.sectorButton,
              {
                left: ((428 - 140) / 880) * width,
                top: ((203 - 140) / 280) * componentHeight,
                width: ((610 - 428) / 880) * width,
                height: ((342 - 203) / 280) * componentHeight,
              }
            ]}
            activeOpacity={0.7}
            onPress={() => {
              console.log('Orphelins pressed!');
              onSectionPress('orphelins');
            }}
          />
          
          {/* Voisins button */}
          <TouchableOpacity
            style={[
              styles.sectorButton,
              {
                left: ((610 - 140) / 880) * width,
                top: ((203 - 140) / 280) * componentHeight,
                width: ((815 - 610) / 880) * width,
                height: ((342 - 203) / 280) * componentHeight,
              }
            ]}
            activeOpacity={0.7}
            onPress={() => {
              console.log('Voisins pressed!');
              onSectionPress('voisins');
            }}
          />
          
          {/* Zero button */}
          <TouchableOpacity
            style={[
              styles.sectorButton,
              {
                left: ((815 - 140) / 880) * width,
                top: ((203 - 140) / 280) * componentHeight,
                width: ((917 - 815) / 880) * width,
                height: ((342 - 203) / 280) * componentHeight,
                borderTopRightRadius: 30,
                borderBottomRightRadius: 30,
              }
            ]}
            activeOpacity={0.7}
            onPress={() => {
              console.log('Zero pressed!');
              onSectionPress('zero');
            }}
          />
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
});
