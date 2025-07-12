import React, { forwardRef } from 'react'
import { InputWrapper, StyledInput, ClearButtonWrapper, ClearButton } from './styles'
import type { BaseFieldProps } from './types'

interface NumberFieldProps extends BaseFieldProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
}

const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(
  ({ value, onChange, placeholder = '', onClear, min, max, step, ...rest }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value === '' ? 0 : Number(e.target.value)
      onChange(newValue)
    }

    const handleClear = () => {
      onChange(0)
      onClear?.()
    }

    return (
      <InputWrapper>
        <StyledInput
          ref={ref}
          type="number"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          {...rest}
        />
        {value !== 0 && onClear && (
          <ClearButtonWrapper>
            <ClearButton
              type="button"
              size="small"
              variant="gray"
              aria-label="입력 지우기"
              onClick={handleClear}
            >
              ×
            </ClearButton>
          </ClearButtonWrapper>
        )}
      </InputWrapper>
    )
  },
)

NumberField.displayName = 'NumberField'

export default NumberField
