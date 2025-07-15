import { z } from 'zod'

export const ReviewSchema = (rating: number) =>
  z
    .object({
      review: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (rating === 1 || rating === 5) {
        if (data.review === undefined || data.review.trim().length < 100) {
          ctx.addIssue({
            path: ['review'],
            message: '최소 100자 이상 입력해 주세요.',
            code: 'custom',
          })
        }
      }
    })
