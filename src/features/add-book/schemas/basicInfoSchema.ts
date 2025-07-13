import { BOOK_STATUS_VALUES } from '@/shared/types/book'
import z from 'zod'
import { BasicInfoFormValues } from '../types'

export function validateStatusRules(data: BasicInfoFormValues, ctx: z.RefinementCtx) {
  if (data.status === 'want_to_read' && (data.startDate || data.endDate)) {
    ctx.addIssue({
      path: ['startDate'],
      message: '읽고 싶은 책은 독서 기간을 입력할 수 없습니다.',
      code: 'custom',
    })
  }
  if (data.status === 'reading' && data.endDate) {
    ctx.addIssue({
      path: ['endDate'],
      message: '읽는 중인 책은 시작일만 입력할 수 있습니다.',
      code: 'custom',
    })
  }
  if (data.status === 'finished') {
    if (
      data.startDate === undefined ||
      data.startDate === '' ||
      data.endDate === undefined ||
      data.endDate === ''
    ) {
      ctx.addIssue({
        path: ['startDate'],
        message: '다 읽은 책은 독서 기간을 모두 입력해야합니다.',
        code: 'custom',
      })
    }
  }
  // TODO: 유효성 검증 미통과 시 사용자가 값을 지울 수 있도록 ui 구현 필요
  if (data.status === 'on_hold' && data.endDate) {
    ctx.addIssue({
      path: ['endDate'],
      message: '보류 중인 책은 시작일만 입력할 수 있습니다.',
      code: 'custom',
    })
  }
}

export function validateDateRules(data: BasicInfoFormValues, ctx: z.RefinementCtx) {
  if (data.startDate && data.endDate && data.startDate > data.endDate) {
    ctx.addIssue({
      path: ['startDate'],
      message: '시작일은 종료일보다 빠르거나 같아야 합니다.',
      code: 'custom',
    })
  }
  if (data.startDate && data.publishedDate && data.startDate < data.publishedDate) {
    ctx.addIssue({
      path: ['startDate'],
      message: '시작일은 도서 출판일 이후여야 합니다.',
      code: 'custom',
    })
  }
}

export const BasicInfoSchema = z
  .object({
    title: z.string().min(1, '제목은 필수입니다.'),
    author: z.string().min(1, '저자는 필수입니다.'),
    totalPages: z.number().min(1, '도서 전체 페이지 수는 1 이상이어야 합니다.'),
    publishedDate: z.string(),
    status: z.enum(BOOK_STATUS_VALUES),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    validateStatusRules(data, ctx)
    validateDateRules(data, ctx)
  })
