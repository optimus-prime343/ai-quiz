import type { ReactNode } from 'react'

import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'

export interface Props {
  content: string
  icon: ReactNode
  title: string
}
export const StatCard = ({ content, icon, title }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          {title} {icon}
        </CardTitle>
        <CardDescription>{content}</CardDescription>
      </CardHeader>
    </Card>
  )
}
