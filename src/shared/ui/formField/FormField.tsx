import React from 'react'
import {
  FormFieldWrapper,
  Label,
  RequiredMark,
  ErrorMessage,
  HelperMessage,
  MessageContainer,
} from './styles'
import type { FormFieldProps } from './types'

export const FormField = ({
  label,
  required = false,
  errorMessage,
  helperMessage,
  children,
  className,
}: FormFieldProps) => {
  const hasErrorMessage = errorMessage !== undefined && errorMessage.length > 1
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
        {hasErrorMessage ? (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        ) : (
          helperMessage && <HelperMessage>{helperMessage}</HelperMessage>
        )}
      </MessageContainer>
    </FormFieldWrapper>
  )
}
