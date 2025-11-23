import { Control, Controller, FieldError, FieldPath, FieldValues } from 'react-hook-form'
import { FormField } from '../FormField'
import { hasError, isEmptyValue } from '@/shared/utils'
import { Range } from '../../range'

interface RHFRangeProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  error?: FieldError
  label?: string
  required?: boolean
  helperMessage?: string
  className?: string
  min?: number
  max?: number
  step?: number
  showValue?: boolean
  valueLabel?: (value: number) => string
}

export const RHFRange = <TFieldValues extends FieldValues>({
  control,
  name,
  error,
  label,
  required,
  helperMessage,
  className,
  min,
  max,
  step,
  showValue,
  valueLabel,
}: RHFRangeProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <FormField
            label={label}
            required={required}
            errorMessage={error?.message}
            helperMessage={
              isEmptyValue(field.value) && !hasError(error) ? helperMessage : undefined
            }
            className={className}
          >
            <Range
              value={field.value ?? 0}
              onChange={field.onChange}
              min={min}
              max={max}
              step={step}
              showValue={showValue}
              valueLabel={valueLabel}
            />
          </FormField>
        )
      }}
    />
  )
}
