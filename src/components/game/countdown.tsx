'use client'
import { formatTimeDelta } from '@/utils/time'
import { IconClock } from '@tabler/icons-react'
import dayjs from 'dayjs'

export interface Props {
  currentTime: Date
  gameStartedOn: Date
}
export const Countdown = ({ currentTime, gameStartedOn }: Props) => {
  return (
    <div className='flex items-center gap-2'>
      <IconClock />
      <span suppressHydrationWarning={true}>
        {formatTimeDelta(dayjs(currentTime).diff(gameStartedOn, 'seconds'))}
      </span>
    </div>
  )
}
