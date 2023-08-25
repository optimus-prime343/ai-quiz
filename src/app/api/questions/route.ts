import type { NextRequest } from 'next/server'

import { gpt } from '@/lib/gpt'
import { createQuizSchema } from '@/schemas/quiz'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

export const POST = async (req: NextRequest, _res: NextResponse) => {
  try {
    const body = await req.json()
    const parsedBody = createQuizSchema.parse(body)
    const mcqQuestions = await gpt.generateMCQquestions(
      parsedBody.topic,
      parsedBody.amount,
    )
    return NextResponse.json(mcqQuestions)
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
