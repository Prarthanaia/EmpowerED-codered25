'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpen, GraduationCap, BarChart } from 'lucide-react'
import { useAccessibility } from '@/contexts/AccessibilityContext';

interface Course {
  id: string;
  title: string;
  progress: number;
}

interface Quiz {
  id: string;
  title: string;
  dueDate: string;
}

interface AccessibilityPreferences {
  dyslexic: boolean;
  colorblind: boolean;
  blind: boolean;
  bilingual: boolean;
  rtl: boolean;
  language: string;
}

export default function StudentDashboard() {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', title: 'Introduction to Mathematics', progress: 60 },
    { id: '2', title: 'World History', progress: 30 },
    { id: '3', title: 'Biology 101', progress: 80 },
  ]);

  const [quizzes, setQuizzes] = useState<Quiz[]>([
    { id: '1', title: 'Math Quiz 1', dueDate: '2023-06-15' },
    { id: '2', title: 'History Essay', dueDate: '2023-06-20' },
    { id: '3', title: 'Biology Lab Report', dueDate: '2023-06-25' },
  ]);

  const { preferences } = useAccessibility();

  console.log('Current preferences:', preferences);

  const applyAccessibilityStyles = () => {
    const styles = [];
    if (preferences.dyslexic) {
      styles.push('font-family: OpenDyslexic, sans-serif', 'line-height: 1.5');
    }
    if (preferences.colorblind) {
      styles.push('filter: saturate(0.5) brightness(1.2)');
    }
    if (preferences.rtl) {
      styles.push('direction: rtl');
    }
    return styles.join('; ');
  };

  const translateText = (text: string) => {
    if (preferences.bilingual && preferences.language === 'es') {
      const translations: { [key: string]: string } = {
        'Student Dashboard': 'Panel de Estudiante',
        'Overview': 'Resumen',
        'My Courses': 'Mis Cursos',
        'Upcoming Quizzes': 'Próximos Exámenes',
        'Total Courses': 'Total de Cursos',
        'Average Progress': 'Progreso Promedio',
        'Course Progress': 'Progreso del Curso',
        'Complete': 'Completo',
        'Due Date': 'Fecha de Entrega',
        'Start Quiz': 'Comenzar Examen',
      };
      return translations[text] || text;
    }
    return text;
  };

  return (
    <div className="container mx-auto p-4" style={{ cssText: applyAccessibilityStyles() }}>
      <h1 className="text-2xl font-bold mb-4">{translateText('Student Dashboard')}</h1>
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">{translateText('Overview')}</TabsTrigger>
          <TabsTrigger value="courses">{translateText('My Courses')}</TabsTrigger>
          <TabsTrigger value="quizzes">{translateText('Upcoming Quizzes')}</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {translateText('Total Courses')}
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{courses.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {translateText('Average Progress')}
                </CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(courses.reduce((acc, course) => acc + course.progress, 0) / courses.length)}%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {translateText('Upcoming Quizzes')}
                </CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{quizzes.length}</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="courses">
          <div className="space-y-4">
            {courses.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <CardTitle>{translateText(course.title)}</CardTitle>
                  <CardDescription>{translateText('Course Progress')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={course.progress} className="w-full" />
                  <p className="mt-2 text-sm text-gray-600">{course.progress}% {translateText('Complete')}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="quizzes">
          <div className="space-y-4">
            {quizzes.map((quiz) => (
              <Card key={quiz.id}>
                <CardHeader>
                  <CardTitle>{translateText(quiz.title)}</CardTitle>
                  <CardDescription>{translateText('Due Date')}: {quiz.dueDate}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button>{translateText('Start Quiz')}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      {preferences.blind && (
        <div className="sr-only">
          {/* Add detailed text descriptions for screen readers */}
          <p>Your dashboard shows {courses.length} total courses with an average progress of {Math.round(courses.reduce((acc, course) => acc + course.progress, 0) / courses.length)}%.</p>
          <p>You have {quizzes.length} upcoming quizzes.</p>
          {/* Add more detailed descriptions as needed */}
        </div>
      )}
    </div>
  )
}

