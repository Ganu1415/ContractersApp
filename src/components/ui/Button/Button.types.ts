import { ReactNode } from 'react';
import { PressableProps, ViewStyle } from 'react-native';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'success';

export type ButtonSize = 'small' | 'medium' | 'large';

export interface AppButtonProps extends Omit<PressableProps, 'style'> {
  title: string;

  variant?: ButtonVariant;
  size?: ButtonSize;

  loading?: boolean;
  fullWidth?: boolean;

  leftIcon?: ReactNode;
  rightIcon?: ReactNode;

  style?: ViewStyle;
}
