'use client'
import { useRouter } from 'next/navigation'
import D3WordCloud from 'react-d3-cloud'

const data = [
  { text: 'Hey', value: 1000 },
  { text: 'lol', value: 200 },
  { text: 'first impression', value: 800 },
  { text: 'very cool', value: 1000000 },
  { text: 'duck', value: 10 },
]
export const CustomWordCloud = () => {
  const router = useRouter()
  return (
    <D3WordCloud
      data={data}
      height={300}
      onWordClick={word => router.push(`/dashboard/quiz?topic=${word}`)}
      rotate={0}
    />
  )
}
