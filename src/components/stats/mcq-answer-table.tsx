import type { Answer, Question } from '@prisma/client'

import { cn } from '@/lib/cn'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'

export interface Props {
  questions: (Question & { userAnswer: Answer | null })[]
}
export const MCQAnswerTable = ({ questions }: Props) => {
  return (
    <Table>
      <TableCaption>A list of mcq questions you recently took.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[5vw]'>Invoice</TableHead>
          <TableHead className='w-[55vw]'>Question</TableHead>
          <TableHead className='w-[20vw]'>Correct Answer</TableHead>
          <TableHead className='w-[20vw] text-right'>Your Answer</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {questions.map((question, index) => (
          <TableRow key={question.id}>
            <TableCell className='font-medium'>{index + 1}</TableCell>
            <TableCell>{question.question}</TableCell>
            <TableCell>{question.correctOption}</TableCell>
            <TableCell
              className={cn(
                question.userAnswer?.correct
                  ? 'text-green-700'
                  : 'text-red-700',
                'text-right font-bold',
              )}
            >
              {question.userAnswer?.answer}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
