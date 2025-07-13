/** @jsxImportSource @emotion/react */
import React, { forwardRef, useState, useRef, useEffect, useCallback } from 'react'
import {
  SelectWrapper,
  SelectBox,
  SelectValue,
  SelectIcon,
  OptionsList,
  OptionItem,
  OptionText,
  OptionCheck,
} from './styles'
import type { SelectProps } from './types'

const Select = forwardRef<HTMLDivElement, SelectProps>(
  ({ value, onChange, options, placeholder = '', disabled, className, ...rest }, ref) => {
    const [open, setOpen] = useState(false)
    const [focusedIndex, setFocusedIndex] = useState(-1)
    const containerRef = useRef<HTMLDivElement>(null)

    const selectedOption = options.find((option) => option.value === value)

    const handleToggle = useCallback(() => {
      if (disabled) return
      setOpen(!open)
      if (!open) {
        setFocusedIndex(-1)
      }
    }, [disabled, open])

    const handleSelect = useCallback(
      (selectedValue: string) => {
        if (disabled) return
        onChange(selectedValue)
        setOpen(false)
        setFocusedIndex(-1)
      },
      [onChange, disabled],
    )

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return

        switch (e.key) {
          case 'Enter':
          case ' ':
            e.preventDefault()
            if (open && focusedIndex >= 0) {
              // 드롭다운이 열려있고 포커스된 옵션이 있으면 선택
              handleSelect(options[focusedIndex].value)
            } else {
              // 드롭다운 열기/닫기
              handleToggle()
            }
            break
          case 'Escape':
            setOpen(false)
            setFocusedIndex(-1)
            break
          case 'ArrowDown':
            e.preventDefault()
            if (!open) {
              handleToggle()
            } else {
              setFocusedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0))
            }
            break
          case 'ArrowUp':
            e.preventDefault()
            if (open) {
              setFocusedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1))
            }
            break
          case 'Tab':
            if (open) {
              setOpen(false)
              setFocusedIndex(-1)
            }
            break
        }
      },
      [disabled, open, focusedIndex, options, handleSelect, handleToggle],
    )

    // 외부 클릭 시 닫기
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (open && containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setOpen(false)
          setFocusedIndex(-1)
        }
      }

      if (open) {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [open])

    return (
      <SelectWrapper
        ref={(node) => {
          containerRef.current = node
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
        }}
        className={className}
        {...rest}
      >
        <SelectBox
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          $disabled={disabled}
          data-state={open ? 'open' : 'closed'}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-label={placeholder || '옵션 선택'}
        >
          <SelectValue data-placeholder={!selectedOption}>
            {selectedOption ? selectedOption.label : placeholder}
          </SelectValue>
          <SelectIcon $isOpen={open} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </SelectIcon>
        </SelectBox>

        <OptionsList $open={open} role="listbox">
          {options.map((option, index) => (
            <OptionItem
              key={option.value}
              $isSelected={option.value === value}
              $isFocused={index === focusedIndex}
              onClick={() => handleSelect(option.value)}
              role="option"
              aria-selected={option.value === value}
              tabIndex={open ? 0 : -1}
            >
              <OptionText>{option.label}</OptionText>
              <OptionCheck $isSelected={option.value === value}>
                {option.value === value && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </OptionCheck>
            </OptionItem>
          ))}
        </OptionsList>
      </SelectWrapper>
    )
  },
)

Select.displayName = 'Select'

export default Select
