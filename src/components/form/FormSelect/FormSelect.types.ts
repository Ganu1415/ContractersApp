import React from 'react';

import { StyleProp, ViewStyle } from 'react-native';

export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

export interface FormSelectProps<T = string> {
  label?: string;

  required?: boolean;

  error?: string;

  helperText?: string;

  value?: T;

  options: SelectOption<T>[];

  placeholder?: string;

  disabled?: boolean;

  onChange?: (value: T | undefined) => void;

  containerStyle?: StyleProp<ViewStyle>;

  renderOption?: (option: SelectOption<T>) => React.ReactNode;
}
