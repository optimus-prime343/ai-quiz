import { getAuthSession } from '@/lib/next-auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { LoginButton } from './auth/login-button'
import UserMenu from './auth/user-menu'

export const Navbar = async () => {
  const session = await getAuthSession()
  return (
    <header className='sticky left-0 top-0 z-10 w-full border-b py-2'>
      <div className='container'>
        <nav className='flex items-center justify-between'>
          <Link href='/'>
            <Image
              alt='Logo'
              height={50}
              src='/next.svg'
              title='AI QUIZ'
              width={50}
            />
          </Link>
          <ul>
            <li>
              {session ? <UserMenu user={session.user} /> : <LoginButton />}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
