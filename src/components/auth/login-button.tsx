'use client'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { IconBrandGoogle, IconBug } from '@tabler/icons-react'
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'

import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

export const LoginButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const handleGoogleLogin = () => {
    setIsLoading(true)
    signIn('google')
      .then(console.info)
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false))
  }

  const handleGithubLogin = () => {
    setIsLoading(true)
    signIn('github')
      .then(console.info)
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false))
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Login</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Login to your{' '}
            <span className='border-b border-b-primary text-primary'>
              Account
            </span>
          </DialogTitle>
        </DialogHeader>
        {error ? (
          <Alert variant='destructive'>
            <IconBug className='h-4 w-4' />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components and dependencies to your app using the cli.
            </AlertDescription>
          </Alert>
        ) : undefined}
        <div className='flex gap-2'>
          <Button
            isLoading={isLoading}
            lefetIcon={<GitHubLogoIcon className='mr-2 h-4 w-4' />}
            onClick={handleGithubLogin}
          >
            Login with Github
          </Button>
          <Button
            isLoading={isLoading}
            lefetIcon={<IconBrandGoogle className='mr-2 h-4 w-4' />}
            onClick={handleGoogleLogin}
            variant='secondary'
          >
            Login with Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
