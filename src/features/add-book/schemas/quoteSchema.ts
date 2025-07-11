import { z } from 'zod'

export const QuoteSchema = (totalPages: number) =>
  z
    .object({
      quotePage: z.number(),
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
