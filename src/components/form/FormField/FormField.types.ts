import React from 'react';

import { StyleProp, ViewStyle } from 'react-native';

export interface FormFieldProps {
  label?: string;

  required?: boolean;

  error?: string;

  helperText?: string;

  children: React.ReactNode;

  style?: StyleProp<ViewStyle>;

  testID?: string;
}
