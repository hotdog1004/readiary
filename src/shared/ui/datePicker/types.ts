export interface DatePickerProps {
  value: Date | null
  onChange: (date: Date | null) => void
  placeholder?: string
  disabled?: boolean
  onClear?: () => void
  className?: string
  minDate?: Date
  maxDate?: Date
  dateFormat?: string
  showYearDropdown?: boolean
  showMonthDropdown?: boolean
  dropdownMode?: 'scroll' | 'select'
  error?: boolean
}

export interface CustomInputProps {
  value?: string
  onClick?: () => void
  placeholder?: string
  disabled?: boolean
  error?: boolean
}
