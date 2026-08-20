import React from 'react';

import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import { theme } from '../../../theme';

import { AppIcon } from '../Icon';
import { AppText } from '../Text';

import { AppModalProps, ModalPosition, ModalSize } from './Modal.types';

const sizeMap: Record<ModalSize, string> = {
  small: '70%',
  medium: '85%',
  large: '92%',
  full: '100%',
};

const AppModal = ({
  visible,
  onClose,
  title,
  subtitle,
  children,
  size = 'medium',
  position = 'center',
  showCloseButton = true,
  closeOnBackdropPress = true,
  closeOnBackButton = true,
  loading = false,
  footer,
  style,
  testID,
  accessibilityLabel,
  onRequestClose,
}: AppModalProps) => {
  const handleRequestClose = () => {
    if (!closeOnBackButton) {
      return;
    }

    onRequestClose?.();

    onClose();
  };

  const handleBackdropPress = () => {
    if (!closeOnBackdropPress) {
      return;
    }

    onClose();
  };

  const isBottom = position === 'bottom';

  return (
    <Modal
      visible={visible}
      transparent
      animationType={isBottom ? 'slide' : 'fade'}
      onRequestClose={handleRequestClose}
      statusBarTranslucent
    >
      <View testID={testID} style={styles.overlay}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={handleBackdropPress}
          accessibilityLabel="Close modal"
        />

        <View
          accessible
          accessibilityRole="alert"
          accessibilityLabel={accessibilityLabel ?? title ?? 'Dialog'}
          style={[
            styles.modal,

            isBottom ? styles.bottomModal : styles.centerModal,

            {
              width: sizeMap[size],
            },

            size === 'full' && styles.fullModal,

            style,
          ]}
        >
          {loading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
          )}

          {(title || subtitle || showCloseButton) && (
            <View style={styles.header}>
              <View style={styles.titleContainer}>
                {title && <AppText variant="h3">{title}</AppText>}

                {subtitle && (
                  <AppText
                    variant="bodySmall"
                    color="secondary"
                    style={styles.subtitle}
                  >
                    {subtitle}
                  </AppText>
                )}
              </View>

              {showCloseButton && (
                <Pressable
                  onPress={onClose}
                  hitSlop={10}
                  accessibilityRole="button"
                  accessibilityLabel="Close"
                  style={styles.closeButton}
                >
                  <AppIcon name="x" size="medium" color="text" />
                </Pressable>
              )}
            </View>
          )}

          <View style={styles.content}>{children}</View>

          {footer && <View style={styles.footer}>{footer}</View>}
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

    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },

  modal: {
    maxHeight: '90%',

    backgroundColor: theme.colors.surface,

    borderRadius: theme.radius.xl,

    overflow: 'hidden',
  },

  centerModal: {
    alignSelf: 'center',
  },

  bottomModal: {
    position: 'absolute',

    bottom: 0,

    alignSelf: 'center',

    width: '100%',

    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,

    borderTopLeftRadius: theme.radius.xl,

    borderTopRightRadius: theme.radius.xl,
  },

  fullModal: {
    height: '100%',
    maxHeight: '100%',

    borderRadius: 0,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',

    paddingHorizontal: theme.spacing.lg,

    paddingTop: theme.spacing.lg,

    paddingBottom: theme.spacing.md,

    borderBottomWidth: 1,

    borderBottomColor: theme.colors.border,
  },

  titleContainer: {
    flex: 1,
  },

  subtitle: {
    marginTop: theme.spacing.xs,
  },

  closeButton: {
    width: 36,
    height: 36,

    alignItems: 'center',
    justifyContent: 'center',

    marginLeft: theme.spacing.sm,
  },

  content: {
    padding: theme.spacing.lg,
  },

  footer: {
    padding: theme.spacing.lg,

    borderTopWidth: 1,

    borderTopColor: theme.colors.border,
  },

  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,

    zIndex: 10,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(255,255,255,0.65)',
  },
});

export default AppModal;
