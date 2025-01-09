'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { Progress } from '@/components/ui/progress'
import { QuestionGenerator } from '@/components/QuestionGenerator'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function EducatorDashboard() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [quizTitle, setQuizTitle] = useState('')
  const [quizQuestions, setQuizQuestions] = useState('')
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleStudyMaterialUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload.",
        variant: "destructive",
      })
      return
    }

    setUploading(true)
    setUploadProgress(0)

    // Simulating file upload with progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200))
      setUploadProgress(i)
    }

    // Simulating server response
    await new Promise(resolve => setTimeout(resolve, 500))

    setUploading(false)
    setUploadProgress(0)
    setFile(null)

    toast({
      title: "Success",
      description: "Study material uploaded successfully!",
    })
  }

  const handleQuizCreation = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual quiz creation logic
    console.log('Creating quiz:', { quizTitle, quizQuestions })
    toast({
      title: "Quiz Created",
      description: "Your quiz has been created successfully.",
    })
    setQuizTitle('')
    setQuizQuestions('')
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Educator Dashboard</h1>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="upload">Upload Material</TabsTrigger>
          <TabsTrigger value="create">Create Quiz</TabsTrigger>
          <TabsTrigger value="generate">Generate Questions</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Welcome, Educator!</CardTitle>
              <CardDescription>Manage your courses and students</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add overview content here */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="upload" className="space-y-4">
          <h2 className="text-xl font-semibold">Upload Study Material</h2>
          <form onSubmit={handleStudyMaterialUpload} className="space-y-4">
            <div>
              <Label htmlFor="study-material">Select File</Label>
              <Input 
                id="study-material" 
                type="file" 
                onChange={handleFileChange}
                disabled={uploading}
              />
            </div>
            {file && (
              <p className="text-sm text-gray-500">
                Selected file: {file.name}
              </p>
            )}
            {uploading && (
              <Progress value={uploadProgress} className="w-full" />
            )}
            <Button type="submit" disabled={!file || uploading}>
              {uploading ? 'Uploading...' : 'Upload'}
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="create" className="space-y-4">
          <h2 className="text-xl font-semibold">Create Quiz</h2>
          <form onSubmit={handleQuizCreation} className="space-y-4">
            <div>
              <Label htmlFor="quiz-title">Quiz Title</Label>
              <Input
                id="quiz-title"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="quiz-questions">Questions (one per line)</Label>
              <Textarea
                id="quiz-questions"
                value={quizQuestions}
                onChange={(e) => setQuizQuestions(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Create Quiz</Button>
          </form>
        </TabsContent>
        <TabsContent value="generate" className="space-y-4">
          <h2 className="text-xl font-semibold">Generate Questions</h2>
          <QuestionGenerator />
        </TabsContent>
      </Tabs>
    </div>
  )
}

