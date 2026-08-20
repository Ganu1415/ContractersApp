import React from 'react';

import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

import { theme } from '../../../theme';
import { AppText } from '../Text';

import { AppSwitchProps } from './Switch.types';

const sizeMap = {
  small: {
    width: 40,
    height: 22,
    thumb: 18,
  },

  medium: {
    width: 48,
    height: 28,
    thumb: 24,
  },

  large: {
    width: 56,
    height: 32,
    thumb: 28,
  },
};

const AppSwitch = ({
  value,
  onChange,
  label,
  helperText,
  disabled = false,
  loading = false,
  size = 'medium',
  rightContent,
  style,
  testID,
  accessibilityLabel,
}: AppSwitchProps) => {
  const dimensions = sizeMap[size];

  const isDisabled = disabled || loading;

  const handlePress = () => {
    if (isDisabled) {
      return;
    }

    onChange(!value);
  };

  const thumbTravel = dimensions.width - dimensions.thumb - 4;

  return (
    <View testID={testID} style={[styles.container, style]}>
      <Pressable
        onPress={handlePress}
        disabled={isDisabled}
        accessibilityRole="switch"
        accessibilityLabel={accessibilityLabel ?? label ?? 'Switch'}
        accessibilityState={{
          checked: value,
          disabled: isDisabled,
          busy: loading,
        }}
        style={({ pressed }) => [
          styles.row,
          pressed && !isDisabled && styles.pressed,
        ]}
      >
        <View
          style={[
            styles.track,
            {
              width: dimensions.width,
              height: dimensions.height,
              borderRadius: dimensions.height / 2,
            },

            value ? styles.trackOn : styles.trackOff,

            isDisabled && styles.disabled,
          ]}
        >
          {loading ? (
            <ActivityIndicator
              size="small"
              color={value ? theme.colors.white : theme.colors.primary}
            />
          ) : (
            <View
              style={[
                styles.thumb,
                {
                  width: dimensions.thumb,
                  height: dimensions.thumb,
                  borderRadius: dimensions.thumb / 2,

                  transform: [
                    {
                      translateX: value ? thumbTravel : 0,
                    },
                  ],
                },
              ]}
            />
          )}
        </View>

        {(label || helperText) && (
          <View style={styles.labelContainer}>
            {label && (
              <AppText
                variant="body"
                color={isDisabled ? 'tertiary' : 'primary'}
              >
                {label}
              </AppText>
            )}

            {helperText && (
              <AppText variant="caption" color="secondary">
                {helperText}
              </AppText>
            )}
          </View>
        )}

        {rightContent && (
          <View style={styles.rightContent}>{rightContent}</View>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

  row: {
    minHeight: 48,

    flexDirection: 'row',
    alignItems: 'center',
  },

  track: {
    justifyContent: 'center',
    paddingHorizontal: 2,
  },

  trackOn: {
    backgroundColor: theme.colors.primary,
  },

  trackOff: {
    backgroundColor: theme.colors.border,
  },

  thumb: {
    backgroundColor: theme.colors.white,

    elevation: 2,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },

  labelContainer: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },

  rightContent: {
    marginLeft: theme.spacing.md,
  },

  disabled: {
    opacity: 0.5,
  },

  pressed: {
    opacity: 0.8,
  },
});

export default AppSwitch;
