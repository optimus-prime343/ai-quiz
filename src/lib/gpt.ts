import { env } from '@/env'
import OpenAI from 'openai'
import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'

type ChatCompletionFunction =
  OpenAI.Chat.Completions.CompletionCreateParams.Function
interface ChatCompletionInput {
  functions: ChatCompletionFunction[]
  userPrompt: string
}

class GPT {
  #openAi: OpenAI
  constructor() {
    this.#openAi = new OpenAI({ apiKey: env.OPENAI_API_KEY })
  }
  async #createChatCompletion(input: ChatCompletionInput): Promise<string> {
    const completion = await this.#openAi.chat.completions.create({
      functions: input.functions,
      messages: [{ content: input.userPrompt, role: 'user' }],
      model: 'gpt-3.5-turbo-0613',
    })
    const data = completion.choices[0].message?.function_call?.arguments
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
    const userPrompt = `Generate an array of ${amount} challenging mcq quiz questions in the json format for the topic of ${topic}.`
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
    ] satisfies ChatCompletionFunction[]
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
    const userPrompt = `Generate ${amount} open ended questions along with their answers on the topic of ${topic}`
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
    ] satisfies ChatCompletionFunction[]
    const completion = await this.#createChatCompletion({
      functions,
      userPrompt,
    })
    const jsonOpenedEndedQuestions = JSON.parse(completion).openEndedQuestions
    return responseSchema.parse(jsonOpenedEndedQuestions)
  }
}

export const gpt = new GPT()
