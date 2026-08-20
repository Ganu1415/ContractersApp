import React from 'react';

import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

import { theme } from '../../../theme';

import { AppText } from '../Text';

import { AppButtonProps, ButtonSize, ButtonVariant } from './Button.types';

const AppButton = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  ...rest
}: AppButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      {...rest}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{
        disabled: isDisabled,
        busy: loading,
      }}
      style={({ pressed }) => [
        styles.base,

        variantStyles[variant],

        sizeStyles[size],

        fullWidth && styles.fullWidth,

        isDisabled && styles.disabled,

        pressed && !isDisabled && styles.pressed,

        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getLoaderColor(variant)} />
      ) : (
        <View style={styles.content}>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

          <AppText
            variant="bodyMedium"
            color={getTextColor(variant)}
            style={styles.title}
          >
            {title}
          </AppText>

          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </View>
      )}
    </Pressable>
  );
};

/**
 * Button text color
 */
const getTextColor = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
    case 'secondary':
    case 'danger':
    case 'success':
      return 'white';

    case 'outline':
    case 'ghost':
      return 'primary';

    default:
      return 'primary';
  }
};

/**
 * Button loading indicator color
 */
const getLoaderColor = (variant: ButtonVariant): string => {
  switch (variant) {
    case 'primary':
    case 'secondary':
    case 'danger':
    case 'success':
      return theme.colors.white;

    case 'outline':
    case 'ghost':
      return theme.colors.primary;

    default:
      return theme.colors.white;
  }
};

const styles = StyleSheet.create({
  /**
   * Base
   */
  base: {
    minHeight: 48,

    borderRadius: theme.radius.md,

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
    backgroundColor: theme.colors.transparent,

    borderWidth: 1,

    borderColor: theme.colors.primary,
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
   * Small button
   */
  sizeSmall: {
    paddingHorizontal: theme.spacing.sm,

    paddingVertical: 3,
  },

  /**
   * Medium button
   */
  sizeMedium: {
    paddingHorizontal: theme.spacing.md,

    paddingVertical: 5,
  },

  /**
   * Large button
   */
  sizeLarge: {
    paddingHorizontal: theme.spacing.lg,

    paddingVertical: 7,
  },

  /**
   * Button content
   */
  content: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',
  },

  /**
   * Left icon
   */
  leftIcon: {
    marginRight: theme.spacing.sm,
  },

  /**
   * Right icon
   */
  rightIcon: {
    marginLeft: theme.spacing.sm,
  },

  /**
   * Title
   */
  title: {
    textAlign: 'center',
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
    opacity: 0.8,
  },
});

/**
 * Variant → Style
 */
const variantStyles: Record<ButtonVariant, object> = {
  primary: styles.variantPrimary,

  secondary: styles.variantSecondary,

  outline: styles.variantOutline,

  ghost: styles.variantGhost,

  danger: styles.variantDanger,

  success: styles.variantSuccess,
};

/**
 * Size → Style
 */
const sizeStyles: Record<ButtonSize, object> = {
  small: styles.sizeSmall,

  medium: styles.sizeMedium,

  large: styles.sizeLarge,
};

export default AppButton;
