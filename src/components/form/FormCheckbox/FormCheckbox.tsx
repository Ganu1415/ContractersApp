import React from 'react';

import { Pressable, StyleSheet, View } from 'react-native';

import { FormCheckboxProps } from './FormCheckbox.types';
import { AppIcon, AppText } from '@ContractorApp/src/components/ui';
import { theme } from '@ContractorApp/src/theme';

const FormCheckbox = ({
  label,
  description,
  checked,
  onChange,
  disabled = false,
  error,
  containerStyle,
  testID,
  accessibilityLabel,
}: FormCheckboxProps) => {
  const handlePress = () => {
    if (disabled) {
      return;
    }

    onChange(!checked);
  };

  return (
    <View
      testID={testID}
      style={[styles.container, disabled && styles.disabled, containerStyle]}
    >
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        accessibilityRole="checkbox"
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityState={{
          checked,
          disabled,
        }}
        style={({ pressed }) => [
          styles.row,
          pressed && !disabled && styles.pressed,
        ]}
      >
        {/* Checkbox */}
        <View
          style={[
            styles.checkbox,
            checked && styles.checkboxChecked,
            error && !checked && styles.checkboxError,
          ]}
        >
          {checked && (
            <AppIcon name="check" size="small" color="white" strokeWidth={3} />
          )}
        </View>

        {/* Content */}
        <View style={styles.content}>
          <AppText variant="bodyMedium" color="primary">
            {label}
          </AppText>

          {description && (
            <AppText
              variant="caption"
              color="secondary"
              style={styles.description}
            >
              {description}
            </AppText>
          )}
        </View>
      </Pressable>

      {/* Error */}
      {error && (
        <AppText variant="caption" color="error" style={styles.error}>
          {error}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },

  row: {
    flexDirection: 'row',

    alignItems: 'center',

    minHeight: 44,
  },

  checkbox: {
    width: 22,
    height: 22,

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 2,

    borderColor: theme.colors.border,

    borderRadius: theme.radius.sm,

    backgroundColor: theme.colors.surface,
  },

  checkboxChecked: {
    backgroundColor: theme.colors.primary,

    borderColor: theme.colors.primary,
  },

  checkboxError: {
    borderColor: theme.colors.error,
  },

  content: {
    flex: 1,

    marginLeft: theme.spacing.md,
  },

  description: {
    marginTop: theme.spacing.xs,
  },

  error: {
    marginTop: theme.spacing.xs,

    marginLeft: 34,
  },

  disabled: {
    opacity: 0.5,
  },

  pressed: {
    opacity: 0.7,
  },
});

export default FormCheckbox;
