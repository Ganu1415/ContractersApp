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
      style={[styles.base, styles.variant[variant], styles.size[size], style]}
    >
      {leftIcon && <View style={styles.icon}>{leftIcon}</View>}

      <AppText
        variant="caption"
        color={getTextColor(variant)}
        style={styles.text}
      >
        {label}
      </AppText>

      {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
    </View>
  );
};

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
  base: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',

    borderRadius: theme.radius.round,
  },

  variant: {
    default: {
      backgroundColor: theme.colors.background,
    },

    primary: {
      backgroundColor: theme.colors.primaryLight,
    },

    success: {
      backgroundColor: theme.colors.successLight,
    },

    warning: {
      backgroundColor: theme.colors.warningLight,
    },

    error: {
      backgroundColor: theme.colors.errorLight,
    },

    info: {
      backgroundColor: theme.colors.infoLight,
    },
  },

  size: {
    small: {
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: 3,
    },

    medium: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: 5,
    },

    large: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: 7,
    },
  },

  text: {
    fontWeight: '600',
  },

  icon: {
    marginHorizontal: 2,
  },
});

export default AppBadge;
