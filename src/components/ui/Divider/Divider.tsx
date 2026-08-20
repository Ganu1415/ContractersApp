import React from 'react';

import { StyleSheet, View } from 'react-native';

import { theme } from '../../../theme';

import { AppDividerProps } from './Divider.types';

const AppDivider = ({
  orientation = 'horizontal',
  thickness = 1,
  color = theme.colors.divider,
  spacing = 'medium',
  style,
  testID,
}: AppDividerProps) => {
  const isHorizontal = orientation === 'horizontal';

  return (
    <View
      testID={testID}
      accessibilityRole="none"
      style={[
        styles.base,

        isHorizontal ? styles.horizontal : styles.vertical,

        {
          backgroundColor: color,

          ...(isHorizontal ? { height: thickness } : { width: thickness }),
        },

        isHorizontal
          ? styles.horizontalSpacing[spacing]
          : styles.verticalSpacing[spacing],

        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  base: {},

  horizontal: {
    width: '100%',
  },

  vertical: {
    height: '100%',
  },

  horizontalSpacing: {
    none: {},

    small: {
      marginVertical: theme.spacing.sm,
    },

    medium: {
      marginVertical: theme.spacing.md,
    },

    large: {
      marginVertical: theme.spacing.xl,
    },
  },

  verticalSpacing: {
    none: {},

    small: {
      marginHorizontal: theme.spacing.sm,
    },

    medium: {
      marginHorizontal: theme.spacing.md,
    },

    large: {
      marginHorizontal: theme.spacing.xl,
    },
  },
});

export default AppDivider;
