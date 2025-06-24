export const MOCK_CLASSES = [
  { id: '1', name: 'Information Science', description: 'Core computer science concepts', studentCount: 45 },
  { id: '2', name: 'Cybersecurity', description: 'Network and system security', studentCount: 38 },
  { id: '3', name: 'Data Structures', description: 'Algorithms and data organization', studentCount: 52 },
  { id: '4', name: 'Machine Learning', description: 'AI and ML fundamentals', studentCount: 29 }
];

export const MOCK_STUDENTS = [
  { id: '1', usn: 'CS21001', name: 'Alex Johnson', email: 'alex.johnson@university.edu', classId: '1' },
  { id: '2', usn: 'CS21002', name: 'Sarah Davis', email: 'sarah.davis@university.edu', classId: '1' },
  { id: '3', usn: 'CS21003', name: 'Michael Brown', email: 'michael.brown@university.edu', classId: '1' },
  { id: '4', usn: 'CS21004', name: 'Emily Wilson', email: 'emily.wilson@university.edu', classId: '2' },
  { id: '5', usn: 'CS21005', name: 'David Lee', email: 'david.lee@university.edu', classId: '2' }
];

export const MOCK_QUIZZES = [
  {
    id: '1',
    title: 'Introduction to Algorithms',
    subject: 'Data Structures',
    timeLimit: 30,
    createdAt: '2024-01-15',
    isActive: true,
    questions: [
      {
        id: '1',
        text: 'What is the time complexity of binary search?',
        options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
        correctAnswer: 1,
        explanation: 'Binary search divides the search space in half with each comparison.'
      }
    ]
  },
  {
    id: '2',
    title: 'Network Security Basics',
    subject: 'Cybersecurity',
    timeLimit: 45,
    createdAt: '2024-01-20',
    isActive: true,
    questions: [
      {
        id: '2',
        text: 'What does SSL stand for?',
        options: ['Secure Socket Layer', 'System Security Level', 'Safe Server Link', 'Secure System Login'],
        correctAnswer: 0,
        explanation: 'SSL stands for Secure Socket Layer, a protocol for secure communications.'
      }
    ]
  }
];

export const MOCK_QUIZ_ATTEMPTS = [
  { id: '1', quizId: '1', studentId: '1', score: 85, totalQuestions: 10, timeSpent: 25, completedAt: '2024-01-16' },
  { id: '2', quizId: '2', studentId: '1', score: 92, totalQuestions: 15, timeSpent: 40, completedAt: '2024-01-21' },
  { id: '3', quizId: '1', studentId: '2', score: 78, totalQuestions: 10, timeSpent: 28, completedAt: '2024-01-17' }
];