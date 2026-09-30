import React, { createContext, useContext, useState } from 'react';
import { 
  PatientProfile, 
  QuotationRequest, 
  QuotationStatus,
  MedicalDocument, 
  TransportBooking, 
  TravelTimelineItem,
  Attendant,
  DocumentCategory,
  InAppNotification,
  Hospital,
  Treatment,
  Doctor,
  Hotel
} from '../types';
import { 
  mockAhmedProfile, 
  mockAhmedQuotation, 
  mockAhmedDocuments, 
  mockAhmedBookingTransport, 
  mockAhmedTimeline 
} from '../data/mockDemoUser';
import { mockHospitals } from '../data/mockHospitals';
import { mockTreatments } from '../data/mockTreatments';
import { mockDoctors } from '../data/mockDoctors';
import { mockHotels } from '../data/mockHotels';
import { mockTransportOptions, TransportServiceOption } from '../data/mockTransports';

interface JourneyContextType {
  profile: PatientProfile;
  quotations: QuotationRequest[];
  documents: MedicalDocument[];
  transportBookings: TransportBooking[];
  timeline: TravelTimelineItem[];
  notifications: InAppNotification[];
  // Platform Shared Catalogs
  hospitals: Hospital[];
  treatments: Treatment[];
  doctors: Doctor[];
  hotels: Hotel[];
  transports: TransportServiceOption[];
  // Hospital CRUD
  addHospital: (hospital: Hospital) => void;
  updateHospital: (id: string, updates: Partial<Hospital>) => void;
  deleteHospital: (id: string) => void;
  // Treatment CRUD
  addTreatment: (treatment: Treatment) => void;
  updateTreatment: (id: string, updates: Partial<Treatment>) => void;
  deleteTreatment: (id: string) => void;
  // Profile & Attendants
  updateProfile: (updates: Partial<PatientProfile>) => void;
  addAttendant: (attendant: Omit<Attendant, 'id'>) => void;
  removeAttendant: (id: string) => void;
  // Quotations
  addQuotationRequest: (newReq: Omit<QuotationRequest, 'id' | 'submissionDate' | 'status'>) => string;
  updateQuotationStatus: (id: string, status: QuotationStatus) => void;
  scheduleHospitalAppointment: (id: string, appointment: { date: string; time: string; doctorName: string; meetingPlatform?: string }) => void;
  // Documents
  uploadDocument: (doc: { 
    title: string; 
    category: DocumentCategory; 
    fileName: string; 
    fileSize: string;
    patientId?: string;
    isSharedWithHospitalConsent?: boolean;
  }) => void;
  deleteDocument: (id: string) => void;
  toggleDocumentConsent: (id: string) => void;
  // Transport
  addTransportBooking: (booking: Omit<TransportBooking, 'id' | 'status'>) => void;
  // Timeline
  toggleTaskCompletion: (phaseId: string, taskId: string) => void;
  // Notifications
  markNotificationAsRead: (id: string) => void;
  addNotification: (notif: Omit<InAppNotification, 'id' | 'timestamp' | 'read'>) => void;
  // Reset demo
  resetDemoData: () => void;
}

const defaultNotifications: InAppNotification[] = [
  {
    id: 'notif-1',
    title: 'Hospital Quotation & VIL Received',
    message: 'Apollo Hospitals Greams Road has transmitted your ₹4,20,000 CABG package estimate with official Visa Invitation Letter.',
    timestamp: '2 hours ago',
    read: false,
    category: 'HOSPITAL_REQUEST',
    linkTab: 'patient-dashboard'
  },
  {
    id: 'notif-2',
    title: 'Consultation Scheduled',
    message: 'Initial surgical workup confirmed with Dr. Ramesh Sundaram for 15 Oct, 10:30 AM IST.',
    timestamp: '1 day ago',
    read: false,
    category: 'CONSULTATION',
    linkTab: 'patient-dashboard'
  },
  {
    id: 'notif-3',
    title: 'Airport Chauffeur Assigned',
    message: 'MedRoute driver S. Murugan assigned for arrival flight BS-205 pickup at Chennai Terminal 4.',
    timestamp: '2 days ago',
    read: true,
    category: 'TRAVEL',
    linkTab: 'transport'
  }
];

const JourneyContext = createContext<JourneyContextType | undefined>(undefined);

