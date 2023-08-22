import type { Metadata } from 'next'

import { HistoryCard } from '@/components/dashboard/history-card'
import { HotTopicsCard } from '@/components/dashboard/hot-topics-card'
import { QuizMeCard } from '@/components/dashboard/quiz-me-card'
import { RecentActivityCard } from '@/components/dashboard/recent-activity-card'
import { db } from '@/lib/db'
import { getAuthSession } from '@/lib/next-auth'
import React from 'react'

export const metadata: Metadata = {
  title: 'Dashboard',
}
const Dashboard = async () => {
  const session = await getAuthSession()
  const recentGames = await db.game.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    where: { userId: session?.user?.id },
  })
  const totalGames = await db.game.count({
    where: {
      userId: session?.user.id,
    },
  })
  const games = await db.game.findMany({ select: { topic: true } })
  const uniqueTopics = Array.from(new Set(games.map(game => game.topic)))
  const hotGameTopics = await Promise.all(
    uniqueTopics.map(async topic => {
      const count = await db.game.count({
        where: { topic },
      })
      return { text: topic, value: count }
    }),
  )
  return (
    <>
      <h2 className='text-2xl font-bold tracking-tighter'>Dashboard</h2>
      <div className='mt-4 grid gap-4 md:grid-cols-2'>
        <QuizMeCard />
        <HistoryCard />
      </div>
      <div className='mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <HotTopicsCard
          className='col-span-4'
          hotGameTopics={hotGameTopics}
        />
        <RecentActivityCard
          className='col-span-4 lg:col-span-3'
          recentGames={recentGames}
          totalGames={totalGames}
        />
      </div>
    </>
  )
}

export default Dashboard
