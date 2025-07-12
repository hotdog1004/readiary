export interface BaseRangeProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  min?: number
  max?: number
  step?: number
  showValue?: boolean
  valueLabel?: (value: number) => string
}

export interface RangeProps extends BaseRangeProps {
  value: number
  onChange: (value: number) => void
}
