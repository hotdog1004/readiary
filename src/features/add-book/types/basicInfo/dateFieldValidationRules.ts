import { BasicInfoFormValues } from '../formTypes'

type DateField = 'startDate' | 'endDate' | 'publishedDate'

export type DateFieldValidationRule = {
  fields: [DateField, DateField]
  compare: (start: string | undefined, end: string | undefined) => boolean
  message: string
  path: keyof BasicInfoFormValues
}
