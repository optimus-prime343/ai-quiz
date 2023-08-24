import { cn } from '@/lib/cn'
import { diffChars } from 'diff'
import { memo } from 'react'

export interface Props {
  newString: string
  oldString: string
}
const TextDiff = memo<Props>(({ newString, oldString }) => {
  const diff = diffChars(oldString, newString)
  return diff.map((part, index) => (
    <span
      className={cn(part.removed && 'text-red-700')}
      key={index}
    >
      {part.value}
    </span>
  ))
})

TextDiff.displayName = 'TextDiff'

export { TextDiff }
