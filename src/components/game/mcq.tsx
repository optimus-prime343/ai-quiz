'use client'
import type {
  CheckMcqAnswerInput,
  CheckMcqAnswerResponse,
} from '@/schemas/quiz'
import type { Game, Question } from '@prisma/client'

import { api } from '@/lib/api-client'
import { formatTimeDelta } from '@/utils/time'
import { IconChartBar } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'
import Link from 'next/link'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { Badge } from '../ui/badge'
import { Button, buttonVariants } from '../ui/button'
import { Countdown } from './countdown'
import { MCQCounter } from './mcq-counter'

type Props = {
  game: Game & { questions: Pick<Question, 'id' | 'options' | 'question'>[] }
}

export const MCQ = ({ game }: Props) => {
  const checkMcqAnswer = useMutation<
    CheckMcqAnswerResponse,
    Error,
    CheckMcqAnswerInput
  >({
    mutationFn: input => api.checkMCQAnswer(input),
  })
  const [correct, setCorrect] = useState(0)
  const [incorrect, setIncorrect] = useState(0)
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
  const [activeOptionIndex, setActiveOptionIndex] = useState<
    number | undefined
  >()
  const [now, setNow] = useState(() => new Date())

  const hasGameEnded = useMemo(
    () => activeQuestionIndex === game.questions.length - 1,
    [activeQuestionIndex, game.questions.length],
  )
  const question = useMemo(
    () => game.questions[activeQuestionIndex],
    [activeQuestionIndex, game.questions],
  )
  const options = useMemo<string[]>(
    () => JSON.parse(question.options as string),
    [question.options],
  )

  const handleNextClick = useCallback(() => {
    if (activeOptionIndex === undefined) return
    checkMcqAnswer.mutate(
      {
        questionId: question.id,
        selectedOption: options[activeOptionIndex],
      },
      {
        onSuccess: ({ correct }) => {
          correct
            ? setCorrect(prev => prev + 1)
            : setIncorrect(prev => prev + 1)
          if (!hasGameEnded) {
            setActiveQuestionIndex(prev => prev + 1)
            setActiveOptionIndex(undefined)
          }
        },
      },
    )
  }, [activeOptionIndex, checkMcqAnswer, hasGameEnded, options, question.id])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const validKeys = ['1', '2', '3', '4']
      if (validKeys.includes(event.key)) {
        setActiveOptionIndex(Number(event.key) - 1)
      }
      if (event.key === 'Enter' && activeOptionIndex !== undefined) {
        handleNextClick()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeOptionIndex, handleNextClick])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!hasGameEnded) setNow(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [hasGameEnded])

  if (hasGameEnded)
    return (
      <div className='flex flex-col items-center gap-4'>
        <p className='whitespace-nowrap rounded-md bg-green-700 px-4 py-2'>
          You completed the game on{' '}
          <span className='font-bold'>
            {formatTimeDelta(dayjs(now).diff(game.startedOn, 'seconds'))}
          </span>
        </p>
        <Link
          className={buttonVariants()}
          href={`/dashboard/stats/${game.id}`}
        >
          View stats
          <IconChartBar className='ml-2 h-4 w-4' />
        </Link>
      </div>
    )
  return (
    <div className='max-w-md space-y-4'>
      <Badge>Topic : {game.topic}</Badge>
      <div className='flex items-center justify-between'>
        <Countdown
          currentTime={now}
          gameStartedOn={game.startedOn}
        />
        <MCQCounter
          correct={correct}
          incorrect={incorrect}
        />
      </div>
      <div className='space-y-4'>
        <div className='flex items-center gap-4 rounded-md border px-4 py-2'>
          <p className='inline-flex flex-col items-center justify-center'>
            <span className='font-bold'>{activeQuestionIndex + 1}</span>
            <span className='block h-px w-full bg-border' />
            <span className='text-muted-foreground'>
              {game.questions.length}
            </span>
          </p>
          <h4 className='flex-1 border-l px-4 font-bold'>
            {question.question}
          </h4>
        </div>
        {options.map((option, index) => (
          <Button
            className='h-12 w-full items-center justify-start gap-4 px-2'
            key={index}
            onClick={() => setActiveOptionIndex(index)}
            variant={index === activeOptionIndex ? 'default' : 'outline'}
          >
            <p className='flex h-8 w-8 items-center justify-center rounded-md border font-bold'>
              {index + 1}
            </p>
            {option}
          </Button>
        ))}
        {activeOptionIndex !== undefined ? (
          <Button
            isLoading={checkMcqAnswer.isLoading}
            onClick={handleNextClick}
          >
            Next
          </Button>
        ) : null}
      </div>
    </div>
  )
}
