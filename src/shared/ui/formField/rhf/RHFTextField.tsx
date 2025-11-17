import { Control, Controller, FieldError, FieldPath, FieldValues } from 'react-hook-form'
import { FormField } from '../FormField'
import { hasError, isEmptyValue } from '@/features/add-book/utils'
import { TextField } from '../../textField'

interface RHFTextFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  error?: FieldError
  label?: string
  required?: boolean
  helperMessage?: string
  placeholder?: string
  className?: string
}

export const RHFTextField = <TFieldValues extends FieldValues>({
  control,
  name,
  error,
  label,
  required,
  helperMessage,
  placeholder,
  className,
}: RHFTextFieldProps<TFieldValues>) => {
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
            <TextField
              {...field}
              error={hasError(error)}
              placeholder={placeholder}
              onClear={() => field.onChange('')}
            />
          </FormField>
        )
      }}
    />
  )
}
