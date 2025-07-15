export interface SelectOption {
  value: string
  label: string
}

export interface BaseSelectProps {
  placeholder?: string
  options: SelectOption[]
  disabled?: boolean
  className?: string
  error?: boolean
}

export interface SelectProps extends BaseSelectProps {
  value: string
  onChange: (value: string) => void
}
