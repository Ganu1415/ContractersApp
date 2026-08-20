import React, { useMemo, useState } from 'react';

import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { theme } from '../../../theme';
import { AppIcon } from '../Icon';
import { AppText } from '../Text';

import { AppSelectProps, SelectOption } from './Select.types';

const AppSelect = <T extends string | number = string>({
  value,
  options,
  onChange,
  label,
  placeholder = 'Select an option',
  helperText,
  error,
  disabled = false,
  loading = false,
  searchable = false,
  clearable = false,
  searchPlaceholder = 'Search...',
  emptyMessage = 'No options found',
  renderOption,
  style,
  testID,
  accessibilityLabel,
}: AppSelectProps<T>) => {
  const [visible, setVisible] = useState(false);

  const [search, setSearch] = useState('');

  const selectedOption = options.find(option => option.value === value);

  const filteredOptions = useMemo(() => {
    if (!search.trim()) {
      return options;
    }

    const query = search.trim().toLowerCase();

    return options.filter(option => option.label.toLowerCase().includes(query));
  }, [options, search]);

  const openSelect = () => {
    if (disabled || loading) {
      return;
    }

    setSearch('');
    setVisible(true);
  };

  const closeSelect = () => {
    setVisible(false);
    setSearch('');
  };

  const handleSelect = (option: SelectOption<T>) => {
    if (option.disabled) {
      return;
    }

    onChange(option.value);
    closeSelect();
  };

  const handleClear = () => {
    // For clearable selects, parent should
    // decide how undefined is handled.
    onChange(undefined);
  };

  return (
    <View testID={testID} style={style}>
      {label && (
        <AppText variant="label" style={styles.label}>
          {label}
        </AppText>
      )}

      <Pressable
        onPress={openSelect}
        disabled={disabled || loading}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label ?? placeholder}
        style={[
          styles.field,
          error && styles.fieldError,
          disabled && styles.fieldDisabled,
        ]}
      >
        <View style={styles.valueContainer}>
          {selectedOption?.icon && (
            <View style={styles.leadingIcon}>{selectedOption.icon}</View>
          )}

          <AppText
            variant="body"
            color={selectedOption ? 'primary' : 'tertiary'}
            numberOfLines={1}
          >
            {selectedOption?.label ?? placeholder}
          </AppText>
        </View>

        {loading ? (
          <ActivityIndicator size="small" color={theme.colors.primary} />
        ) : clearable && selectedOption ? (
          <Pressable onPress={handleClear} hitSlop={8}>
            <AppIcon name="x" size="small" color="secondary" />
          </Pressable>
        ) : (
          <AppIcon name="arrow-down" size="small" color="secondary" />
        )}
      </Pressable>

      {error ? (
        <AppText variant="caption" color="error" style={styles.message}>
          {error}
        </AppText>
      ) : helperText ? (
        <AppText variant="caption" color="secondary" style={styles.message}>
          {helperText}
        </AppText>
      ) : null}

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={closeSelect}
      >
        <Pressable style={styles.overlay} onPress={closeSelect}>
          <Pressable
            style={styles.modal}
            onPress={event => event.stopPropagation()}
          >
            <View style={styles.header}>
              <AppText variant="h3">{label ?? 'Select'}</AppText>

              <Pressable onPress={closeSelect} hitSlop={8}>
                <AppIcon name="x" size="medium" color="text" />
              </Pressable>
            </View>

            {searchable && (
              <View style={styles.searchContainer}>
                <AppIcon name="search" size="medium" color="secondary" />

                <TextInput
                  value={search}
                  onChangeText={setSearch}
                  placeholder={searchPlaceholder}
                  placeholderTextColor={theme.colors.textTertiary}
                  style={styles.searchInput}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
              </View>
            )}

            {filteredOptions.length === 0 ? (
              <View style={styles.emptyContainer}>
                <AppText variant="body" color="secondary">
                  {emptyMessage}
                </AppText>
              </View>
            ) : (
              <FlatList
                data={filteredOptions}
                keyExtractor={item => String(item.value)}
                keyboardShouldPersistTaps="handled"
                renderItem={({ item }) => {
                  const isSelected = item.value === value;

                  return (
                    <Pressable
                      onPress={() => handleSelect(item)}
                      disabled={item.disabled}
                      style={[
                        styles.option,
                        isSelected && styles.selectedOption,
                        item.disabled && styles.optionDisabled,
                      ]}
                    >
                      {renderOption ? (
                        renderOption(item)
                      ) : (
                        <>
                          {item.icon && (
                            <View style={styles.optionIcon}>{item.icon}</View>
                          )}

                          <AppText
                            variant="body"
                            color={item.disabled ? 'tertiary' : 'primary'}
                            style={styles.optionLabel}
                          >
                            {item.label}
                          </AppText>

                          {isSelected && (
                            <AppIcon
                              name="check"
                              size="medium"
                              color="primary"
                            />
                          )}
                        </>
                      )}
                    </Pressable>
                  );
                }}
              />
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: theme.spacing.sm,
  },

  field: {
    minHeight: 48,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: theme.spacing.md,

    borderWidth: 1,
    borderColor: theme.colors.border,

    borderRadius: theme.radius.md,

    backgroundColor: theme.colors.surface,
  },

  fieldError: {
    borderColor: theme.colors.error,
  },

  fieldDisabled: {
    opacity: 0.5,
  },

  valueContainer: {
    flex: 1,

    flexDirection: 'row',
    alignItems: 'center',

    marginRight: theme.spacing.sm,
  },

  leadingIcon: {
    marginRight: theme.spacing.sm,
  },

  message: {
    marginTop: theme.spacing.xs,
  },

  overlay: {
    flex: 1,

    justifyContent: 'flex-end',

    backgroundColor: 'rgba(0,0,0,0.45)',
  },

  modal: {
    maxHeight: '80%',

    backgroundColor: theme.colors.surface,

    borderTopLeftRadius: theme.radius.xl,

    borderTopRightRadius: theme.radius.xl,

    padding: theme.spacing.lg,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: theme.spacing.md,
  },

  searchContainer: {
    height: 46,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: theme.spacing.md,

    borderWidth: 1,
    borderColor: theme.colors.border,

    borderRadius: theme.radius.md,

    marginBottom: theme.spacing.md,
  },

  searchInput: {
    flex: 1,

    marginLeft: theme.spacing.sm,

    color: theme.colors.text,

    fontSize: 15,
  },

  option: {
    minHeight: 48,

    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: theme.spacing.sm,

    paddingHorizontal: theme.spacing.sm,

    borderRadius: theme.radius.sm,
  },

  selectedOption: {
    backgroundColor: theme.colors.primaryLight,
  },

  optionDisabled: {
    opacity: 0.5,
  },

  optionIcon: {
    marginRight: theme.spacing.sm,
  },

  optionLabel: {
    flex: 1,
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: theme.spacing.xl,
  },
});

export default AppSelect;
