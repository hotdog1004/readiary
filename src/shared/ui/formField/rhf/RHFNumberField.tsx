import { Control, Controller, FieldError, FieldPath, FieldValues } from 'react-hook-form'
import { FormField } from '../FormField'
import { hasError, isEmptyValue } from '@/shared/utils'
import { NumberField } from '../../textField'

interface RHFNumberFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  error?: FieldError
  label?: string
  required?: boolean
  helperMessage?: string
  placeholder?: string
  className?: string
  min?: number
  max?: number
  step?: number
}

export const RHFNumberField = <TFieldValues extends FieldValues>({
  control,
  name,
  error,
  label,
  required,
  helperMessage,
  placeholder,
  className,
  min,
  max,
  step,
}: RHFNumberFieldProps<TFieldValues>) => {
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
            <NumberField
              {...field}
              onClear={() => field.onChange(0)}
              error={hasError(error)}
              placeholder={placeholder}
              min={min}
              max={max}
              step={step}
            />
          </FormField>
        )
      }}
    />
  )
}
