import { ReactNode } from 'react';
import {
  KeyboardTypeOptions,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

export type InputSize = 'small' | 'medium' | 'large';

export interface AppInputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  required?: boolean;

  error?: string;
  helperText?: string;

  leftIcon?: ReactNode;
  rightIcon?: ReactNode;

  size?: InputSize;
  fullWidth?: boolean;

  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;

  keyboardType?: KeyboardTypeOptions;
}
