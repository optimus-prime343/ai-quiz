import { db } from '@/lib/db'
import { getAuthSession } from '@/lib/next-auth'
import { checkMcqAnswerSchema } from '@/schemas/quiz'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

export const GET = async (req: Request, _res: Response) => {
  try {
    const session = await getAuthSession()
    if (!session?.user)
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: StatusCodes.UNAUTHORIZED },
      )
    const url = new URL(req.url)
    const params = {
      questionId: url.searchParams.get('questionId'),
      selectedOption: url.searchParams.get('selectedOption'),
    }
    const { questionId, selectedOption } = checkMcqAnswerSchema.parse(params)
    const question = await db.question.findUnique({
      where: {
        correctOption: selectedOption,
        id: questionId,
      },
    })
    await db.answer.create({
      data: {
        correct: !!question,
        questionId,
        userId: session.user.id,
      },
    })
    return NextResponse.json({ correct: !!question })
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
