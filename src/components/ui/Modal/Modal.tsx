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

/**
 * Modal width mapping
 */
const sizeStyles: Record<ModalSize, object> = {
  small: {
    width: '70%',
  },

  medium: {
    width: '85%',
  },

  large: {
    width: '92%',
  },

  full: {
    width: '100%',
  },
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
  const isBottom = position === 'bottom';

  /**
   * Android back button
   */
  const handleRequestClose = (event: any) => {
    if (!closeOnBackButton) {
      return;
    }

    onRequestClose?.(event);

    onClose();
  };

  /**
   * Backdrop press
   */
  const handleBackdropPress = () => {
    if (!closeOnBackdropPress) {
      return;
    }

    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType={isBottom ? 'slide' : 'fade'}
      onRequestClose={handleRequestClose}
      statusBarTranslucent
    >
      <View
        testID={testID}
        style={[styles.overlay, isBottom && styles.bottomOverlay]}
      >
        {/* Backdrop */}
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={handleBackdropPress}
          accessibilityRole="button"
          accessibilityLabel="Close modal"
        />

        {/* Modal */}
        <View
          accessible
          accessibilityLabel={accessibilityLabel ?? title ?? 'Dialog'}
          style={[
            styles.modal,

            isBottom ? styles.bottomModal : styles.centerModal,

            sizeStyles[size],

            size === 'full' && styles.fullModal,

            style,
          ]}
        >
          {/* Loading */}
          {loading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
          )}

          {/* Header */}
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

          {/* Content */}
          <View style={styles.content}>{children}</View>

          {/* Footer */}
          {footer && <View style={styles.footer}>{footer}</View>}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  /**
   * Overlay
   */
  overlay: {
    flex: 1,

    alignItems: 'center',

    justifyContent: 'center',

    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },

  /**
   * Bottom overlay
   */
  bottomOverlay: {
    justifyContent: 'flex-end',
  },

  /**
   * Base modal
   */
  modal: {
    maxHeight: '90%',

    backgroundColor: theme.colors.surface,

    borderRadius: theme.radius.xl,

    overflow: 'hidden',
  },

  /**
   * Center modal
   */
  centerModal: {
    alignSelf: 'center',
  },

  /**
   * Bottom modal
   */
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

  /**
   * Full-screen modal
   */
  fullModal: {
    height: '100%',

    maxHeight: '100%',

    borderRadius: 0,
  },

  /**
   * Header
   */
  header: {
    flexDirection: 'row',

    alignItems: 'flex-start',

    paddingHorizontal: theme.spacing.lg,

    paddingTop: theme.spacing.lg,

    paddingBottom: theme.spacing.md,

    borderBottomWidth: 1,

    borderBottomColor: theme.colors.border,
  },

  /**
   * Title
   */
  titleContainer: {
    flex: 1,
  },

  /**
   * Subtitle
   */
  subtitle: {
    marginTop: theme.spacing.xs,
  },

  /**
   * Close button
   */
  closeButton: {
    width: 36,

    height: 36,

    alignItems: 'center',

    justifyContent: 'center',

    marginLeft: theme.spacing.sm,
  },

  /**
   * Content
   */
  content: {
    padding: theme.spacing.lg,
  },

  /**
   * Footer
   */
  footer: {
    padding: theme.spacing.lg,

    borderTopWidth: 1,

    borderTopColor: theme.colors.border,
  },

  /**
   * Loading overlay
   *
   * IMPORTANT:
   * Do not use absoluteFillObject.
   * Latest RN typings support absoluteFill.
   */
  loadingOverlay: {
    ...StyleSheet.absoluteFill,

    zIndex: 10,

    alignItems: 'center',

    justifyContent: 'center',

    backgroundColor: 'rgba(255,255,255,0.65)',
  },
});

export default AppModal;
