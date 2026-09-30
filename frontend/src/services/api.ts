/**
 * MEDTRAVEL INDIA - Unified Client API Service
 * Connects frontend views with Express REST backend (`/api/...`)
 * Includes graceful offline fallback handling.
 */

import { 
  Hospital, 
  Treatment, 
  Doctor, 
  Hotel, 
  QuotationRequest, 
  MedicalDocument, 
  User, 
  UserRole 
} from '../types';
import { TransportServiceOption } from '../data/mockTransports';

const API_BASE = '/api';

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers || {});
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  // Inject auth context from localStorage if available
  const storedEmail = localStorage.getItem('medtravel_user_email');
  const storedRole = localStorage.getItem('medtravel_user_role');
  if (storedEmail) headers.set('X-User-Email', storedEmail);
  if (storedRole) headers.set('X-User-Role', storedRole);

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || `HTTP error ${response.status}`);
  }

  return data;
}

// --- Auth API ---
export const authApi = {
  login: (email: string, role?: UserRole) => 
    request<{ success: boolean; data: { user: User; token: string } }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, role })
    }),

  register: (userData: { name: string; email: string; country: string; phone?: string; treatment?: string }) =>
    request<{ success: boolean; data: { user: User; token: string } }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    }),

  getMe: () =>
    request<{ success: boolean; data: User }>('/auth/me'),

  logout: () =>
    request<{ success: boolean; message: string }>('/auth/logout', { method: 'POST' }),
};

// --- Hospitals API ---
export const hospitalsApi = {
  getAll: (params?: { city?: string; treatment?: string; search?: string; accreditedOnly?: boolean }) => {
    const q = new URLSearchParams();
    if (params?.city) q.set('city', params.city);
    if (params?.treatment) q.set('treatment', params.treatment);
    if (params?.search) q.set('search', params.search);
    if (params?.accreditedOnly) q.set('accreditedOnly', 'true');
    const qs = q.toString() ? `?${q.toString()}` : '';
    return request<{ success: boolean; count: number; data: Hospital[] }>(`/hospitals${qs}`);
  },

  getById: (id: string) =>
    request<{ success: boolean; data: Hospital & { doctors: Doctor[]; nearbyHotels: Hotel[] } }>(`/hospitals/${id}`),

  create: (hospital: Hospital) =>
    request<{ success: boolean; data: Hospital }>('/hospitals', {
      method: 'POST',
      body: JSON.stringify(hospital)
    }),

  update: (id: string, updates: Partial<Hospital>) =>
    request<{ success: boolean; data: Hospital }>(`/hospitals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    }),

  delete: (id: string) =>
    request<{ success: boolean; message: string; id: string }>(`/hospitals/${id}`, {
      method: 'DELETE'
    }),
};

// --- Treatments API ---
export const treatmentsApi = {
  getAll: (search?: string) => {
    const qs = search ? `?search=${encodeURIComponent(search)}` : '';
    return request<{ success: boolean; count: number; data: Treatment[] }>(`/treatments${qs}`);
  },

  getById: (id: string) =>
    request<{ success: boolean; data: Treatment & { relevantHospitals: Hospital[] } }>(`/treatments/${id}`),

  create: (treatment: Treatment) =>
    request<{ success: boolean; data: Treatment }>('/treatments', {
      method: 'POST',
      body: JSON.stringify(treatment)
    }),

  update: (id: string, updates: Partial<Treatment>) =>
    request<{ success: boolean; data: Treatment }>(`/treatments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    }),

  delete: (id: string) =>
    request<{ success: boolean; message: string; id: string }>(`/treatments/${id}`, {
      method: 'DELETE'
    }),
};

// --- Doctors API ---
export const doctorsApi = {
  getAll: (params?: { hospitalId?: string; specialty?: string; city?: string; search?: string }) => {
    const q = new URLSearchParams();
    if (params?.hospitalId) q.set('hospitalId', params.hospitalId);
    if (params?.specialty) q.set('specialty', params.specialty);
    if (params?.city) q.set('city', params.city);
    if (params?.search) q.set('search', params.search);
    const qs = q.toString() ? `?${q.toString()}` : '';
    return request<{ success: boolean; count: number; data: Doctor[] }>(`/doctors${qs}`);
  },

  getById: (id: string) =>
    request<{ success: boolean; data: Doctor & { hospital?: Hospital } }>(`/doctors/${id}`),
};

