import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const initialDataPath = path.join(__dirname, 'initialData.json');
let initialData = {
  hospitals: [],
  doctors: [],
  treatments: [],
  cities: [],
  hotels: [],
  transports: []
};

try {
  const raw = fs.readFileSync(initialDataPath, 'utf8');
  initialData = JSON.parse(raw);
} catch (err) {
  console.warn('Initial data file not found or invalid, initializing empty collections:', err.message);
}

// In-Memory Database Store with demo seed state
class Database {
  constructor() {
    this.hospitals = [...(initialData.hospitals || [])];
    this.doctors = [...(initialData.doctors || [])];
    this.treatments = [...(initialData.treatments || [])];
    this.cities = [...(initialData.cities || [])];
    this.hotels = [...(initialData.hotels || [])];
    this.transports = [...(initialData.transports || [])];

    this.users = [
      {
        id: 'user-ahmed',
        name: 'Ahmed Hossain',
        email: 'ahmed.hossain@demo.bd',
        role: 'PATIENT',
        country: 'Bangladesh',
        phone: '+880 1711 000000',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        createdAt: '2026-03-01T08:00:00.000Z'
      },
      {
        id: 'user-apollo-coord',
        name: 'Apollo International Desk (Dr. K. Nair)',
        email: 'chennai_intl@apollohospitals.demo',
        role: 'HOSPITAL',
        country: 'India',
        associatedEntityId: 'hosp-apollo-chennai',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
        createdAt: '2026-03-01T08:00:00.000Z'
      },
      {
        id: 'user-lemon-tree',
        name: 'Lemon Tree Medical Concierge Desk',
        email: 'guestcare@lemontree.demo',
        role: 'HOTEL',
        country: 'India',
        associatedEntityId: 'hotel-lemon-tree-chennai',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        createdAt: '2026-03-01T08:00:00.000Z'
      },
      {
        id: 'user-medroute-dispatch',
        name: 'MedRoute Chauffeur Operations',
        email: 'dispatch@medroutecabs.demo',
        role: 'TRANSPORT_PARTNER',
        country: 'India',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        createdAt: '2026-03-01T08:00:00.000Z'
      },
      {
        id: 'user-super-admin',
        name: 'MEDTRAVEL Platform Admin',
        email: 'admin@medtravelindia.demo',
        role: 'ADMIN',
        country: 'India',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
        createdAt: '2026-03-01T08:00:00.000Z'
      }
    ];

    this.quotations = [
      {
        id: 'req-ahmed-apollo-01',
        patientId: 'user-ahmed',
        patientName: 'Ahmed Hossain',
        patientCountry: 'Bangladesh',
        patientPhone: '+880 1711 000000',
        patientEmail: 'ahmed.hossain@demo.bd',
        hospitalId: 'hosp-apollo-chennai',
        hospitalName: 'Apollo Hospitals, Greams Road',
        treatmentCategory: 'Kidney/Urology',
        treatmentName: 'Kidney Surgery & Living Donor Transplant Evaluation',
        approxBudgetINR: 450000,
        currencySelected: 'USD',
        notes: 'Living donor sister accompanying. Pre-transplant blood work completed in Dhaka. Seeking surgeon consultation & visa letter.',
        submissionDate: '2026-03-15T10:30:00.000Z',
        status: 'UNDER_REVIEW',
        selectedDoctorName: 'Dr. Ramesh Sundaram',
        visaSupportRequested: true,
        airportPickupRequested: true,
        estimatedCostQuoteINR: 420000,
        timelineEstimateDays: '14 - 18 days in Chennai',
        hospitalResponseNote: 'Medical documentation reviewed by Dr. Ramesh Sundaram’s surgical panel. Pre-admission package and visa invite drafted.'
      }
    ];

    this.documents = [
      {
        id: 'doc-report-echo-01',
        patientId: 'user-ahmed',
        title: 'Cardiac 2D Echo & Doppler Report',
        category: 'Lab Report',
        fileName: 'Echo_Ahmed_Hossain_Dhaka_Lab.pdf',
        fileSize: '3.4 MB',
        uploadedAt: '2026-03-12T14:20:00.000Z',
        isSharedWithHospitalConsent: true,
        secureFileUrl: '/demo_vault/Echo_Ahmed_Hossain_Dhaka_Lab.pdf'
      },
      {
        id: 'doc-report-renal-scan',
        patientId: 'user-ahmed',
        title: 'DTPA Renal Dynamic Function Scan',
        category: 'Lab Report',
        fileName: 'DTPA_Renal_Ahmed_2026.pdf',
        fileSize: '5.1 MB',
        uploadedAt: '2026-03-14T09:10:00.000Z',
        isSharedWithHospitalConsent: true,
        secureFileUrl: '/demo_vault/DTPA_Renal_Ahmed_2026.pdf'
      },
      {
        id: 'doc-passport-ahmed',
        patientId: 'user-ahmed',
        title: 'Patient International Passport Copy',
        category: 'Passport',
        fileName: 'Passport_Ahmed_Hossain.pdf',
        fileSize: '1.8 MB',
        uploadedAt: '2026-03-10T11:00:00.000Z',
        isSharedWithHospitalConsent: true,
        secureFileUrl: '/demo_vault/Passport_Ahmed_Hossain.pdf'
      }
    ];

    this.transportBookings = [
      {
        id: 'booking-trans-01',
        patientId: 'user-ahmed',
        transportOptionId: 'trans-innova-airport',
        serviceName: 'Apollo / Airport VIP Arrival MPV (Innova Crysta)',
        pickupLocation: 'Chennai International Airport (MAA) - Terminal 4 Arrival Gate',
        dropoffLocation: 'Lemon Tree Hotel, Shimona Chennai / Apollo Greams Road',
        date: '2026-03-24',
        time: '14:30',
        flightNumber: 'BG-084',
        passengersCount: 2,
        status: 'CONFIRMED',
        costINR: 1600,
        driverName: 'Mr. Sundaram K.',
        driverPhone: '+91 94441 55678',
        vehicleNumber: 'TN-09-CB-4491'
      }
    ];
  }

