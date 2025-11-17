import { Control, Controller, FieldError, FieldPath, FieldValues } from 'react-hook-form'
import { FormField } from '../FormField'
import { DatePicker } from '../../datePicker'
import { formatDateString, hasError, isEmptyValue } from '@/features/add-book/utils'

interface RHFDatePickerProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  error?: FieldError
  label?: string
  required?: boolean
  helperMessage?: string
  placeholder?: string
  className?: string
  disabled?: boolean
  onTrigger?: () => void
}

export const RHFDatePicker = <TFieldValues extends FieldValues>({
  control,
  name,
  error,
  label,
  required,
  helperMessage,
  placeholder,
  className,
  disabled,
  onTrigger,
}: RHFDatePickerProps<TFieldValues>) => {
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
            <DatePicker
              value={field.value ? new Date(field.value) : null}
              onChange={(date) => {
                field.onChange(formatDateString(date))
                onTrigger?.()
              }}
              onClear={() => {
                field.onChange('')
                onTrigger?.()
              }}
              error={hasError(error)}
              placeholder={placeholder}
              disabled={disabled}
            />
          </FormField>
        )
      }}
    />
  )
}
