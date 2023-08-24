import type { Game } from '@prisma/client'
import type { ComponentProps } from 'react'

import { IconHistory } from '@tabler/icons-react'
import dayjs from 'dayjs'
import Link from 'next/link'

import { Badge } from '../ui/badge'
import { buttonVariants } from '../ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'

export interface Props extends ComponentProps<typeof Card> {
  game: Game
}

export const RecentActivityItem = ({ game, ...rest }: Props) => {
  const gameType = game.type === 'open_ended' ? 'Open Ended' : 'MCQ'
  return (
    <Card
      key={game.id}
      {...rest}
    >
      <CardHeader>
        <CardTitle className='flex flex-wrap items-center justify-between gap-2'>
          <Badge>
            <IconHistory className='mr-2 h-4 w-4' /> {gameType}
          </Badge>
          <Link
            className={buttonVariants({
              variant: game.endedOn ? 'default' : 'outline',
            })}
            href={
              game.endedOn
                ? `/dashboard/stats/${game.id}`
                : `/dashboard/play?gameId=${game.id}&type=${game.type}`
            }
          >
            {game.endedOn ? 'View Stats' : 'Resume playing'}
          </Link>
          <Separator
            asChild
            className='my-2 block'
          >
            <span />
          </Separator>
        </CardTitle>
        <CardDescription className='flex flex-col gap-2'>
          <span>
            Topic : <span className='font-bold'>{game.topic}</span>
          </span>
          <span>
            Started on :{' '}
            <span className='font-bold'>
              {dayjs(game.startedOn).format('lll')}
            </span>
          </span>
          {game.endedOn ? (
            <span>
              Ended on :{' '}
              <span className='font-bold'>
                {dayjs(game.endedOn).format('lll')}
              </span>
            </span>
          ) : null}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
