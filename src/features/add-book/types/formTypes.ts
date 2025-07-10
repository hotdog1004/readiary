import { BookStatus } from '@/shared/types/book'

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
