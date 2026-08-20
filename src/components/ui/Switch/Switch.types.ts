import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface AppSwitchProps {
  value: boolean;

  onChange: (value: boolean) => void;

  label?: string;

  helperText?: string;

  disabled?: boolean;

  loading?: boolean;

  size?: 'small' | 'medium' | 'large';

  rightContent?: ReactNode;

  style?: ViewStyle;

  testID?: string;

  accessibilityLabel?: string;
}
