'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { type ReactNode, useState } from 'react'

import { Toaster } from './ui/toaster'

interface Props {
  children: ReactNode
}
export const Providers = ({ children }: Props) => {
  const [client] = useState(() => new QueryClient())
  return (
    <SessionProvider>
      <NextThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
      >
        <QueryClientProvider client={client}>
          <ReactQueryDevtools />
          {children}
        </QueryClientProvider>
      </NextThemeProvider>
      <Toaster />
    </SessionProvider>
  )
}
