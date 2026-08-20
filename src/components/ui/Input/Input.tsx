import React, { forwardRef } from 'react';

import { StyleSheet, TextInput, View } from 'react-native';

import { theme } from '../../../theme';

import { AppText } from '../Text';

import { AppInputProps, InputSize } from './Input.types';

const AppInput = forwardRef<React.ElementRef<typeof TextInput>, AppInputProps>(
  (
    {
      label,
      required = false,
      error,
      helperText,
      leftIcon,
      rightIcon,
      size = 'medium',
      fullWidth = true,
      editable = true,
      containerStyle,
      inputStyle,
      ...rest
    },
    ref,
  ) => {
    const hasError = Boolean(error);

    return (
      <View
        style={[
          styles.container,

          fullWidth && styles.fullWidth,

          containerStyle,
        ]}
      >
        {/* Label */}
        {label && (
          <View style={styles.labelContainer}>
            <AppText variant="label">{label}</AppText>

            {required && (
              <AppText variant="label" color="error">
                {' *'}
              </AppText>
            )}
          </View>
        )}

        {/* Input Wrapper */}
        <View
          style={[
            styles.inputWrapper,

            sizeStyles[size],

            hasError && styles.errorBorder,

            !editable && styles.disabled,
          ]}
        >
          {/* Left Icon */}
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

          {/* Text Input */}
          <TextInput
            ref={ref}
            {...rest}
            editable={editable}
            placeholderTextColor={theme.colors.textTertiary}
            style={[styles.input, inputStyle]}
            accessibilityLabel={label}
            accessibilityState={{
              disabled: !editable,
            }}
          />

          {/* Right Icon */}
          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </View>

        {/* Error */}
        {error ? (
          <AppText variant="caption" color="error" style={styles.message}>
            {error}
          </AppText>
        ) : helperText ? (
          <AppText variant="caption" color="secondary" style={styles.message}>
            {helperText}
          </AppText>
        ) : null}
      </View>
    );
  },
);

AppInput.displayName = 'AppInput';

const styles = StyleSheet.create({
  /**
   * Container
   */
  container: {
    marginBottom: theme.spacing.lg,
  },

  fullWidth: {
    width: '100%',
  },

  /**
   * Label
   */
  labelContainer: {
    flexDirection: 'row',

    marginBottom: theme.spacing.sm,
  },

  /**
   * Input wrapper
   */
  inputWrapper: {
    flexDirection: 'row',

    alignItems: 'center',

    backgroundColor: theme.colors.surface,

    borderWidth: 1,

    borderColor: theme.colors.border,

    borderRadius: theme.radius.md,
  },

  /**
   * Small
   */
  sizeSmall: {
    minHeight: 40,
  },

  /**
   * Medium
   */
  sizeMedium: {
    minHeight: 48,
  },

  /**
   * Large
   */
  sizeLarge: {
    minHeight: 56,
  },

  /**
   * Input
   */
  input: {
    flex: 1,

    paddingHorizontal: theme.spacing.md,

    color: theme.colors.text,

    fontSize: 16,
  },

  /**
   * Left icon
   */
  leftIcon: {
    marginLeft: theme.spacing.md,
  },

  /**
   * Right icon
   */
  rightIcon: {
    marginRight: theme.spacing.md,
  },

  /**
   * Error border
   */
  errorBorder: {
    borderColor: theme.colors.error,
  },

  /**
   * Disabled
   */
  disabled: {
    backgroundColor: theme.colors.background,

    opacity: 0.6,
  },

  /**
   * Error / helper text
   */
  message: {
    marginTop: theme.spacing.xs,
  },
});

/**
 * Input size → style mapping
 */
const sizeStyles: Record<InputSize, object> = {
  small: styles.sizeSmall,

  medium: styles.sizeMedium,

  large: styles.sizeLarge,
};

export default AppInput;

// import React, { forwardRef } from 'react';

// import { StyleSheet, TextInput, View } from 'react-native';

// import { theme } from '../../../theme';
// import { AppText } from '../Text';

// import { AppInputProps, InputSize } from './Input.types';

// const AppInput = forwardRef<TextInput, AppInputProps>(
//   (
//     {
//       label,
//       required = false,
//       error,
//       helperText,
//       leftIcon,
//       rightIcon,
//       size = 'medium',
//       fullWidth = true,
//       editable = true,
//       containerStyle,
//       inputStyle,
//       ...rest
//     },
//     ref,
//   ) => {
//     const hasError = Boolean(error);

//     return (
//       <View
//         style={[
//           styles.container,
//           fullWidth && styles.fullWidth,
//           containerStyle,
//         ]}
//       >
//         {label && (
//           <View style={styles.labelContainer}>
//             <AppText variant="label">{label}</AppText>

//             {required && (
//               <AppText variant="label" color="error">
//                 {' *'}
//               </AppText>
//             )}
//           </View>
//         )}

//         <View
//           style={[
//             styles.inputWrapper,
//             styles.size[size],
//             hasError && styles.errorBorder,
//             !editable && styles.disabled,
//           ]}
//         >
//           {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

//           <TextInput
//             ref={ref}
//             {...rest}
//             editable={editable}
//             placeholderTextColor={theme.colors.textTertiary}
//             style={[styles.input, inputStyle]}
//             accessibilityLabel={label}
//             accessibilityState={{
//               disabled: !editable,
//               invalid: hasError,
//             }}
//           />

//           {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
//         </View>

//         {error ? (
//           <AppText variant="caption" color="error" style={styles.message}>
//             {error}
//           </AppText>
//         ) : helperText ? (
//           <AppText variant="caption" color="secondary" style={styles.message}>
//             {helperText}
//           </AppText>
//         ) : null}
//       </View>
//     );
//   },
// );

// AppInput.displayName = 'AppInput';

// const styles = StyleSheet.create({
//   container: {
//     marginBottom: theme.spacing.lg,
//   },

//   fullWidth: {
//     width: '100%',
//   },

//   labelContainer: {
//     flexDirection: 'row',
//     marginBottom: theme.spacing.sm,
//   },

//   inputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',

//     backgroundColor: theme.colors.surface,

//     borderWidth: 1,
//     borderColor: theme.colors.border,

//     borderRadius: theme.radius.md,
//   },

//   size: {
//     small: {
//       minHeight: 40,
//     },

//     medium: {
//       minHeight: 48,
//     },

//     large: {
//       minHeight: 56,
//     },
//   },

//   input: {
//     flex: 1,

//     paddingHorizontal: theme.spacing.md,

//     color: theme.colors.text,

//     fontSize: 16,
//   },

//   leftIcon: {
//     marginLeft: theme.spacing.md,
//   },

//   rightIcon: {
//     marginRight: theme.spacing.md,
//   },

//   errorBorder: {
//     borderColor: theme.colors.error,
//   },

//   disabled: {
//     backgroundColor: theme.colors.background,

//     opacity: 0.6,
//   },

//   message: {
//     marginTop: theme.spacing.xs,
//   },
// });

// export default AppInput;
