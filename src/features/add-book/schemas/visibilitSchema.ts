import { z } from 'zod'

export const VisibilitySchema = z.object({
  isPublic: z.boolean(),
})
