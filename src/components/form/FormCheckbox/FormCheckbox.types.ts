import React from 'react';

import { StyleProp, ViewStyle } from 'react-native';

export interface FormCheckboxProps {
  label: string;

  description?: string;

  checked: boolean;

  onChange: (checked: boolean) => void;

  disabled?: boolean;

  error?: string;

  containerStyle?: StyleProp<ViewStyle>;

  testID?: string;

  accessibilityLabel?: string;

  children?: React.ReactNode;
}
