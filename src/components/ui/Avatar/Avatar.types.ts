import { ImageSourcePropType, ViewStyle } from 'react-native';

export type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';

export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';

export interface AppAvatarProps {
  uri?: string;

  source?: ImageSourcePropType;

  name?: string;

  size?: AvatarSize;

  status?: AvatarStatus;

  showStatus?: boolean;

  style?: ViewStyle;

  testID?: string;

  accessibilityLabel?: string;
}