// --- Quotations API ---
export const quotationsApi = {
  getAll: (params?: { patientId?: string; hospitalId?: string; status?: string }) => {
    const q = new URLSearchParams();
    if (params?.patientId) q.set('patientId', params.patientId);
    if (params?.hospitalId) q.set('hospitalId', params.hospitalId);
    if (params?.status) q.set('status', params.status);
    const qs = q.toString() ? `?${q.toString()}` : '';
    return request<{ success: boolean; count: number; data: QuotationRequest[] }>(`/quotations${qs}`);
  },

  getById: (id: string) =>
    request<{ success: boolean; data: QuotationRequest }>(`/quotations/${id}`),

  create: (quotationData: Partial<QuotationRequest>) =>
    request<{ success: boolean; message: string; data: QuotationRequest }>('/quotations', {
      method: 'POST',
      body: JSON.stringify(quotationData)
    }),

  updateStatus: (id: string, updates: { status?: string; hospitalResponseNote?: string; estimatedCostQuoteINR?: number; timelineEstimateDays?: string }) =>
    request<{ success: boolean; message: string; data: QuotationRequest }>(`/quotations/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    }),

  scheduleAppointment: (id: string, appointment: { date: string; time: string; doctorName?: string; meetingPlatform?: string }) =>
    request<{ success: boolean; message: string; data: QuotationRequest }>(`/quotations/${id}/appointment`, {
      method: 'POST',
      body: JSON.stringify(appointment)
    }),
};

// --- Medical Documents API ---
export const documentsApi = {
  getAll: (patientId?: string) => {
    const qs = patientId ? `?patientId=${patientId}` : '';
    return request<{ success: boolean; count: number; data: MedicalDocument[] }>(`/documents${qs}`);
  },

  upload: (doc: { title: string; category: string; fileName: string; fileSize?: string; isSharedWithHospitalConsent?: boolean }) =>
    request<{ success: boolean; message: string; data: MedicalDocument }>('/documents', {
      method: 'POST',
      body: JSON.stringify(doc)
    }),

  delete: (id: string) =>
    request<{ success: boolean; message: string; id: string }>(`/documents/${id}`, {
      method: 'DELETE'
    }),

  toggleConsent: (id: string, consent?: boolean) =>
    request<{ success: boolean; message: string; data: MedicalDocument }>(`/documents/${id}/consent`, {
      method: 'PATCH',
      body: JSON.stringify({ consent })
    }),
};

// --- Hotels API ---
export const hotelsApi = {
  getAll: (params?: { city?: string; hospitalId?: string; wheelchairOnly?: boolean }) => {
    const q = new URLSearchParams();
    if (params?.city) q.set('city', params.city);
    if (params?.hospitalId) q.set('hospitalId', params.hospitalId);
    if (params?.wheelchairOnly) q.set('wheelchairOnly', 'true');
    const qs = q.toString() ? `?${q.toString()}` : '';
    return request<{ success: boolean; count: number; data: Hotel[] }>(`/hotels${qs}`);
  },

  getById: (id: string) =>
    request<{ success: boolean; data: Hotel }>(`/hotels/${id}`),
};

// --- Transports API ---
export const transportsApi = {
  getAll: (params?: { category?: string; wheelchairOnly?: boolean }) => {
    const q = new URLSearchParams();
    if (params?.category) q.set('category', params.category);
    if (params?.wheelchairOnly) q.set('wheelchairOnly', 'true');
    const qs = q.toString() ? `?${q.toString()}` : '';
    return request<{ success: boolean; count: number; data: TransportServiceOption[] }>(`/transports${qs}`);
  },

  book: (booking: {
    transportOptionId?: string;
    serviceName?: string;
    pickupLocation: string;
    dropoffLocation: string;
    date: string;
    time?: string;
    flightNumber?: string;
    passengersCount?: number;
    costINR?: number;
  }) =>
    request<{ success: boolean; message: string; data: unknown }>('/transports/book', {
      method: 'POST',
      body: JSON.stringify(booking)
    }),
};

// --- MediGuide AI Assistant API ---
export const aiApi = {
  chat: (message: string, history?: unknown[]) =>
    request<{ success: boolean; data: { reply: string; suggestedActions: Array<{ label: string; action: string }>; disclaimer: string } }>('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message, history })
    }),
};
