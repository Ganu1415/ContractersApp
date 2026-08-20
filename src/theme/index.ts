import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { radius } from './radius';

export const theme = {
  colors,
  typography,
  spacing,
  radius,
};

export type AppTheme = typeof theme;

export * from './colors';
export * from './typography';
export * from './spacing';
export * from './radius';
