import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { theme } from '../../../theme';

import { AppCardProps, CardPadding, CardVariant } from './Card.types';

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

  const Container = isPressable ? Pressable : View;

  return (
    <Container
      {...(isPressable ? rest : {})}
      {...(isPressable ? { onPress } : {})}
      disabled={disabled}
      style={({ pressed }: any) => [
        styles.base,
        styles.variant[variant],
        styles.padding[padding],
        styles.radius[radius],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}
    >
      <View style={contentStyle}>{children}</View>
    </Container>
  );
};

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },

  variant: {
    default: {
      backgroundColor: theme.colors.surface,
    },

    outlined: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },

    elevated: {
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

    filled: {
      backgroundColor: theme.colors.background,
    },
  },

  padding: {
    none: {
      padding: 0,
    },

    small: {
      padding: theme.spacing.md,
    },

    medium: {
      padding: theme.spacing.lg,
    },

    large: {
      padding: theme.spacing.xxl,
    },
  },

  radius: {
    small: {
      borderRadius: theme.radius.sm,
    },

    medium: {
      borderRadius: theme.radius.md,
    },

    large: {
      borderRadius: theme.radius.lg,
    },
  },

  fullWidth: {
    width: '100%',
  },

  disabled: {
    opacity: 0.5,
  },

  pressed: {
    opacity: 0.85,
  },
});

export default AppCard;
