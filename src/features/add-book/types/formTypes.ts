import { BookStatus } from '@/shared/types/book'
import { Step, StepConfig } from './step'

export type BasicInfoFormValues = {
  title: string
  author: string
  totalPages: number // 도서 전체 페이지 수
  publishedDate: string
  status: BookStatus
  startDate?: string
  endDate?: string
}

export type RatingFormValues = {
  isRecommended: boolean // 추천 여부
  rating: number // 별점 (0~5, 0.5 단위)
}
export type ReviewFormValues = {
  review?: string
}
export type QuoteFormValues = {
  quotePage: number // 인용구 페이지
  quoteText: string // 인용구 텍스트
}
export type VisibilityFormValues = {
  isPublic: boolean // 공개 여부
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
