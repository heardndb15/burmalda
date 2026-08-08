import { Language } from '../types';

export const translations: Record<Language, Record<string, string>> = {
  ru: {
    // Brand
    brandName: 'Burmalda',
    slogan: 'Цифровой автопилот для животновода Казахстана.',
    heroTitle: 'Ваше стадо. Ваша земля. Под контролем.',
    heroSubtitle: 'Burmalda помогает животноводам управлять пастбищами, отслеживать стадо и предотвращать опасные ситуации — в одном месте.',
    startFree: 'Начать бесплатно',
    seeHowItWorks: 'Посмотреть, как работает',
    demoMode: 'Запустить демо',
    demoModeActive: 'Демо-режим активен',
    demoBadge: 'Demo data',
    
    // Navigation
    navToday: 'Сегодня',
    navMap: 'Карта',
    navPastures: 'Пастбища',
    navHerd: 'Стадо',
    navTrackers: 'GPS-трекеры',
    navSafety: 'Безопасность',
    navWorkers: 'Пастухи',
    navContracts: 'Договоры',
    navNotifications: 'Уведомления',
    navAnalytics: 'Аналитика',
    navFarm: 'Хозяйство',
    navSettings: 'Настройки',
    navMore: 'Ещё',

    // Today / Farmer's Home
    todayGreeting: 'Добрый день, Ерлан.',
    todayRecommends: 'Сегодня Burmalda рекомендует:',
    recMoveHerdTitle: '🌱 Перегнать стадо',
    recMoveHerdDesc: 'Пастбище №1 истощается. Рекомендуемый участок:',
    recMoveHerdTarget: 'Пастбище №3',
    recMoveHerdReserve: 'Кормовой запас: 12 дней',
    recMoveHerdBtn: 'Посмотреть маршрут',
    recAlertTitle: '🚨 Обратите внимание',
    recAlertDesc: 'Стадо №2 находится в 430 м от опасной зоны (трасса A-3).',
    recAlertBtn: 'Открыть карту',
    recWorkerTitle: '👨‍🌾 Пастух',
    recWorkerDesc: 'Контракт с Ерланом С. заканчивается через 7 дней.',
    recWorkerBtn: 'Открыть договор',
    farmStatusTitle: 'Всё спокойно',
    farmStatusLabel: 'Состояние хозяйства:',
    statusGood: '🟢 Хорошее',
    statusMedium: '🟡 Среднее',
    statusDepleted: '🔴 Истощённое',
    
    // Map
    mapLayerSatellite: 'Спутник',
    mapLayerStreets: 'Схема',
    mapLayerTerrain: 'Рельеф',
    mapLegendPastures: 'Пастбища',
    mapLegendHerd: 'Стадо',
    mapLegendWater: 'Водопои',
    mapLegendDanger: 'Опасности',
    mapPastureCardTitle: 'Пастбище',
    mapArea: 'Площадь:',
    mapFeedReserve: 'Кормовой запас:',
    mapWaterAccess: 'Вода:',
    mapLastAnalysis: 'Последний анализ:',
    mapBtnRoute: 'Показать маршрут',
    mapBtnMoveHerd: 'Перевести стадо',
    mapBtnDetails: 'Подробнее',
    mapTrackingMode: 'Режим слежения',
    mapTrackingModeActive: 'Слежение в реальном времени ON',
    
    // Pastures
    pasturesTitle: 'Smart Pastures — Управление пастбищами',
    addPastureBtn: '+ Добавить пастбище',
    pastureTimeline: 'История вегетации (NDVI timeline)',
    days: 'дней',
    hectares: 'га',
    
    // Herd
    herdTitle: 'Управление стадом',
    addHerdBtn: '+ Добавить стадо',
    addAnimalBtn: '+ Добавить животное',
    assignShepherdBtn: 'Назначить пастуха',
    animalsCount: 'головы',
    shepherd: 'Пастух',
    location: 'Местоположение',
    statusSafe: '🟢 В безопасности',
    statusWarning: '🟡 Предупреждение',
    statusDanger: '🔴 Опасность',
    
    // Trackers
    trackersTitle: 'GPS-трекеры',
    connectTrackerBtn: '+ Подключить трекер',
    lastPing: 'Последняя связь:',
    battery: 'Заряд батареи:',
    pairingStep1: 'Шаг 1: Введите ID устройства',
    pairingStep2: 'Шаг 2: Выберите стадо',
    pairingStep3: 'Шаг 3: Синхронизация сигнала',
    pairingStep4: 'Готово! Трекер подключён.',
    
    // Safety
    safetyTitle: 'Безопасность стада (Анти-ДТП)',
    safetySubtitle: 'Мониторинг приближения животных к опасным автодорогам и ж/д путям',
    warningRadius: 'Радиус предупреждения',
    alertChannels: 'Каналы экстренных уведомлений',
    pushChannel: 'Push-уведомления',
    smsChannel: 'SMS-оповещение',
    whatsappChannel: 'WhatsApp-уведомление',
    
    // Emergency Modal
    emergencyTitle: '🚨 Стадо приближается к дороге!',
    emergencyDesc: 'Обнаружен риск выхода скота на проезжую часть трассы.',
    distance: 'Расстояние:',
    speed: 'Скорость:',
    direction: 'Направление:',
    callShepherd: 'Позвонить пастуху',
    
    // Workers / Agro-HR
    workersTitle: 'Найдите своего пастуха (Agro-HR)',
    searchWorkerPlaceholder: 'Введите имя или район...',
    rating: 'Рейтинг:',
    experience: 'Опыт:',
    completedContracts: 'завершённых контрактов',
    viewProfile: 'Посмотреть профиль',
    proposeJob: 'Предложить работу',
    proposeContract: 'Предложить контракт',

    // Contracts & AI Lawyer
    contractsTitle: 'Договоры и AI-Юрист',
    createContractBtn: '+ Создать договор (AI-Юрист)',
    activeContracts: 'Активные',
    pendingContracts: 'Ожидают подписи',
    completedContractsTab: 'Завершённые',
    monthlySalary: '₸ / месяц',
    aiLawyerTitle: 'AI-Юрист Burmalda',
    aiLawyerSubtitle: 'Создание юридически корректного трудового договора за 1 минуту',
    aiQuestion1: 'Кто будет выполнять работу?',
    aiQuestion2: 'Какая ежемесячная заработная плата?',
    aiQuestion3: 'Укажите ключевые обязанности пастуха:',
    aiContractReady: 'Договор успешно сформирован!',
    aiDisclaimer: 'Автоматически подготовленный шаблон. При необходимости проконсультируйтесь со специалистом.',
    downloadContract: 'Скачать PDF',
    sendForSignature: 'Отправить на подпись',

    // Notifications
    notificationsTitle: 'Центр уведомлений',
    notificationToday: 'Сегодня',
    notificationEarlier: 'Ранее',

    // Analytics
    analyticsTitle: 'Аналитика и отчёты',
    pastureHealthDist: 'Распределение здоровья пастбищ',
    grazingDaysHistory: 'История дней выпаса',
    incidentsPrevented: 'Предотвращено опасных ситуаций',
    landEfficiency: 'Эффективность кормовой базы',

    // Farm
    farmTitle: 'Профиль хозяйства',
    region: 'Регион:',
    district: 'Район:',
    totalArea: 'Общая площадь:',
    totalLivestock: 'Поголовье:',

    // Settings
    settingsTitle: 'Настройки профиля и системы',
    langSelector: 'Язык интерфейса',
    integrations: 'Интеграции (в разработке)',
    bankIntegration: 'Банки и кредитование',
    insuranceIntegration: 'Агро-страхование',
    b2gIntegration: 'B2G субсидии акимата',

    // AI Assistant
    askBurmalda: 'Ask Burmalda',
    aiAssistantTitle: 'Burmalda AI Помощник',
    aiPromptPlaceholder: 'Спросите Burmalda (напр. Куда перегнать стадо?)...',
  },

  kk: {
    // Brand
    brandName: 'Burmalda',
    slogan: 'Қазақстан малшысының сандық автопилоты.',
    heroTitle: 'Сіздің табыныңыз. Сіздің жеріңіз. Бақылауда.',
    heroSubtitle: 'Burmalda мал өсірушілерге жайылымдарды басқаруға, табынды бақылауға және қауіпті жағдайлардың алдын алуға көмектеседі.',
    startFree: 'Тегін бастау',
    seeHowItWorks: 'Қалай жұмыс істейтінін көру',
    demoMode: 'Демо режимін қосу',
    demoModeActive: 'Демо-режим белсенді',
    demoBadge: 'Демо деректер',
    
    // Navigation
    navToday: 'Бүгін',
    navMap: 'Карта',
    navPastures: 'Жайылымдар',
    navHerd: 'Табын',
    navTrackers: 'GPS-трекерлер',
    navSafety: 'Қауіпсіздік',
    navWorkers: 'Бақташылар',
    navContracts: 'Шарттар',
    navNotifications: 'Хабарландырулар',
    navAnalytics: 'Аналитика',
    navFarm: 'Шаруашылық',
    navSettings: 'Баптаулар',
    navMore: 'Тағы',

    // Today / Farmer's Home
    todayGreeting: 'Қайырлы күн, Ерлан.',
    todayRecommends: 'Бүгін Burmalda ұсынады:',
    recMoveHerdTitle: '🌱 Табынды ауыстыру',
    recMoveHerdDesc: '№1 жайылым таусылуда. Ұсынылатын учаске:',
    recMoveHerdTarget: '№3 Жайылым',
    recMoveHerdReserve: 'Азық қоры: 12 күн',
    recMoveHerdBtn: 'Бағытты көру',
    recAlertTitle: '🚨 Назар аударыңыз',
    recAlertDesc: '№2 табын қауіпті аймақтан (A-3 тасжолы) 430 м қашықтықта.',
    recAlertBtn: 'Картаны ашу',
    recWorkerTitle: '👨‍🌾 Бақташы',
    recWorkerDesc: 'Ерлан С.-мен келісімшарт 7 күннен кейін аяқталады.',
    recWorkerBtn: 'Шартты ашу',
    farmStatusTitle: 'Бәрі тыныш',
    farmStatusLabel: 'Шаруашылық жағдайы:',
    statusGood: '🟢 Жақсы',
    statusMedium: '🟡 Орташа',
    statusDepleted: '🔴 Тозған',
    
    // Map
    mapLayerSatellite: 'Спутник',
    mapLayerStreets: 'Схема',
    mapLayerTerrain: 'Рельеф',
    mapLegendPastures: 'Жайылымдар',
    mapLegendHerd: 'Табын',
    mapLegendWater: 'Су көздері',
    mapLegendDanger: 'Қауіпті аймақ',
    mapPastureCardTitle: 'Жайылым',
    mapArea: 'Ауданы:',
    mapFeedReserve: 'Азық қоры:',
    mapWaterAccess: 'Су:',
    mapLastAnalysis: 'Соңғы талдау:',
    mapBtnRoute: 'Маршрутты көрсету',
    mapBtnMoveHerd: 'Табынды көшіру',
    mapBtnDetails: 'Толығырақ',
    mapTrackingMode: 'Қадағалау режимі',
    mapTrackingModeActive: 'Нақты уақытта бақылау ON',
    
    // Pastures
    pasturesTitle: 'Smart Pastures — Жайылымдарды басқару',
    addPastureBtn: '+ Жайылым қосу',
    pasturesTimeline: 'Вегетация тарихы (NDVI timeline)',
    days: 'күн',
    hectares: 'га',
    
    // Herd
    herdTitle: 'Табынды басқару',
    addHerdBtn: '+ Табын қосу',
    addAnimalBtn: '+ Мал қосу',
    assignShepherdBtn: 'Бақташы тағайындау',
    animalsCount: 'бас',
    shepherd: 'Бақташы',
    location: 'Орналасқан жері',
    statusSafe: '🟢 Қауіпсіз',
    statusWarning: '🟡 Ескерту',
    statusDanger: '🔴 Қауіпті',
    
    // Trackers
    trackersTitle: 'GPS-трекерлер',
    connectTrackerBtn: '+ Трекер қосу',
    lastPing: 'Соңғы байланыс:',
    battery: 'Батарея заряды:',
    pairingStep1: '1-қадам: Құрылғы ID енгізіңіз',
    pairingStep2: '2-қадам: Табынды таңдаңыз',
    pairingStep3: '3-қадам: Сигналды синхрондау',
    pairingStep4: 'Дайын! Трекер қосылды.',
    
    // Safety
    safetyTitle: 'Табын қауіпсіздігі (Анти-ЖКО)',
    safetySubtitle: 'Малдың автожолдар мен теміржолдарға жақындауын бақылау',
    warningRadius: 'Ескерту радиусы',
    alertChannels: 'Шұғыл хабарландыру арналары',
    pushChannel: 'Push-хабарлама',
    smsChannel: 'SMS-ескерту',
    whatsappChannel: 'WhatsApp-хабарлама',
    
    // Emergency Modal
    emergencyTitle: '🚨 Табын жолға жақындап қалды!',
    emergencyDesc: 'Малдың жолға шығу қаупі анықталды.',
    distance: 'Қашықтық:',
    speed: 'Жылдамдық:',
    direction: 'Бағыт:',
    callShepherd: 'Бақташыға қоңырау шалу',
    
    // Workers / Agro-HR
    workersTitle: 'Бақташыңызды табыңыз (Agro-HR)',
    searchWorkerPlaceholder: 'Аты-жөнін немесе ауданды енгізіңіз...',
    rating: 'Рейтинг:',
    experience: 'Тәжірибе:',
    completedContracts: 'аяқталған келісімшарт',
    viewProfile: 'Профильді көру',
    proposeJob: 'Жұмыс ұсыну',
    proposeContract: 'Шарт ұсыну',

    // Contracts & AI Lawyer
    contractsTitle: 'Шарттар және AI-Заңгер',
    createContractBtn: '+ Шарт жасау (AI-Заңгер)',
    activeContracts: 'Белсенді',
    pendingContracts: 'Қол қою күтілуде',
    completedContractsTab: 'Аяқталған',
    monthlySalary: '₸ / ай',
    aiLawyerTitle: 'Burmalda AI-Заңгері',
    aiLawyerSubtitle: '1 минутта заңды түрде дұрыс еңбек шартын құру',
    aiQuestion1: 'Жұмысты кім орындайды?',
    aiQuestion2: 'Айлық жалақы қанша?',
    aiQuestion3: 'Бақташының негізгі міндеттерін көрсетіңіз:',
    aiContractReady: 'Шарт сәтті дайындалды!',
    aiDisclaimer: 'Автоматты түрде дайындалған үлгі. Қажет болса маманмен кеңесіңіз.',
    downloadContract: 'PDF жүктеу',
    sendForSignature: 'Қол қоюға жіберу',

    // Notifications
    notificationsTitle: 'Хабарландыру орталығы',
    notificationToday: 'Бүгін',
    notificationEarlier: 'Бұрын',

    // Analytics
    analyticsTitle: 'Аналитика және есептер',
    pastureHealthDist: 'Жайылымдар денсаулығының бөлінуі',
    grazingDaysHistory: 'Жайылым күндерінің тарихы',
    incidentsPrevented: 'Алдын алынған қауіпті жағдайлар',
    landEfficiency: 'Азық қорының тиімділігі',

    // Farm
    farmTitle: 'Шаруашылық профилі',
    region: 'Облыс:',
    district: 'Аудан:',
    totalArea: 'Жалпы ауданы:',
    totalLivestock: 'Мал басы:',

    // Settings
    settingsTitle: 'Профиль және жүйе баптаулары',
    langSelector: 'Интерфейс тілі',
    integrations: 'Интеграциялар (әзірленуде)',
    bankIntegration: 'Банктер және несиелеу',
    insuranceIntegration: 'Агро-сақтандыру',
    b2gIntegration: 'Әкімдік B2G субсидиялары',

    // AI Assistant
    askBurmalda: 'Ask Burmalda',
    aiAssistantTitle: 'Burmalda AI Көмекшісі',
    aiPromptPlaceholder: 'Burmalda-дан сұраңыз (мысалы: Табынды қайда көшірген дұрыс?)...',
  },

  en: {
    // Brand
    brandName: 'Burmalda',
    slogan: 'Digital autopilot for Kazakhstan livestock farmers.',
    heroTitle: 'Your herd. Your land. Under control.',
    heroSubtitle: 'Burmalda helps livestock farmers manage pastures, track herds, and prevent dangerous road incidents in one place.',
    startFree: 'Start Free',
    seeHowItWorks: 'See how it works',
    demoMode: 'Launch Demo',
    demoModeActive: 'Demo Mode Active',
    demoBadge: 'Demo data',
    
    // Navigation
    navToday: 'Today',
    navMap: 'Map',
    navPastures: 'Pastures',
    navHerd: 'Herd',
    navTrackers: 'GPS Trackers',
    navSafety: 'Safety',
    navWorkers: 'Shepherds',
    navContracts: 'Contracts',
    navNotifications: 'Notifications',
    navAnalytics: 'Analytics',
    navFarm: 'Farm',
    navSettings: 'Settings',
    navMore: 'More',

    // Today / Farmer's Home
    todayGreeting: 'Good day, Yerlan.',
    todayRecommends: 'Today Burmalda recommends:',
    recMoveHerdTitle: '🌱 Relocate Herd',
    recMoveHerdDesc: 'Pasture #1 is depleting. Recommended target area:',
    recMoveHerdTarget: 'Pasture #3',
    recMoveHerdReserve: 'Feed reserve: 12 days',
    recMoveHerdBtn: 'View Route',
    recAlertTitle: '🚨 Attention Required',
    recAlertDesc: 'Herd #2 is 430m away from highway A-3 danger zone.',
    recAlertBtn: 'Open Map',
    recWorkerTitle: '👨‍🌾 Shepherd',
    recWorkerDesc: 'Contract with Yerlan S. expires in 7 days.',
    recWorkerBtn: 'Open Contract',
    farmStatusTitle: 'All Clear',
    farmStatusLabel: 'Farm overall status:',
    statusGood: '🟢 Good',
    statusMedium: '🟡 Medium',
    statusDepleted: '🔴 Depleted',
    
    // Map
    mapLayerSatellite: 'Satellite',
    mapLayerStreets: 'Streets',
    mapLayerTerrain: 'Terrain',
    mapLegendPastures: 'Pastures',
    mapLegendHerd: 'Herd',
    mapLegendWater: 'Water',
    mapLegendDanger: 'Danger Zones',
    mapPastureCardTitle: 'Pasture',
    mapArea: 'Area:',
    mapFeedReserve: 'Feed reserve:',
    mapWaterAccess: 'Water:',
    mapLastAnalysis: 'Last analysis:',
    mapBtnRoute: 'Show route',
    mapBtnMoveHerd: 'Move herd',
    mapBtnDetails: 'Details',
    mapTrackingMode: 'Live Tracking',
    mapTrackingModeActive: 'Real-time tracking ON',
    
    // Pastures
    pasturesTitle: 'Smart Pastures — Land Management',
    addPastureBtn: '+ Add Pasture',
    pastureTimeline: 'Vegetation timeline (NDVI)',
    days: 'days',
    hectares: 'ha',
    
    // Herd
    herdTitle: 'Herd Management',
    addHerdBtn: '+ Add Herd',
    addAnimalBtn: '+ Add Animal',
    assignShepherdBtn: 'Assign Shepherd',
    animalsCount: 'head',
    shepherd: 'Shepherd',
    location: 'Location',
    statusSafe: '🟢 Safe',
    statusWarning: '🟡 Warning',
    statusDanger: '🔴 Danger',
    
    // Trackers
    trackersTitle: 'GPS Trackers',
    connectTrackerBtn: '+ Connect Tracker',
    lastPing: 'Last ping:',
    battery: 'Battery:',
    pairingStep1: 'Step 1: Enter Device ID',
    pairingStep2: 'Step 2: Select Herd',
    pairingStep3: 'Step 3: Signal Calibration',
    pairingStep4: 'Ready! Tracker connected.',
    
    // Safety
    safetyTitle: 'Herd Safety (Anti-Road Collision)',
    safetySubtitle: 'Monitoring livestock proximity to major highways and railway tracks',
    warningRadius: 'Warning Radius',
    alertChannels: 'Emergency Alert Channels',
    pushChannel: 'Push Notifications',
    smsChannel: 'SMS Alert',
    whatsappChannel: 'WhatsApp Notification',
    
    // Emergency Modal
    emergencyTitle: '🚨 Herd Approaching Road!',
    emergencyDesc: 'Livestock proximity risk detected near highway.',
    distance: 'Distance:',
    speed: 'Speed:',
    direction: 'Direction:',
    callShepherd: 'Call Shepherd',
    
    // Workers / Agro-HR
    workersTitle: 'Find Your Shepherd (Agro-HR)',
    searchWorkerPlaceholder: 'Enter name or district...',
    rating: 'Rating:',
    experience: 'Experience:',
    completedContracts: 'completed contracts',
    viewProfile: 'View Profile',
    proposeJob: 'Propose Job',
    proposeContract: 'Propose Contract',

    // Contracts & AI Lawyer
    contractsTitle: 'Contracts & AI Lawyer',
    createContractBtn: '+ Create Contract (AI Lawyer)',
    activeContracts: 'Active',
    pendingContracts: 'Pending Signature',
    completedContractsTab: 'Completed',
    monthlySalary: '₸ / month',
    aiLawyerTitle: 'Burmalda AI Lawyer',
    aiLawyerSubtitle: 'Generate legally compliant employment contracts in 1 minute',
    aiQuestion1: 'Who will perform the work?',
    aiQuestion2: 'What is the monthly salary?',
    aiQuestion3: 'Specify key shepherd duties:',
    aiContractReady: 'Contract Draft Prepared!',
    aiDisclaimer: 'Automatically generated template. Consult a legal specialist if necessary.',
    downloadContract: 'Download PDF',
    sendForSignature: 'Send for Signature',

    // Notifications
    notificationsTitle: 'Notification Center',
    notificationToday: 'Today',
    notificationEarlier: 'Earlier',

    // Analytics
    analyticsTitle: 'Analytics & Reports',
    pastureHealthDist: 'Pasture Health Distribution',
    grazingDaysHistory: 'Grazing Days History',
    incidentsPrevented: 'Prevented Danger Incidents',
    landEfficiency: 'Feed Reserve Efficiency',

    // Farm
    farmTitle: 'Farm Profile',
    region: 'Region:',
    district: 'District:',
    totalArea: 'Total Area:',
    totalLivestock: 'Livestock:',

    // Settings
    settingsTitle: 'Profile & System Settings',
    langSelector: 'Interface Language',
    integrations: 'Integrations (In Development)',
    bankIntegration: 'Banking & Loans',
    insuranceIntegration: 'Agricultural Insurance',
    b2gIntegration: 'B2G Government Subsidies',

    // AI Assistant
    askBurmalda: 'Ask Burmalda',
    aiAssistantTitle: 'Burmalda AI Assistant',
    aiPromptPlaceholder: 'Ask Burmalda (e.g. Where should I move the herd?)...',
  }
};
