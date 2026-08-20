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
        styles.variant[variant],
        styles.size[size],
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
          {leftIcon}

          <AppText
            variant="bodyMedium"
            color={getTextColor(variant)}
            style={styles.title}
          >
            {title}
          </AppText>

          {rightIcon}
        </View>
      )}
    </Pressable>
  );
};

const getTextColor = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
    case 'danger':
    case 'success':
      return 'white';

    case 'secondary':
      return 'white';

    case 'outline':
      return 'primary';

    case 'ghost':
      return 'primary';

    default:
      return 'primary';
  }
};

const getLoaderColor = (variant: ButtonVariant) => {
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
  base: {
    minHeight: 48,
    borderRadius: theme.radius.md,
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
      backgroundColor: theme.colors.transparent,
      borderWidth: 1,
      borderColor: theme.colors.primary,
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
      minHeight: 40,
      paddingHorizontal: theme.spacing.md,
    },

    medium: {
      minHeight: 48,
      paddingHorizontal: theme.spacing.xl,
    },

    large: {
      minHeight: 56,
      paddingHorizontal: theme.spacing.xxl,
    },
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    textAlign: 'center',
  },

  fullWidth: {
    width: '100%',
  },

  disabled: {
    opacity: 0.5,
  },

  pressed: {
    opacity: 0.8,
  },
});

export default AppButton;
