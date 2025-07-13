import { FieldError } from 'react-hook-form'

export const hasError = (error: FieldError | undefined): boolean => error !== undefined
