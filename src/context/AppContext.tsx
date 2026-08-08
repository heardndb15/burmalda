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
} from '../services/mockData';
import { translations } from '../i18n/translations';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
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

  const [safetyRadius, setSafetyRadius] = useState<number>(500); // meters
  const [alertChannels, setAlertChannels] = useState({
    push: true,
    sms: true,
    whatsapp: true,
  });

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

  const triggerEmergencyAlert = () => {
    setEmergencyAlert(initialEmergencyAlert);
  };

  const resolveEmergencyAlert = () => {
    setEmergencyAlert(null);
  };

  // Demo mode script execution
  const startDemoMode = () => {
    setIsDemoMode(true);
    // Automatically trigger alert after 1.5 seconds for visual impact
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
