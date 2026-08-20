import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface AppSelectProps<T = string> {
  value?: T;

  options: SelectOption<T>[];

  onChange: (value: T | undefined) => void;

  label?: string;

  placeholder?: string;

  helperText?: string;

  error?: string;

  disabled?: boolean;

  loading?: boolean;

  searchable?: boolean;

  clearable?: boolean;

  searchPlaceholder?: string;

  emptyMessage?: string;

  size?: 'small' | 'medium' | 'large';

  renderOption?: (option: SelectOption<T>) => ReactNode;

  style?: ViewStyle;

  testID?: string;

  accessibilityLabel?: string;
}
