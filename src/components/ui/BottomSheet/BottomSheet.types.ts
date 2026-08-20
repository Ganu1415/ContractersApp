import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

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

  height?: 'auto' | 'small' | 'medium' | 'large' | 'full';

  footer?: ReactNode;

  loading?: boolean;

  style?: ViewStyle;

  testID?: string;

  accessibilityLabel?: string;
}
