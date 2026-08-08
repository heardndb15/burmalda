import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  Farm,
  Pasture,
  Herd,
  Tracker,
  Worker,
  Contract,
  NotificationItem,
  EmergencyAlert,
  UserProfile,
  UserRole,
  Organization,
  LandUseObservation,
  GovernmentAlert,
  FinancialPassport,
  AuditLogEntry,
  InspectionTask,
} from '../types';
import {
  initialFarm,
  initialPastures,
  initialHerds,
  initialTrackers,
  initialWorkers,
  initialContracts,
  initialNotifications,
  initialEmergencyAlert,
  initialDistrict,
  initialOrganizations,
  initialLandUseObservations,
  initialGovernmentAlerts,
  initialFinancialPassports,
  initialAuditLogs,
} from '../services/mockData';
import { translations } from '../i18n/translations';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  farm: Farm;
  setFarm: React.Dispatch<React.SetStateAction<Farm>>;
  pastures: Pasture[];
  addPasture: (pasture: Omit<Pasture, 'id'>) => void;
  herds: Herd[];
  addHerd: (herd: Omit<Herd, 'id'>) => void;
  trackers: Tracker[];
  addTracker: (code: string, herdId?: string) => void;
  workers: Worker[];
  contracts: Contract[];
  addContract: (contract: Omit<Contract, 'id' | 'createdAt'>) => void;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  addNotification: (notification: Omit<NotificationItem, 'id' | 'timestamp' | 'isRead'>) => void;
  emergencyAlert: EmergencyAlert | null;
  triggerEmergencyAlert: () => void;
  resolveEmergencyAlert: () => void;
  isAiAssistantOpen: boolean;
  setIsAiAssistantOpen: (open: boolean) => void;
  isDemoMode: boolean;
  startDemoMode: () => void;
  stopDemoMode: () => void;
  selectedPasture: Pasture | null;
  setSelectedPasture: (p: Pasture | null) => void;
  selectedHerd: Herd | null;
  setSelectedHerd: (h: Herd | null) => void;
  safetyRadius: number;
  setSafetyRadius: (r: number) => void;
  alertChannels: { push: boolean; sms: boolean; whatsapp: boolean };
  setAlertChannels: React.Dispatch<React.SetStateAction<{ push: boolean; sms: boolean; whatsapp: boolean }>>;

  // B2G & B2B Extensions
  district: typeof initialDistrict;
  organizations: Organization[];
  landObservations: LandUseObservation[];
  governmentAlerts: GovernmentAlert[];
  financialPassports: FinancialPassport[];
  addFinancialPassport: (passport: FinancialPassport) => void;
  auditLogs: AuditLogEntry[];
  addAuditLog: (entry: Omit<AuditLogEntry, 'id' | 'timestamp'>) => void;
  inspectionTasks: InspectionTask[];
  addInspectionTask: (task: Omit<InspectionTask, 'id' | 'createdDate' | 'status'>) => void;
  isDemoTourOpen: boolean;
  setIsDemoTourOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');
  const [user, setUser] = useState<UserProfile>({
    name: 'Ерлан Смағұлов',
    phone: '+7 701 555 4321',
    email: 'yerlan.farm@agroradar.kz',
    farmName: 'Агро-Шаруашылық "Өтеген батыр"',
    region: 'Алматинская область',
    district: 'Илийский район',
    isAuthenticated: true,
    role: 'FARMER',
  });

  const [farm, setFarm] = useState<Farm>(initialFarm);
  const [pastures, setPastures] = useState<Pasture[]>(initialPastures);
  const [herds, setHerds] = useState<Herd[]>(initialHerds);
  const [trackers, setTrackers] = useState<Tracker[]>(initialTrackers);
  const [workers] = useState<Worker[]>(initialWorkers);
  const [contracts, setContracts] = useState<Contract[]>(initialContracts);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  const [emergencyAlert, setEmergencyAlert] = useState<EmergencyAlert | null>(null);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState<boolean>(false);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);

  const [selectedPasture, setSelectedPasture] = useState<Pasture | null>(null);
  const [selectedHerd, setSelectedHerd] = useState<Herd | null>(null);

  const [safetyRadius, setSafetyRadius] = useState<number>(500);
  const [alertChannels, setAlertChannels] = useState({
    push: true,
    sms: true,
    whatsapp: true,
  });

  // B2G & B2B State
  const [district] = useState(initialDistrict);
  const [organizations] = useState<Organization[]>(initialOrganizations);
  const [landObservations] = useState<LandUseObservation[]>(initialLandUseObservations);
  const [governmentAlerts] = useState<GovernmentAlert[]>(initialGovernmentAlerts);
  const [financialPassports, setFinancialPassports] = useState<FinancialPassport[]>(initialFinancialPassports);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(initialAuditLogs);
  const [inspectionTasks, setInspectionTasks] = useState<InspectionTask[]>([
    {
      id: 'task-481',
      plotId: 'plot-481',
      plotName: 'Участок №481',
      ownerName: 'КХ «Береке»',
      assignedTo: 'Инспектор Акимата (Касымов С.)',
      createdDate: '08.08.2026',
      status: 'pending',
      reason: 'Низкая наблюдаемая активность за 24 месяца.',
    },
  ]);
  const [isDemoTourOpen, setIsDemoTourOpen] = useState<boolean>(false);

  const setUserRole = (role: UserRole) => {
    setUser((prev) => ({ ...prev, role }));
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['ru']?.[key] || key;
  };

  const addPasture = (newPasture: Omit<Pasture, 'id'>) => {
    const created: Pasture = {
      ...newPasture,
      id: `pasture-${Date.now()}`,
    };
    setPastures((prev) => [...prev, created]);
    setFarm((prev) => ({ ...prev, areaHectares: prev.areaHectares + created.areaHectares }));
  };

  const addHerd = (newHerd: Omit<Herd, 'id'>) => {
    const created: Herd = {
      ...newHerd,
      id: `herd-${Date.now()}`,
    };
    setHerds((prev) => [...prev, created]);
    setFarm((prev) => ({
      ...prev,
      totalAnimals: prev.totalAnimals + created.headCount,
    }));
  };

  const addTracker = (code: string, herdId?: string) => {
    const herd = herds.find((h) => h.id === herdId);
    const created: Tracker = {
      id: `tr-${Date.now()}`,
      code,
      herdId,
      herdName: herd?.name,
      batteryLevel: 100,
      lastPing: 'Только что',
      status: 'online',
      signalStrength: 'excellent',
    };
    setTrackers((prev) => [...prev, created]);
  };

  const addContract = (newContract: Omit<Contract, 'id' | 'createdAt'>) => {
    const created: Contract = {
      ...newContract,
      id: `contract-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setContracts((prev) => [created, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const addNotification = (notification: Omit<NotificationItem, 'id' | 'timestamp' | 'isRead'>) => {
    const created: NotificationItem = {
      ...notification,
      id: `notif-${Date.now()}-${Math.round(Math.random() * 1000)}`,
      timestamp: new Date().toLocaleString('ru-RU'),
      isRead: false,
    };
    setNotifications((prev) => [created, ...prev]);
  };

  const triggerEmergencyAlert = () => {
    setEmergencyAlert(initialEmergencyAlert);
  };

  const resolveEmergencyAlert = () => {
    setEmergencyAlert(null);
  };

  const addFinancialPassport = (passport: FinancialPassport) => {
    setFinancialPassports((prev) => [passport, ...prev]);
  };

  const addAuditLog = (entry: Omit<AuditLogEntry, 'id' | 'timestamp'>) => {
    const newLog: AuditLogEntry = {
      ...entry,
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleString('ru-RU'),
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const addInspectionTask = (task: Omit<InspectionTask, 'id' | 'createdDate' | 'status'>) => {
    const newTask: InspectionTask = {
      ...task,
      id: `task-${Date.now()}`,
      createdDate: new Date().toLocaleDateString('ru-RU'),
      status: 'pending',
    };
    setInspectionTasks((prev) => [newTask, ...prev]);
  };

  // Demo mode script execution
  const startDemoMode = () => {
    setIsDemoMode(true);
    setTimeout(() => {
      triggerEmergencyAlert();
    }, 1500);
  };

  const stopDemoMode = () => {
    setIsDemoMode(false);
    resolveEmergencyAlert();
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        user,
        setUser,
        userRole: user.role,
        setUserRole,
        farm,
        setFarm,
        pastures,
        addPasture,
        herds,
        addHerd,
        trackers,
        addTracker,
        workers,
        contracts,
        addContract,
        notifications,
        markNotificationRead,
        addNotification,
        emergencyAlert,
        triggerEmergencyAlert,
        resolveEmergencyAlert,
        isAiAssistantOpen,
        setIsAiAssistantOpen,
        isDemoMode,
        startDemoMode,
        stopDemoMode,
        selectedPasture,
        setSelectedPasture,
        selectedHerd,
        setSelectedHerd,
        safetyRadius,
        setSafetyRadius,
        alertChannels,
        setAlertChannels,
        district,
        organizations,
        landObservations,
        governmentAlerts,
        financialPassports,
        addFinancialPassport,
        auditLogs,
        addAuditLog,
        inspectionTasks,
        addInspectionTask,
        isDemoTourOpen,
        setIsDemoTourOpen,
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

