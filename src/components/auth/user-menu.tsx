'use client'
import type { Session } from 'next-auth'

import { getUiAvatar } from '@/utils/ui-avatar'
import { IconLogout } from '@tabler/icons-react'
import { signOut } from 'next-auth/react'
import React from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { useToast } from '../ui/use-toast'

interface Props {
  user: Session['user']
}
export const UserMenu = ({ user }: Props) => {
  const { toast } = useToast()
  const handleLogout = () => {
    signOut({ callbackUrl: '/' }).catch(error => {
      console.error(error)
      toast({
        description: 'Something went wrong.Please try again later',
        title: 'Logout failed',
      })
    })
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src={user.image ?? getUiAvatar(user.name)} />
          <AvatarFallback>P</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent
        align='end'
        side='bottom'
      >
        <p className='text-lg font-bold'>{user.name}</p>
        <span className='text-sm text-muted-foreground'>{user.email}</span>
        <span className='my-4 block h-px w-full bg-secondary'></span>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button
              lefetIcon={<IconLogout className='mr-2 h-4 w-4' />}
              variant='outline'
            >
              Logout
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to logout ?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout}>
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </PopoverContent>
    </Popover>
  )
}
