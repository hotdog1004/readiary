import React, { forwardRef } from 'react'
import ReactDatePicker from 'react-datepicker'
import { DatePickerContainer, DatePickerWrapper } from './styles'
import type { CustomInputProps, DatePickerProps } from './types'
import { ClearButton, ClearButtonWrapper, StyledInput } from '../textField/styles'

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ value, onClick, placeholder, disabled }, ref) => (
    <StyledInput
      ref={ref}
      value={value || ''}
      onClick={onClick}
      placeholder={placeholder}
      disabled={disabled}
      readOnly
      style={{ cursor: 'pointer' }}
    />
  ),
)

const DatePicker = forwardRef<ReactDatePicker, DatePickerProps>(
  (
    { value, onChange, placeholder = '날짜를 선택하세요', onClear, disabled, className, ...rest },
    ref,
  ) => {
    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation()
      if (onClear) {
        onClear()
      } else {
        onChange(null)
      }
    }

    return (
      <DatePickerWrapper className={className}>
        <DatePickerContainer>
          <ReactDatePicker
            ref={ref}
            dateFormat="yyyy.MM.dd"
            customInput={<CustomInput />}
            selected={value}
            onChange={onChange}
            placeholderText={placeholder}
            disabled={disabled}
            {...rest}
          />
          {value && (
            <ClearButtonWrapper>
              <ClearButton onClick={handleClear} aria-label="날짜 지우기">
                ×
              </ClearButton>
            </ClearButtonWrapper>
          )}
        </DatePickerContainer>
      </DatePickerWrapper>
    )
  },
)
DatePicker.displayName = 'DatePicker'

export default DatePicker
