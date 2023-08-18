import type { CheckMcqAnswerInput } from '@/schemas/quiz'
import type { AxiosInstance, AxiosRequestConfig, Method } from 'axios'
import type { z } from 'zod'

import {
  type CreateQuizInput,
  checkMcqAnswerResponseSchema,
  createQuizResponseSchema,
} from '@/schemas/quiz'
import axios from 'axios'
import { type ZodTypeAny } from 'zod'

class ApiClient {
  #axios: AxiosInstance
  constructor(private readonly baseURL = '/api') {
    this.#axios = axios.create({ baseURL })
  }

  async #request<T extends ZodTypeAny>(
    schema: T,
    url: string,
    method: Method,
    config?: AxiosRequestConfig,
  ): Promise<z.infer<typeof schema>> {
    const { data } = await this.#axios({
      method,
      url,
      ...config,
    })
    const parsedData = schema.parse(data)
    return parsedData
  }

  async checkMCQAnswer(input: CheckMcqAnswerInput) {
    return this.#request(
      checkMcqAnswerResponseSchema,
      '/mcq/check-answer',
      'GET',
      { params: input },
    )
  }

  async createNewGame(input: CreateQuizInput) {
    return this.#request(createQuizResponseSchema, '/game', 'POST', {
      data: input,
    })
  }
}
export const api = new ApiClient()
