import type { ComponentProps } from 'react'

import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { CustomWordCloud } from './custom-word-cloud'

export const HotTopicsCard = (props: ComponentProps<typeof Card>) => {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>Hot Topics</CardTitle>
        <CardDescription>
          Select any of the following topics to get started on a quiz
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CustomWordCloud />
      </CardContent>
    </Card>
  )
}
