import { TextInputProps, StyleProp, ViewStyle } from 'react-native';

export interface FormInputProps extends Omit<TextInputProps, 'style'> {
  label?: string;

  required?: boolean;

  error?: string;

  helperText?: string;

  containerStyle?: StyleProp<ViewStyle>;
}
