import React from 'react';

import { Pressable, StyleSheet, View } from 'react-native';

import { theme } from '../../../theme';
import { AppText } from '../Text';

import { AppRadioProps } from './Radio.types';

const sizeMap = {
  small: 18,
  medium: 22,
  large: 26,
};

const AppRadio = ({
  selected,
  onChange,
  label,
  helperText,
  error,
  disabled = false,
  size = 'medium',
  rightContent,
  style,
  testID,
}: AppRadioProps) => {
  const radioSize = sizeMap[size];

  return (
    <View testID={testID} style={[styles.container, style]}>
      <Pressable
        onPress={onChange}
        disabled={disabled}
        accessibilityRole="radio"
        accessibilityState={{
          selected,
          disabled,
        }}
        style={({ pressed }) => [
          styles.row,
          pressed && !disabled && styles.pressed,
        ]}
      >
        <View
          style={[
            styles.radio,
            {
              width: radioSize,
              height: radioSize,
              borderRadius: radioSize / 2,
            },

            selected && styles.selected,

            error && styles.error,

            disabled && styles.disabled,
          ]}
        >
          {selected && (
            <View
              style={[
                styles.dot,
                {
                  width: radioSize * 0.45,
                  height: radioSize * 0.45,
                  borderRadius: (radioSize * 0.45) / 2,
                },
              ]}
            />
          )}
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

  radio: {
    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 2,
    borderColor: theme.colors.border,

    backgroundColor: theme.colors.surface,
  },

  selected: {
    borderColor: theme.colors.primary,
  },

  error: {
    borderColor: theme.colors.error,
  },

  dot: {
    backgroundColor: theme.colors.primary,
  },

  disabled: {
    opacity: 0.5,
  },

  pressed: {
    opacity: 0.75,
  },

  labelContainer: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },

  rightContent: {
    marginLeft: theme.spacing.md,
  },
});

export default AppRadio;
