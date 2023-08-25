'use client'
import type { HotGameTopic } from '@/schemas/game'

import { useRouter } from 'next/navigation'
import D3WordCloud from 'react-d3-cloud'

export interface Props {
  hotGameTopics: HotGameTopic[]
}
export const HotGameTopicsCloud = ({ hotGameTopics }: Props) => {
  const router = useRouter()
  if (typeof window === 'undefined') return null
  return (
    <D3WordCloud
      onWordClick={(event, word) =>
        router.push(`/dashboard/quiz?topic=${word.text}`)
      }
      data={hotGameTopics}
      font='Times'
      fontSize={word => Math.log2(word.value) * 5 + 16}
      height={300}
      padding={5}
      rotate={0}
    />
  )
}
