export type UserRole = 'PATIENT' | 'HOSPITAL' | 'HOTEL' | 'TRANSPORT_PARTNER' | 'ADMIN';

export type LanguageCode = 'en' | 'hi' | 'ar' | 'bn' | 'fr' | 'es' | 'ru';
export type CurrencyCode = 'INR' | 'USD' | 'BDT' | 'EUR' | 'AED' | 'GBP';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  country?: string;
  avatar?: string;
  associatedEntityId?: string; // hospitalId, hotelId, etc.
}

export interface EmergencyContactInfo {
  name: string;
  phone: string;
  relationship: string;
}

export interface PatientProfile {
  id: string;
  userId: string;
  fullName: string;
  age: number;
  gender: string;
  country: string;
  phone?: string;
  preferredLanguage?: string;
  passportNumber: string;
  diagnosisOrSymptom: string;
  preferredCity: string;
  budgetRangeMin: number;
  budgetRangeMax: number;
  selectedTreatmentId?: string;
  selectedHospitalId?: string;
  emergencyContact?: EmergencyContactInfo;
  attendants: Attendant[];
  currentJourneyStep: JourneyStep;
}

export interface Attendant {
  id: string;
  fullName: string;
  relationship: string;
  passportNumber: string;
  needsWheelchair?: boolean;
}

export type JourneyStep = 
  | 'DISCOVER' 
  | 'COMPARE' 
  | 'PLAN' 
  | 'TRAVEL' 
  | 'TREAT' 
  | 'RECOVER' 
  | 'RETURN';

export interface Hospital {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  city: string;
  state: string;
  address: string;
  image: string;
  accreditations: ('NABH' | 'JCI' | 'NABL' | 'ISO' | 'Green OT')[];
  establishedYear: number;
  totalBeds: number;
  icuBeds: number;
  specialties: string[];
  popularTreatments: string[];
  languagesSupported: string[];
  distanceAirportKm: number;
  airportDriveMinutes: number;
  approxTreatmentCostRange: {
    minINR: number;
    maxINR: number;
  };
  internationalPatientServices: {
    lounge: boolean;
    dedicatedCoordinator: boolean;
    interpreterAvailable: boolean;
    currencyExchangeDesk: boolean;
    visaInvitationLetters: boolean;
    halalAndDietaryFood: boolean;
    prayerRooms: boolean;
    telemedicineFollowup: boolean;
  };
  nearbyHotelsCount: number;
  transportAvailable: boolean;
  contactEmail: string;
  helplinePhone: string;
  verifiedPartner: boolean;
  ratingScore: number;
  reviewCount: number;
  overview: string;
}

export interface Doctor {
  id: string;
  hospitalId: string;
  hospitalName: string;
  city: string;
  name: string;
  title: string;
  department: string;
  specialty: string;
  areasOfExpertise: string[];
  experienceYears: number;
  languages: string[];
  qualifications: string[];
  consultationAvailability: string;
  avatar: string;
  bio: string;
  verified: boolean;
  consultationFeeINR: number;
}

export interface Treatment {
  id: string;
  name: string;
  category: string;
  averageCostINR: number;
  approxRangeINR: { min: number; max: number };
  usCostUSD: number;
  ukCostGBP: number;
  bangladeshCostBDT: number;
  typicalHospitalStayDays: number;
  typicalCityStayDays: number;
  description: string;
  commonIndications: string[];
  preOpDiagnostics: string[];
  recoveryHighlights: string;
}

export type QuotationStatus = 
  | 'Draft' 
  | 'Submitted' 
  | 'Under Review' 
  | 'Hospital Responded' 
  | 'Consultation Scheduled' 
  | 'Completed' 
  | 'Cancelled';

export interface QuotationRequest {
  id: string;
  patientId: string;
  patientName: string;
  patientCountry: string;
  patientEmail: string;
  patientPhone: string;
  hospitalId: string;
  hospitalName: string;
  treatmentName: string;
  preferredDate: string;
  attendantCount: number;
  notes: string;
  documentIds: string[];
  sharedWithHospitalConsent: boolean;
  status: QuotationStatus;
  submissionDate: string;
  scheduledConsultation?: {
    date: string;
    time: string;
    doctorName: string;
    meetingPlatform?: string;
  };
  quotationDetails?: {
    estimatedPackageCostINR: number;
    estimatedHospitalStayDays: number;
    expectedIcuDays: number;
    validityDays: number;
    attendingDoctor: string;
    inclusions: string[];
    exclusions: string[];
    invitationLetterReady: boolean;
    responseDate: string;
    coordinatorNotes: string;
  };
}

