import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface AppCheckboxProps {
  checked: boolean;

  onChange: (checked: boolean) => void;

  label?: string;
  helperText?: string;
  error?: string;

  disabled?: boolean;

  indeterminate?: boolean;

  size?: 'small' | 'medium' | 'large';

  rightContent?: ReactNode;

  style?: ViewStyle;

  testID?: string;
}
