import React from 'react';

import { StyleSheet, View } from 'react-native';

import { theme } from '../../../theme';

import { AppText } from '../Text';

import { AppBadgeProps, BadgeVariant, BadgeSize } from './Badge.types';

const AppBadge = ({
  label,
  variant = 'default',
  size = 'medium',
  leftIcon,
  rightIcon,
  style,
  testID,
}: AppBadgeProps) => {
  return (
    <View
      testID={testID}
      accessible
      accessibilityRole="text"
      accessibilityLabel={label}
      style={[styles.base, variantStyles[variant], sizeStyles[size], style]}
    >
      {/* Left Icon */}
      {leftIcon && <View style={styles.icon}>{leftIcon}</View>}

      {/* Badge Text */}
      <AppText
        variant="caption"
        color={getTextColor(variant)}
        style={styles.text}
      >
        {label}
      </AppText>

      {/* Right Icon */}
      {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
    </View>
  );
};

/**
 * Badge text color
 */
const getTextColor = (variant: BadgeVariant) => {
  switch (variant) {
    case 'success':
      return 'success';

    case 'warning':
      return 'warning';

    case 'error':
      return 'error';

    case 'info':
      return 'info';

    case 'primary':
      return 'primary';

    default:
      return 'secondary';
  }
};

const styles = StyleSheet.create({
  /**
   * Base badge style
   */
  base: {
    alignSelf: 'flex-start',

    flexDirection: 'row',

    alignItems: 'center',

    borderRadius: theme.radius.round,
  },

  /**
   * Variant styles
   */
  variantDefault: {
    backgroundColor: theme.colors.background,
  },

  variantPrimary: {
    backgroundColor: theme.colors.primaryLight,
  },

  variantSuccess: {
    backgroundColor: theme.colors.successLight,
  },

  variantWarning: {
    backgroundColor: theme.colors.warningLight,
  },

  variantError: {
    backgroundColor: theme.colors.errorLight,
  },

  variantInfo: {
    backgroundColor: theme.colors.infoLight,
  },

  /**
   * Size styles
   */
  sizeSmall: {
    paddingHorizontal: theme.spacing.sm,

    paddingVertical: 3,
  },

  sizeMedium: {
    paddingHorizontal: theme.spacing.md,

    paddingVertical: 5,
  },

  sizeLarge: {
    paddingHorizontal: theme.spacing.lg,

    paddingVertical: 7,
  },

  /**
   * Text
   */
  text: {
    fontWeight: '600',
  },

  /**
   * Icons
   */
  icon: {
    marginHorizontal: 2,
  },
});

const variantStyles: Record<BadgeVariant, object> = {
  default: styles.variantDefault,

  primary: styles.variantPrimary,

  success: styles.variantSuccess,

  warning: styles.variantWarning,

  error: styles.variantError,

  info: styles.variantInfo,
};

/**
 * Size → Style mapping
 */
const sizeStyles: Record<BadgeSize, object> = {
  small: styles.sizeSmall,

  medium: styles.sizeMedium,

  large: styles.sizeLarge,
};

export default AppBadge;
