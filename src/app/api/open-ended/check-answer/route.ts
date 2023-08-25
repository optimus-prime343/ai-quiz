import type { NextRequest } from 'next/server'

import { db } from '@/lib/db'
import { getAuthSession } from '@/lib/next-auth'
import { checkOpenEndedAnswerSchema } from '@/schemas/quiz'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import { NextResponse } from 'next/server'
import { stringSimilarity } from 'string-similarity-js'
import { ZodError } from 'zod'

export const GET = async (req: NextRequest, _res: NextResponse) => {
  try {
    const session = await getAuthSession()
    if (!session?.user)
      return NextResponse.json(
        { message: getReasonPhrase(StatusCodes.UNAUTHORIZED) },
        { status: StatusCodes.UNAUTHORIZED },
      )
    const body = {
      answer: req.nextUrl.searchParams.get('answer'),
      nextQuestionIndex: req.nextUrl.searchParams.get('nextQuestionIndex'),
      questionId: req.nextUrl.searchParams.get('questionId'),
    }
    const { answer, nextQuestionIndex, questionId } =
      checkOpenEndedAnswerSchema.parse(body)
    const question = await db.question.findUnique({
      where: {
        id: questionId,
      },
    })
    if (!question)
      return NextResponse.json(
        { message: 'Question not found' },
        { status: StatusCodes.BAD_REQUEST },
      )
    const answerSimilarity = stringSimilarity(question.answer ?? '', answer)
    const answerSimilarityInPercentage = Math.round(answerSimilarity * 100)
    const existingAnswer = await db.answer.findUnique({
      where: {
        questionId: question.id,
        userId: session.user.id,
      },
    })
    if (existingAnswer) {
      await db.answer.delete({
        where: { questionId: question.id, userId: session.user.id },
      })
    }
    await db.answer.create({
      data: {
        answer,
        percentageCorrect: answerSimilarityInPercentage,
        questionId,
        userId: session.user.id,
      },
    })
    if (question.gameId) {
      await db.game.update({
        data: { pausedQuestionIndex: nextQuestionIndex },
        where: { id: question.gameId, userId: session.user.id },
      })
    }
    return NextResponse.json({ answerSimilarity: answerSimilarityInPercentage })
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
