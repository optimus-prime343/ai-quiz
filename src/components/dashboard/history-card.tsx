'use client'
import { IconHistory } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'

import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'

export const HistoryCard = () => {
  return (
    <Link
      href='/dashboard/history'
      title='History'
    >
      <Card className='cursor-pointer hover:opacity-75'>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <p className='text-2xl font-bold'>History</p>
            <IconHistory
              size={30}
              strokeWidth={2}
            />
          </CardTitle>
          <CardDescription>View your previous quiz attempts</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}
