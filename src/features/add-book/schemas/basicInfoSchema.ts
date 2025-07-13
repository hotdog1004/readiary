import { BOOK_STATUS_VALUES } from '@/shared/types/book'
import z from 'zod'
import { BasicInfoFormValues } from '../types'

export function validateStatusRules(data: BasicInfoFormValues, ctx: z.RefinementCtx) {
  if (data.status === 'want_to_read' && (data.startDate || data.endDate)) {
    ctx.addIssue({
      path: ['startDate'],
      message: '읽고 싶은 책은 시작일을 입력할 수 없어요.',
      code: 'custom',
    })
    ctx.addIssue({
      path: ['endDate'],
      message: '읽고 싶은 책은 종료일을 입력할 수 없어요.',
      code: 'custom',
    })
  }
  if (data.status === 'reading' && (data.startDate === undefined || data.startDate === '')) {
    ctx.addIssue({
      path: ['startDate'],
      message: '읽는 중인 책은 시작일을 입력해 주세요.',
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
        message: '다 읽은 책은 시작일을 입력해 주세요.',
        code: 'custom',
      })
      ctx.addIssue({
        path: ['endDate'],
        message: '다 읽은 책은 종료일을 입력해 주세요.',
        code: 'custom',
      })
    }
  }
  // TODO: 유효성 검증 미통과 시 사용자가 값을 지울 수 있도록 ui 구현 필요
  if (data.status === 'on_hold' && (data.startDate === undefined || data.startDate === '')) {
    ctx.addIssue({
      path: ['startDate'],
      message: '보류 중인 책은 시작일을 입력해 주세요.',
      code: 'custom',
    })
  }
}

export function validateDateRules(data: BasicInfoFormValues, ctx: z.RefinementCtx) {
  if (data.startDate && data.endDate && data.startDate > data.endDate) {
    ctx.addIssue({
      path: ['startDate'],
      message: '시작일은 종료일보다 빠르거나 같아야 해요.',
      code: 'custom',
    })
  }
  if (data.startDate && data.publishedDate && data.startDate < data.publishedDate) {
    ctx.addIssue({
      path: ['startDate'],
      message: '시작일은 도서 출판일 이후여야 해요.',
      code: 'custom',
    })
  }
}

export const BasicInfoSchema = z
  .object({
    title: z.string().min(1, '제목을 입력해 주세요.'),
    author: z.string().min(1, '저자를 입력해 주세요.'),
    totalPages: z
      .number({
        required_error: '전체 페이지 수를 입력해 주세요.',
      })
      .min(1, '전체 페이지 수는 최소 1페이지 이상이어야 해요.'),
    publishedDate: z.string().min(1, '출판일을 선택해 주세요.'),
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
