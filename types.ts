
export interface SubCourse {
  id: string;
  title: string;
  duration: string;
  description: string;
  videoUrl: string;
  isCompleted: boolean;
  badgeIcon: string;
  content?: string;
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
  targetSchools: string[];
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
  difficulty: 'Elementary' | 'Junior' | 'Explorer' | 'Beginner' | 'Easy' | 'Medium' | 'Hard' | 'Intermediate' | 'Advanced';
  isLocked: boolean;
  isCompleted: boolean;
  reward: string;
  icon: React.ReactNode | string;
  tags: string[];
  unlockRequirement?: string;
}

export interface LearningResource {
  id: string;
  category: string;
  title: string;
  difficulty: string;
  description?: string;
  estimatedTime: string;
  reward: string;
  icon: React.ReactNode | string;
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

export interface User {
  _id: string;
  fullName: string;
  email: string;
  isAdmin: boolean;
  isInstructor?: boolean;
  isInstructorPending?: boolean;
  isSchoolAdmin?: boolean;
  grade?: string;
  schoolName?: string;
  avatarUrl?: string;
  createdAt: string;
  totalXP?: number;
  missionsCompleted?: number;
  totalMissions?: number;
  averageScore?: number;
  lastActivityAt?: string | null;
  lastPoints?: number;
  lastActivityTitle?: string;
  instructorProfile?: {
    bio?: string;
    detailedBio?: string;
    yearsExperience?: number;
    monthlyRate?: number;
    specialties?: string[];
    skillset?: string[];
    availability?: string;
    trainingHighlights?: string[];
    studentsTrainedCount?: number;
    otherCriticalInfo?: string[];
  };
  school?: string; // Legacy support
  name?: string;   // Legacy support
  [key: string]: any;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
  duration: string;
  views: string;
  publishedAt: string;
  videoId: string;
  grade: string;
  subject?: string;
}

export interface DashboardData {
  summary: {
    gpa: string;
    techChamp: number;
    labHours: number;
    efficiency: number;
  };
  studyData: {
    label: string;
    hours: number;
    points: number;
  }[];
}

export interface Project {
  _id: string;
  categoryId: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  time: string;
  description: string;
  materials: string[];
  steps: string[];
  thumbnail: string;
  isMock?: boolean;
}

export interface Category {
  _id: string;
  name: string;
  icon: string;
  color: string;
  isMock?: boolean;
}

export interface ProjectFormData {
  categoryId: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  time: string;
  description: string;
  materials: string[];
  steps: string[];
  thumbnail: string;
}

export type NavigationItem = 'Hub' | 'Courses' | 'Assignments' | 'Analytics' |  'Focus' | 'AI Study Coach' | 'Games' | 'Settings' | 'Admin Users' | 'School Registry' | 'Python Engine' | 'Engine Blocks' | 'Junior Code' | 'ML4Kids' | 'NEXT Teach' | 'Projects' | 'Utilities' | 'Code Battle' | 'Learning Path' | 'Reports' | 'Blog' | 'Signal Control' | 'Trainers';
