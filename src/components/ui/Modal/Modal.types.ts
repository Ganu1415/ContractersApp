import { ReactNode } from 'react';
import { ViewStyle, ModalProps as RNModalProps } from 'react-native';

export type ModalSize = 'small' | 'medium' | 'large' | 'full';

export type ModalPosition = 'center' | 'bottom';

export interface AppModalProps extends Pick<RNModalProps, 'onRequestClose'> {
  visible: boolean;

  onClose: () => void;

  title?: string;

  subtitle?: string;

  children: ReactNode;

  size?: ModalSize;

  position?: ModalPosition;

  showCloseButton?: boolean;

  closeOnBackdropPress?: boolean;

  closeOnBackButton?: boolean;

  loading?: boolean;

  footer?: ReactNode;

  style?: ViewStyle;

  testID?: string;

  accessibilityLabel?: string;
}
