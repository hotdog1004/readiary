import { Control, Controller, FieldError, FieldPath, FieldValues } from 'react-hook-form'
import { FormField } from '../FormField'
import { hasError, isEmptyValue } from '@/shared/utils'
import { Select } from '../../select'
import { SelectOption } from '../../select/types'

interface RHFSelectProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  error?: FieldError
  label?: string
  required?: boolean
  helperMessage?: string
  placeholder?: string
  className?: string
  options: SelectOption[]
  disabled?: boolean
  onTrigger?: () => void
}

export const RHFSelect = <TFieldValues extends FieldValues>({
  control,
  name,
  error,
  label,
  required,
  helperMessage,
  placeholder,
  className,
  options,
  disabled,
  onTrigger,
}: RHFSelectProps<TFieldValues>) => {
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
            <Select
              error={hasError(error)}
              value={field.value ?? ''}
              onChange={(value) => {
                field.onChange(value)
                onTrigger?.()
              }}
              options={options}
              placeholder={placeholder}
              disabled={disabled}
            />
          </FormField>
        )
      }}
    />
  )
}
