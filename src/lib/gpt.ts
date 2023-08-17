import type { ChatCompletionFunctions } from 'openai'

import { env } from '@/env'
import { OpenAIApi } from 'openai'
import { Configuration } from 'openai'
import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'

interface ChatCompletionInput {
  functions: ChatCompletionFunctions[]
  userPrompt: string
}

class GPT {
  #configuration: Configuration
  #openAi: OpenAIApi
  constructor() {
    this.#configuration = new Configuration({ apiKey: env.OPENAI_API_KEY })
    this.#openAi = new OpenAIApi(this.#configuration)
  }
  async #createChatCompletion(input: ChatCompletionInput): Promise<string> {
    const completion = await this.#openAi.createChatCompletion({
      functions: input.functions,
      messages: [{ content: input.userPrompt, role: 'user' }],
      model: 'gpt-3.5-turbo-0613',
    })
    const data = completion.data.choices[0].message?.function_call?.arguments
    if (!data)
      throw new Error('Unable to create completion.Please try again later')
    return data
  }

  async generateMCQquestions(topic: string, amount: number) {
    const responseSchema = z.array(
      z.object({
        correctOption: z.string(),
        options: z.array(z.string()),
        question: z.string(),
      }),
    )
    const userPrompt = `Generate an array of ${amount} mcq quiz questions in the json for the topic of ${topic}.`
    const functions = [
      {
        description: `Generate certain mcq questions on certain topics`,
        name: 'generate_mcq_questions',
        parameters: {
          properties: { quizzes: zodToJsonSchema(responseSchema) },
          required: ['quizzes'],
          type: 'object',
        },
      },
    ] satisfies ChatCompletionFunctions[]
    const completion = await this.#createChatCompletion({
      functions,
      userPrompt,
    })
    const jsonQuizzes = JSON.parse(completion).quizzes
    return responseSchema.parse(jsonQuizzes)
  }
  async generateOpenEndedQuestions(topic: string, amount: number) {
    const responseSchema = z.array(
      z.object({
        answer: z.string(),
        question: z.string(),
      }),
    )
    const userPrompt = `Generate ${amount} open ended questions on the topic of ${topic}`
    const functions = [
      {
        description: 'Generate certain open ended questions for certain topic',
        name: 'generate_open_ended_questions',
        parameters: {
          properties: { openEndedQuestions: zodToJsonSchema(responseSchema) },
          required: ['openEndedQuestions'],
          type: 'object',
        },
      },
    ] satisfies ChatCompletionFunctions[]
    const completion = await this.#createChatCompletion({
      functions,
      userPrompt,
    })
    const jsonOpenedEndedQuestions = JSON.parse(completion).openEndedQuestions
    return responseSchema.parse(jsonOpenedEndedQuestions)
  }
}

export const gpt = new GPT()
