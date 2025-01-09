'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'

interface Question {
  type: string;
  question: string;
  answer: string;
}

export function QuestionGenerator() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let content = text;
      if (file) {
        content = await file.text();
      }

      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: content }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate questions');
      }

      const data = await response.json();
      setQuestions(data.questions);
      toast({
        title: "Questions Generated",
        description: `Successfully created ${data.questions.length} questions.`,
      });
    } catch (error) {
      console.error('Error generating questions:', error);
      toast({
        title: "Error",
        description: "Failed to generate questions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Question Generator</CardTitle>
        <CardDescription>Upload a text file or enter text to generate questions</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="file">Upload Text File</Label>
            <Input id="file" type="file" onChange={handleFileChange} accept=".txt" />
          </div>
          <div>
            <Label htmlFor="text">Or Enter Text</Label>
            <Textarea
              id="text"
              placeholder="Enter your text here..."
              value={text}
              onChange={handleTextChange}
              rows={5}
            />
          </div>
          <Button type="submit" disabled={isLoading || (!file && !text)}>
            {isLoading ? 'Generating...' : 'Generate Questions'}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        {questions.length > 0 && (
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-2">Generated Questions:</h3>
            <ul className="space-y-2">
              {questions.map((q, index) => (
                <li key={index} className="border p-2 rounded">
                  <p className="font-medium">{q.question}</p>
                  <p className="text-sm text-gray-600">Answer: {q.answer}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

