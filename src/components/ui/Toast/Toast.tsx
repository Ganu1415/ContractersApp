import React, { useEffect } from 'react';

import { Pressable, StyleSheet, View } from 'react-native';

import { theme } from '../../../theme';

import { AppIcon, IconName } from '../Icon';
import { AppText } from '../Text';

import { AppToastProps, ToastType } from './Toast.types';

const iconMap: Record<ToastType, IconName> = {
  success: 'check-circle',
  error: 'x',
  warning: 'alert-triangle',
  info: 'info',
};

const colorMap: Record<ToastType, string> = {
  success: theme.colors.success,
  error: theme.colors.error,
  warning: theme.colors.warning,
  info: theme.colors.primary,
};

const AppToast = ({
  visible,
  message,
  type = 'info',
  title,
  duration = 3000,
  onHide,
  icon,
  testID,
}: AppToastProps) => {
  useEffect(() => {
    if (!visible || !onHide) {
      return;
    }

    const timer = setTimeout(() => {
      onHide();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [visible, duration, onHide]);

  if (!visible) {
    return null;
  }

  const color = colorMap[type];

  return (
    <View testID={testID} pointerEvents="box-none" style={styles.wrapper}>
      <View
        style={[
          styles.container,
          {
            borderLeftColor: color,
          },
        ]}
      >
        {icon ?? (
          <AppIcon
            name={iconMap[type]}
            size="medium"
            color={type === 'error' ? 'error' : 'primary'}
          />
        )}

        <View style={styles.content}>
          {title && <AppText variant="label">{title}</AppText>}

          <AppText variant="bodySmall" color="primary">
            {message}
          </AppText>
        </View>

        {onHide && (
          <Pressable
            onPress={onHide}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Dismiss notification"
          >
            <AppIcon name="x" size="small" color="secondary" />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',

    top: 16,
    left: 16,
    right: 16,

    zIndex: 9999,
  },

  container: {
    minHeight: 56,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: theme.spacing.md,

    paddingVertical: theme.spacing.sm,

    borderLeftWidth: 4,

    borderRadius: theme.radius.md,

    backgroundColor: theme.colors.surface,

    elevation: 6,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },

  content: {
    flex: 1,

    marginHorizontal: theme.spacing.sm,
  },
});

export default AppToast;
