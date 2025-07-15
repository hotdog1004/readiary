import { BookStatus } from '@/shared/types/book'
import { Step } from './step'

export type BasicInfoFormValues = {
  title: string
  author: string
  totalPages: number
  publishedDate: string
  status: BookStatus
  startDate?: string
  endDate?: string
}

export type RatingFormValues = {
  isRecommended: boolean
  rating: number
}
export type ReviewFormValues = {
  review?: string
}
export type QuoteFormValues = {
  quotePage: number
  quoteText: string
}
export type VisibilityFormValues = {
  isPublic: boolean
}

export type FormDataByStep = {
  [Step.BasicInfo]: BasicInfoFormValues
  [Step.Rating]: RatingFormValues
  [Step.Review]: ReviewFormValues
  [Step.Quote]: QuoteFormValues
  [Step.Visibility]: VisibilityFormValues
}
export type FormState = {
  step: Step
  formData: Partial<FormDataByStep>
}
