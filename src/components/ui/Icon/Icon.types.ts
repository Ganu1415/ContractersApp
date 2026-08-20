import { LucideIcon } from 'lucide-react-native';

export type IconName =
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-down'
  | 'arrow-up'
  | 'plus'
  | 'minus'
  | 'check'
  | 'x'
  | 'search'
  | 'bell'
  | 'settings'
  | 'menu'
  | 'more'
  | 'edit'
  | 'delete'
  | 'eye'
  | 'eye-off'
  | 'calendar'
  | 'clock'
  | 'user'
  | 'users'
  | 'home'
  | 'building'
  | 'folder'
  | 'file'
  | 'download'
  | 'upload'
  | 'camera'
  | 'image'
  | 'map-pin'
  | 'phone'
  | 'mail'
  | 'check-circle'
  | 'alert-circle'
  | 'info'
  | 'circle';

export type IconSize = 'small' | 'medium' | 'large' | 'xlarge';

export type IconColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'text'
  | 'white'
  | 'black';

export interface AppIconProps {
  name: IconName;

  size?: IconSize | number;

  color?: IconColor | string;

  strokeWidth?: number;

  accessibilityLabel?: string;

  testID?: string;
}
