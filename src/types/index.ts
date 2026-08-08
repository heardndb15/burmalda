export type CVStatus = 'draft' | 'in_progress' | 'completed' | 'optimized';

export interface PersonalInfo {
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  website: string;
  linkedin: string;
  telegram: string;
  github: string;
  photoUrl: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
  techStack: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
  description: string;
}

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface SkillItem {
  id: string;
  name: string;
  level: SkillLevel;
  category: string;
  years: number;
}

export interface LanguageSkill {
  id: string;
  name: string;
  level: string;
  levelPercent: number;
  certification?: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  verified: boolean;
}

export interface ProjectItem {
  id: string;
  name: string;
  role: string;
  description: string;
  techStack: string[];
  url: string;
  gradient: string;
  highlights: string[];
}

export interface ReferenceItem {
  id: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
  relation: string;
  rating: number;
}

export interface AchievementItem {
  id: string;
  title: string;
  date: string;
  category: 'professional' | 'academic' | 'sport' | 'volunteer' | 'community';
  description: string;
}

export interface CVStats {
  views: number;
  downloads: number;
  applications: number;
  interviews: number;
  lastViewed: string;
}

export interface CvResume {
  id: string;
  name: string;
  title: string;
  templateId: string;
  status: CVStatus;
  atsScore: number;
  compatibility: number;
  completeness: number;
  createdAt: string;
  updatedAt: string;
  stats: CVStats;
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: EducationItem[];
  skills: SkillItem[];
  languages: LanguageSkill[];
  certificates: Certificate[];
  projects: ProjectItem[];
  references: ReferenceItem[];
  achievements: AchievementItem[];
}

export interface CVTemplate {
  id: string;
  name: string;
  category: 'classic' | 'modern' | 'creative' | 'technical';
  description: string;
  accentColor: string;
  previewGradient: string;
  isPremium: boolean;
  suitability: string[];
  popular?: boolean;
}

export interface CoverLetter {
  id: string;
  resumeId: string;
  resumeName: string;
  company: string;
  position: string;
  tone: 'formal' | 'professional' | 'friendly';
  aiGenerated: boolean;
  status: 'draft' | 'ready' | 'sent';
  createdAt: string;
  content: string;
}

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  salary: string;
  status: 'saved' | 'applied' | 'interview' | 'offer' | 'rejected';
  source: string;
  date: string;
  resumeName: string;
  notes: string;
  matchScore: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'danger' | 'info';
  timestamp: string;
  isRead: boolean;
  link?: string;
}

export interface InterviewQuestion {
  id: string;
  category: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  rating: number;
}

export interface CareerGoal {
  id: string;
  title: string;
  timeframe: string;
  status: 'active' | 'completed' | 'planned';
  progress: number;
  milestones: string[];
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  headline: string;
  targetRole: string;
  experienceYears: number;
  plan: 'free' | 'pro' | 'team';
  isAuthenticated: boolean;
  avatarUrl: string;
  cvsCreated: number;
  linkedinConnected: boolean;
  githubConnected: boolean;
}
