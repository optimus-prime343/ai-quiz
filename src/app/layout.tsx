import type { Metadata } from 'next'

import { Navbar } from '@/components/navbar'
import { Providers } from '@/components/providers'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { Inter } from 'next/font/google'

import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

dayjs.extend(LocalizedFormat)

export const metadata: Metadata = {
  description: 'Enjoy AI generated quizzes consisting of various topics',
  title: 'AI QUIZ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
    >
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
