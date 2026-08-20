import React from 'react';

import { Image, StyleSheet, View, Text } from 'react-native';

import { theme } from '../../../theme';

import { AppAvatarProps, AvatarSize, AvatarStatus } from './Avatar.types';

const sizeMap: Record<AvatarSize, number> = {
  small: 32,
  medium: 40,
  large: 52,
  xlarge: 72,
};

const fontSizeMap: Record<AvatarSize, number> = {
  small: 12,
  medium: 14,
  large: 18,
  xlarge: 24,
};

const statusSizeMap: Record<AvatarSize, number> = {
  small: 8,
  medium: 10,
  large: 12,
  xlarge: 14,
};

const getStatusColor = (status: AvatarStatus) => {
  switch (status) {
    case 'online':
      return theme.colors.success;

    case 'busy':
      return theme.colors.error;

    case 'away':
      return theme.colors.warning;

    case 'offline':
    default:
      return theme.colors.textTertiary;
  }
};

const getInitials = (name?: string) => {
  if (!name?.trim()) {
    return '?';
  }

  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const AppAvatar = ({
  uri,
  source,
  name,
  size = 'medium',
  status,
  showStatus = false,
  style,
  testID,
  accessibilityLabel,
}: AppAvatarProps) => {
  const avatarSize = sizeMap[size];

  const imageSource = uri ? { uri } : source;

  const initials = getInitials(name);

  return (
    <View
      testID={testID}
      accessible
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel ?? name ?? 'User avatar'}
      style={[
        styles.wrapper,
        {
          width: avatarSize,
          height: avatarSize,
        },
        style,
      ]}
    >
      {imageSource ? (
        <Image
          source={imageSource}
          style={[
            styles.image,
            {
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarSize / 2,
            },
          ]}
          resizeMode="cover"
        />
      ) : (
        <View
          style={[
            styles.fallback,
            {
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarSize / 2,
            },
          ]}
        >
          <Text
            style={[
              styles.initials,
              {
                fontSize: fontSizeMap[size],
              },
            ]}
          >
            {initials}
          </Text>
        </View>
      )}

      {showStatus && status && (
        <View
          style={[
            styles.status,
            {
              width: statusSizeMap[size],
              height: statusSizeMap[size],
              borderRadius: statusSizeMap[size] / 2,

              backgroundColor: getStatusColor(status),
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },

  image: {
    overflow: 'hidden',
  },

  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primaryLight,
  },

  initials: {
    color: theme.colors.primary,
    fontWeight: '700',
  },

  status: {
    position: 'absolute',
    right: 0,
    bottom: 0,

    borderWidth: 2,
    borderColor: theme.colors.surface,
  },
});

export default AppAvatar;
