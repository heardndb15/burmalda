import React, { createContext, useContext, useState } from 'react';
import {
  CvResume,
  CVTemplate,
  CoverLetter,
  JobApplication,
  NotificationItem,
  InterviewQuestion,
  CareerGoal,
  UserProfile,
} from '../types';
import {
  initialUser,
  initialResumes,
  initialTemplates,
  initialCoverLetters,
  initialApplications,
  initialNotifications,
  initialInterviewQuestions,
  initialCareerGoals,
} from '../services/mockData';

interface AppContextType {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;

  resumes: CvResume[];
  addResume: (resume: Omit<CvResume, 'id' | 'createdAt' | 'updatedAt' | 'stats'>) => CvResume;
  updateResume: (id: string, patch: Partial<CvResume>) => void;
  deleteResume: (id: string) => void;
  duplicateResume: (id: string) => void;
  getResume: (id: string) => CvResume | undefined;
  setActiveResumeId: (id: string) => void;
  activeResumeId: string | null;
  activeResume: CvResume | null;

  templates: CVTemplate[];
  getTemplate: (id: string) => CVTemplate | undefined;

  coverLetters: CoverLetter[];
  addCoverLetter: (letter: Omit<CoverLetter, 'id' | 'createdAt'>) => void;

  applications: JobApplication[];
  updateApplicationStatus: (id: string, status: JobApplication['status']) => void;

  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  interviewQuestions: InterviewQuestion[];
  careerGoals: CareerGoal[];

  isAiAssistantOpen: boolean;
  setIsAiAssistantOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(initialUser);
  const [resumes, setResumes] = useState<CvResume[]>(initialResumes);
  const [templates] = useState<CVTemplate[]>(initialTemplates);
  const [coverLetters, setCoverLetters] = useState<CoverLetter[]>(initialCoverLetters);
  const [applications, setApplications] = useState<JobApplication[]>(initialApplications);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [interviewQuestions] = useState<InterviewQuestion[]>(initialInterviewQuestions);
  const [careerGoals] = useState<CareerGoal[]>(initialCareerGoals);

  const [activeResumeId, setActiveResumeId] = useState<string | null>(resumes[0]?.id ?? null);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState<boolean>(false);

  const getResume = (id: string) => resumes.find((r) => r.id === id);
  const activeResume = activeResumeId ? getResume(activeResumeId) ?? resumes[0] ?? null : resumes[0] ?? null;

  const getTemplate = (id: string) => templates.find((t) => t.id === id);

  const addResume: AppContextType['addResume'] = (data) => {
    const created: CvResume = {
      ...data,
      id: `cv-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      stats: { views: 0, downloads: 0, applications: 0, interviews: 0, lastViewed: '—' },
    };
    setResumes((prev) => [created, ...prev]);
    setActiveResumeId(created.id);
    setUser((prev) => ({ ...prev, cvsCreated: prev.cvsCreated + 1 }));
    return created;
  };

  const updateResume = (id: string, patch: Partial<CvResume>) => {
    setResumes((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, ...patch, updatedAt: new Date().toISOString().split('T')[0] }
          : r
      )
    );
  };

  const deleteResume = (id: string) => {
    setResumes((prev) => prev.filter((r) => r.id !== id));
    if (activeResumeId === id) {
      setActiveResumeId(resumes.find((r) => r.id !== id)?.id ?? null);
    }
  };

  const duplicateResume = (id: string) => {
    const source = getResume(id);
    if (!source) return;
    const copy: CvResume = {
      ...source,
      id: `cv-${Date.now()}`,
      name: `${source.name} (копия)`,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      stats: { views: 0, downloads: 0, applications: 0, interviews: 0, lastViewed: '—' },
    };
    setResumes((prev) => [copy, ...prev]);
  };

  const addCoverLetter = (letter: Omit<CoverLetter, 'id' | 'createdAt'>) => {
    const created: CoverLetter = {
      ...letter,
      id: `cl-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCoverLetters((prev) => [created, ...prev]);
  };

  const updateApplicationStatus = (id: string, status: JobApplication['status']) => {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        resumes,
        addResume,
        updateResume,
        deleteResume,
        duplicateResume,
        getResume,
        setActiveResumeId,
        activeResumeId,
        activeResume,
        templates,
        getTemplate,
        coverLetters,
        addCoverLetter,
        applications,
        updateApplicationStatus,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        interviewQuestions,
        careerGoals,
        isAiAssistantOpen,
        setIsAiAssistantOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
