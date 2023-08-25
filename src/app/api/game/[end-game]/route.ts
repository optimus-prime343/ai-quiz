import type { NextRequest } from 'next/server'

import { db } from '@/lib/db'
import { getAuthSession } from '@/lib/next-auth'
import { endGameRequestSchema } from '@/schemas/game'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

export const PATCH = async (req: NextRequest, _res: NextResponse) => {
  try {
    const session = await getAuthSession()
    if (!session?.user)
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: StatusCodes.UNAUTHORIZED },
      )
    const body = await req.json()
    const { gameId } = endGameRequestSchema.parse(body)
    const game = await db.game.findUnique({
      where: {
        id: gameId,
        userId: session.user.id,
      },
    })
    if (!game)
      return NextResponse.json(
        { message: 'Game not found' },
        { status: StatusCodes.NOT_FOUND },
      )
    if (game.endedOn)
      return NextResponse.json(
        { message: 'Game has already ended' },
        { status: StatusCodes.BAD_REQUEST },
      )
    await db.game.update({
      data: { endedOn: new Date() },
      where: { id: gameId },
    })
    return NextResponse.json(
      { message: 'Game successfully ended' },
      { status: StatusCodes.OK },
    )
  } catch (error) {
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
