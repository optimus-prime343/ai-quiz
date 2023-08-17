import { z } from 'zod'

export const createQuizSchema = z.object({
  amount: z.coerce
    .number({ invalid_type_error: 'Quiz amount is required' })
    .positive({ message: 'Quiz amount must be greater than zero' }),
  topic: z
    .string()
    .min(4, { message: 'Topic must be at least 4 characters long' })
    .max(20),
  type: z.enum(['mcq', 'open_ended']),
})

export type CreateQuizInput = z.infer<typeof createQuizSchema>
