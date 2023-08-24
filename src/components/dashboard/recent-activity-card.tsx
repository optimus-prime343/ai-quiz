import type { Game } from '@prisma/client'
import type { ComponentProps } from 'react'

import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { ScrollArea } from '../ui/scroll-area'
import { RecentActivityItem } from './recent-activity-item'

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
              <RecentActivityItem
                game={game}
                key={game.id}
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
