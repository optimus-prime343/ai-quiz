'use client'
import type { EndGameInput, EndGameResponse } from '@/schemas/game'
import type {
  CheckMcqAnswerInput,
  CheckMcqAnswerResponse,
} from '@/schemas/quiz'
import type { Game, Question } from '@prisma/client'

import { api } from '@/lib/api-client'
import { useMutation } from '@tanstack/react-query'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Countdown } from './countdown'
import { GameEnded } from './game-ended'
import { MCQCounter } from './mcq-counter'
import { QuestionCard } from './question-card'

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
  const endGame = useMutation<EndGameResponse, Error, EndGameInput>({
    mutationFn: input => api.endGame(input),
  })

  const [correct, setCorrect] = useState(0)
  const [incorrect, setIncorrect] = useState(0)
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
  const [activeOptionIndex, setActiveOptionIndex] = useState<
    number | undefined
  >()
  const [gameEnded, setGameEnded] = useState(false)
  const [now, setNow] = useState(() => new Date())

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
          if (game.questions.length - 1 === activeQuestionIndex) {
            endGame.mutate(
              { gameId: game.id },
              {
                onSuccess: () => {
                  setGameEnded(true)
                },
              },
            )
            return
          }
          setActiveQuestionIndex(prev => prev + 1)
          setActiveOptionIndex(undefined)
        },
      },
    )
  }, [
    activeOptionIndex,
    activeQuestionIndex,
    checkMcqAnswer,
    endGame,
    game.id,
    game.questions.length,
    options,
    question.id,
  ])

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
      if (gameEnded) {
        clearInterval(interval)
        return
      }
      setNow(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [gameEnded])

  if (gameEnded)
    return (
      <GameEnded
        game={game}
        now={now}
      />
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
        <QuestionCard
          currentQuestionIndex={activeQuestionIndex}
          question={question.question}
          totalQuestions={game.questions.length}
        />
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
