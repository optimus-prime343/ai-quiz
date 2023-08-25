import type { HotGameTopic } from '@/schemas/game'
import type { ComponentProps } from 'react'

import React from 'react'

import { EmptyDataView } from '../empty-data-view'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { HotGameTopicsCloud } from './hot-game-topics-cloud'

export interface Props extends ComponentProps<typeof Card> {
  hotGameTopics: HotGameTopic[]
}
export const HotTopicsCard = ({ hotGameTopics, ...rest }: Props) => {
  return (
    <Card {...rest}>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>Hot Topics</CardTitle>
        <CardDescription>
          Select any of the following topics to get started on a quiz
        </CardDescription>
      </CardHeader>
      <CardContent>
        {hotGameTopics.length === 0 ? (
          <EmptyDataView />
        ) : (
          <HotGameTopicsCloud hotGameTopics={hotGameTopics} />
        )}
      </CardContent>
    </Card>
  )
}
