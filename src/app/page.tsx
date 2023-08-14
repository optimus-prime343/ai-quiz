import { Button } from '@/components/ui/button'
import { getAuthSession } from '@/lib/next-auth'
import React from 'react'

const Home = async () => {
  const _session = getAuthSession()
  return (
    <div>
      <Button>Home</Button>
    </div>
  )
}

export default Home
