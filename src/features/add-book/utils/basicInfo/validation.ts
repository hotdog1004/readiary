import z from 'zod'
import { BasicInfoFormValues } from '../../types'
import { bookStatusValidationRules, dateFieldValidationRules } from '../../constants'

export const validateStatusRules = (data: BasicInfoFormValues, ctx: z.RefinementCtx) => {
  const statusRules = bookStatusValidationRules[data.status]
  const dateFields = ['startDate', 'endDate'] as const

  dateFields.forEach((field) => {
    const fieldRule = statusRules[field]
    if (!fieldRule) return

    const fieldValue = data[field]
    const hasValue = fieldValue && fieldValue.trim() !== ''

    if (fieldRule.type === 'required' && !hasValue) {
      ctx.addIssue({
        path: [field],
        message: fieldRule.message,
        code: 'custom',
      })
    }
    if (fieldRule.type === 'forbidden' && hasValue) {
      ctx.addIssue({
        path: [field],
        message: fieldRule.message,
        code: 'custom',
      })
    }
  })
}

export const validateDateRules = (data: BasicInfoFormValues, ctx: z.RefinementCtx) => {
  dateFieldValidationRules.forEach((dateFieldRule) => {
    const [startField, endField] = dateFieldRule.fields
    const startValue = data[startField]
    const endValue = data[endField]
    if (!dateFieldRule.compare(startValue, endValue)) {
      ctx.addIssue({
        path: [dateFieldRule.path],
        message: dateFieldRule.message,
        code: 'custom',
      })
    }
  })
}
