import { ReactNode } from 'react';
import { IconName } from '../Icon';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface AppToastProps {
  visible: boolean;

  message: string;

  type?: ToastType;

  title?: string;

  duration?: number;

  onHide?: () => void;

  icon?: ReactNode;

  testID?: string;
}
