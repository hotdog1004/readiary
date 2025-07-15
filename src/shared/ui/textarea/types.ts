export interface BaseTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  placeholder?: string
  rows?: number
  error?: boolean
}
