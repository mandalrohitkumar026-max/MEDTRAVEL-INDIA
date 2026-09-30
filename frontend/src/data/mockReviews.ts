import { ReviewItem, EmergencyCenter } from '../types';

export const mockReviews: ReviewItem[] = [
  {
    id: 'rev-1',
    authorName: 'Mohammad Faruk',
    country: 'Bangladesh (Dhaka)',
    date: '2026-08-14',
    category: 'HOSPITAL_SERVICE',
    targetName: 'Apollo Hospitals, Greams Road (Chennai)',
    rating: 5,
    content: 'The International Patient Lounge in Chennai made coordination very smooth. The language assistant helped my mother communicate in Bengali with the nursing staff, and airport pickup was waiting right outside arrival gate 4.',
    isVerifiedStay: true,
    moderationStatus: 'APPROVED',
  },
  {
    id: 'rev-2',
    authorName: 'Salma Al-Harbi',
    country: 'Oman (Muscat)',
    date: '2026-07-28',
    category: 'COORDINATION',
    targetName: 'MEDTRAVEL INDIA Concierge',
    rating: 5,
    content: 'Obtained our hospital quotation within 24 hours. The cost estimate calculator matched our actual final invoice within 5% variance. Having a clear checklist beforehand eliminated so much stress.',
    isVerifiedStay: true,
    moderationStatus: 'APPROVED',
  },
  {
    id: 'rev-3',
    authorName: 'Jean-Paul Ndong',
    country: 'Cameroon (Douala)',
    date: '2026-06-19',
    category: 'HOTEL',
    targetName: 'Lemon Tree Hotel, Chennai',
    rating: 4,
    content: 'Very patient-friendly hotel. The elevator was wide enough for a wheelchair, and the restaurant kitchen cooked soft, non-spicy meals as requested for post-surgery recovery.',
    isVerifiedStay: true,
    moderationStatus: 'APPROVED',
  },
  {
    id: 'rev-4',
    authorName: 'Tariq Rahman',
    country: 'Bangladesh (Chittagong)',
    date: '2026-08-02',
    category: 'TRANSPORT',
    targetName: 'MedRoute Chauffeur Services',
    rating: 5,
    content: 'Our flight landed at 2:00 AM in Chennai. The driver held a name board, assisted with three heavy luggage bags, and drove smoothly directly to Greams Road.',
    isVerifiedStay: true,
    moderationStatus: 'APPROVED',
  }
];

export const mockEmergencyCenters: EmergencyCenter[] = [
  {
    id: 'emg-chennai-apollo',
    city: 'Chennai',
    hospitalName: 'Apollo Main Emergency & Trauma Centre',
    address: '21 Greams Lane, Thousand Lights, Chennai 600006',
    emergencyPhone: '+91 44 2829 0200 / 1066',
    ambulanceDirectPhone: '1066 (Apollo Emergency 24/7)',
    intlPatientHelpline: '+91 44 2829 3333',
    traumaLevel: 'Level 1 Quaternary Trauma & Chest Pain Unit',
  },
  {
    id: 'emg-delhi-fortis',
    city: 'Delhi NCR',
    hospitalName: 'Fortis Memorial Emergency Centre',
    address: 'Sector 44, Gurugram, Delhi NCR 122002',
    emergencyPhone: '+91 124 496 2200 / 105010',
    ambulanceDirectPhone: '105010 (Fortis Emergency Response)',
    intlPatientHelpline: '+91 124 496 2300',
    traumaLevel: 'Level 1 24/7 Advanced Resuscitation Bay',
  },
  {
    id: 'emg-mumbai-kokilaben',
    city: 'Mumbai',
    hospitalName: 'Kokilaben Emergency Medical Services (EMS)',
    address: 'Four Bungalows, Andheri West, Mumbai 400053',
    emergencyPhone: '+91 22 4269 9999',
    ambulanceDirectPhone: '+91 22 4269 6969',
    intlPatientHelpline: '+91 22 4269 7777',
    traumaLevel: 'Level 1 Comprehensive Stroke & Cardiac Hub',
  },
  {
    id: 'emg-bangalore-narayana',
    city: 'Bengaluru',
    hospitalName: 'Narayana Health Emergency & Cardiac Casualty',
    address: 'Bommasandra Industrial Area, Anekal Taluk, Bengaluru 560099',
    emergencyPhone: '+91 80 7122 2222',
    ambulanceDirectPhone: '+91 80 2783 5000',
    intlPatientHelpline: '+91 80 7122 2500',
    traumaLevel: 'Level 1 High-Capacity Casualty',
  }
];

export const mockNationalEmergencyContacts = [
  { name: 'National Universal Emergency (Police, Fire, Ambulance)', number: '112' },
  { name: 'National Medical Ambulance Helpline', number: '108 / 102' },
  { name: 'Foreigners Regional Registration Office (FRRO) Support', number: '+91 11 2671 1443' },
  { name: 'Tourist / Medical Travel Helpline (Ministry of Tourism)', number: '1363 / 1800 11 1363' }
];
