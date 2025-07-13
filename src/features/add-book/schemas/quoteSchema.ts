import { z } from 'zod'

export const QuoteSchema = (totalPages: number) =>
  z
    .object({
      quotePage: z
        .number({
          required_error: '인용구 페이지 번호를 입력해 주세요.',
        })
        .min(1, '페이지 번호는 최소 1페이지 이상이어야 해요.'),
      quoteText: z.string(),
    })
    .superRefine((data, ctx) => {
      if (data.quotePage >= totalPages) {
        ctx.addIssue({
          path: ['quotePage'],
          message: '인용구 페이지 번호는 도서 전체 페이지 수보다 작아야 합니다.',
          code: 'custom',
        })
      }
    })
