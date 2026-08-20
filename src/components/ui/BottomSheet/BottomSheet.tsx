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

import { AppBottomSheetProps, BottomSheetHeight } from './BottomSheet.types';

/**
 * Bottom sheet height configuration.
 *
 * `auto` lets the sheet size itself based
 * on its content.
 */
const heightMap: Record<BottomSheetHeight, string | undefined> = {
  auto: undefined,
  small: '30%',
  medium: '50%',
  large: '75%',
  full: '95%',
};

const AppBottomSheet = ({
  visible,
  onClose,
  children,
  title,
  subtitle,
  showHandle = true,
  showCloseButton = false,
  closeOnBackdropPress = true,
  closeOnBackButton = true,
  height = 'auto',
  footer,
  loading = false,
  style,
  testID,
  accessibilityLabel,
}: AppBottomSheetProps) => {
  /**
   * Handle Android back button.
   */
  const handleClose = () => {
    if (loading || !closeOnBackButton) {
      return;
    }

    onClose();
  };

  /**
   * Handle backdrop press.
   */
  const handleBackdropPress = () => {
    if (loading || !closeOnBackdropPress) {
      return;
    }

    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <View testID={testID} style={styles.overlay}>
        {/* Backdrop */}
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={handleBackdropPress}
          disabled={loading}
          accessibilityRole="button"
          accessibilityLabel="Close bottom sheet"
        />

        {/* Bottom Sheet */}
        <View
          accessible
          accessibilityLabel={accessibilityLabel ?? title ?? 'Bottom sheet'}
          style={[
            styles.sheet,
            {
              maxHeight: heightMap[height],
            },
            style,
          ]}
        >
          {/* Handle */}
          {showHandle && (
            <View style={styles.handleContainer}>
              <View style={styles.handle} />
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

              {/* Close */}
              {showCloseButton && (
                <Pressable
                  onPress={onClose}
                  disabled={loading}
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

          {/* Loading Overlay */}
          {loading && (
            <View
              style={styles.loadingOverlay}
              accessibilityRole="progressbar"
              accessibilityLabel="Loading"
            >
              <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  /**
   * Full screen overlay
   */
  overlay: {
    flex: 1,

    justifyContent: 'flex-end',

    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },

  /**
   * Sheet container
   */
  sheet: {
    width: '100%',

    backgroundColor: theme.colors.surface,

    borderTopLeftRadius: theme.radius.xl,

    borderTopRightRadius: theme.radius.xl,

    overflow: 'hidden',
  },

  /**
   * Drag handle
   */
  handleContainer: {
    alignItems: 'center',

    paddingTop: theme.spacing.sm,

    paddingBottom: theme.spacing.xs,
  },

  handle: {
    width: 40,
    height: 4,

    borderRadius: 2,

    backgroundColor: theme.colors.border,
  },

  /**
   * Header
   */
  header: {
    flexDirection: 'row',

    alignItems: 'flex-start',

    paddingHorizontal: theme.spacing.lg,

    paddingTop: theme.spacing.md,

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
   * Main content
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
   */
  loadingOverlay: {
    position: 'absolute',

    top: 0,
    right: 0,
    bottom: 0,
    left: 0,

    zIndex: 10,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(255, 255, 255, 0.65)',
  },
});

export default AppBottomSheet;
