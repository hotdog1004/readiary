import { BOOK_STATUS_VALUES } from '@/shared/types/book'
import z from 'zod'
import { validateDateRules, validateStatusRules } from '../utils'

export const BasicInfoSchema = z
  .object({
    title: z.string().trim().min(1, '제목을 입력해 주세요.'),
    author: z.string().trim().min(1, '저자를 입력해 주세요.'),
    totalPages: z
      .number({
        required_error: '전체 페이지 수를 입력해 주세요.',
      })
      .min(1, '전체 페이지 수는 최소 1페이지 이상이어야 해요.'),
    publishedDate: z
      .string({ required_error: '출판일을 선택해 주세요.' })
      .min(1, '출판일을 선택해 주세요.'),
    status: z.enum(BOOK_STATUS_VALUES, {
      required_error: '독서 상태를 선택해 주세요.',
    }),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    validateStatusRules(data, ctx)
    validateDateRules(data, ctx)
  })
