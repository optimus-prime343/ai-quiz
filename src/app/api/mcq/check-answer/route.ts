import type { NextRequest } from 'next/server'

import { db } from '@/lib/db'
import { getAuthSession } from '@/lib/next-auth'
import { checkMcqAnswerSchema } from '@/schemas/quiz'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

export const GET = async (req: NextRequest, _res: NextResponse) => {
  try {
    const session = await getAuthSession()
    if (!session?.user)
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: StatusCodes.UNAUTHORIZED },
      )
    const params = {
      nextQuestionIndex: req.nextUrl.searchParams.get('nextQuestionIndex'),
      questionId: req.nextUrl.searchParams.get('questionId'),
      selectedOption: req.nextUrl.searchParams.get('selectedOption'),
    }
    const { nextQuestionIndex, questionId, selectedOption } =
      checkMcqAnswerSchema.parse(params)
    const question = await db.question.findUnique({
      where: { id: questionId },
    })
    if (!question)
      return NextResponse.json(
        { message: 'Question not found' },
        { status: StatusCodes.BAD_REQUEST },
      )
    const existingAnswer = await db.answer.findUnique({
      where: {
        questionId: question.id,
        userId: session.user.id,
      },
    })
    if (existingAnswer) {
      await db.answer.delete({ where: { id: existingAnswer.id } })
    }
    const isCorrect = question.correctOption === selectedOption
    await db.answer.create({
      data: {
        answer: selectedOption,
        correct: isCorrect,
        questionId,
        userId: session.user.id,
      },
    })
    if (question.gameId) {
      await db.game.update({
        data: { pausedQuestionIndex: nextQuestionIndex },
        where: { id: question.gameId },
      })
    }
    return NextResponse.json({ correct: isCorrect })
  } catch (error) {
    console.error(error)
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: error.issues },
        { status: StatusCodes.BAD_REQUEST },
      )
    }
    return NextResponse.json(
      { message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) },
      { status: StatusCodes.INTERNAL_SERVER_ERROR },
    )
  }
}
