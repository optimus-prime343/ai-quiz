import { db } from '@/lib/db'
import { getAuthSession } from '@/lib/next-auth'
import { checkOpenEndedAnswerSchema } from '@/schemas/quiz'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import { NextResponse } from 'next/server'
import { stringSimilarity } from 'string-similarity-js'
import { ZodError } from 'zod'

export const GET = async (req: Request, _res: Response) => {
  try {
    const session = await getAuthSession()
    if (!session?.user)
      return NextResponse.json(
        { message: getReasonPhrase(StatusCodes.UNAUTHORIZED) },
        { status: StatusCodes.UNAUTHORIZED },
      )
    const url = new URL(req.url)
    const body = {
      answer: url.searchParams.get('answer'),
      questionId: url.searchParams.get('questionId'),
    }
    const { answer, questionId } = checkOpenEndedAnswerSchema.parse(body)
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
    if (existingAnswer)
      return NextResponse.json(
        { message: "You can't answer already answered question" },
        { status: StatusCodes.BAD_REQUEST },
      )
    await db.answer.create({
      data: {
        answer,
        percentageCorrect: answerSimilarityInPercentage,
        questionId,
        userId: session.user.id,
      },
    })
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