export type DocumentCategory = 
  | 'Medical Report'
  | 'Medical report'
  | 'Medical reports'
  | 'Prescription'
  | 'Prescriptions'
  | 'Scan / Imaging'
  | 'Scan/report'
  | 'Imaging'
  | 'Blood reports'
  | 'Passport'
  | 'Visa documents'
  | 'Other document'
  | 'Other';

export interface MedicalDocument {
  id: string;
  patientId: string;
  title: string;
  category: DocumentCategory;
  fileName: string;
  fileSize: string;
  fileType: string;
  uploadDate: string;
  status: 'VERIFIED' | 'UNDER_REVIEW';
  previewUrl?: string;
  hospitalSharedWith?: string[];
  isSharedWithHospitalConsent: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
  nearestHospitalId: string;
  nearestHospitalName: string;
  distanceToHospitalKm: number;
  address: string;
  image: string;
  category: 'Budget Guesthouse' | '3-Star Standard' | '4-Star Premium' | 'Serviced Medical Apartment';
  pricePerNightINR: number;
  ratingScore: number;
  reviewsCount: number;
  isVerifiedPartner: boolean;
  medicalPatientFriendlyFeatures: {
    wheelchairAccessible: boolean;
    elevator: boolean;
    kitchenetteAvailable: boolean;
    halalDietaryCustomization: boolean;
    nurseOnCall: boolean;
    hospitalShuttle: boolean;
    flexibleCancellation: boolean;
  };
  contactPhone: string;
}

export interface TransportBooking {
  id: string;
  patientName: string;
  serviceType: 'AIRPORT_PICKUP' | 'AIRPORT_DROP' | 'HOTEL_TO_HOSPITAL' | 'FULL_STAY_DEDICATED';
  pickupLocation: string;
  dropLocation: string;
  date: string;
  time: string;
  passengers: number;
  vehicleType: 'Executive Sedan' | 'Wheelchair-Accessible Van' | 'Toyota Innova MPV' | 'Non-Emergency Patient Ambulance';
  flightNumber?: string;
  status: 'CONFIRMED' | 'IN_TRANSIT' | 'COMPLETED';
  estimatedCostINR: number;
  partnerName: string;
  driverName?: string;
  driverPhone?: string;
}

export interface TravelTimelineItem {
  id: string;
  phase: '30_DAYS_BEFORE' | '20_DAYS_BEFORE' | '10_DAYS_BEFORE' | 'ARRIVAL' | 'TREATMENT' | 'RECOVERY' | 'RETURN';
  phaseTitle: string;
  phaseSubtitle: string;
  tasks: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    mandatory: boolean;
    category: 'MEDICAL' | 'VISA' | 'TRAVEL' | 'STAY' | 'FOLLOWUP';
  }[];
}

export interface CityGuide {
  id: string;
  name: string;
  state: string;
  airportName: string;
  airportCode: string;
  airportToCenterKm: number;
  topSpecialties: string[];
  knownFor: string;
  languagesCommon: string[];
  climateNote: string;
  approxDailyLivingINR: number;
  image: string;
  hospitalCount: number;
  verifiedHotelsCount: number;
}

export interface ReviewItem {
  id: string;
  authorName: string;
  country: string;
  date: string;
  category: 'HOSPITAL_SERVICE' | 'HOTEL' | 'TRANSPORT' | 'COORDINATION';
  targetName: string;
  rating: number;
  content: string;
  isVerifiedStay: boolean;
  moderationStatus: 'APPROVED' | 'PENDING' | 'REJECTED';
}

export interface EmergencyCenter {
  id: string;
  city: string;
  hospitalName: string;
  address: string;
  emergencyPhone: string;
  ambulanceDirectPhone: string;
  intlPatientHelpline: string;
  traumaLevel: string;
}

export interface InAppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  category: 'HOSPITAL_REQUEST' | 'CONSULTATION' | 'TRAVEL' | 'HOTEL' | 'VISA';
  linkTab?: string;
}
