import React, { useState } from 'react';
import { useJourney } from '../context/JourneyContext';
import { useCurrency } from '../context/CurrencyContext';
import { 
  HeartPulse, 
  Building2, 
  Plane, 
  Hotel, 
  Car, 
  FileText, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Users, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink,
  PhoneCall,
  UserPlus,
  Bell,
  User,
  Check,
  MapPin,
  Globe
} from 'lucide-react';

interface PatientDashboardPageProps {
  onNavigateTab: (tab: string) => void;
  initialSection?: 'OVERVIEW' | 'PROFILE' | 'REQUESTS' | 'APPOINTMENTS' | 'DOCUMENTS' | 'NOTIFICATIONS';
}

export const PatientDashboardPage: React.FC<PatientDashboardPageProps> = ({ onNavigateTab, initialSection = 'OVERVIEW' }) => {
  const { 
    profile, 
    quotations, 
    documents, 
    transportBookings, 
    timeline,
    notifications,
    markNotificationAsRead,
    addAttendant, 
    removeAttendant 
  } = useJourney();
  const { formatPrice } = useCurrency();

  const [activeSection, setActiveSection] = useState<'OVERVIEW' | 'PROFILE' | 'REQUESTS' | 'APPOINTMENTS' | 'DOCUMENTS' | 'NOTIFICATIONS'>(initialSection);

  React.useEffect(() => {
    if (initialSection) {
      setActiveSection(initialSection);
    }
  }, [initialSection]);
  const [showAddAttendantModal, setShowAddAttendantModal] = useState(false);
  const [attendantName, setAttendantName] = useState('');
  const [relationship, setRelationship] = useState('Spouse');
  const [passportNo, setPassportNo] = useState('');

  const activeQuote = quotations[0];
  const primaryTransport = transportBookings[0];

  const handleCreateAttendant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attendantName.trim()) return;
    addAttendant({
      fullName: attendantName,
      relationship,
      passportNumber: passportNo,
      needsWheelchair: false,
    });
    setAttendantName('');
    setPassportNo('');
    setShowAddAttendantModal(false);
  };

  const totalPax = 1 + profile.attendants.length;
  const recommendedRooms = totalPax > 2 ? '2 Rooms / Family Suite' : '1 Double Room';
  const recommendedVehicle = totalPax > 2 ? '7-Seater MPV (Innova Crysta)' : 'Sedan / Standard MPV';

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-teal-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-teal-200 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Active Medical Journey File: #{profile.id}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome, {profile.fullName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
            {profile.country} → {profile.preferredCity} • Treatment: {profile.selectedTreatmentId ? 'CABG Cardiac Surgery' : 'Specialized Surgery'} • Apollo Hospitals
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigateTab('planner')}
            className="bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Timeline Planner</span>
          </button>
          <button
            onClick={() => onNavigateTab('ai-assistant')}
            className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-white/20 transition"
          >
            Ask MediGuide AI
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs (Phase 2 Sections) */}
      <div className="flex gap-2 overflow-x-auto pb-1 border-b border-slate-200 scrollbar-none text-xs">
        <button
          onClick={() => setActiveSection('OVERVIEW')}
          className={`px-4 py-2.5 rounded-xl font-bold transition shrink-0 ${
            activeSection === 'OVERVIEW'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Medical Journey & Overview
        </button>
        <button
          onClick={() => setActiveSection('PROFILE')}
          className={`px-4 py-2.5 rounded-xl font-bold transition shrink-0 ${
            activeSection === 'PROFILE'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Patient Profile & Attendants
        </button>
        <button
          onClick={() => setActiveSection('REQUESTS')}
          className={`px-4 py-2.5 rounded-xl font-bold transition shrink-0 ${
            activeSection === 'REQUESTS'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Hospital Requests & Quotes ({quotations.length})
        </button>
        <button
          onClick={() => setActiveSection('APPOINTMENTS')}
          className={`px-4 py-2.5 rounded-xl font-bold transition shrink-0 ${
            activeSection === 'APPOINTMENTS'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Appointments & Consultations
        </button>
        <button
          onClick={() => setActiveSection('DOCUMENTS')}
          className={`px-4 py-2.5 rounded-xl font-bold transition shrink-0 ${
            activeSection === 'DOCUMENTS'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Medical Documents Vault ({documents.length})
        </button>
        <button
          onClick={() => setActiveSection('NOTIFICATIONS')}
          className={`px-4 py-2.5 rounded-xl font-bold transition shrink-0 flex items-center gap-1.5 ${
            activeSection === 'NOTIFICATIONS'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Notifications</span>
          {unreadNotifications > 0 && (
            <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-bold">
              {unreadNotifications}
            </span>
          )}
        </button>
      </div>

      {/* SECTION 1: OVERVIEW & JOURNEY PIPELINE */}
      {activeSection === 'OVERVIEW' && (
        <div className="space-y-6">
          {/* Section 11: Core MVP Central Screen */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-bold text-brand-600 uppercase tracking-wider block">
                  Central Patient Tracker
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  MY MEDICAL JOURNEY
                </h2>
              </div>
              <div className="text-left sm:text-right text-xs">
                <span className="text-slate-400 block font-medium">Treatment & Hospital:</span>
                <strong className="text-slate-900 block text-sm">
                  {activeQuote?.treatmentName || 'Kidney Surgery'}
                </strong>
                <span className="text-slate-600">
                  {activeQuote?.hospitalName || 'Apollo Hospitals, Chennai'}
                </span>
              </div>
            </div>

            {/* Progress Checklist (Section 11 exact sequence) */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Journey Progress
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 text-xs">
                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-emerald-700">
                    <span className="text-xs">✓</span>
                    <span className="text-[10px] font-bold uppercase">Done</span>
                  </div>
                  <span className="font-bold text-slate-900 mt-2">Treatment selected</span>
                </div>

                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-emerald-700">
                    <span className="text-xs">✓</span>
                    <span className="text-[10px] font-bold uppercase">Done</span>
                  </div>
                  <span className="font-bold text-slate-900 mt-2">Hospital selected</span>
                </div>

                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-emerald-700">
                    <span className="text-xs">✓</span>
                    <span className="text-[10px] font-bold uppercase">Done</span>
                  </div>
                  <span className="font-bold text-slate-900 mt-2">Documents uploaded</span>
                </div>

                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-emerald-700">
                    <span className="text-xs">✓</span>
                    <span className="text-[10px] font-bold uppercase">Done</span>
                  </div>
                  <span className="font-bold text-slate-900 mt-2">Consultation requested</span>
                </div>

                <div className={`p-3 rounded-2xl border flex flex-col justify-between ${
                  activeQuote?.status === 'Hospital Responded' || activeQuote?.status === 'Completed'
                    ? 'bg-emerald-50 border-emerald-200'
                    : 'bg-amber-50 border-amber-200'
                }`}>
                  <div className={`flex items-center justify-between ${
                    activeQuote?.status === 'Hospital Responded' || activeQuote?.status === 'Completed'
                      ? 'text-emerald-700'
                      : 'text-amber-700'
                  }`}>
                    <span className="text-xs">{activeQuote?.status === 'Hospital Responded' || activeQuote?.status === 'Completed' ? '✓' : '⏳'}</span>
                    <span className="text-[10px] font-bold uppercase">
                      {activeQuote?.status === 'Hospital Responded' || activeQuote?.status === 'Completed' ? 'Done' : 'Review'}
                    </span>
                  </div>
                  <span className="font-bold text-slate-900 mt-2">Hospital response</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs">○</span>
                    <span className="text-[10px] font-semibold uppercase">Pending</span>
                  </div>
                  <span className="font-semibold text-slate-700 mt-2">Hotel</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs">○</span>
                    <span className="text-[10px] font-semibold uppercase">Pending</span>
                  </div>
                  <span className="font-semibold text-slate-700 mt-2">Transportation</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs">○</span>
                    <span className="text-[10px] font-semibold uppercase">Pending</span>
                  </div>
                  <span className="font-semibold text-slate-700 mt-2">Travel</span>
                </div>
              </div>
            </div>

            {/* Quick Actions (Section 11 exact list) */}
            <div className="pt-3 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Quick Actions
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                <button
                  onClick={() => onNavigateTab('hospitals')}
                  className="p-3 bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand-300 rounded-xl font-bold text-xs text-slate-800 hover:text-brand-900 transition text-center"
                >
                  View Hospital
                </button>
                <button
                  onClick={() => onNavigateTab('compare')}
                  className="p-3 bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand-300 rounded-xl font-bold text-xs text-slate-800 hover:text-brand-900 transition text-center"
                >
                  Compare Hospitals
                </button>
                <button
                  onClick={() => onNavigateTab('documents')}
                  className="p-3 bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand-300 rounded-xl font-bold text-xs text-slate-800 hover:text-brand-900 transition text-center"
                >
                  Upload Documents
                </button>
                <button
                  onClick={() => setActiveSection('REQUESTS')}
                  className="p-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-xs shadow-xs transition text-center"
                >
                  Request Consultation
                </button>
                <button
                  onClick={() => onNavigateTab('estimator')}
                  className="p-3 bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand-300 rounded-xl font-bold text-xs text-slate-800 hover:text-brand-900 transition text-center"
                >
                  Cost Estimate
                </button>
                <button
                  onClick={() => onNavigateTab('checklist')}
                  className="p-3 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-xl font-bold text-xs text-teal-900 transition text-center"
                >
                  Travel Checklist
                </button>
              </div>
            </div>
          </div>

          {/* Quick Summary Cards: Quotation + Stays */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              {/* Primary Active Quotation Summary */}
              {activeQuote && (
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Active Quotation
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 mt-1">{activeQuote.hospitalName}</h3>
                      <p className="text-xs text-brand-700 font-semibold">{activeQuote.treatmentName}</p>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-slate-400 block font-medium">Estimated Package</span>
                      <span className="text-2xl font-extrabold text-slate-900">
                        {formatPrice(activeQuote.quotationDetails?.estimatedPackageCostINR || 420000)}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600 block mt-0.5">
                        Status: {activeQuote.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-500">
                      Lead Surgeon: <strong>{activeQuote.quotationDetails?.attendingDoctor}</strong>
                    </span>
                    <button
                      onClick={() => setActiveSection('REQUESTS')}
                      className="text-brand-600 font-bold hover:underline"
                    >
                      View Full Quotation & VIL Details →
                    </button>
                  </div>
                </div>
              )}

              {/* Confirmed Vouchers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2 text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span className="flex items-center gap-1.5"><Car className="w-4 h-4 text-purple-600" /> Airport Transit</span>
                    <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px]">Confirmed</span>
                  </div>
                  <p className="text-slate-600 font-medium">Toyota Innova MPV • Driver S. Murugan</p>
                  <p className="text-[11px] text-slate-400">Flight BS-205 • Chennai T4 Arrivals (14 Oct)</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2 text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span className="flex items-center gap-1.5"><Hotel className="w-4 h-4 text-amber-500" /> Hotel Stay</span>
                    <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px]">Confirmed</span>
                  </div>
                  <p className="text-slate-600 font-medium">Lemon Tree Hotel, Shimona</p>
                  <p className="text-[11px] text-slate-400">2.1 km to Apollo • Executive Family Suite</p>
                </div>
              </div>
            </div>

            {/* Right Summary Column: Attendants & Notifications */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900">Accompanying Attendants</h3>
                  <button onClick={() => setShowAddAttendantModal(true)} className="text-brand-600 font-bold hover:underline">
                    + Add
                  </button>
                </div>
                {profile.attendants.map((a) => (
                  <div key={a.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-800">{a.fullName}</div>
                      <div className="text-[11px] text-slate-400">{a.relationship}</div>
                    </div>
                    <span className="text-[10px] font-mono bg-slate-200 px-1.5 py-0.5 rounded text-slate-600">{a.passportNumber}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Bell className="w-4 h-4 text-brand-600" />
                    Recent Updates
                  </h3>
                  <button onClick={() => setActiveSection('NOTIFICATIONS')} className="text-brand-600 font-bold hover:underline">
                    View All
                  </button>
                </div>
                {notifications.slice(0, 2).map((n) => (
                  <div key={n.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 space-y-0.5">
                    <div className="font-bold text-slate-900">{n.title}</div>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: PATIENT PROFILE & EMERGENCY CONTACT */}
      {activeSection === 'PROFILE' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600">Patient File</span>
              <h2 className="text-xl font-bold text-slate-900">Personal & Emergency Contact Details</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <span className="font-bold text-slate-700 uppercase tracking-wider block">Identity & Liaison</span>
              <div>
                <span className="text-slate-400 block text-[10px]">Full Name:</span>
                <span className="font-bold text-slate-900 text-sm">{profile.fullName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Country of Residence:</span>
                <span className="font-semibold text-slate-800">{profile.country}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Passport Number:</span>
                <span className="font-mono font-bold text-slate-800">{profile.passportNumber}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Preferred Language:</span>
                <span className="font-semibold text-slate-800">{profile.preferredLanguage || 'Bengali / English'}</span>
              </div>
            </div>

            <div className="p-5 bg-blue-50/60 rounded-2xl border border-blue-200 space-y-3">
              <span className="font-bold text-brand-900 uppercase tracking-wider block">Emergency Contact Person</span>
              <div>
                <span className="text-slate-500 block text-[10px]">Name:</span>
                <span className="font-bold text-slate-900 text-sm">{profile.emergencyContact?.name || 'Nasreen Hossain'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Relationship:</span>
                <span className="font-semibold text-slate-800">{profile.emergencyContact?.relationship || 'Spouse'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Telephone / WhatsApp:</span>
                <span className="font-mono font-bold text-brand-700">{profile.emergencyContact?.phone || '+880 1711 000000'}</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-1">
                This contact is authorized to coordinate with hospital international liaison desks in emergency situations.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: HOSPITAL REQUESTS & QUOTATIONS */}
      {activeSection === 'REQUESTS' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b pb-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Hospital Consultation Requests & Estimates</h2>
              <p className="text-xs text-slate-500">Track official response packages from accredited hospitals</p>
            </div>
          </div>

          <div className="space-y-4">
            {quotations.map((q) => (
              <div key={q.id} className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-50 text-brand-700 px-2 py-0.5 rounded">
                        Hospital Enquiry
                      </span>
                      <span className="text-xs font-mono text-slate-400">Ref: {q.id}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mt-1">{q.hospitalName}</h3>
                    <p className="text-xs text-brand-700 font-semibold">{q.treatmentName}</p>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Workflow Status</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      q.status === 'Hospital Responded' || q.status === 'Consultation Scheduled'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {q.status}
                    </span>
                  </div>
                </div>

                {q.quotationDetails && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Quoted Estimate</span>
                      <strong className="text-base font-extrabold text-slate-900">{formatPrice(q.quotationDetails.estimatedPackageCostINR)}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Inpatient Duration</span>
                      <strong className="text-slate-800">{q.quotationDetails.estimatedHospitalStayDays} Days ({q.quotationDetails.expectedIcuDays}d ICU)</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Lead Surgeon</span>
                      <strong className="text-slate-800">{q.quotationDetails.attendingDoctor}</strong>
                    </div>
                  </div>
                )}

                {/* Scheduled Consultation Notice */}
                {q.scheduledConsultation && (
                  <div className="p-3.5 bg-teal-50 border border-teal-200 rounded-2xl text-xs text-teal-950 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-teal-700" />
                      <span>
                        <strong>Consultation Confirmed:</strong> {q.scheduledConsultation.date} at {q.scheduledConsultation.time} with {q.scheduledConsultation.doctorName}
                      </span>
                    </div>
                    <span className="font-semibold text-teal-700 text-[11px]">{q.scheduledConsultation.meetingPlatform}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: APPOINTMENTS */}
      {activeSection === 'APPOINTMENTS' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Scheduled Consultations & Hospital Admissions</h2>
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-sm">Pre-Surgical Consultation</h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">Confirmed</span>
            </div>
            <p className="text-slate-600">
              Dr. Ramesh Sundaram (Chief CTVS) • Apollo Hospitals Greams Road, Thousand Lights, Chennai
            </p>
            <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-slate-500">
              <span>Date: <strong>15 October 2026 at 10:30 AM IST</strong></span>
              <span>Venue: <strong>International Patient Lounge Desk 3</strong></span>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: DOCUMENTS SHORTCUT */}
      {activeSection === 'DOCUMENTS' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <h2 className="text-lg font-bold text-slate-900">Medical Document Vault ({documents.length} Files)</h2>
            <button onClick={() => onNavigateTab('documents')} className="text-brand-600 font-bold hover:underline text-xs">
              Open Full Document Manager →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {documents.map((d) => (
              <div key={d.id} className="p-3.5 bg-slate-50 rounded-xl border flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-brand-600 uppercase">{d.category}</span>
                  <div className="font-bold text-slate-900">{d.title}</div>
                  <div className="text-[10px] text-slate-400">{d.fileName} ({d.fileSize})</div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  d.isSharedWithHospitalConsent ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-200 text-slate-600'
                }`}>
                  {d.isSharedWithHospitalConsent ? 'Shared' : 'Private'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 6: IN-APP NOTIFICATIONS */}
      {activeSection === 'NOTIFICATIONS' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-xs">
          <h2 className="text-lg font-bold text-slate-900">In-App Notifications & Alerts</h2>
          <div className="space-y-3">
            {notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => markNotificationAsRead(n.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition space-y-1 ${
                  n.read ? 'bg-slate-50 border-slate-200' : 'bg-brand-50/70 border-brand-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    {!n.read && <span className="w-2 h-2 rounded-full bg-brand-600"></span>}
                    {n.title}
                  </h4>
                  <span className="text-[11px] text-slate-400">{n.timestamp}</span>
                </div>
                <p className="text-slate-600 leading-relaxed">{n.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Attendant Modal */}
      {showAddAttendantModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-base font-bold text-slate-900">Add Accompanying Attendant</h3>
              <button onClick={() => setShowAddAttendantModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>
            <form onSubmit={handleCreateAttendant} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Legal Name (as in passport)</label>
                <input
                  type="text"
                  value={attendantName}
                  onChange={(e) => setAttendantName(e.target.value)}
                  placeholder="e.g. Farzana Hossain"
                  className="w-full p-2 bg-slate-50 border rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Relationship to Patient</label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full p-2 bg-slate-50 border rounded-xl"
                >
                  <option value="Spouse">Spouse</option>
                  <option value="Child / Son / Daughter">Child (Son / Daughter)</option>
                  <option value="Parent / Sibling">Parent / Sibling</option>
                  <option value="Caregiver / Legal Guardian">Caregiver / Guardian</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Passport Number</label>
                <input
                  type="text"
                  value={passportNo}
                  onChange={(e) => setPassportNo(e.target.value)}
                  placeholder="e.g. B0892410"
                  className="w-full p-2 bg-slate-50 border rounded-xl"
                  required
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddAttendantModal(false)} className="px-4 py-2 border rounded-xl">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-brand-600 text-white rounded-xl font-bold shadow-xs">Add to Journey</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
