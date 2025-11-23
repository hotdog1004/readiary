import React from 'react'
import { FormWrapper, FormRow as StyledFormRow } from './styles'
import type { FormLayoutProps, FormRowProps } from './types'

export const FormLayout = ({ children, className, id, onSubmit, ...rest }: FormLayoutProps) => {
  return (
    <FormWrapper className={className} id={id} onSubmit={onSubmit} {...rest}>
      {children}
    </FormWrapper>
  )
}

export const FormRow = ({ children, className, columns, gap, ...rest }: FormRowProps) => {
  return (
    <StyledFormRow className={className} columns={columns} gap={gap} {...rest}>
      {children}
    </StyledFormRow>
  )
}
