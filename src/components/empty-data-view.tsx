import type { ComponentProps } from 'react'

import { cn } from '@/lib/cn'
import { IconMoodEmptyFilled } from '@tabler/icons-react'

export const EmptyDataView = ({
  className,
  ...rest
}: ComponentProps<'div'>) => (
  <div
    {...rest}
    className={cn(
      'mt-auto flex flex-1 flex-col items-center justify-center gap-2 rounded-md border border-border py-3 text-muted-foreground',
      className,
    )}
  >
    <IconMoodEmptyFilled size={50} />
    <p className='text-lg font-bold'>Wow, such empty</p>
  </div>
)
