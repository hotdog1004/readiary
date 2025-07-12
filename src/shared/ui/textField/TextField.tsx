import React, { forwardRef } from 'react'
import { InputWrapper, StyledInput, ClearButtonWrapper, ClearButton } from './styles'
import type { BaseFieldProps } from './types'

interface TextFieldProps extends BaseFieldProps {
  value: string
  onChange: (value: string) => void
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ value, onChange, placeholder = '', onClear, ...rest }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value)
    }

    return (
      <InputWrapper>
        <StyledInput
          ref={ref}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          {...rest}
        />
        {value && onClear && (
          <ClearButtonWrapper>
            <ClearButton
              type="button"
              size="small"
              variant="gray"
              aria-label="입력 지우기"
              onClick={onClear}
            >
              ×
            </ClearButton>
          </ClearButtonWrapper>
        )}
      </InputWrapper>
    )
  },
)

TextField.displayName = 'TextField'

export default TextField
