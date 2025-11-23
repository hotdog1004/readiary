import React, { forwardRef } from 'react'
import { TextareaWrapper, StyledTextarea } from './styles'
import type { BaseTextareaProps } from './types'

interface TextareaProps extends BaseTextareaProps {
  value: string
  onChange: (value: string) => void
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ value, onChange, placeholder = '', rows = 4, ...rest }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value)
    }

    return (
      <TextareaWrapper>
        <StyledTextarea
          ref={ref}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          rows={rows}
          {...rest}
        />
      </TextareaWrapper>
    )
  },
)

Textarea.displayName = 'Textarea'

export default Textarea
