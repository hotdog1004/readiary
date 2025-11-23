import { BookStatus } from '@/shared/types'

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

export type AddBookFormValues = BasicInfoFormValues &
  RatingFormValues &
  ReviewFormValues &
  QuoteFormValues &
  VisibilityFormValues
