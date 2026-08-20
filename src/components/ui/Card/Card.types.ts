import { ReactNode } from 'react';
import { PressableProps, ViewStyle } from 'react-native';

export type CardVariant = 'default' | 'outlined' | 'elevated' | 'filled';

export type CardPadding = 'none' | 'small' | 'medium' | 'large';
export type CardRadius = 'small' | 'medium' | 'large';

export interface AppCardProps extends Omit<PressableProps, 'style'> {
  children: ReactNode;

  variant?: CardVariant;
  padding?: CardPadding;

  radius?: CardRadius;

  fullWidth?: boolean;

  disabled?: boolean;

  style?: ViewStyle;
  contentStyle?: ViewStyle;
}
