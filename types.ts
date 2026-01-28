
export interface SubCourse {
  id: string;
  title: string;
  duration: string;
  description: string;
  videoUrl: string;
  isCompleted: boolean;
  badgeIcon: string;
}

export interface StudentProfile {
  name: string;
  grade: string;
  avatar: string;
  academicLevel: number;
  levelProgress: number;
  achievements: string[];
}

export interface Metric {
  label: string;
  value: string | number;
  trend: 'up' | 'down' | 'neutral';
  percentage: number;
  color?: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Not Started' | 'In Progress' | 'Review' | 'Completed';
  points: number;
  questions?: {
    text: string;
    options: string[];
    correctAnswer: number;
  }[];
  score?: number;
  targetSchool?: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  lectureContent?: string;
  practiceTest?: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
  }[];
  bannerImage?: string;
  difficulty: 'Elementary' | 'Easy' | 'Medium' | 'Hard';
  isLocked: boolean;
  isCompleted: boolean;
  reward: string;
  icon: string;
  tags: string[];
  unlockRequirement?: string;
}

export interface LearningResource {
  id: string;
  category: string;
  title: string;
  difficulty: string;
  estimatedTime: string;
  reward: string;
  icon: string;
  tags: string[];
  missions?: Mission[];
}

export interface Subject {
  id: string;
  title: string;
  teacher: string;
  status: 'Exam Prep' | 'Steady' | 'Needs Review';
  grade: string;
  progress: number;
  thumbnail: string;
  description: string;
  schedule: string;
  subCourses: SubCourse[];
}

export interface ChartDataPoint {
  date: string;
  studyHours: number;
  tasksCompleted: number;
  codeCommits?: number;
}

export type NavigationItem = 'Hub' | 'Courses' | 'Assignments' | 'Analytics' |  'Focus' | 'AI Study Coach' | 'Games' | 'Settings' | 'Admin Users' | 'School Registry' | 'Python Engine' | 'Engine Blocks' | 'ML4Kids';
