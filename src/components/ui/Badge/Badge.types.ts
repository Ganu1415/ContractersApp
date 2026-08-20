import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export type BadgeSize = 'small' | 'medium' | 'large';

export interface AppBadgeProps {
  label: string;

  variant?: BadgeVariant;
  size?: BadgeSize;

  leftIcon?: ReactNode;
  rightIcon?: ReactNode;

  style?: ViewStyle;

  testID?: string;
}
