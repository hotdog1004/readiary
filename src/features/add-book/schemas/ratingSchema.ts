import { z } from 'zod'

export const RatingSchema = z.object({
  isRecommended: z.boolean(),
  rating: z.number().min(0).max(5),
})
