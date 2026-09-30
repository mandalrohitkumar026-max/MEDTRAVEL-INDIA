import { PatientProfile, QuotationRequest, MedicalDocument, TransportBooking, TravelTimelineItem } from '../types';

export const mockAhmedProfile: PatientProfile = {
  id: 'patient-ahmed-001',
  userId: 'user-ahmed',
  fullName: 'Ahmed Hossain',
  age: 54,
  gender: 'Male',
  country: 'Bangladesh',
  phone: '+880 1711 000000',
  preferredLanguage: 'Bengali (Primary), English',
  passportNumber: 'A08291482',
  diagnosisOrSymptom: 'Triple Vessel Coronary Artery Disease with effort angina; recommended for elective CABG.',
  preferredCity: 'Chennai',
  budgetRangeMin: 500000,
  budgetRangeMax: 800000,
  selectedTreatmentId: 'treat-cabg',
  selectedHospitalId: 'hosp-apollo-chennai',
  emergencyContact: {
    name: 'Nasreen Hossain',
    phone: '+880 1711 000000',
    relationship: 'Spouse',
  },
  currentJourneyStep: 'TRAVEL',
  attendants: [
    {
      id: 'att-1',
      fullName: 'Nasreen Hossain',
      relationship: 'Spouse',
      passportNumber: 'B09482711',
      needsWheelchair: false,
    },
    {
      id: 'att-2',
      fullName: 'Tanvir Hossain',
      relationship: 'Son / Caregiver',
      passportNumber: 'C03829104',
      needsWheelchair: false,
    }
  ],
};

export const mockAhmedQuotation: QuotationRequest = {
  id: 'quote-apollo-ahmed-882',
  patientId: 'patient-ahmed-001',
  patientName: 'Ahmed Hossain',
  patientCountry: 'Bangladesh',
  patientEmail: 'ahmed.hossain@demo.bd',
  patientPhone: '+880 1711 000000',
  hospitalId: 'hosp-apollo-chennai',
  hospitalName: 'Apollo Hospitals, Greams Road',
  treatmentName: 'Coronary Artery Bypass Grafting (CABG - 3 Grafts)',
  preferredDate: '2026-10-15',
  attendantCount: 2,
  notes: 'Patient experiences mild chest discomfort on climbing stairs. Angiogram CD and Echo report attached.',
  documentIds: ['doc-1', 'doc-2', 'doc-3'],
  sharedWithHospitalConsent: true,
  status: 'Hospital Responded',
  submissionDate: '2026-09-18',
  scheduledConsultation: {
    date: '2026-10-15',
    time: '10:30 AM IST',
    doctorName: 'Dr. Ramesh Sundaram (Chief CTVS)',
    meetingPlatform: 'In-Person Consultation (Apollo Greams Road International Lounge Desk 3)'
  },
  quotationDetails: {
    estimatedPackageCostINR: 420000,
    estimatedHospitalStayDays: 6,
    expectedIcuDays: 2,
    validityDays: 45,
    attendingDoctor: 'Dr. Ramesh Sundaram (Chief CTVS)',
    inclusions: [
      'Surgeon, Anesthetist & Perfusionist consultation fees',
      'Operating Theatre charges & cardiopulmonary bypass disposables',
      '2 Nights Cardiothoracic ICU bed & monitoring',
      '4 Nights Private Room accommodation with nursing',
      'Routine post-op pathology & biochemistry checks',
      'Dedicated Bengali speaking hospital liaison coordinator'
    ],
    exclusions: [
      'Special blood bank components if unanticipated transfusion required',
      'Stay beyond 6 days due to pre-existing comorbidities',
      'External medications prescribed upon hospital discharge'
    ],
    invitationLetterReady: true,
    responseDate: '2026-09-20',
    coordinatorNotes: 'Official Hospital Visa Invitation Letter (VIL) has been digitally generated and transmitted to the Indian High Commission in Dhaka.',
  }
};