  // --- Hospitals ---
  findHospitals({ city, treatment, search, accreditedOnly } = {}) {
    let list = [...this.hospitals];
    if (city && city !== 'All') {
      list = list.filter(h => h.city.toLowerCase() === city.toLowerCase());
    }
    if (treatment && treatment !== 'All') {
      list = list.filter(h => 
        (h.specialties && h.specialties.some(s => s.toLowerCase().includes(treatment.toLowerCase()))) ||
        (h.popularTreatments && h.popularTreatments.some(t => t.toLowerCase().includes(treatment.toLowerCase())))
      );
    }
    if (accreditedOnly === true || accreditedOnly === 'true') {
      list = list.filter(h => h.accreditations && h.accreditations.length > 0);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(h => 
        h.name.toLowerCase().includes(q) ||
        h.city.toLowerCase().includes(q) ||
        (h.specialties && h.specialties.some(s => s.toLowerCase().includes(q))) ||
        (h.tagline && h.tagline.toLowerCase().includes(q))
      );
    }
    return list;
  }

  findHospitalById(id) {
    return this.hospitals.find(h => h.id === id || h.slug === id);
  }

  addHospital(hospital) {
    const id = hospital.id || `hosp-custom-${Date.now()}`;
    const newHospital = { ...hospital, id };
    this.hospitals.unshift(newHospital);
    return newHospital;
  }

  updateHospital(id, updates) {
    const idx = this.hospitals.findIndex(h => h.id === id);
    if (idx === -1) return null;
    this.hospitals[idx] = { ...this.hospitals[idx], ...updates };
    return this.hospitals[idx];
  }

  deleteHospital(id) {
    const idx = this.hospitals.findIndex(h => h.id === id);
    if (idx === -1) return false;
    this.hospitals.splice(idx, 1);
    return true;
  }

