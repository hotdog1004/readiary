import { FieldError } from 'react-hook-form'

export const hasError = (error: FieldError | undefined): boolean => {
  return error !== undefined
}

export const isEmptyValue = (value: unknown): boolean => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'string' && value.trim() === '') ||
    (typeof value === 'number' && isNaN(value))
  )
}

export const formatDateString = (date?: Date | null): string => {
  return date ? date.toISOString().split('T')[0] : ''
}
