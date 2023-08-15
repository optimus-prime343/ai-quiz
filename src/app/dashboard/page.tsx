import type { Metadata } from 'next'

import { HistoryCard } from '@/components/dashboard/history-card'
import { HotTopicsCard } from '@/components/dashboard/hot-topics-card'
import { QuizMeCard } from '@/components/dashboard/quiz-me-card'
import { RecentActivityCard } from '@/components/dashboard/recent-activity-card'
import React from 'react'

export const metadata: Metadata = {
  title: 'Dashboard',
}
const Dashboard = () => {
  return (
    <>
      <h2 className='text-2xl font-bold tracking-tighter'>Dashboard</h2>
      <div className='mt-4 grid gap-4 md:grid-cols-2'>
        <QuizMeCard />
        <HistoryCard />
      </div>
      <div className='mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <HotTopicsCard className='col-span-4' />
        <RecentActivityCard className='col-span-4 lg:col-span-3' />
      </div>
    </>
  )
}

export default Dashboard
