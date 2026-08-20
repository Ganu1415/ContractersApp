import React from 'react';

import { Pressable, StyleSheet, View } from 'react-native';

import { theme } from '../../../theme';

import {
  AppCardProps,
  CardPadding,
  CardRadius,
  CardVariant,
} from './Card.types';

const AppCard = ({
  children,
  variant = 'default',
  padding = 'medium',
  radius = 'medium',
  fullWidth = true,
  disabled = false,
  style,
  contentStyle,
  onPress,
  ...rest
}: AppCardProps) => {
  const isPressable = Boolean(onPress);

  /**
   * Common card styles
   */
  const cardStyles = [
    styles.base,

    variantStyles[variant],

    paddingStyles[padding],

    radiusStyles[radius],

    fullWidth && styles.fullWidth,

    disabled && styles.disabled,

    style,
  ];

  /**
   * Non-pressable Card
   */
  if (!isPressable) {
    return (
      <View {...rest} style={cardStyles}>
        <View style={contentStyle}>{children}</View>
      </View>
    );
  }

  /**
   * Pressable Card
   */
  return (
    <Pressable
      {...rest}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{
        disabled,
      }}
      style={({ pressed }) => [
        ...cardStyles,

        pressed && !disabled && styles.pressed,
      ]}
    >
      <View style={contentStyle}>{children}</View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  /**
   * Base
   */
  base: {
    overflow: 'hidden',
  },

  /**
   * Variants
   */
  variantDefault: {
    backgroundColor: theme.colors.surface,
  },

  variantOutlined: {
    backgroundColor: theme.colors.surface,

    borderWidth: 1,

    borderColor: theme.colors.border,
  },

  variantElevated: {
    backgroundColor: theme.colors.surface,

    shadowColor: theme.colors.black,

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.08,

    shadowRadius: 6,

    elevation: 3,
  },

  variantFilled: {
    backgroundColor: theme.colors.background,
  },

  /**
   * Padding
   */
  paddingNone: {
    padding: 0,
  },

  paddingSmall: {
    padding: theme.spacing.md,
  },

  paddingMedium: {
    padding: theme.spacing.lg,
  },

  paddingLarge: {
    padding: theme.spacing.xxl,
  },

  /**
   * Radius
   */
  radiusSmall: {
    borderRadius: theme.radius.sm,
  },

  radiusMedium: {
    borderRadius: theme.radius.md,
  },

  radiusLarge: {
    borderRadius: theme.radius.lg,
  },

  /**
   * Full width
   */
  fullWidth: {
    width: '100%',
  },

  /**
   * Disabled
   */
  disabled: {
    opacity: 0.5,
  },

  /**
   * Pressed
   */
  pressed: {
    opacity: 0.85,
  },
});

/**
 * Variant → Style
 */
const variantStyles: Record<CardVariant, object> = {
  default: styles.variantDefault,

  outlined: styles.variantOutlined,

  elevated: styles.variantElevated,

  filled: styles.variantFilled,
};

/**
 * Padding → Style
 */
const paddingStyles: Record<CardPadding, object> = {
  none: styles.paddingNone,

  small: styles.paddingSmall,

  medium: styles.paddingMedium,

  large: styles.paddingLarge,
};

/**
 * Radius → Style
 */
const radiusStyles: Record<CardRadius, object> = {
  small: styles.radiusSmall,

  medium: styles.radiusMedium,

  large: styles.radiusLarge,
};

export default AppCard;