export const mockAhmedDocuments: MedicalDocument[] = [
  {
    id: 'doc-1',
    patientId: 'patient-ahmed-001',
    title: 'Coronary Angiogram Summary Report',
    category: 'Medical reports',
    fileName: 'Angiogram_Summary_DhakaHeartInstitute.pdf',
    fileSize: '2.4 MB',
    fileType: 'application/pdf',
    uploadDate: '2026-09-15',
    status: 'VERIFIED',
    hospitalSharedWith: ['hosp-apollo-chennai'],
    isSharedWithHospitalConsent: true,
  },
  {
    id: 'doc-2',
    patientId: 'patient-ahmed-001',
    title: 'Transthoracic 2D Echocardiogram Study',
    category: 'Imaging',
    fileName: 'Echo_Report_LVEF_50_Percent.pdf',
    fileSize: '1.8 MB',
    fileType: 'application/pdf',
    uploadDate: '2026-09-15',
    status: 'VERIFIED',
    hospitalSharedWith: ['hosp-apollo-chennai'],
    isSharedWithHospitalConsent: true,
  },
  {
    id: 'doc-3',
    patientId: 'patient-ahmed-001',
    title: 'Current Cardiac Medication Prescription',
    category: 'Prescriptions',
    fileName: 'Cardiology_Prescription_Sept2026.pdf',
    fileSize: '820 KB',
    fileType: 'application/pdf',
    uploadDate: '2026-09-16',
    status: 'VERIFIED',
    hospitalSharedWith: ['hosp-apollo-chennai'],
    isSharedWithHospitalConsent: true,
  },
  {
    id: 'doc-4',
    patientId: 'patient-ahmed-001',
    title: 'Ahmed Hossain Passport Front & Back',
    category: 'Passport',
    fileName: 'Passport_Ahmed_A08291482.pdf',
    fileSize: '3.1 MB',
    fileType: 'application/pdf',
    uploadDate: '2026-09-14',
    status: 'VERIFIED',
    hospitalSharedWith: ['hosp-apollo-chennai'],
    isSharedWithHospitalConsent: true,
  },
  {
    id: 'doc-5',
    patientId: 'patient-ahmed-001',
    title: 'Apollo Hospitals Visa Invitation Letter',
    category: 'Visa documents',
    fileName: 'Apollo_VIL_Ref_AH_2026.pdf',
    fileSize: '1.2 MB',
    fileType: 'application/pdf',
    uploadDate: '2026-09-20',
    status: 'VERIFIED',
    hospitalSharedWith: ['hosp-apollo-chennai'],
    isSharedWithHospitalConsent: true,
  }
];

export const mockAhmedBookingTransport: TransportBooking = {
  id: 'bk-trans-101',
  patientName: 'Ahmed Hossain',
  serviceType: 'AIRPORT_PICKUP',
  pickupLocation: 'Chennai International Airport (Terminal 4 Intl Arrivals)',
  dropLocation: 'Lemon Tree Hotel / Greams Road, Chennai',
  date: '2026-10-14',
  time: '14:30 IST',
  passengers: 3,
  vehicleType: 'Toyota Innova MPV',
  flightNumber: 'BS 205 (US-Bangla Dhaka to Chennai)',
  status: 'CONFIRMED',
  estimatedCostINR: 1500,
  partnerName: 'MedRoute Chauffeur Services',
  driverName: 'S. Murugan (Speaks English & Basic Bengali)',
  driverPhone: '+91 94440 88219'
};

