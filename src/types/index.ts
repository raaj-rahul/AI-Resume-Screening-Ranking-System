export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student';
}

export interface Student {
  id: string;
  usn: string;
  name: string;
  email: string;
  classId: string;
}

export interface Class {
  id: string;
  name: string;
  description: string;
  studentCount: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  timeLimit: number;
  questions: Question[];
  createdAt: string;
  isActive: boolean;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  completedAt: string;
}

export interface AnalyticsData {
  quizAttempts: QuizAttempt[];
  averageScore: number;
  totalQuizzes: number;
  improvementTrend: number[];
}