import { APP_NAME } from '@/constants/strings'
import { getAuthSession } from '@/lib/next-auth'
import Link from 'next/link'
import React from 'react'

import { LoginButton } from './auth/login-button'
import { UserMenu } from './auth/user-menu'
import { ToggleThemeMenu } from './theme/toggle-theme-menu'

export const Navbar = async () => {
  const session = await getAuthSession()
  return (
    <header className='sticky left-0 top-0 z-10 w-full border-b border-b-border py-2'>
      <div className='container'>
        <nav className='flex items-center justify-between'>
          <Link href={session?.user ? '/dashboard' : '/'}>
            <h2 className='rounded-md border-b-4 border-l-2 border-r-[24px] border-t-2 border-zinc-900 px-4 py-3 text-4xl font-bold transition-all dark:border-zinc-300'>
              {APP_NAME}
            </h2>
          </Link>
          <ul className='flex items-center gap-4'>
            <li>
              <ToggleThemeMenu />
            </li>
            <li>
              {session ? <UserMenu user={session.user} /> : <LoginButton />}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
