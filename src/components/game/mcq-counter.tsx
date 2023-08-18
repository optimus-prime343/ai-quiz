import { IconCircleCheck, IconCircleX } from '@tabler/icons-react'

import { Separator } from '../ui/separator'

export interface Props {
  correct: number
  incorrect: number
}
export const MCQCounter = ({ correct, incorrect }: Props) => {
  return (
    <div className='flex flex-row items-center justify-center rounded-md border px-2 py-1.5'>
      <IconCircleCheck color='green' />
      <p className='mx-2 text-lg'>{correct}</p>
      <Separator orientation='vertical' />
      <IconCircleX color='red' />
      <p className='mx-2 text-lg'>{incorrect}</p>
    </div>
  )
}
