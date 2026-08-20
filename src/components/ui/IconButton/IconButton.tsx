import React from 'react';

import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';

import { theme } from '../../../theme';

import {
  AppIconButtonProps,
  IconButtonSize,
  IconButtonVariant,
} from './IconButton.types';

const AppIconButton = ({
  icon,
  accessibilityLabel,
  variant = 'ghost',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  testID,
  ...rest
}: AppIconButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      {...rest}
      testID={testID}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{
        disabled: isDisabled,
        busy: loading,
      }}
      style={({ pressed }) => [
        styles.base,

        variantStyles[variant],

        sizeStyles[size],

        isDisabled && styles.disabled,

        pressed && !isDisabled && styles.pressed,

        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getIconColor(variant)} />
      ) : (
        icon
      )}
    </Pressable>
  );
};

/**
 * Icon color based on button variant.
 */
const getIconColor = (variant: IconButtonVariant): string => {
  switch (variant) {
    case 'primary':
    case 'secondary':
    case 'danger':
    case 'success':
      return theme.colors.white;

    case 'outline':
    case 'ghost':
    default:
      return theme.colors.primary;
  }
};

const styles = StyleSheet.create({
  /**
   * Base
   */
  base: {
    alignItems: 'center',

    justifyContent: 'center',
  },

  /**
   * Variants
   */
  variantPrimary: {
    backgroundColor: theme.colors.primary,
  },

  variantSecondary: {
    backgroundColor: theme.colors.secondary,
  },

  variantOutline: {
    backgroundColor: theme.colors.surface,

    borderWidth: 1,

    borderColor: theme.colors.border,
  },

  variantGhost: {
    backgroundColor: theme.colors.transparent,
  },

  variantDanger: {
    backgroundColor: theme.colors.error,
  },

  variantSuccess: {
    backgroundColor: theme.colors.success,
  },

  /**
   * Small
   */
  sizeSmall: {
    width: 36,
    height: 36,

    borderRadius: theme.radius.sm,
  },

  /**
   * Medium
   */
  sizeMedium: {
    width: 44,
    height: 44,

    borderRadius: theme.radius.md,
  },

  /**
   * Large
   */
  sizeLarge: {
    width: 52,
    height: 52,

    borderRadius: theme.radius.lg,
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
    opacity: 0.75,
  },
});

/**
 * Variant → Style mapping
 */
const variantStyles: Record<IconButtonVariant, object> = {
  primary: styles.variantPrimary,

  secondary: styles.variantSecondary,

  outline: styles.variantOutline,

  ghost: styles.variantGhost,

  danger: styles.variantDanger,

  success: styles.variantSuccess,
};

/**
 * Size → Style mapping
 */
const sizeStyles: Record<IconButtonSize, object> = {
  small: styles.sizeSmall,

  medium: styles.sizeMedium,

  large: styles.sizeLarge,
};

export default AppIconButton;
