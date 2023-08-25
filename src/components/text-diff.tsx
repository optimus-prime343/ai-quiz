import { cn } from '@/lib/cn'
import { diffChars } from 'diff'
import { memo } from 'react'

export interface Props {
  newString: string
  oldString: string
}
const TextDiff = memo<Props>(({ newString, oldString }) => {
  console.log({ newString, oldString })
  const diff = diffChars(oldString, newString)
  return diff.map((part, index) => (
    <span
      className={cn(
        part.removed && 'bg-red-700 text-white dark:text-black',
        part.added && 'bg-green-700 text-white dark:text-black',
        'text-muted-foreground',
      )}
      key={index}
    >
      {part.value}
    </span>
  ))
})

TextDiff.displayName = 'TextDiff'

export { TextDiff }
