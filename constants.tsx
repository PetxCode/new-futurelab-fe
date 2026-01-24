
import { StudentProfile, Metric, LearningResource, Subject, ChartDataPoint, Assignment, SubCourse } from './types';

export const MOCK_STUDENT: StudentProfile = {
  name: "Leo Sterling",
  grade: "11th Grade • Tech Honors",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leo",
  academicLevel: 28,
  levelProgress: 82,
  achievements: ["Python Master", "Robotics Lead", "AI Ethicist"]
};

export const ACADEMIC_METRICS: Metric[] = [
  { label: "Current GPA", value: "3.94", trend: 'up', percentage: 4, color: 'text-emerald-400' },
  { label: "Lines of Python", value: "12.4k", trend: 'up', percentage: 22, color: 'text-indigo-400' },
  { label: "Lab Hours", value: "86h", trend: 'up', percentage: 12, color: 'text-violet-400' },
  { label: "Robot Efficiency", value: "94%", trend: 'neutral', percentage: 0, color: 'text-cyan-400' }
];

export const ASSIGNMENTS: Assignment[] = [
  { id: 'a1', title: 'Neural Network Optimization', subject: 'AI Foundations', dueDate: 'Tomorrow', priority: 'High', status: 'In Progress', points: 100 },
  { id: 'a2', title: 'PID Controller Implementation', subject: 'Robotics Engineering', dueDate: 'Oct 15', priority: 'High', status: 'Not Started', points: 150 },
  { id: 'a3', title: 'Data Cleaning Script', subject: 'Python for Data Science', dueDate: 'Oct 12', priority: 'Medium', status: 'Completed', points: 50 },
  { id: 'a4', title: 'Ethics of Autonomous Systems', subject: 'AI Foundations', dueDate: 'Oct 20', priority: 'Low', status: 'Review', points: 80 }
];

export const SUBJECTS: Subject[] = [
  {
    id: "s1",
    title: "AI Foundations",
    teacher: "Dr. K. Aris",
    status: "Exam Prep",
    grade: "A",
    progress: 92,
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400",
    description: "Exploration of neural networks, machine learning algorithms, and real-world AI implementation.",
    schedule: "Mon/Wed 10:00 AM",
    subCourses: [
      { id: 'sc1', title: 'Perceptrons & Basic Neurons', duration: '12m', description: 'Understanding the building blocks of neural networks.', videoUrl: 'https://www.youtube.com/embed/aircAruvnKk', isCompleted: true, badgeIcon: '🧠' },
      { id: 'sc2', title: 'Backpropagation Explained', duration: '22m', description: 'Mathematical walkthrough of gradient descent.', videoUrl: 'https://www.youtube.com/embed/IHZwWFHWa-w', isCompleted: false, badgeIcon: '⚡' },
      { id: 'sc3', title: 'CNN Architecture', duration: '18m', description: 'Computer vision basics with Convolutional Neural Nets.', videoUrl: 'https://www.youtube.com/embed/YRhxdVk_sIs', isCompleted: false, badgeIcon: '👁️' }
    ]
  },
  {
    id: "s2",
    title: "Robotics Engineering",
    teacher: "Prof. H. Vane",
    status: "Steady",
    grade: "A-",
    progress: 78,
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400",
    description: "Mechanical design, electronics, and firmware for mobile robotics and automation.",
    schedule: "Tue/Thu 1:00 PM",
    subCourses: [
      { id: 'rc1', title: 'Introduction to ROS2', duration: '15m', description: 'Setting up your first workspace in ROS2.', videoUrl: 'https://www.youtube.com/embed/L93-ZJp_fU0', isCompleted: true, badgeIcon: '🤖' },
      { id: 'rc2', title: 'PID Loop Tuning', duration: '25m', description: 'Balancing P, I, and D constants for smooth motion.', videoUrl: 'https://www.youtube.com/embed/4Y7zG48uHRo', isCompleted: false, badgeIcon: '⚙️' },
      { id: 'rc3', title: 'LiDAR Data Processing', duration: '20m', description: 'Mapping environments using Laser Scanners.', videoUrl: 'https://www.youtube.com/embed/xL8pZf6_m2s', isCompleted: false, badgeIcon: '📡' }
    ]
  },
  {
    id: "s3",
    title: "Python for Data Science",
    teacher: "Ms. Sarah Chen",
    status: "Needs Review",
    grade: "B+",
    progress: 62,
    thumbnail: "https://images.unsplash.com/photo-1551288049-bbda38a594a0?auto=format&fit=crop&q=80&w=400",
    description: "NumPy, Pandas, and Matplotlib used to derive insights from complex datasets.",
    schedule: "Fri 11:30 AM",
    subCourses: [
      { id: 'pc1', title: 'Vectorized Ops with NumPy', duration: '10m', description: 'Array manipulation without for-loops.', videoUrl: 'https://www.youtube.com/embed/ZDa-Z5JzLYM', isCompleted: true, badgeIcon: '🐍' },
      { id: 'pc2', title: 'Pandas DataFrames', duration: '30m', description: 'Ingesting and cleaning large datasets.', videoUrl: 'https://www.youtube.com/embed/vmEHCJofslg', isCompleted: false, badgeIcon: '📊' },
      { id: 'pc3', title: 'Plotting with Seaborn', duration: '14m', description: 'Creating professional statistical visualizations.', videoUrl: 'https://www.youtube.com/embed/6guX0PScU98', isCompleted: false, badgeIcon: '🎨' }
    ]
  }
];

export const SUGGESTED_RESOURCES: LearningResource[] = [
  {
    id: "r1",
    category: "AI",
    title: "TensorFlow 2.0 Workshop",
    difficulty: "Hard",
    estimatedTime: "1h 20m",
    reward: "800 XP",
    icon: "🧠",
    tags: ["Deep Learning", "Python"]
  },
  {
    id: "r2",
    category: "Robotics",
    title: "ROS2 Navigation Basics",
    difficulty: "Medium",
    estimatedTime: "50m",
    reward: "450 XP",
    icon: "🤖",
    tags: ["ROS2", "C++"]
  },
  {
    id: "r3",
    category: "Coding",
    title: "FastAPI for Students",
    difficulty: "Easy",
    estimatedTime: "25m",
    reward: "200 XP",
    icon: "🐍",
    tags: ["Python", "Backend"]
  }
];

export const STUDY_CHART_DATA: ChartDataPoint[] = [
  { date: 'Mon', studyHours: 4, tasksCompleted: 5, codeCommits: 12 },
  { date: 'Tue', studyHours: 6, tasksCompleted: 8, codeCommits: 45 },
  { date: 'Wed', studyHours: 3, tasksCompleted: 4, codeCommits: 22 },
  { date: 'Thu', studyHours: 7, tasksCompleted: 10, codeCommits: 67 },
  { date: 'Fri', studyHours: 5, tasksCompleted: 6, codeCommits: 31 },
  { date: 'Sat', studyHours: 2, tasksCompleted: 2, codeCommits: 8 },
  { date: 'Sun', studyHours: 1, tasksCompleted: 1, codeCommits: 3 },
];
