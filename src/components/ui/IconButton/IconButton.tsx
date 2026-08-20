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
        styles.variant[variant],
        styles.size[size],
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

const getIconColor = (variant: IconButtonVariant) => {
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
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  variant: {
    primary: {
      backgroundColor: theme.colors.primary,
    },

    secondary: {
      backgroundColor: theme.colors.secondary,
    },

    outline: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },

    ghost: {
      backgroundColor: theme.colors.transparent,
    },

    danger: {
      backgroundColor: theme.colors.error,
    },

    success: {
      backgroundColor: theme.colors.success,
    },
  },

  size: {
    small: {
      width: 36,
      height: 36,
      borderRadius: theme.radius.sm,
    },

    medium: {
      width: 44,
      height: 44,
      borderRadius: theme.radius.md,
    },

    large: {
      width: 52,
      height: 52,
      borderRadius: theme.radius.lg,
    },
  },

  disabled: {
    opacity: 0.5,
  },

  pressed: {
    opacity: 0.75,
  },
});

export default AppIconButton;
