'use client'
import type { ReactNode } from 'react'

import { SessionProvider } from 'next-auth/react'

import { Toaster } from './ui/toaster'

interface Props {
  children: ReactNode
}
export const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      {children}
      <Toaster />
    </SessionProvider>
  )
}
