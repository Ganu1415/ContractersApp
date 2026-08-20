import { ReactNode } from 'react';
import { PressableProps, ViewStyle } from 'react-native';

export type IconButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'success';

export type IconButtonSize = 'small' | 'medium' | 'large';

export interface AppIconButtonProps extends Omit<PressableProps, 'style'> {
  icon: ReactNode;

  accessibilityLabel: string;

  variant?: IconButtonVariant;
  size?: IconButtonSize;

  loading?: boolean;

  disabled?: boolean;

  style?: ViewStyle;

  testID?: string;
}
