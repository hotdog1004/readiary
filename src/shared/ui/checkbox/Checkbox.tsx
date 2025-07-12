import React, { forwardRef } from 'react'
import {
  CheckboxContainer,
  CheckboxWrapper,
  CheckboxInput,
  CheckboxBox,
  CheckboxIcon,
  CheckboxLabel,
} from './styles'
import type { CheckboxProps } from './types'

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked, onChange, label, disabled, className, children, ...rest }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return
      onChange(e.target.checked)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onChange(!checked)
      }
    }

    return (
      <CheckboxContainer
        className={className}
        onClick={() => !disabled && onChange(!checked)}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="checkbox"
        aria-checked={checked}
        aria-disabled={disabled}
        {...rest}
      >
        <CheckboxWrapper $disabled={disabled}>
          <CheckboxInput
            ref={ref}
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            tabIndex={-1}
          />
          <CheckboxBox $checked={checked} $disabled={disabled}>
            <CheckboxIcon $checked={checked} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </CheckboxIcon>
          </CheckboxBox>
        </CheckboxWrapper>
        {(label || children) && (
          <CheckboxLabel $disabled={disabled}>{label || children}</CheckboxLabel>
        )}
      </CheckboxContainer>
    )
  },
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
