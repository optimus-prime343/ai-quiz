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
      onWordClick={(event, word) =>
        router.push(`/dashboard/quiz?topic=${word.text}`)
      }
      data={data}
      font='Times'
      fontSize={word => Math.log2(word.value) * 5}
      height={300}
      padding={5}
      rotate={0}
    />
  )
}
