import React, { forwardRef } from 'react';

import { TextInput } from 'react-native';

import { FormField } from '../FormField';
import { AppInput } from '../../ui/Input';

import { FormInputProps } from './FormInput.types';

const FormInput = forwardRef<TextInput, FormInputProps>(
  ({
    label,
    required = false,
    error,
    helperText,
    containerStyle,
    ...inputProps
  }) => {
    return (
      <FormField
        label={label}
        required={required}
        error={error}
        helperText={helperText}
        style={containerStyle}
      >
        <AppInput {...inputProps} error={error} />
      </FormField>
    );
  },
);

FormInput.displayName = 'FormInput';

export default FormInput;
