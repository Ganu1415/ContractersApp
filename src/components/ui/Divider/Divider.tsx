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
      accessible={false}
      style={[
        isHorizontal ? styles.horizontal : styles.vertical,

        isHorizontal
          ? horizontalSpacingStyles[spacing]
          : verticalSpacingStyles[spacing],

        {
          backgroundColor: color,

          ...(isHorizontal
            ? {
                height: thickness,
              }
            : {
                width: thickness,
              }),
        },

        style,
      ]}
    />
  );
};

/**
 * Base orientation styles
 */
const styles = StyleSheet.create({
  horizontal: {
    width: '100%',
  },

  vertical: {
    height: '100%',
  },

  /**
   * Horizontal spacing
   */
  horizontalSpacingNone: {},

  horizontalSpacingSmall: {
    marginVertical: theme.spacing.sm,
  },

  horizontalSpacingMedium: {
    marginVertical: theme.spacing.md,
  },

  horizontalSpacingLarge: {
    marginVertical: theme.spacing.xl,
  },

  /**
   * Vertical spacing
   */
  verticalSpacingNone: {},

  verticalSpacingSmall: {
    marginHorizontal: theme.spacing.sm,
  },

  verticalSpacingMedium: {
    marginHorizontal: theme.spacing.md,
  },

  verticalSpacingLarge: {
    marginHorizontal: theme.spacing.xl,
  },
});

/**
 * Horizontal spacing mapping
 */
const horizontalSpacingStyles = {
  none: styles.horizontalSpacingNone,

  small: styles.horizontalSpacingSmall,

  medium: styles.horizontalSpacingMedium,

  large: styles.horizontalSpacingLarge,
};

/**
 * Vertical spacing mapping
 */
const verticalSpacingStyles = {
  none: styles.verticalSpacingNone,

  small: styles.verticalSpacingSmall,

  medium: styles.verticalSpacingMedium,

  large: styles.verticalSpacingLarge,
};

export default AppDivider;
