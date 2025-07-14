import { DateFieldValidationRule } from '../../types'

export const dateFieldValidationRules: DateFieldValidationRule[] = [
  {
    fields: ['startDate', 'endDate'],
    compare: (start, end) => start === undefined || end === undefined || start <= end,
    message: '시작일은 종료일보다 빠르거나 같아야 해요.',
    path: 'startDate',
  },
  {
    fields: ['startDate', 'publishedDate'],

    compare: (start, published) =>
      start === undefined || published === undefined || start >= published,
    message: '시작일은 도서 출판일 이후여야 해요.',
    path: 'startDate',
  },
] as const
