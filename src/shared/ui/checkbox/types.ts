export interface BaseCheckboxProps {
  disabled?: boolean
  className?: string
  children?: React.ReactNode
}

export interface CheckboxProps extends BaseCheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
}
