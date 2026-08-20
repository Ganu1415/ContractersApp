import React from 'react';

import { Pressable, StyleSheet, View } from 'react-native';

import { theme } from '../../../theme';
import { AppIcon } from '../Icon';
import { AppText } from '../Text';

import { AppCheckboxProps } from './Checkbox.types';

const sizeMap = {
  small: 18,
  medium: 22,
  large: 26,
};

const AppCheckbox = ({
  checked,
  onChange,
  label,
  helperText,
  error,
  disabled = false,
  indeterminate = false,
  size = 'medium',
  rightContent,
  style,
  testID,
}: AppCheckboxProps) => {
  const checkboxSize = sizeMap[size];

  const handlePress = () => {
    if (disabled) {
      return;
    }

    onChange(!checked);
  };

  const isActive = checked || indeterminate;

  return (
    <View testID={testID} style={[styles.container, style]}>
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        accessibilityRole="checkbox"
        accessibilityState={{
          checked: indeterminate ? 'mixed' : checked,
          disabled,
        }}
        style={({ pressed }) => [
          styles.row,
          pressed && !disabled && styles.pressed,
        ]}
      >
        <View
          style={[
            styles.checkbox,
            {
              width: checkboxSize,
              height: checkboxSize,
              borderRadius: theme.radius.xs,
            },
            isActive && styles.checked,
            error && styles.error,
            disabled && styles.disabled,
          ]}
        >
          {indeterminate ? (
            <View
              style={[
                styles.indeterminate,
                {
                  width: checkboxSize * 0.5,
                },
              ]}
            />
          ) : checked ? (
            <AppIcon
              name="check"
              size={size === 'small' ? 14 : 17}
              color="white"
              strokeWidth={3}
            />
          ) : null}
        </View>

        {label && (
          <View style={styles.labelContainer}>
            <AppText variant="body" color={disabled ? 'tertiary' : 'primary'}>
              {label}
            </AppText>

            {helperText && !error && (
              <AppText variant="caption" color="secondary">
                {helperText}
              </AppText>
            )}

            {error && (
              <AppText variant="caption" color="error">
                {error}
              </AppText>
            )}
          </View>
        )}

        {rightContent && (
          <View style={styles.rightContent}>{rightContent}</View>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

  row: {
    minHeight: 44,

    flexDirection: 'row',
    alignItems: 'center',
  },

  checkbox: {
    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1.5,
    borderColor: theme.colors.border,

    backgroundColor: theme.colors.surface,
  },

  checked: {
    backgroundColor: theme.colors.primary,

    borderColor: theme.colors.primary,
  },

  error: {
    borderColor: theme.colors.error,
  },

  disabled: {
    opacity: 0.5,
  },

  pressed: {
    opacity: 0.75,
  },

  indeterminate: {
    height: 2,

    backgroundColor: theme.colors.white,

    borderRadius: 1,
  },

  labelContainer: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },

  rightContent: {
    marginLeft: theme.spacing.md,
  },
});

export default AppCheckbox;
