import { z } from 'zod'

export const ReviewSchema = (rating: number) =>
  z
    .object({
      review: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (rating === 1 || rating === 5) {
        if (!data.review || data.review.length < 100) {
          ctx.addIssue({
            path: ['review'],
            message: '독후감은 최소 100자 이상 작성해야합니다.',
            code: 'custom',
          })
        }
      }
    })
