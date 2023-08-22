import { MCQAnswerTable } from '@/components/stats/mcq-answer-table'
import { QuestionAnswersTable } from '@/components/stats/question-answers-table'
import { StatCard } from '@/components/stats/stat-card'
import { buttonVariants } from '@/components/ui/button'
import { db } from '@/lib/db'
import { getAuthSession } from '@/lib/next-auth'
import { formatTimeDelta } from '@/utils/time'
import { IconAnalyze, IconChevronLeft, IconClock } from '@tabler/icons-react'
import dayjs from 'dayjs'
import Link from 'next/link'
import { redirect } from 'next/navigation'

interface Props {
  params: {
    gameId: string
  }
}
const DashboardStats = async (props: Props) => {
  const session = await getAuthSession()
  const game = await db.game.findUnique({
    include: {
      questions: {
        include: {
          userAnswer: true,
        },
      },
    },
    where: {
      id: props.params.gameId,
      userId: session?.user.id,
    },
  })
  if (!game) return redirect('/dashboard')

  const calculateAccuracy = (): string => {
    const estimatedSecondsForMCQ = 10
    const estimatedSecondsForOpenEnded = 20
    const secondsPerQuestion =
      dayjs(game.endedOn).diff(game.startedOn, 'seconds') /
      game.questions.length
    const accuracy =
      ((game.type === 'mcq'
        ? estimatedSecondsForMCQ
        : estimatedSecondsForOpenEnded) /
        secondsPerQuestion) *
      100
    return `${accuracy.toFixed(2)}%`
  }

  const openEndedAccuracy =
    game.questions
      .map(question => question.userAnswer?.percentageCorrect ?? 0)
      .reduce((acc, curr) => acc + curr, 0) / game.questions.length

  const mcqAccuracy =
    (game.questions.filter(question => question.userAnswer?.correct ?? false)
      .length /
      game.questions.length) *
    100

  return (
    <div className='space-y-6'>
      <Link
        className={buttonVariants({ variant: 'outline' })}
        href='/dashboard'
      >
        <IconChevronLeft className='mr-2 h-4 w-4' /> Back to Dashboard
      </Link>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <StatCard
          content={calculateAccuracy()}
          icon={<IconAnalyze />}
          title='Time accuracy'
        />
        <StatCard
          content={
            game.type === 'open_ended'
              ? `${openEndedAccuracy}%`
              : `${mcqAccuracy}%`
          }
          icon={<IconAnalyze />}
          title='Answers accuracy'
        />
        <StatCard
          content={formatTimeDelta(
            dayjs(game.endedOn).diff(game.startedOn, 'seconds'),
          )}
          icon={<IconClock />}
          title='Time taken'
        />
      </div>
      {game.type === 'open_ended' ? (
        <QuestionAnswersTable questions={game.questions} />
      ) : (
        <MCQAnswerTable questions={game.questions} />
      )}
    </div>
  )
}

export default DashboardStats