export const mockAhmedTimeline: TravelTimelineItem[] = [
  {
    id: 'ph-1',
    phase: '30_DAYS_BEFORE',
    phaseTitle: '30 Days Before: Initial Decision & Quotation',
    phaseSubtitle: 'Identify medical requirements and request hospital quotation',
    tasks: [
      { id: 't-1', title: 'Select treatment (Coronary Artery Bypass)', description: 'Identified CABG necessity based on local cardiology advice in Dhaka.', completed: true, mandatory: true, category: 'MEDICAL' },
      { id: 't-2', title: 'Compare accredited Chennai hospitals', description: 'Evaluated Apollo Greams Road, MIOT, and MGM Healthcare.', completed: true, mandatory: true, category: 'MEDICAL' },
      { id: 't-3', title: 'Upload Angiogram & 2D Echo reports', description: 'Uploaded 3 diagnostic files to secure hospital document portal.', completed: true, mandatory: true, category: 'MEDICAL' },
      { id: 't-4', title: 'Receive verified hospital quotation', description: 'Apollo Hospitals provided an itemized ₹4,20,000 estimate package.', completed: true, mandatory: true, category: 'MEDICAL' }
    ]
  },
  {
    id: 'ph-2',
    phase: '20_DAYS_BEFORE',
    phaseTitle: '20 Days Before: Medical Visa & Flights',
    phaseSubtitle: 'Government clearance and travel arrangements',
    tasks: [
      { id: 't-5', title: 'Hospital Visa Invitation Letter (VIL) Issued', description: 'Received hospital stamped letter for patient and 2 attendants.', completed: true, mandatory: true, category: 'VISA' },
      { id: 't-6', title: 'Apply for Indian e-Medical Visa online', description: 'Submitted online via indianvisaonline.gov.in.', completed: true, mandatory: true, category: 'VISA' },
      { id: 't-7', title: 'Electronic Travel Authorization (ETA) Approved', description: 'Triple entry medical visa granted for 60 days.', completed: true, mandatory: true, category: 'VISA' },
      { id: 't-8', title: 'Book Return Flight (Dhaka - Chennai)', description: 'US-Bangla Airlines Flight BS-205 confirmed for Oct 14.', completed: true, mandatory: true, category: 'TRAVEL' }
    ]
  },
  {
    id: 'ph-3',
    phase: '10_DAYS_BEFORE',
    phaseTitle: '10 Days Before: Accommodation & Logistics',
    phaseSubtitle: 'Finalize lodging and hospital coordination',
    tasks: [
      { id: 't-9', title: 'Reserve Hotel Near Apollo (Lemon Tree)', description: 'Family suite reserved 2.1 km from hospital with kitchen amenities.', completed: true, mandatory: true, category: 'STAY' },
      { id: 't-10', title: 'Schedule Airport Pickup Chauffeur', description: 'Toyota Innova booked with driver Murugan for luggage & wheelchair support.', completed: true, mandatory: true, category: 'TRAVEL' },
      { id: 't-11', title: 'Confirm Initial Hospital Consultation', description: 'Appointment confirmed with Dr. Ramesh Sundaram for Oct 15 at 10:30 AM.', completed: true, mandatory: true, category: 'MEDICAL' }
    ]
  },
  {
    id: 'ph-4',
    phase: 'ARRIVAL',
    phaseTitle: 'Arrival & Pre-Op Workup',
    phaseSubtitle: 'Airport reception, hotel check-in and hospital admission',
    tasks: [
      { id: 't-12', title: 'Airport meet & greet at Chennai T4', description: 'Driver meets party at international arrivals exit.', completed: false, mandatory: true, category: 'TRAVEL' },
      { id: 't-13', title: 'Hotel check-in & rest', description: 'Check into hotel and organize medical records binder.', completed: false, mandatory: true, category: 'STAY' },
      { id: 't-14', title: 'In-person consultation with Chief Surgeon', description: 'Review repeat non-invasive vitals and confirm surgery schedule.', completed: false, mandatory: true, category: 'MEDICAL' }
    ]
  },
  {
    id: 'ph-5',
    phase: 'TREATMENT',
    phaseTitle: 'Surgical Treatment & Inpatient Stay',
    phaseSubtitle: 'Scheduled procedure and hospital recovery',
    tasks: [
      { id: 't-15', title: 'Hospital admission & pre-op preparation', description: 'Admission to surgical ward, pre-anesthetic clearance.', completed: false, mandatory: true, category: 'MEDICAL' },
      { id: 't-16', title: 'Coronary Artery Bypass Grafting procedure', description: 'Surgical intervention performed in modular cardiac OT.', completed: false, mandatory: true, category: 'MEDICAL' },
      { id: 't-17', title: 'ICU to Step-Down Ward Transition', description: 'Post-op monitoring, extubation, and initial cardiac rehab ambulation.', completed: false, mandatory: true, category: 'MEDICAL' }
    ]
  },
  {
    id: 'ph-6',
    phase: 'RECOVERY',
    phaseTitle: 'Recovery & Post-Discharge Monitoring',
    phaseSubtitle: 'Hotel convalescence and follow-up checks',
    tasks: [
      { id: 't-18', title: 'Hospital discharge to hotel', description: 'Discharge summary, take-home medication counseling, and wound care guide.', completed: false, mandatory: true, category: 'FOLLOWUP' },
      { id: 't-19', title: 'Day 7 surgical wound review', description: 'Suture line inspection and chest physiotherapy follow-up.', completed: false, mandatory: true, category: 'FOLLOWUP' },
      { id: 't-20', title: 'Day 12 Final clearance & Fit-to-Fly certificate', description: 'Final ECG, medication titration, and airline medical clearance.', completed: false, mandatory: true, category: 'FOLLOWUP' }
    ]
  },
  {
    id: 'ph-7',
    phase: 'RETURN',
    phaseTitle: 'Return Home & Telemedicine Continuity',
    phaseSubtitle: 'Safe flight home and long-term care bridge',
    tasks: [
      { id: 't-21', title: 'Airport transfer from hotel to Chennai airport', description: 'Wheelchair assistance coordinated at airport check-in counter.', completed: false, mandatory: true, category: 'TRAVEL' },
      { id: 't-22', title: 'Arrival back in Dhaka', description: 'Transition care to local primary cardiologist with Apollo discharge summary.', completed: false, mandatory: true, category: 'FOLLOWUP' },
      { id: 't-23', title: '30-Day Follow-up Teleconsultation', description: 'Online video check-in with Dr. Ramesh Sundaram via patient portal.', completed: false, mandatory: true, category: 'FOLLOWUP' }
    ]
  }
];
