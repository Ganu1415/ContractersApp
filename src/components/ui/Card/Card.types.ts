import { ReactNode } from 'react';
import { PressableProps, ViewStyle } from 'react-native';

export type CardVariant = 'default' | 'outlined' | 'elevated' | 'filled';

export type CardPadding = 'none' | 'small' | 'medium' | 'large';

export interface AppCardProps extends Omit<PressableProps, 'style'> {
  children: ReactNode;

  variant?: CardVariant;
  padding?: CardPadding;

  radius?: 'small' | 'medium' | 'large';

  fullWidth?: boolean;

  disabled?: boolean;

  style?: ViewStyle;
  contentStyle?: ViewStyle;
}
