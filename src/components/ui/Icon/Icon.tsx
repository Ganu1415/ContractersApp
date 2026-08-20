import React from 'react';

import {
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bell,
  Building2,
  Calendar,
  Camera,
  Check,
  CheckCircle,
  Circle,
  Clock,
  Download,
  Edit,
  Eye,
  EyeOff,
  File,
  Folder,
  Home,
  Image,
  Info,
  Mail,
  MapPin,
  Menu,
  Minus,
  MoreVertical,
  Phone,
  Plus,
  Search,
  Settings,
  Share2,
  Trash2,
  Upload,
  User,
  Users,
  X,
} from 'lucide-react-native';

import { theme } from '../../../theme';

import { AppIconProps, IconColor, IconName, IconSize } from './Icon.types';

/**
 * Central Icon Registry
 *
 * IMPORTANT:
 * All icons used in the application
 * should come through AppIcon.
 */
const iconMap: Record<IconName, React.ComponentType<any>> = {
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-down': ArrowDown,
  'arrow-up': ArrowUp,

  plus: Plus,
  minus: Minus,

  check: Check,
  x: X,

  search: Search,
  bell: Bell,
  settings: Settings,
  menu: Menu,
  more: MoreVertical,

  edit: Edit,
  delete: Trash2,

  eye: Eye,
  'eye-off': EyeOff,

  calendar: Calendar,
  clock: Clock,

  user: User,
  users: Users,

  home: Home,
  building: Building2,

  folder: Folder,
  file: File,

  download: Download,
  upload: Upload,

  camera: Camera,
  image: Image,

  'map-pin': MapPin,

  phone: Phone,
  mail: Mail,

  'check-circle': CheckCircle,
  'alert-circle': AlertCircle,
  'alert-triangle': AlertTriangle,
  info: Info,
  circle: Circle,
  'share-2': Share2,
};

const sizeMap: Record<IconSize, number> = {
  small: 16,
  medium: 20,
  large: 24,
  xlarge: 32,
};

const getColor = (color: IconColor | string): string => {
  if (color.startsWith('#')) {
    return color;
  }

  const colorMap: Record<IconColor, string> = {
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    success: theme.colors.success,
    warning: theme.colors.warning,
    error: theme.colors.error,
    info: theme.colors.info,
    text: theme.colors.text,
    white: theme.colors.white,
    black: theme.colors.black,
  };

  return colorMap[color as IconColor] ?? theme.colors.text;
};

const AppIcon = ({
  name,
  size = 'medium',
  color = 'text',
  strokeWidth = 2,
  accessibilityLabel,
  testID,
}: AppIconProps) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    return null;
  }

  const iconSize = typeof size === 'number' ? size : sizeMap[size];

  const iconColor = getColor(color);

  return (
    <IconComponent
      testID={testID}
      size={iconSize}
      color={iconColor}
      strokeWidth={strokeWidth}
      accessible={Boolean(accessibilityLabel)}
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel}
    />
  );
};

export default AppIcon;
