'use server'

import { hash, compare } from 'bcrypt'
import { prisma } from '@/lib/db'
import { Role } from '@prisma/client'

export async function createUser(
  email: string,
  password: string,
  role: Role,
  accessPreferences?: {
    dyslexic?: boolean
    colorblind?: boolean
    blind?: boolean
    bilingual?: boolean
    rtl?: boolean
    language?: string
  }
) {
  const hashedPassword = await hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role,
      accessPreferences: {
        create: {
          ...accessPreferences
        }
      },
      ...(role === 'STUDENT'
        ? {
            studentProfile: {
              create: {}
            }
          }
        : {
            educatorProfile: {
              create: {}
            }
          })
    },
    include: {
      accessPreferences: true
    }
  })

  return user
}

export async function authenticateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      accessPreferences: true
    }
  })

  if (!user) {
    throw new Error('User not found')
  }

  const passwordMatch = await compare(password, user.password)

  if (!passwordMatch) {
    throw new Error('Invalid password')
  }

  return user
}

