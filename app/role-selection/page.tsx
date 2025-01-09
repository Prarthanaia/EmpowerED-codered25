'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { School, GraduationCap } from 'lucide-react'
import { routes } from '../routes'

export default function RoleSelection() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100/50 flex items-center justify-center p-4">
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" 
              onClick={() => router.push(routes.educator.dashboard)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <School className="h-6 w-6 text-primary" />
              Educator
            </CardTitle>
            <CardDescription>
              Upload content, create quizzes, and manage students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Upload and manage study materials</li>
              <li>• Create and grade quizzes</li>
              <li>• Monitor student progress</li>
              <li>• Enable accessibility features</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push(routes.student.dashboard)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-secondary" />
              Student
            </CardTitle>
            <CardDescription>
              Access materials, track progress, and get personalized assessments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Access study materials</li>
              <li>• Take quizzes and assessments</li>
              <li>• View progress reports</li>
              <li>• Personalized learning experience</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

