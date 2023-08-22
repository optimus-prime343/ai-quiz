'use client'

import { memo } from 'react'

export interface Props {
  currentQuestionIndex: number
  question: string
  totalQuestions: number
}
const QuestionCard = memo<Props>(
  ({ currentQuestionIndex, question, totalQuestions }) => {
    return (
      <div className='flex items-center gap-4 rounded-md border px-4 py-2'>
        <p className='inline-flex flex-col items-center justify-center'>
          <span className='font-bold'>{currentQuestionIndex + 1}</span>
          <span className='block h-px w-full bg-border' />
          <span className='text-muted-foreground'>{totalQuestions}</span>
        </p>
        <h4 className='flex-1 border-l px-4 font-bold'>{question}</h4>
      </div>
    )
  },
)

QuestionCard.displayName = 'QuestionCard'

export { QuestionCard }
