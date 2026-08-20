import React from 'react';

import { StyleSheet, View } from 'react-native';

import { theme } from '../../../theme';

import { AppText } from '../../ui/Text';

import { FormFieldProps } from './FormField.types';

const FormField = ({
  label,
  required = false,
  error,
  helperText,
  children,
  style,
  testID,
}: FormFieldProps) => {
  const hasError = Boolean(error);

  return (
    <View testID={testID} style={[styles.container, style]}>
      {/* Label */}
      {label && (
        <View style={styles.labelContainer}>
          <AppText variant="label">{label}</AppText>

          {required && (
            <AppText variant="label" color="error">
              {' *'}
            </AppText>
          )}
        </View>
      )}

      {/* Field */}
      {children}

      {/* Error */}
      {hasError ? (
        <AppText
          variant="caption"
          color="error"
          style={styles.message}
          accessibilityRole="alert"
        >
          {error}
        </AppText>
      ) : helperText ? (
        <AppText variant="caption" color="secondary" style={styles.message}>
          {helperText}
        </AppText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
  },

  labelContainer: {
    flexDirection: 'row',

    marginBottom: theme.spacing.sm,
  },

  message: {
    marginTop: theme.spacing.xs,
  },
});

export default FormField;
