'use client'
import keywordExtractor from 'keyword-extractor'
import { Fragment, memo, useEffect, useMemo } from 'react'

export const BLANKS = '_____'

export interface Props {
  answer: string
  setBlankAnswer: (answer: string) => void
}
const BlankAnswerInput = memo(({ answer, setBlankAnswer }: Props) => {
  const keywords = useMemo(() => {
    const words = keywordExtractor.extract(answer, {
      language: 'english',
      remove_digits: true,
      remove_duplicates: false,
      return_changed_case: false,
    })
    const shuffled = words.sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 3)
  }, [answer])

  const answerWithBlank = useMemo(() => {
    const blankAnswer = keywords.reduce(
      (acc, curr) => acc.replace(curr, BLANKS),
      answer,
    )
    return blankAnswer
  }, [answer, keywords])

  useEffect(() => {
    setBlankAnswer(answerWithBlank)
  }, [answerWithBlank, setBlankAnswer])

  return (
    <h4 suppressHydrationWarning>
      {answerWithBlank.split(BLANKS).map((part, index) => {
        return (
          <Fragment key={index}>
            {part}
            {index == answerWithBlank.split(BLANKS).length - 1 ? null : (
              <input
                className='w-24 border-b border-primary bg-transparent focus:border-b-2 focus:outline-none'
                id='user-blank-input'
              />
            )}
          </Fragment>
        )
      })}
    </h4>
  )
})
BlankAnswerInput.displayName = 'BlankAnswerInput'

export { BlankAnswerInput }
