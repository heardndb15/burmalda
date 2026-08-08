import {
  Home,
  ChartColumn,
  TrendingUp,
  FilePenLine,
  Palette,
  ShieldCheck,
  Clock,
  Download,
  Briefcase,
  GraduationCap,
  Zap,
  Folder,
  Award,
  Languages,
  Users,
  Trophy,
  FileText,
  Send,
  MessageSquare,
  Target,
  Sparkles,
  Globe,
  Bell,
  Settings,
  Wallet,
  LifeBuoy,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
  badge?: 'notifications';
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    title: 'Обзор',
    items: [
      { path: '/app', label: 'Дашборд', icon: Home },
      { path: '/analytics', label: 'Аналитика', icon: ChartColumn },
      { path: '/market', label: 'Рынок и зарплаты', icon: TrendingUp },
    ],
  },
  {
    title: 'Резюме',
    items: [
      { path: '/resumes', label: 'Мои резюме', icon: FilePenLine },
      { path: '/templates', label: 'Шаблоны', icon: Palette },
      { path: '/ats', label: 'Проверка ATS', icon: ShieldCheck },
      { path: '/history', label: 'Версии', icon: Clock },
      { path: '/export', label: 'Экспорт и ссылки', icon: Download },
    ],
  },
  {
    title: 'Контент',
    items: [
      { path: '/experience', label: 'Опыт работы', icon: Briefcase },
      { path: '/education', label: 'Образование', icon: GraduationCap },
      { path: '/skills', label: 'Навыки', icon: Zap },
      { path: '/projects', label: 'Проекты', icon: Folder },
      { path: '/certificates', label: 'Сертификаты', icon: Award },
      { path: '/languages', label: 'Языки', icon: Languages },
      { path: '/references', label: 'Рекомендации', icon: Users },
      { path: '/achievements', label: 'Достижения', icon: Trophy },
    ],
  },
  {
    title: 'Карьера',
    items: [
      { path: '/cover-letters', label: 'Письма', icon: FileText },
      { path: '/applications', label: 'Отклики', icon: Send },
      { path: '/interview', label: 'Собеседования', icon: MessageSquare },
      { path: '/career', label: 'Карьерный план', icon: Target },
      { path: '/brand', label: 'Персональный бренд', icon: Sparkles },
      { path: '/linkedin', label: 'LinkedIn', icon: Globe },
    ],
  },
  {
    title: 'Система',
    items: [
      { path: '/notifications', label: 'Уведомления', icon: Bell, badge: 'notifications' },
      { path: '/settings', label: 'Настройки', icon: Settings },
      { path: '/billing', label: 'Тарифы и оплата', icon: Wallet },
      { path: '/support', label: 'Поддержка', icon: LifeBuoy },
    ],
  },
];

export const allNavItems: NavItem[] = navGroups.flatMap((g) => g.items);
