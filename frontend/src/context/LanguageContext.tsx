import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageCode } from '../types';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    tagline: 'From Airport to Recovery — One Platform for Your Medical Journey in India.',
    heroTitle: 'Your Complete Medical Journey in India',
    heroSubtitle: 'Find hospitals, doctors, accommodation and transportation — and plan your medical journey from arrival to recovery in one place.',
    startJourney: 'Start My Medical Journey',
    exploreHospitals: 'Explore Hospitals',
    hospitals: 'Hospitals',
    doctors: 'Doctors',
    treatments: 'Treatments',
    cities: 'Cities',
    hotels: 'Hotels',
    transport: 'Transport',
    howItWorks: 'How It Works',
    aiAssistant: 'MediGuide AI',
    visaGuide: 'Medical Visa',
    documents: 'Documents',
    estimator: 'Cost Estimator',
    reviews: 'Reviews',
    emergency: 'Emergency SOS',
    compare: 'Compare',
    dashboard: 'Dashboard',
    login: 'Login',
    logout: 'Logout',
    rolePatient: 'Patient',
    roleHospital: 'Hospital Coordinator',
    roleHotel: 'Hotel Partner',
    roleTransport: 'Transport Partner',
    roleAdmin: 'Super Admin',
    disclaimerMedical: 'MEDTRAVEL INDIA is an independent medical travel coordination and information platform. It does not provide medical diagnoses, prescribe treatments, or guarantee outcomes. All clinical details and quotations are subject to hospital verification.',
    demoNotice: 'Demo Scenario Active: Ahmed Hossain (Dhaka to Chennai Cardiac Journey)',
  },
  bn: {
    tagline: 'বিমানবন্দর থেকে সুস্থতা — ভারতে আপনার চিকিৎসার একমাত্র সমন্বিত প্ল্যাটফর্ম।',
    heroTitle: 'ভারতে আপনার সম্পূর্ণ চিকিৎসা যাত্রা',
    heroSubtitle: 'হাসপাতাল, চিকিৎসক, আবাসন ও পরিবহন খুঁজুন — আগমন থেকে সুস্থতা পর্যন্ত এক স্থানে পরিকল্পনা করুন।',
    startJourney: 'চিকিৎসা যাত্রা শুরু করুন',
    exploreHospitals: 'হাসপাতাল দেখুন',
    hospitals: 'হাসপাতাল',
    doctors: 'চিকিৎসক',
    treatments: 'চিকিৎসা প্যাকেজ',
    cities: 'শহরসমূহ',
    hotels: 'হোটেল',
    transport: 'পরিবহন',
    howItWorks: 'কীভাবে কাজ করে',
    aiAssistant: 'মেডিগাইড এআই',
    visaGuide: 'মেডিকেল ভিসা',
    documents: 'নথিপত্র',
    estimator: 'খরচের হিসাব',
    reviews: 'মতামত',
    emergency: 'জরুরি সেবা',
    compare: 'তুলনা করুন',
    dashboard: 'ড্যাশবোর্ড',
    login: 'লগইন',
    logout: 'লগআউট',
    rolePatient: 'রোগী',
    roleHospital: 'হাসপাতাল সমন্বয়ক',
    roleHotel: 'হোটেল অংশীদার',
    roleTransport: 'পরিবহন অংশীদার',
    roleAdmin: 'অ্যাডমিন',
    disclaimerMedical: 'মেডট্রাভেল ইন্ডিয়া একটি সমন্বয়কারী তথ্য প্ল্যাটফর্ম। আমরা চিকিৎসা নির্ণয় বা প্রেসক্রিপশন প্রদান করি না। সকল তথ্য হাসপাতালের সরাসরি যাচাই সাপেক্ষে।',
    demoNotice: 'ডেমো দৃশ্য সক্রিয়: আহমেদ হোসেন (ঢাকা থেকে চেন্নাই হার্ট সার্জারি)',
  },
  hi: {
    tagline: 'हवाई अड्डे से स्वास्थ्य लाभ तक — भारत में आपकी चिकित्सा यात्रा का एकल मंच।',
    heroTitle: 'भारत में आपकी सम्पूर्ण चिकित्सा यात्रा',
    heroSubtitle: 'अस्पताल, डॉक्टर, होटल और परिवहन खोजें — और आगमन से लेकर स्वस्थ होने तक अपनी यात्रा की योजना एक ही स्थान पर बनाएं।',
    startJourney: 'मेरी चिकित्सा यात्रा शुरू करें',
    exploreHospitals: 'अस्पताल खोजें',
    hospitals: 'अस्पताल',
    doctors: 'डॉक्टर',
    treatments: 'उपचार',
    cities: 'शहर',
    hotels: 'होटल',
    transport: 'परिवहन',
    howItWorks: 'यह कैसे काम करता है',
    aiAssistant: 'मेडिगाइड एआई',
    visaGuide: 'मेडिकल वीज़ा',
    documents: 'दस्तावेज़',
    estimator: 'लागत अनुमान',
    reviews: 'समीक्षाएं',
    emergency: 'आपातकालीन सहायता',
    compare: 'तुलना करें',
    dashboard: 'डैशबोर्ड',
    login: 'लॉग इन',
    logout: 'लॉग आउट',
    rolePatient: 'मरीज़',
    roleHospital: 'अस्पताल समन्वयक',
    roleHotel: 'होटल पार्टनर',
    roleTransport: 'परिवहन पार्टनर',
    roleAdmin: 'व्यवस्थापक',
    disclaimerMedical: 'मेडट्रैवल इंडिया एक समन्वय और सूचना मंच है। यह चिकित्सा निदान या नुस्खे प्रदान नहीं करता है। सभी उद्धरण अस्पताल के मूल्यांकन के अधीन हैं।',
    demoNotice: 'डेमो परिदृश्य सक्रिय: अहमद हुसैन (ढाका से चेन्नई कार्डियक सर्जरी)',
  },
  ar: {
    tagline: 'من المطار إلى مرحلة التعافي — منصة موحدة لرحلتك العلاجية في الهند.',
    heroTitle: 'رحلتك العلاجية المتكاملة في الهند',
    heroSubtitle: 'ابحث عن المستشفيات والأطباء والإقامة والمواصلات — وخطط لرحلتك العلاجية من الوصول إلى التعافي في مكان واحد.',
    startJourney: 'ابدأ رحلتي العلاجية',
    exploreHospitals: 'استكشف المستشفيات',
    hospitals: 'المستشفيات',
    doctors: 'الأطباء',
    treatments: 'العلاجات',
    cities: 'المدن',
    hotels: 'الفنادق',
    transport: 'المواصلات',
    howItWorks: 'كيف تعمل المنصة',
    aiAssistant: 'المساعد الذكي MediGuide',
    visaGuide: 'تأشيرة العلاج',
    documents: 'المستندات الطبية',
    estimator: 'حاسبة التكاليف',
    reviews: 'آراء المرضى',
    emergency: 'طوارئ SOS',
    compare: 'مقارنة',
    dashboard: 'لوحة التحكم',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    rolePatient: 'المريض',
    roleHospital: 'منسق المستشفى',
    roleHotel: 'شريك الفندق',
    roleTransport: 'شريك المواصلات',
    roleAdmin: 'مدير النظام',
    disclaimerMedical: 'ميدترافل إنديا هي منصة تنسيق ومعلومات سفر طبي مستقلة. لا تقدم المنصة تشخيصات طبية أو تصرف أدوية.',
    demoNotice: 'الحالة التجريبية مفعلة: أحمد حسين (جراحة القلب في تشيناي)',
  },
  fr: {
    tagline: 'De l’aéroport au rétablissement — Une plateforme unique pour votre séjour médical en Inde.',
    heroTitle: 'Votre parcours médical complet en Inde',
    heroSubtitle: 'Trouvez hôpitaux, médecins, hébergement et transport — planifiez votre parcours médical de l’arrivée au rétablissement en un seul endroit.',
    startJourney: 'Commencer mon parcours',
    exploreHospitals: 'Explorer les hôpitaux',
    hospitals: 'Hôpitaux',
    doctors: 'Médecins',
    treatments: 'Traitements',
    cities: 'Villes',
    hotels: 'Hôtels',
    transport: 'Transport',
    howItWorks: 'Comment ça marche',
    aiAssistant: 'Assistant MediGuide IA',
    visaGuide: 'Visa Médical',
    documents: 'Documents',
    estimator: 'Estimateur de coûts',
    reviews: 'Avis',
    emergency: 'Urgences SOS',
    compare: 'Comparer',
    dashboard: 'Tableau de bord',
    login: 'Connexion',
    logout: 'Déconnexion',
    rolePatient: 'Patient',
    roleHospital: 'Coordinateur Hôpital',
    roleHotel: 'Partenaire Hôtel',
    roleTransport: 'Partenaire Transport',
    roleAdmin: 'Super Admin',
    disclaimerMedical: 'MEDTRAVEL INDIA est une plateforme de coordination et d’information. Elle ne pose aucun diagnostic et ne prescrit aucun traitement médical.',
    demoNotice: 'Scénario Démo actif : Ahmed Hossain (Chirurgie cardiaque à Chennai)',
  },
  es: {
    tagline: 'Del aeropuerto a la recuperación — Una plataforma única para su viaje médico a la India.',
    heroTitle: 'Su viaje médico completo en la India',
    heroSubtitle: 'Encuentre hospitales, médicos, alojamiento y transporte — planifique su viaje médico desde la llegada hasta la recuperación en un solo lugar.',
    startJourney: 'Iniciar mi viaje médico',
    exploreHospitals: 'Explorar hospitales',
    hospitals: 'Hospitales',
    doctors: 'Médicos',
    treatments: 'Tratamientos',
    cities: 'Ciudades',
    hotels: 'Hoteles',
    transport: 'Transporte',
    howItWorks: 'Cómo funciona',
    aiAssistant: 'Asistente MediGuide IA',
    visaGuide: 'Visa Médica',
    documents: 'Documentos',
    estimator: 'Estimador de costos',
    reviews: 'Reseñas',
    emergency: 'Emergencias SOS',
    compare: 'Comparar',
    dashboard: 'Panel de control',
    login: 'Iniciar sesión',
    logout: 'Cerrar sesión',
    rolePatient: 'Paciente',
    roleHospital: 'Coordinador Hospital',
    roleHotel: 'Socio Hotel',
    roleTransport: 'Socio Transporte',
    roleAdmin: 'Super Admin',
    disclaimerMedical: 'MEDTRAVEL INDIA es una plataforma de coordinación informativa. No diagnostica enfermedades ni prescribe tratamientos médicos.',
    demoNotice: 'Escenario Demo activo: Ahmed Hossain (Cirugía cardíaca en Chennai)',
  },
  ru: {
    tagline: 'От аэропорта до выздоровления — единая платформа для вашей медицинской поездки в Индию.',
    heroTitle: 'Ваш полный медицинский маршрут в Индии',
    heroSubtitle: 'Найдите клиники, врачей, жилье и транспорт — спланируйте поездку от прилета до реабилитации в одном месте.',
    startJourney: 'Начать медицинский маршрут',
    exploreHospitals: 'Найти клиники',
    hospitals: 'Клиники',
    doctors: 'Врачи',
    treatments: 'Лечение',
    cities: 'Города',
    hotels: 'Отели',
    transport: 'Транспорт',
    howItWorks: 'Как это работает',
    aiAssistant: 'ИИ MediGuide',
    visaGuide: 'Медицинская виза',
    documents: 'Документы',
    estimator: 'Калькулятор стоимости',
    reviews: 'Отзывы',
    emergency: 'Экстренная помощь SOS',
    compare: 'Сравнить',
    dashboard: 'Личный кабинет',
    login: 'Вход',
    logout: 'Выход',
    rolePatient: 'Пациент',
    roleHospital: 'Координатор клиники',
    roleHotel: 'Отель-партнер',
    roleTransport: 'Транспортная служба',
    roleAdmin: 'Администратор',
    disclaimerMedical: 'MEDTRAVEL INDIA — координационная и информационная платформа. Мы не ставим диагнозов и не назначаем лечение.',
    demoNotice: 'Демо-режим активен: Ахмед Хоссейн (Кардиохирургия в Ченнаи)',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    return (localStorage.getItem('medtravel_lang') as LanguageCode) || 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('medtravel_lang', lang);
  };

  const isRTL = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const t = (key: string): string => {
    const langDict = translations[language] || translations.en;
    return langDict[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
