import { env } from '@/env.js'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { type NextAuthOptions, getServerSession } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import { db as prisma } from './db'

export const nextAuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as NextAuthOptions['adapter'],
  callbacks: {
    jwt: async ({ token }) => {
      const user = await prisma.user.findUnique({
        where: {
          email: token?.email ?? undefined,
        },
      })
      if (user) token.id = user.id
      return token
    },
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.name = token.name
        session.user.image = token.picture
      }
      return session
    },
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: env.NEXT_AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
}

export const getAuthSession = () => getServerSession(nextAuthOptions)
