import z from 'zod'
import { BasicInfoFormValues } from '../types'

export const validateStatusRules = (data: BasicInfoFormValues, ctx: z.RefinementCtx) => {
  const hasStartDate = data.startDate && data.startDate.trim() !== ''
  const hasEndDate = data.endDate && data.endDate.trim() !== ''

  if (data.status === 'want_to_read' && (hasStartDate || hasEndDate)) {
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
  if (data.status === 'reading') {
    if (!hasStartDate) {
      ctx.addIssue({
        path: ['startDate'],
        message: '읽는 중인 책은 시작일을 입력해 주세요.',
        code: 'custom',
      })
    }
    if (hasEndDate) {
      ctx.addIssue({
        path: ['endDate'],
        message: '읽는 중인 책은 종료일을 입력할 수 없어요.',
        code: 'custom',
      })
    }
  }
  if (data.status === 'finished') {
    if (!hasStartDate) {
      ctx.addIssue({
        path: ['startDate'],
        message: '다 읽은 책은 시작일을 입력해 주세요.',
        code: 'custom',
      })
    }
    if (!hasEndDate) {
      ctx.addIssue({
        path: ['endDate'],
        message: '다 읽은 책은 종료일을 입력해 주세요.',
        code: 'custom',
      })
    }
  }
  if (data.status === 'on_hold') {
    if (!hasStartDate) {
      ctx.addIssue({
        path: ['startDate'],
        message: '보류 중인 책은 시작일을 입력해 주세요.',
        code: 'custom',
      })
    }
    if (hasEndDate) {
      ctx.addIssue({
        path: ['endDate'],
        message: '보류 중인 책은 종료일을 입력할 수 없어요.',
        code: 'custom',
      })
    }
  }
}

export const validateDateRules = (data: BasicInfoFormValues, ctx: z.RefinementCtx) => {
  const hasStartDate = data.startDate && data.startDate.trim() !== ''
  const hasEndDate = data.endDate && data.endDate.trim() !== ''
  if (
    hasStartDate &&
    hasEndDate &&
    typeof data.startDate === 'string' &&
    typeof data.endDate === 'string' &&
    data.startDate > data.endDate
  ) {
    ctx.addIssue({
      path: ['startDate'],
      message: '시작일은 종료일보다 빠르거나 같아야 해요.',
      code: 'custom',
    })
  }

  if (
    hasStartDate &&
    typeof data.startDate === 'string' &&
    data.publishedDate &&
    data.startDate < data.publishedDate
  ) {
    ctx.addIssue({
      path: ['startDate'],
      message: '시작일은 도서 출판일 이후여야 해요.',
      code: 'custom',
    })
  }
}
