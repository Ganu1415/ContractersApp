import { ReactNode } from 'react';

export type AlertType = 'info' | 'success' | 'warning' | 'error';

export interface AppAlertProps {
  visible: boolean;

  title: string;

  message?: string;

  type?: AlertType;

  confirmText?: string;

  cancelText?: string;

  onConfirm: () => void;

  onCancel?: () => void;

  loading?: boolean;

  icon?: ReactNode;

  destructive?: boolean;

  closeOnBackdropPress?: boolean;

  testID?: string;
}
