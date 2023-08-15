'use client'
import { type CreateQuizInput, createQuizSchema } from '@/schemas/quiz'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconBook, IconCopy } from '@tabler/icons-react'
import React from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'

export const CreateQuizForm = () => {
  const form = useForm<CreateQuizInput>({
    defaultValues: {
      amount: 5,
      topic: '',
      type: 'mcq',
    },
    resolver: zodResolver(createQuizSchema),
  })

  const onSubmit = (input: CreateQuizInput) => {
    alert(JSON.stringify(input, null, 4))
  }
  return (
    <Card className='min-w-[95vw] md:min-w-fit'>
      <CardHeader>
        <CardTitle>Create a Quiz</CardTitle>
        <CardDescription>
          Choose a topic to get started on your quiz
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className='space-y-4'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel>Topic</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter a quiz topic..'
                      {...field}
                    />
                  </FormControl>
                  {error && <FormMessage>{error.message}</FormMessage>}
                </FormItem>
              )}
              control={form.control}
              name='topic'
            />
            <FormField
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter the quiz amount...'
                      type='number'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Quiz amount refers to the amount of quizzes that you would
                    like to take.
                  </FormDescription>
                  {error && <FormMessage>{error.message}</FormMessage>}
                </FormItem>
              )}
              control={form.control}
              name='amount'
            />
            <div className='flex items-center justify-between gap-2'>
              <Button
                className='flex-1'
                lefetIcon={<IconCopy className='mr-2 h-4 w-4' />}
                onClick={() => form.setValue('type', 'mcq')}
                type='button'
                variant={form.watch('type') === 'mcq' ? 'default' : 'outline'}
              >
                MCQ
              </Button>
              <Button
                variant={
                  form.watch('type') === 'open-ended' ? 'default' : 'outline'
                }
                className='flex-1'
                lefetIcon={<IconBook className='mr-2 h-4 w-4' />}
                onClick={() => form.setValue('type', 'open-ended')}
                type='button'
              >
                Open Ended
              </Button>
            </div>
            <Button
              className='w-full'
              disabled={!form.formState.isValid}
              type='submit'
            >
              Create quiz
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
