'use server'

import { prisma } from '@/lib/db'

export async function createQuiz(
  title: string,
  courseId: string,
  questions: Array<{
    text: string
    options: string[]
    correctAnswer: string
  }>,
  dueDate?: Date
) {
  return prisma.quiz.create({
    data: {
      title,
      courseId,
      questions: {
        create: questions
      },
      dueDate
    },
    include: {
      questions: true
    }
  })
}

export async function submitQuiz(
  quizId: string,
  userId: string,
  answers: Record<string, string>
) {
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: { questions: true }
  })

  if (!quiz) {
    throw new Error('Quiz not found')
  }

  let score = 0
  quiz.questions.forEach((question) => {
    if (answers[question.id] === question.correctAnswer) {
      score++
    }
  })

  return prisma.quizSubmission.create({
    data: {
      quizId,
      userId,
      answers,
      score
    }
  })
}

export async function getQuizzesByCourse(courseId: string) {
  return prisma.quiz.findMany({
    where: {
      courseId
    },
    include: {
      questions: true
    }
  })
}

