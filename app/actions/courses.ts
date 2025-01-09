'use server'

import { prisma } from '@/lib/db'

export async function createCourse(
  title: string,
  description: string,
  educatorId: string
) {
  return prisma.course.create({
    data: {
      title,
      description,
      educatorId
    }
  })
}

export async function enrollInCourse(userId: string, courseId: string) {
  return prisma.courseEnrollment.create({
    data: {
      userId,
      courseId
    }
  })
}

export async function updateCourseProgress(
  userId: string,
  courseId: string,
  progress: number
) {
  return prisma.courseEnrollment.update({
    where: {
      userId_courseId: {
        userId,
        courseId
      }
    },
    data: {
      progress
    }
  })
}

export async function getUserCourses(userId: string) {
  return prisma.courseEnrollment.findMany({
    where: {
      userId
    },
    include: {
      course: true
    }
  })
}

