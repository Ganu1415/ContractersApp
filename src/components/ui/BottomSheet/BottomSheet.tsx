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

import { AppBottomSheetProps } from './BottomSheet.types';

const heightMap = {
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
  const handleClose = () => {
    if (!closeOnBackButton) {
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
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => {
            if (closeOnBackdropPress) {
              onClose();
            }
          }}
        />

        <View
          accessible
          accessibilityRole="dialog"
          accessibilityLabel={accessibilityLabel ?? title ?? 'Bottom sheet'}
          style={[
            styles.sheet,

            {
              maxHeight: heightMap[height],
            },

            style,
          ]}
        >
          {showHandle && (
            <View style={styles.handleContainer}>
              <View style={styles.handle} />
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

          {loading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,

    justifyContent: 'flex-end',

    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },

  sheet: {
    width: '100%',

    backgroundColor: theme.colors.surface,

    borderTopLeftRadius: theme.radius.xl,

    borderTopRightRadius: theme.radius.xl,

    overflow: 'hidden',
  },

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

export default AppBottomSheet;
