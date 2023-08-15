import type { Metadata } from 'next'

import { CreateQuizForm } from '@/components/quiz/create-quiz-form'
import React from 'react'

export const metadata: Metadata = {
  title: 'Quiz',
}

const Quiz = () => {
  return (
    <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
      <CreateQuizForm />
    </div>
  )
}

export default Quiz
