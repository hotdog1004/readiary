import { z } from 'zod'
import { BasicInfoBaseSchema } from './basicInfoSchema'
import { ReviewBaseSchema } from './reviewSchema'
import { QuoteBaseSchema } from './quoteSchema'
import { validateStatusRules, validateDateRules } from '../utils'
import { BasicInfoFormValues } from '../types'
import { RatingSchema } from '.'
import { VisibilitySchema } from '.'

export const AddBookSchema = z
  .object({
    ...BasicInfoBaseSchema.shape,
    ...RatingSchema.shape,
    ...ReviewBaseSchema.shape,
    ...QuoteBaseSchema.shape,
    ...VisibilitySchema.shape,
  })
  .superRefine((data, ctx) => {
    const basicInfoData: BasicInfoFormValues = {
      title: data.title,
      author: data.author,
      totalPages: data.totalPages,
      publishedDate: data.publishedDate,
      status: data.status,
      startDate: data.startDate,
      endDate: data.endDate,
    }

    validateStatusRules(basicInfoData, ctx)
    validateDateRules(basicInfoData, ctx)

    if (
      (data.rating === 1 || data.rating === 5) &&
      (data.review === undefined || data.review.trim().length < 100)
    ) {
      ctx.addIssue({
        path: ['review'],
        message: '최소 100자 이상 입력해 주세요.',
        code: 'custom',
      })
    }

    if (data.quotePage >= data.totalPages) {
      ctx.addIssue({
        path: ['quotePage'],
        message: '인용구 페이지 번호는 도서 전체 페이지 수보다 작아야 합니다.',
        code: 'custom',
      })
    }
  })
