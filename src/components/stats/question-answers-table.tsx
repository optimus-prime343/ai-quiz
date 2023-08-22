import type { Answer, Question } from '@prisma/client'

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
          <TableHead className='w-[40vw]'>Your answer</TableHead>
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
              {question?.userAnswer?.answer ?? ''}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
