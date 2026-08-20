import React from 'react';

import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import { theme } from '../../../theme';

import { AppButton } from '../Button';
import { AppIcon, IconName } from '../Icon';
import { AppText } from '../Text';

import { AppAlertProps, AlertType } from './Alert.types';

const iconMap: Record<AlertType, IconName> = {
  info: 'info',
  success: 'check-circle',
  warning: 'alert-triangle',
  error: 'x',
};

const AppAlert = ({
  visible,
  title,
  message,
  type = 'info',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  loading = false,
  icon,
  destructive = false,
  closeOnBackdropPress = false,
  testID,
}: AppAlertProps) => {
  const handleCancel = () => {
    if (loading) {
      return;
    }

    onCancel?.();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <View testID={testID} style={styles.overlay}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => {
            if (closeOnBackdropPress && !loading) {
              onCancel?.();
            }
          }}
        />

        <View accessible accessibilityRole="alert" style={styles.container}>
          <View style={styles.iconContainer}>
            {icon ?? (
              <AppIcon
                name={iconMap[type]}
                size="large"
                color={destructive || type === 'error' ? 'error' : 'primary'}
              />
            )}
          </View>

          <AppText variant="h3" align="center">
            {title}
          </AppText>

          {message && (
            <AppText
              variant="body"
              color="secondary"
              align="center"
              style={styles.message}
            >
              {message}
            </AppText>
          )}

          <View style={styles.actions}>
            {onCancel && (
              <AppButton
                title={cancelText}
                variant="outline"
                onPress={handleCancel}
                disabled={loading}
                style={styles.action}
              />
            )}

            <AppButton
              title={loading ? '' : confirmText}
              variant={destructive ? 'danger' : 'primary'}
              onPress={onConfirm}
              disabled={loading}
              style={styles.action}
              leftIcon={
                loading ? (
                  <ActivityIndicator size="small" color={theme.colors.white} />
                ) : undefined
              }
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',

    padding: theme.spacing.lg,

    backgroundColor: 'rgba(0,0,0,0.45)',
  },

  container: {
    width: '100%',
    maxWidth: 420,

    padding: theme.spacing.xl,

    borderRadius: theme.radius.xl,

    backgroundColor: theme.colors.surface,
  },

  iconContainer: {
    alignItems: 'center',

    marginBottom: theme.spacing.md,
  },

  message: {
    marginTop: theme.spacing.sm,
  },

  actions: {
    flexDirection: 'row',

    gap: theme.spacing.sm,

    marginTop: theme.spacing.xl,
  },

  action: {
    flex: 1,
  },
});

export default AppAlert;
