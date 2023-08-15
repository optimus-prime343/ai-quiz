import type { ReactNode } from 'react'

import React from 'react'

interface Props {
  children: ReactNode
}
const DashboardLayout = ({ children }: Props) => {
  return <main className='container py-4'>{children}</main>
}

export default DashboardLayout
