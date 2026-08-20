import React from 'react';
import { StyleSheet, Text as RNText } from 'react-native';

import { theme } from '../../../theme';
import { AppTextProps, TextColor, TextVariant } from './Text.types';

const AppText = ({
  variant = 'body',
  color = 'primary',
  style,
  children,
  ...rest
}: AppTextProps) => {
  return (
    <RNText
      style={[
        styles.base,
        theme.typography[variant],
        {
          color: theme.colors[colorMap[color]],
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
};

const colorMap: Record<TextColor, keyof typeof theme.colors> = {
  primary: 'text',
  secondary: 'textSecondary',
  tertiary: 'textTertiary',
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
  white: 'white',
  black: 'black',
};

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
  },
});

export default AppText;
