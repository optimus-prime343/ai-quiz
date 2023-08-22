import { z } from 'zod'

export const gameSchema = z.object({
  createdAt: z.coerce.date(),
  endedOn: z.coerce.date().nullable(),
  id: z.string().uuid(),
  startedOn: z.coerce.date(),
  topic: z.string(),
  type: z.enum(['open_ended', 'mcq']),
  updatedAt: z.coerce.date(),
})

export const endGameRequestSchema = z.object({
  gameId: z.string().uuid(),
})
export const endGameResponseSchema = z.object({
  message: z.string(),
})

export const hotGameTopicsResponseSchema = z.array(
  z.object({
    text: z.string(),
    value: z.number().positive(),
  }),
)

export type Game = z.infer<typeof gameSchema>
export type EndGameInput = z.infer<typeof endGameRequestSchema>
export type EndGameResponse = z.infer<typeof endGameResponseSchema>
export type HotTopicsResponse = z.infer<typeof hotGameTopicsResponseSchema>
export type HotGameTopic = HotTopicsResponse[number]
