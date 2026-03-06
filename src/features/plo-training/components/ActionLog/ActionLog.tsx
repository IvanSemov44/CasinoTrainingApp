import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import type { ActionLogProps } from './ActionLog.types';

const STREET_HEADERS = new Set(['PREFLOP', 'FLOP', 'TURN', 'RIVER']);

export default function ActionLog({ lines, requesterName }: ActionLogProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  // The last street header in the log is the current street
  let lastHeaderIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (STREET_HEADERS.has(lines[i])) lastHeaderIdx = i;
  }

  return (
    <View style={styles.container}>
      {lines.map((line, i) => {
        const isHeader = STREET_HEADERS.has(line);
        const isCurrent = i >= lastHeaderIdx;

        if (isHeader) {
          return (
            <Text
              key={i}
              style={[
                styles.streetHeader,
                i === lastHeaderIdx ? styles.currentHeader : styles.prevHeader,
                i > 0 && styles.streetHeaderSpacing,
              ]}
            >
              {line}
            </Text>
          );
        }

        return (
          <Text
            key={i}
            style={[styles.line, !isCurrent && styles.historicalLine]}
          >
            {line}
          </Text>
        );
      })}

      <View style={styles.askIndicator}>
        <Text style={styles.askText}>{requesterName} asks: "How much is pot?"</Text>
      </View>
    </View>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  /* eslint-disable react-native/no-unused-styles */
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background.darkGray,
      borderRadius: 10,
      padding: 14,
      marginBottom: 16,
      borderLeftWidth: 3,
      borderLeftColor: colors.text.gold,
    },

    // ── Street section headers ────────────────────────────────────────────────
    streetHeader: {
      fontSize: 10,
      fontWeight: '800',
      letterSpacing: 1.5,
      marginBottom: 4,
    },
    streetHeaderSpacing: {
      marginTop: 10,
    },
    currentHeader: {
      color: colors.text.gold,
    },
    prevHeader: {
      color: colors.text.muted,
    },

    // ── Action lines ──────────────────────────────────────────────────────────
    line: {
      color: colors.text.secondary,
      fontSize: 13,
      lineHeight: 20,
      fontFamily: 'monospace',
    },
    historicalLine: {
      color: colors.text.muted,
    },

    // ── "Asks pot" footer ─────────────────────────────────────────────────────
    askIndicator: {
      marginTop: 10,
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: colors.border.primary,
    },
    askText: {
      color: colors.status.warning,
      fontSize: 13,
      fontWeight: '700',
      fontStyle: 'italic',
    },
  });
  /* eslint-enable react-native/no-unused-styles */
}
