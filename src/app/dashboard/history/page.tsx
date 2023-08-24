import { RecentActivityItem } from '@/components/dashboard/recent-activity-item'
import { buttonVariants } from '@/components/ui/button'
import { db } from '@/lib/db'
import { getAuthSession } from '@/lib/next-auth'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'

interface Props {
  searchParams: {
    page?: string
  }
}
const History = async ({ searchParams }: Props) => {
  const session = await getAuthSession()
  const count = await db.game.count({
    where: { userId: session?.user.id },
  })
  const page = parseInt(searchParams.page ?? '1', 10) || 1
  const perPage = 10
  const totalPages = Math.ceil(count / perPage)
  const skip = (page - 1) * perPage
  const nextPage = page < totalPages ? page + 1 : null
  const prevPage = page > 1 ? page - 1 : null
  const games = await db.game.findMany({
    skip,
    take: perPage,
    where: { userId: session?.user.id },
  })
  return (
    <div className='space-y-4'>
      <div className='space-x-2'>
        {prevPage ? (
          <Link
            href={{
              pathname: '/dashboard/history',
              query: { page: prevPage === 1 ? undefined : prevPage },
            }}
            className={buttonVariants()}
          >
            <IconChevronLeft className='mr-2 h-4 w-4' />
            Previous
          </Link>
        ) : null}
        {nextPage ? (
          <Link
            className={buttonVariants()}
            href={{ pathname: '/dashboard/history', query: { page: nextPage } }}
          >
            Next
            <IconChevronRight className='ml-2 h-4 w-4' />
          </Link>
        ) : null}
      </div>
      {games.map(game => (
        <RecentActivityItem
          game={game}
          key={game.id}
        />
      ))}
    </div>
  )
}

export default History
