import { NextRequest, NextResponse } from 'next/server';
import { generateQuestions } from '@/lib/questionGenerator';

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    
    if (!text) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }

    const questions = generateQuestions(text);

    return NextResponse.json({ questions });
  } catch (error) {
    console.error('Error generating questions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