  // --- Treatments ---
  findTreatments({ search } = {}) {
    let list = [...this.treatments];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(t => 
        t.name.toLowerCase().includes(q) || 
        t.category.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
      );
    }
    return list;
  }

  findTreatmentById(id) {
    return this.treatments.find(t => t.id === id || t.category.toLowerCase() === id.toLowerCase());
  }

  addTreatment(treatment) {
    const id = treatment.id || `treat-custom-${Date.now()}`;
    const newTreatment = { ...treatment, id };
    this.treatments.unshift(newTreatment);
    return newTreatment;
  }

  updateTreatment(id, updates) {
    const idx = this.treatments.findIndex(t => t.id === id);
    if (idx === -1) return null;
    this.treatments[idx] = { ...this.treatments[idx], ...updates };
    return this.treatments[idx];
  }

  deleteTreatment(id) {
    const idx = this.treatments.findIndex(t => t.id === id);
    if (idx === -1) return false;
    this.treatments.splice(idx, 1);
    return true;
  }

  // --- Doctors ---
  findDoctors({ hospitalId, specialty, city, search } = {}) {
    let list = [...this.doctors];
    if (hospitalId) {
      list = list.filter(d => d.hospitalId === hospitalId);
    }
    if (city && city !== 'All') {
      list = list.filter(d => d.city.toLowerCase() === city.toLowerCase());
    }
    if (specialty && specialty !== 'All') {
      list = list.filter(d => 
        (d.specialty && d.specialty.toLowerCase().includes(specialty.toLowerCase())) ||
        (d.department && d.department.toLowerCase().includes(specialty.toLowerCase()))
      );
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(d => 
        d.name.toLowerCase().includes(q) ||
        d.hospitalName.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q) ||
        (d.areasOfExpertise && d.areasOfExpertise.some(e => e.toLowerCase().includes(q)))
      );
    }
    return list;
  }

  findDoctorById(id) {
    return this.doctors.find(d => d.id === id);
  }

  // --- Hotels ---
  findHotels({ city, hospitalId, wheelchairOnly } = {}) {
    let list = [...this.hotels];
    if (city && city !== 'All') {
      list = list.filter(h => h.city.toLowerCase() === city.toLowerCase());
    }
    if (hospitalId) {
      list = list.filter(h => h.nearestHospitalId === hospitalId || h.hospitalDistanceKm <= 5);
    }
    if (wheelchairOnly === true || wheelchairOnly === 'true') {
      list = list.filter(h => h.amenities && h.amenities.some(a => a.toLowerCase().includes('wheelchair')));
    }
    return list;
  }

  // --- Transports ---
  findTransports({ category, wheelchairOnly } = {}) {
    let list = [...this.transports];
    if (category && category !== 'All') {
      list = list.filter(t => t.category === category);
    }
    if (wheelchairOnly === true || wheelchairOnly === 'true') {
      list = list.filter(t => t.isWheelchairAccessible === true);
    }
    return list;
  }

  // --- Quotations ---
  findQuotations({ patientId, hospitalId, status } = {}) {
    let list = [...this.quotations];
    if (patientId) {
      list = list.filter(q => q.patientId === patientId);
    }
    if (hospitalId) {
      list = list.filter(q => q.hospitalId === hospitalId);
    }
    if (status) {
      list = list.filter(q => q.status === status);
    }
    return list;
  }

  findQuotationById(id) {
    return this.quotations.find(q => q.id === id);
  }

  createQuotation(data) {
    const id = `req-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newQuotation = {
      id,
      patientId: data.patientId || 'user-ahmed',
      patientName: data.patientName || 'Ahmed Hossain',
      patientCountry: data.patientCountry || 'Bangladesh',
      patientPhone: data.patientPhone || '',
      patientEmail: data.patientEmail || '',
      hospitalId: data.hospitalId,
      hospitalName: data.hospitalName || 'Hospital Partner',
      treatmentCategory: data.treatmentCategory || 'General',
      treatmentName: data.treatmentName || 'Consultation',
      approxBudgetINR: Number(data.approxBudgetINR) || 250000,
      currencySelected: data.currencySelected || 'USD',
      notes: data.notes || '',
      submissionDate: new Date().toISOString(),
      status: 'SUBMITTED',
      selectedDoctorName: data.selectedDoctorName,
      visaSupportRequested: !!data.visaSupportRequested,
      airportPickupRequested: !!data.airportPickupRequested,
      estimatedCostQuoteINR: data.estimatedCostQuoteINR || Math.round((Number(data.approxBudgetINR) || 250000) * 0.95),
      timelineEstimateDays: data.timelineEstimateDays || '10 - 14 days in India'
    };
    this.quotations.unshift(newQuotation);
    return newQuotation;
  }

  updateQuotation(id, updates) {
    const idx = this.quotations.findIndex(q => q.id === id);
    if (idx === -1) return null;
    this.quotations[idx] = { ...this.quotations[idx], ...updates };
    return this.quotations[idx];
  }

  // --- Documents ---
  findDocuments({ patientId } = {}) {
    let list = [...this.documents];
    if (patientId) {
      list = list.filter(d => d.patientId === patientId);
    }
    return list;
  }

  findDocumentById(id) {
    return this.documents.find(d => d.id === id);
  }

  createDocument(data) {
    const id = `doc-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newDoc = {
      id,
      patientId: data.patientId || 'user-ahmed',
      title: data.title,
      category: data.category || 'Lab Report',
      fileName: data.fileName,
      fileSize: data.fileSize || '1.2 MB',
      uploadedAt: new Date().toISOString(),
      isSharedWithHospitalConsent: data.isSharedWithHospitalConsent !== false,
      secureFileUrl: `/demo_vault/${encodeURIComponent(data.fileName)}`
    };
    this.documents.unshift(newDoc);
    return newDoc;
  }

  deleteDocument(id, patientId) {
    const idx = this.documents.findIndex(d => d.id === id && (!patientId || d.patientId === patientId));
    if (idx === -1) return false;
    this.documents.splice(idx, 1);
    return true;
  }

  // --- Users / Auth ---
  findUserByEmail(email) {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id) {
    return this.users.find(u => u.id === id);
  }

  createUser(userData) {
    const id = `user-${Date.now()}`;
    const newUser = {
      id,
      name: userData.name,
      email: userData.email,
      role: userData.role || 'PATIENT',
      country: userData.country || 'International',
      phone: userData.phone || '',
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      createdAt: new Date().toISOString()
    };
    this.users.push(newUser);
    return newUser;
  }

  // Reset store to fresh state
  resetAll() {
    this.hospitals = [...(initialData.hospitals || [])];
    this.doctors = [...(initialData.doctors || [])];
    this.treatments = [...(initialData.treatments || [])];
    this.cities = [...(initialData.cities || [])];
    this.hotels = [...(initialData.hotels || [])];
    this.transports = [...(initialData.transports || [])];
    return true;
  }
}

export const db = new Database();
