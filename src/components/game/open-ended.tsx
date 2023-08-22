'use client'
import type { EndGameInput, EndGameResponse } from '@/schemas/game'
import type {
  CheckOpenEndedAnswerInput,
  CheckOpenEndedAnswerResponse,
} from '@/schemas/quiz'
import type { Game, Question } from '@prisma/client'

import { api } from '@/lib/api-client'
import { useMutation } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { BLANKS, BlankAnswerInput } from '../blank-answer-input'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Progress } from '../ui/progress'
import { toast } from '../ui/use-toast'
import { Countdown } from './countdown'
import { GameEnded } from './game-ended'
import { QuestionCard } from './question-card'

export interface Props {
  game: Game & {
    questions: Array<Pick<Question, 'answer' | 'id' | 'question'>>
  }
}
export const OpenEnded = ({ game }: Props) => {
  const checkAnswer = useMutation<
    CheckOpenEndedAnswerResponse,
    Error,
    CheckOpenEndedAnswerInput
  >({
    mutationFn: input => api.checkOpenEndedAnswer(input),
  })
  const endGame = useMutation<EndGameResponse, Error, EndGameInput>({
    mutationFn: input => api.endGame(input),
  })

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
  const [blankAnswer, setBlankAnswer] = useState('')
  const [gameEnded, setGameEnded] = useState(false)
  const [now, setNow] = useState(() => new Date())

  const question = useMemo(
    () => game.questions.at(activeQuestionIndex),
    [activeQuestionIndex, game.questions],
  )
  const progress = useMemo(
    () => ((activeQuestionIndex + 1) / game.questions.length) * 100,
    [activeQuestionIndex, game.questions.length],
  )
  const handleNext = useCallback(() => {
    if (!question) return
    let filledAnswer = blankAnswer
    document
      .querySelectorAll<HTMLInputElement>('#user-blank-input')
      .forEach(input => {
        filledAnswer = filledAnswer.replace(BLANKS, input.value)
        input.value = ''
      })
    checkAnswer.mutate(
      { answer: filledAnswer, questionId: question.id },
      {
        onSuccess: ({ answerSimilarity }) => {
          toast({
            title: `Your answer is ${answerSimilarity}% similar to the correct answer`,
          })
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
        },
      },
    )
  }, [
    activeQuestionIndex,
    blankAnswer,
    checkAnswer,
    endGame,
    game.id,
    game.questions.length,
    question,
  ])

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
    <div className='space-y-4'>
      <Badge>Topic {game.topic}</Badge>
      <Progress value={progress} />
      <div>
        <Countdown
          currentTime={now}
          gameStartedOn={game.startedOn}
        />
      </div>
      {question ? (
        <>
          <QuestionCard
            currentQuestionIndex={activeQuestionIndex}
            question={question.question}
            totalQuestions={game.questions.length}
          />
          <BlankAnswerInput
            answer={question.answer ?? ''}
            setBlankAnswer={setBlankAnswer}
          />
        </>
      ) : null}
      <Button
        isLoading={checkAnswer.isLoading}
        onClick={handleNext}
      >
        Next
      </Button>
    </div>
  )
}
