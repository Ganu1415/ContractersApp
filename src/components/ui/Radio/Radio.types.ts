import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface AppRadioProps {
  selected: boolean;

  onChange: () => void;

  label?: string;

  helperText?: string;

  error?: string;

  disabled?: boolean;

  size?: 'small' | 'medium' | 'large';

  rightContent?: ReactNode;

  style?: ViewStyle;

  testID?: string;
}
