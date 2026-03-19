import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';

export interface FeedbackActionButton {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export interface FeedbackActionsProps {
  primary: FeedbackActionButton;
  secondary?: FeedbackActionButton;
  containerStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  primaryButtonStyle?: ViewStyle;
  secondaryButtonStyle?: ViewStyle;
  textStyle?: TextStyle;
  primaryTextStyle?: TextStyle;
  secondaryTextStyle?: TextStyle;
}

/**
 * Shared action row for feedback cards.
 *
 * @example
 * ```tsx
 * <FeedbackActions
 *   primary={{ label: 'Continue', onPress: handleContinue }}
 *   secondary={{ label: 'Review', onPress: handleReview }}
 * />
 * ```
 */
export function FeedbackActions({
  primary,
  secondary,
  containerStyle,
  buttonStyle,
  primaryButtonStyle,
  secondaryButtonStyle,
  textStyle,
  primaryTextStyle,
  secondaryTextStyle,
}: FeedbackActionsProps) {
  const styles = useThemedStyles(makeStyles);

  const renderButton = (button: FeedbackActionButton, isPrimary: boolean) => {
    const variant = button.variant ?? (isPrimary ? 'primary' : 'secondary');
    const isGold = variant === 'primary';

    return (
      <TouchableOpacity
        key={button.label}
        style={[
          styles.button,
          isGold ? styles.primaryButton : styles.secondaryButton,
          buttonStyle,
          isPrimary ? primaryButtonStyle : secondaryButtonStyle,
        ]}
        onPress={button.onPress}
      >
        <Text
          style={[
            styles.buttonText,
            isGold ? styles.primaryText : styles.secondaryText,
            textStyle,
            isPrimary ? primaryTextStyle : secondaryTextStyle,
          ]}
        >
          {button.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.row, containerStyle]}>
      {secondary ? renderButton(secondary, false) : null}
      {renderButton(primary, true)}
    </View>
  );
}

function makeStyles(colors: AppColors) {
  return StyleSheet.create({
    row: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 8,
    },
    button: {
      flex: 1,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 40,
    },
    primaryButton: {
      backgroundColor: colors.text.gold,
    },
    secondaryButton: {
      backgroundColor: colors.background.darkGray,
    },
    buttonText: {
      fontWeight: '600',
    },
    primaryText: {
      color: colors.background.primary,
    },
    secondaryText: {
      color: colors.text.primary,
    },
  });
}
