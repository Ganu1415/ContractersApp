import { ViewStyle } from 'react-native';

export type DividerOrientation = 'horizontal' | 'vertical';

export type DividerSpacing = 'none' | 'small' | 'medium' | 'large';

export interface AppDividerProps {
  orientation?: DividerOrientation;

  thickness?: number;

  color?: string;

  spacing?: DividerSpacing;

  style?: ViewStyle;

  testID?: string;
}
