'use client'
import type { ReactNode } from 'react'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'

import { Toaster } from './ui/toaster'

interface Props {
  children: ReactNode
}
export const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <NextThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
      >
        {children}
      </NextThemeProvider>
      <Toaster />
    </SessionProvider>
  )
}
