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

export const createQuizResponseSchema = z.object({ gameId: z.string() })

export const checkMcqAnswerSchema = z.object({
  questionId: z.string(),
  selectedOption: z.string(),
})
export const checkMcqAnswerResponseSchema = z.object({
  correct: z.boolean(),
})

export type CreateQuizInput = z.infer<typeof createQuizSchema>
export type CreateQuizResponse = z.infer<typeof createQuizResponseSchema>
export type CheckMcqAnswerInput = z.infer<typeof checkMcqAnswerSchema>
export type CheckMcqAnswerResponse = z.infer<
  typeof checkMcqAnswerResponseSchema
>
