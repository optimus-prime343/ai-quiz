import type { Answer, Question } from '@prisma/client'

import { IconInfoCircle } from '@tabler/icons-react'

import { TextDiff } from '../text-diff'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
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
export const QuestionAnswersTable = ({ questions }: Props) => {
  return (
    <Table>
      <TableCaption>A list of questions you recently answered</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[5vw]'>No.</TableHead>
          <TableHead className='w-[55vw]'>Question and answers</TableHead>
          <TableHead className='flex w-[40vw] items-center gap-2'>
            Your answer{' '}
            <Popover>
              <PopoverTrigger asChild>
                <IconInfoCircle className='cursor-pointer' />
              </PopoverTrigger>
              <PopoverContent>
                <p>
                  <span className='font-bold text-red-700'>Red color</span> on
                  your text refers to the missing words from your answer.
                </p>
              </PopoverContent>
            </Popover>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {questions.map((question, index) => (
          <TableRow key={question.id}>
            <TableCell className='font-medium'>{index + 1}</TableCell>
            <TableCell>
              <h4 className='mb-2'>{question.question}</h4>
              <p className='text-muted-foreground'>{question.answer}</p>
            </TableCell>
            <TableCell className='text-green-700 dark:text-green-300'>
              <TextDiff
                newString={question?.userAnswer?.answer ?? ''}
                oldString={question.answer ?? ''}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