export const JourneyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<PatientProfile>(mockAhmedProfile);
  const [quotations, setQuotations] = useState<QuotationRequest[]>([mockAhmedQuotation]);
  const [documents, setDocuments] = useState<MedicalDocument[]>(mockAhmedDocuments);
  const [transportBookings, setTransportBookings] = useState<TransportBooking[]>([mockAhmedBookingTransport]);
  const [timeline, setTimeline] = useState<TravelTimelineItem[]>(mockAhmedTimeline);
  const [notifications, setNotifications] = useState<InAppNotification[]>(defaultNotifications);

  // Platform Catalog State
  const [hospitals, setHospitals] = useState<Hospital[]>(mockHospitals);
  const [treatments, setTreatments] = useState<Treatment[]>(mockTreatments);
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
  const [hotels, setHotels] = useState<Hotel[]>(mockHotels);
  const [transports, setTransports] = useState<TransportServiceOption[]>(mockTransportOptions);

  const addHospital = (hosp: Hospital) => {
    setHospitals((prev) => [hosp, ...prev]);
    addNotification({
      title: 'Hospital Added to Directory',
      message: `${hosp.name} (${hosp.city}) has been added to the platform directory.`,
      category: 'HOSPITAL_REQUEST',
      linkTab: 'hospitals',
    });
  };

  const updateHospital = (id: string, updates: Partial<Hospital>) => {
    setHospitals((prev) => prev.map((h) => (h.id === id ? { ...h, ...updates } : h)));
  };

  const deleteHospital = (id: string) => {
    setHospitals((prev) => prev.filter((h) => h.id !== id));
  };

  const addTreatment = (treat: Treatment) => {
    setTreatments((prev) => [treat, ...prev]);
    addNotification({
      title: 'New Treatment Added',
      message: `${treat.name} (${treat.category}) has been added to standard packages.`,
      category: 'HOSPITAL_REQUEST',
      linkTab: 'treatments',
    });
  };

  const updateTreatment = (id: string, updates: Partial<Treatment>) => {
    setTreatments((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  };

  const deleteTreatment = (id: string) => {
    setTreatments((prev) => prev.filter((t) => t.id !== id));
  };

  const updateProfile = (updates: Partial<PatientProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const addAttendant = (attendant: Omit<Attendant, 'id'>) => {
    const newAtt: Attendant = {
      ...attendant,
      id: `att-${Date.now()}`,
    };
    setProfile((prev) => ({
      ...prev,
      attendants: [...prev.attendants, newAtt],
    }));
  };

  const removeAttendant = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      attendants: prev.attendants.filter((a) => a.id !== id),
    }));
  };

  const addNotification = (notif: Omit<InAppNotification, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: InAppNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const addQuotationRequest = (newReq: Omit<QuotationRequest, 'id' | 'submissionDate' | 'status'>) => {
    const id = `quote-${Date.now()}`;
    const created: QuotationRequest = {
      ...newReq,
      id,
      status: 'Submitted',
      submissionDate: new Date().toISOString().split('T')[0],
      quotationDetails: {
        estimatedPackageCostINR: 450000,
        estimatedHospitalStayDays: 5,
        expectedIcuDays: 2,
        validityDays: 30,
        attendingDoctor: 'Senior Quaternary Panel Specialist',
        inclusions: [
          'Pre-operative screening & surgical team fee',
          'Intensive Care Unit stay and monitoring',
          'Standard room ward charges and standard nursing',
          'Hospital discharge medications and summary'
        ],
        exclusions: ['Unanticipated medical complications', 'Special non-formulary medications'],
        invitationLetterReady: true,
        responseDate: new Date().toISOString().split('T')[0],
        coordinatorNotes: 'Estimated package subject to physical evaluation upon admission.',
      }
    };
    setQuotations((prev) => [created, ...prev]);

    // Send immediate in-app notification
    addNotification({
      title: 'Hospital Request Submitted',
      message: `Your consultation and quotation inquiry has been delivered to ${newReq.hospitalName}.`,
      category: 'HOSPITAL_REQUEST',
      linkTab: 'patient-dashboard',
    });

    return id;
  };

  const updateQuotationStatus = (id: string, status: QuotationStatus) => {
    setQuotations((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status } : q))
    );

    addNotification({
      title: `Request Status Updated: ${status}`,
      message: `Your hospital inquiry status changed to "${status}".`,
      category: 'HOSPITAL_REQUEST',
      linkTab: 'patient-dashboard',
    });
  };

  const scheduleHospitalAppointment = (
    id: string, 
    appointment: { date: string; time: string; doctorName: string; meetingPlatform?: string }
  ) => {
    setQuotations((prev) =>
      prev.map((q) => (q.id === id ? {
        ...q,
        status: 'Consultation Scheduled',
        scheduledConsultation: appointment
      } : q))
    );

    addNotification({
      title: 'Consultation Scheduled',
      message: `Appointment confirmed with ${appointment.doctorName} for ${appointment.date} at ${appointment.time}.`,
      category: 'CONSULTATION',
      linkTab: 'patient-dashboard',
    });
  };

  const uploadDocument = (doc: { 
    title: string; 
    category: DocumentCategory; 
    fileName: string; 
    fileSize: string;
    patientId?: string;
    isSharedWithHospitalConsent?: boolean;
  }) => {
    const ext = doc.fileName.toLowerCase();
    let fileType = 'application/pdf';
    if (ext.endsWith('.png')) fileType = 'image/png';
    else if (ext.endsWith('.jpg') || ext.endsWith('.jpeg')) fileType = 'image/jpeg';
    else if (ext.endsWith('.dcm') || ext.endsWith('.dicom')) fileType = 'application/dicom';

    const newDoc: MedicalDocument = {
      id: `doc-${Date.now()}`,
      patientId: doc.patientId || profile.id,
      title: doc.title,
      category: doc.category,
      fileName: doc.fileName,
      fileSize: doc.fileSize,
      fileType,
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'VERIFIED',
      hospitalSharedWith: [profile.selectedHospitalId || 'hosp-apollo-chennai'],
      isSharedWithHospitalConsent: doc.isSharedWithHospitalConsent ?? true,
    };
    setDocuments((prev) => [newDoc, ...prev]);
  };

  const toggleDocumentConsent = (id: string) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isSharedWithHospitalConsent: !d.isSharedWithHospitalConsent } : d))
    );
  };

  const deleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  const addTransportBooking = (booking: Omit<TransportBooking, 'id' | 'status'>) => {
    const newBooking: TransportBooking = {
      ...booking,
      id: `bk-trans-${Date.now()}`,
      status: 'CONFIRMED'
    };
    setTransportBookings((prev) => [newBooking, ...prev]);

    addNotification({
      title: 'Transport Booking Confirmed',
      message: `${booking.serviceType.replace(/_/g, ' ')} scheduled for ${booking.date} at ${booking.time}.`,
      category: 'TRAVEL',
      linkTab: 'transport',
    });
  };

  const toggleTaskCompletion = (phaseId: string, taskId: string) => {
    setTimeline((prev) =>
      prev.map((phase) => {
        if (phase.id !== phaseId) return phase;
        return {
          ...phase,
          tasks: phase.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          ),
        };
      })
    );
  };

  const resetDemoData = () => {
    setProfile(mockAhmedProfile);
    setQuotations([mockAhmedQuotation]);
    setDocuments(mockAhmedDocuments);
    setTransportBookings([mockAhmedBookingTransport]);
    setTimeline(mockAhmedTimeline);
    setNotifications(defaultNotifications);
    setHospitals(mockHospitals);
    setTreatments(mockTreatments);
    setDoctors(mockDoctors);
    setHotels(mockHotels);
    setTransports(mockTransportOptions);
  };

  return (
    <JourneyContext.Provider
      value={{
        profile,
        quotations,
        documents,
        transportBookings,
        timeline,
        notifications,
        hospitals,
        treatments,
        doctors,
        hotels,
        transports,
        addHospital,
        updateHospital,
        deleteHospital,
        addTreatment,
        updateTreatment,
        deleteTreatment,
        updateProfile,
        addAttendant,
        removeAttendant,
        addQuotationRequest,
        updateQuotationStatus,
        scheduleHospitalAppointment,
        uploadDocument,
        deleteDocument,
        toggleDocumentConsent,
        addTransportBooking,
        toggleTaskCompletion,
        markNotificationAsRead,
        addNotification,
        resetDemoData,
      }}
    >
      {children}
    </JourneyContext.Provider>
  );
};

export const useJourney = () => {
  const context = useContext(JourneyContext);
  if (!context) {
    throw new Error('useJourney must be used within a JourneyProvider');
  }
  return context;
};
