import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'

import prisma from "@/app/libs/prismadb"

export const authOptions : AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email_username: { label: 'email_username', type: 'text'},
        password: { label: 'password', type: 'password'}
      },
      async authorize(credentials) {
        if (!credentials?.email_username || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        const user = await prisma.user.findUnique({
          where: {
            ...(regex.test(credentials.email_username) ? {email: credentials.email_username} : {username: credentials.email_username})
          }
        })

        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials')
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials')
        }

        return user
      }
    })
  ],
  pages: {
    signIn: '/',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)