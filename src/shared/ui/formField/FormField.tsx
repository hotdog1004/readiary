import React from 'react'
import {
  FormFieldWrapper,
  Label,
  RequiredMark,
  ErrorMessage,
  HelperText,
  MessageContainer,
} from './styles'
import type { FormFieldProps } from './types'

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  error,
  helperText,
  children,
  className,
}) => {
  return (
    <FormFieldWrapper className={className}>
      {label && (
        <Label>
          {label}
          {required && <RequiredMark>*</RequiredMark>}
        </Label>
      )}
      {children}
      <MessageContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {helperText && !error && <HelperText>{helperText}</HelperText>}
      </MessageContainer>
    </FormFieldWrapper>
  )
}
