import type { Game } from '@prisma/client'
import type { ComponentProps } from 'react'

import { IconHistory } from '@tabler/icons-react'
import dayjs from 'dayjs'
import Link from 'next/link'
import React from 'react'

import { Badge } from '../ui/badge'
import { buttonVariants } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'

export interface Props extends ComponentProps<typeof Card> {
  recentGames: Game[]
  totalGames: number
}
export const RecentActivityCard = ({
  recentGames,
  totalGames,
  ...rest
}: Props) => {
  return (
    <Card {...rest}>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>Recent Activity</CardTitle>
        <CardDescription>
          You have played a total of {totalGames} games
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className='h-[500px] pb-2'>
          <div className='space-y-2'>
            {recentGames.map(game => (
              <Card key={game.id}>
                <CardHeader>
                  <CardTitle className='flex flex-wrap items-center justify-between gap-2'>
                    <Badge>
                      <IconHistory className='mr-2 h-4 w-4' /> {game.topic}
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
                  </CardTitle>
                  <CardDescription>
                    <Separator
                      asChild
                      className='my-3 block'
                    >
                      <span />
                    </Separator>
                    <span>
                      Started on {dayjs(game.startedOn).format('lll')}
                    </span>
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
