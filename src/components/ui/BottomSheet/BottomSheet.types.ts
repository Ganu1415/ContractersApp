import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export type BottomSheetHeight = 'auto' | 'small' | 'medium' | 'large' | 'full';
export interface AppBottomSheetProps {
  visible: boolean;

  onClose: () => void;

  children: ReactNode;

  title?: string;

  subtitle?: string;

  showHandle?: boolean;

  showCloseButton?: boolean;

  closeOnBackdropPress?: boolean;

  closeOnBackButton?: boolean;

  height?: BottomSheetHeight;

  footer?: ReactNode;

  loading?: boolean;

  style?: ViewStyle;

  testID?: string;

  accessibilityLabel?: string;
}
