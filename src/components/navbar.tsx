import { getAuthSession } from '@/lib/next-auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { LoginButton } from './auth/login-button'
import UserMenu from './auth/user-menu'
import { ToggleThemeMenu } from './theme/toggle-theme-menu'

export const Navbar = async () => {
  const session = await getAuthSession()
  return (
    <header className='sticky left-0 top-0 z-10 w-full border-b border-b-border py-2'>
      <div className='container'>
        <nav className='flex items-center justify-between'>
          <Link href='/'>
            <Image
              alt='Logo'
              className='text-red-900'
              height={50}
              src='/next.svg'
              title='AI QUIZ'
              width={50}
            />
          </Link>
          <ul className='flex items-center gap-4'>
            <li>
              {session ? <UserMenu user={session.user} /> : <LoginButton />}
            </li>
            <li>
              <ToggleThemeMenu />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
