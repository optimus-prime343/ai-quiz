import { db } from '@/lib/db'
import { gpt } from '@/lib/gpt'
import { getAuthSession } from '@/lib/next-auth'
import { createQuizSchema } from '@/schemas/quiz'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'

export const POST = async (req: Request, _res: Response) => {
  const session = await getAuthSession()
  if (!session?.user)
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: StatusCodes.UNAUTHORIZED },
    )
  const body = await req.json()
  const { amount, topic, type } = createQuizSchema.parse(body)
  const game = await db.game.create({
    data: {
      startedOn: new Date(),
      topic,
      type,
      userId: session.user.id,
    },
  })
  if (type === 'mcq') {
    const mcqQuestionsFromGPT = await gpt.generateMCQquestions(topic, amount)
    const questions = mcqQuestionsFromGPT.map(question => ({
      ...question,
      gameId: game.id,
      options: JSON.stringify(question.options),
      type,
    }))
    await db.question.createMany({ data: questions })
  } else if (type === 'open_ended') {
    const openEndedQuestionsGPT = await gpt.generateOpenEndedQuestions(
      topic,
      amount,
    )
    const openEndedQuestions = openEndedQuestionsGPT.map(openEndedQuestion => ({
      ...openEndedQuestion,
      gameId: game.id,
      type,
    }))
    await db.question.createMany({ data: openEndedQuestions })
  }
  return NextResponse.redirect(`/dashboard/game/${game.id}`)
}
