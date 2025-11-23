import { Control, Controller, FieldError, FieldPath, FieldValues } from 'react-hook-form'
import { FormField } from '../FormField'
import { Checkbox } from '../../checkbox'

interface RHFCheckboxProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  error?: FieldError
  label?: string
  required?: boolean
  helperMessage?: string
  className?: string
  checkboxLabel?: string
  disabled?: boolean
}

export const RHFCheckbox = <TFieldValues extends FieldValues>({
  control,
  name,
  error,
  label,
  required,
  helperMessage,
  className,
  checkboxLabel,
  disabled,
}: RHFCheckboxProps<TFieldValues>) => {
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
            helperMessage={helperMessage}
            className={className}
          >
            <Checkbox
              checked={field.value ?? false}
              onChange={field.onChange}
              label={checkboxLabel}
              disabled={disabled}
            />
          </FormField>
        )
      }}
    />
  )
}
