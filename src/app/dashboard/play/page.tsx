import type { GameType } from '@prisma/client'

import { MCQ } from '@/components/game/mcq'
import { db } from '@/lib/db'
import { getAuthSession } from '@/lib/next-auth'
import { redirect } from 'next/navigation'
interface Props {
  searchParams: {
    gameId: string
    type: GameType
  }
}
const Play = async ({ searchParams }: Props) => {
  const session = await getAuthSession()
  const game = await db.game.findUnique({
    include: {
      questions: {
        select: {
          id: true,
          options: true,
          question: true,
        },
      },
    },
    where: {
      id: searchParams.gameId,
      type: searchParams.type,
      userId: session?.user.id,
    },
  })
  if (!game) return redirect('/dashboard/quiz')
  return (
    <section className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
      {searchParams.type === 'mcq' ? <MCQ game={game} /> : null}
    </section>
  )
}

export default Play
