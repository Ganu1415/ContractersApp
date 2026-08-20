import React, { useMemo, useState } from 'react';

import { Pressable, StyleSheet, View } from 'react-native';

import { FormField } from '../FormField';

import { FormSelectProps, SelectOption } from './FormSelect.types';
import { AppIcon, AppModal, AppText } from '@ContractorApp/src/components/ui';
import { theme } from '@ContractorApp/src/theme';

const FormSelect = <T,>({
  label,
  required = false,
  error,
  helperText,
  value,
  options,
  placeholder = 'Select',
  disabled = false,
  onChange,
  containerStyle,
  renderOption,
}: FormSelectProps<T>) => {
  const [visible, setVisible] = useState(false);

  const selectedOption = useMemo(
    () => options.find(option => option.value === value),
    [options, value],
  );

  const handleSelect = (option: SelectOption<T>) => {
    if (option.disabled) {
      return;
    }

    onChange?.(option.value);

    setVisible(false);
  };

  return (
    <FormField
      label={label}
      required={required}
      error={error}
      helperText={helperText}
      style={containerStyle}
    >
      <Pressable
        disabled={disabled}
        onPress={() => setVisible(true)}
        accessibilityRole="button"
        accessibilityLabel={label ?? placeholder}
        accessibilityState={{
          disabled,
          expanded: visible,
        }}
        style={[
          styles.input,
          error && styles.error,
          disabled && styles.disabled,
        ]}
      >
        <AppText
          variant="body"
          color={selectedOption ? 'primary' : 'tertiary'}
          style={styles.value}
        >
          {selectedOption?.label ?? placeholder}
        </AppText>

        <AppIcon
          name="arrow-down"
          size="small"
          color={disabled ? 'tertiary' : 'secondary'}
        />
      </Pressable>

      <AppModal
        visible={visible}
        onClose={() => setVisible(false)}
        title={label ?? 'Select'}
        position="bottom"
        size="full"
        showCloseButton
      >
        <View>
          {options.map(option => (
            <Pressable
              key={String(option.value)}
              disabled={option.disabled}
              onPress={() => handleSelect(option)}
              style={[
                styles.option,
                option.disabled && styles.optionDisabled,
                selectedOption?.value === option.value && styles.selectedOption,
              ]}
            >
              {renderOption ? (
                renderOption(option)
              ) : (
                <>
                  <AppText
                    variant="body"
                    color={option.disabled ? 'tertiary' : 'primary'}
                    style={styles.optionText}
                  >
                    {option.label}
                  </AppText>

                  {selectedOption?.value === option.value && (
                    <AppIcon name="check" size="small" color="primary" />
                  )}
                </>
              )}
            </Pressable>
          ))}
        </View>
      </AppModal>
    </FormField>
  );
};

const styles = StyleSheet.create({
  input: {
    minHeight: 48,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    paddingHorizontal: theme.spacing.md,

    backgroundColor: theme.colors.surface,

    borderWidth: 1,

    borderColor: theme.colors.border,

    borderRadius: theme.radius.md,
  },

  value: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },

  error: {
    borderColor: theme.colors.error,
  },

  disabled: {
    backgroundColor: theme.colors.background,

    opacity: 0.6,
  },

  option: {
    minHeight: 52,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    paddingHorizontal: theme.spacing.md,

    paddingVertical: theme.spacing.sm,

    borderBottomWidth: 1,

    borderBottomColor: theme.colors.border,
  },

  selectedOption: {
    backgroundColor: theme.colors.primaryLight,
  },

  optionDisabled: {
    opacity: 0.5,
  },

  optionText: {
    flex: 1,
  },
});

export default FormSelect;
