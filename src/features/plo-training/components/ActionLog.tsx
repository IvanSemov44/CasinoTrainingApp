import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const STREET_HEADERS = new Set(['PREFLOP', 'FLOP', 'TURN', 'RIVER']);

interface ActionLogProps {
  lines: string[];
  requesterName: string;
}

export default function ActionLog({ lines, requesterName }: ActionLogProps) {
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#FFD700',
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
    color: '#FFD700',
  },
  prevHeader: {
    color: '#444',
  },

  // ── Action lines ──────────────────────────────────────────────────────────
  line: {
    color: '#ccc',
    fontSize: 13,
    lineHeight: 20,
    fontFamily: 'monospace',
  },
  historicalLine: {
    color: '#555',
  },

  // ── "Asks pot" footer ─────────────────────────────────────────────────────
  askIndicator: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  askText: {
    color: '#FF4500',
    fontSize: 13,
    fontWeight: '700',
    fontStyle: 'italic',
  },
});
