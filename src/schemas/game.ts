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

export type Game = z.infer<typeof gameSchema>
