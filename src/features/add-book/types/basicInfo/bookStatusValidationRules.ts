import { BookStatus } from '@/shared/types/book'

export type ValidationRuleType = 'required' | 'forbidden'
export type FieldValidationRule = { type: ValidationRuleType; message?: string }
export type StatusFieldValidationRules = {
  startDate?: FieldValidationRule
  endDate?: FieldValidationRule
}
export type BookStatusValidationRules = Record<BookStatus, StatusFieldValidationRules>
