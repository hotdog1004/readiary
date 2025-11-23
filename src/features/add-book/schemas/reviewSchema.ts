import { z } from 'zod'

export const ReviewBaseSchema = z.object({
  review: z.string().optional(),
})
