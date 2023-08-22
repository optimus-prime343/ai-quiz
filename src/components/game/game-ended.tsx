import type { Game } from '@prisma/client'

import { formatTimeDelta } from '@/utils/time'
import { IconChartBar } from '@tabler/icons-react'
import dayjs from 'dayjs'
import Link from 'next/link'
import { memo } from 'react'

import { buttonVariants } from '../ui/button'

export interface Props {
  game: Game
  now: Date
}
const GameEnded = memo<Props>(({ game, now }) => (
  <div className='flex flex-col items-center gap-4'>
    <p className='whitespace-nowrap rounded-md bg-green-700 px-4 py-2'>
      You completed the game on{' '}
      <span className='font-bold'>
        {formatTimeDelta(dayjs(now).diff(game.startedOn, 'seconds'))}
      </span>
    </p>
    <Link
      className={buttonVariants()}
      href={`/dashboard/stats/${game.id}`}
    >
      View stats
      <IconChartBar className='ml-2 h-4 w-4' />
    </Link>
  </div>
))
GameEnded.displayName = 'GameEnded'
export { GameEnded }
