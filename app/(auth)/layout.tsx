import React from 'react'

import ClientAuth from '@/components/ClientAuth'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <ClientAuth>{children}</ClientAuth>
}

export default AuthLayout
