import { IconBrain } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'

import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'

export const QuizMeCard = () => {
  return (
    <Link
      href='/dashboard/quiz'
      title='Start quiz'
    >
      <Card className='cursor-pointer hover:opacity-75'>
        <CardHeader>
          <CardTitle className='flex flex-row items-center justify-between'>
            <p className='text-2xl font-bold'>Start Quiz</p>
            <IconBrain
              size={30}
              strokeWidth={2}
            />
          </CardTitle>
          <CardDescription>Challenge yourself to a quiz</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}
