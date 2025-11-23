export interface BaseFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onClear?: () => void
  placeholder?: string
  showClearButton?: boolean
  error?: boolean
}
