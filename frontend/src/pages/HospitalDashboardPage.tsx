import React, { useState } from 'react';
import { useJourney } from '../context/JourneyContext';
import { useCurrency } from '../context/CurrencyContext';
import { QuotationStatus } from '../types';
import { 
  Building2, 
  Users, 
  FileText, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  Send, 
  Eye, 
  Download,
  Activity,
  Layers,
  Sparkles,
  AlertCircle,
  Video,
  XCircle,
  ShieldCheck
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const HospitalDashboardPage: React.FC = () => {
  const { quotations, documents, updateQuotationStatus, scheduleHospitalAppointment } = useJourney();
  const { formatPrice } = useCurrency();

  const [activeTab, setActiveTab] = useState<'ENQUIRIES' | 'DOCUMENTS' | 'ANALYTICS'>('ENQUIRIES');
  const [selectedQuoteId, setSelectedQuoteId] = useState<string>(quotations[0]?.id || '');
  const [quotationAmount, setQuotationAmount] = useState(420000);
  const [stayDays, setStayDays] = useState(6);
  const [leadDoctor, setLeadDoctor] = useState('Dr. Ramesh Sundaram (Chief CTVS)');
  const [statusUpdatedNotice, setStatusUpdatedNotice] = useState(false);

  // Appointment scheduling fields
  const [apptDate, setApptDate] = useState('2026-10-15');
  const [apptTime, setApptTime] = useState('10:30 AM IST');
  const [apptPlatform, setApptPlatform] = useState('In-Person (Apollo Greams Road International Lounge Desk 3)');

  const selectedQuote = quotations.find((q) => q.id === selectedQuoteId) || quotations[0];

  const analyticsData = [
    { country: 'Bangladesh', patients: 142 },
    { country: 'Oman', patients: 68 },
    { country: 'Nigeria', patients: 54 },
    { country: 'Iraq', patients: 45 },
    { country: 'Kenya', patients: 38 },
    { country: 'Uzbekistan', patients: 29 },
  ];

  const handleUpdateStatus = (newStatus: QuotationStatus) => {
    if (!selectedQuote) return;
    updateQuotationStatus(selectedQuote.id, newStatus);
    setStatusUpdatedNotice(true);
    setTimeout(() => setStatusUpdatedNotice(false), 2000);
  };

  const handleScheduleAppt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuote) return;
    scheduleHospitalAppointment(selectedQuote.id, {
      date: apptDate,
      time: apptTime,
      doctorName: leadDoctor,
      meetingPlatform: apptPlatform,
    });
    setStatusUpdatedNotice(true);
    setTimeout(() => setStatusUpdatedNotice(false), 2500);
  };

  const sharedDocuments = documents.filter((d) => d.isSharedWithHospitalConsent);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-teal-300 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5" />
            <span>Hospital International Patients Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Apollo Hospitals, Greams Road — International Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Liaison desk for overseas inquiries, diagnostic dossier evaluations, and visa invitation letter issuance.
          </p>
        </div>

        <div className="flex gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs text-slate-300 border border-slate-700">
            JCI / NABH Quaternary Desk
          </span>
        </div>
      </div>

      {/* Metric Cards (Phase 15) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">New Requests</span>
          <div className="text-2xl font-extrabold text-slate-900">{quotations.length}</div>
          <span className="text-[11px] text-brand-600 font-semibold">Active in queue</span>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pending Review</span>
          <div className="text-2xl font-extrabold text-amber-600">
            {quotations.filter((q) => q.status === 'Submitted' || q.status === 'Under Review').length}
          </div>
          <span className="text-[11px] text-amber-600 font-semibold">Under clinical review</span>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Consultations</span>
          <div className="text-2xl font-extrabold text-teal-700">8</div>
          <span className="text-[11px] text-teal-600 font-semibold">Scheduled this week</span>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Completed Patients</span>
          <div className="text-2xl font-extrabold text-emerald-600">376</div>
          <span className="text-[11px] text-slate-500 font-medium">This calendar year</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 text-xs">
        <button
          onClick={() => setActiveTab('ENQUIRIES')}
          className={`pb-3 px-4 font-bold border-b-2 transition ${
            activeTab === 'ENQUIRIES'
              ? 'border-brand-600 text-brand-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Patient Requests & Status Management ({quotations.length})
        </button>
        <button
          onClick={() => setActiveTab('DOCUMENTS')}
          className={`pb-3 px-4 font-bold border-b-2 transition ${
            activeTab === 'DOCUMENTS'
              ? 'border-brand-600 text-brand-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Shared Diagnostic Dossiers ({sharedDocuments.length})
        </button>
        <button
          onClick={() => setActiveTab('ANALYTICS')}
          className={`pb-3 px-4 font-bold border-b-2 transition ${
            activeTab === 'ANALYTICS'
              ? 'border-brand-600 text-brand-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          International Patient Analytics
        </button>
      </div>

      {/* Tab 1: Enquiries & Quotation Management */}
      {activeTab === 'ENQUIRIES' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* List (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Patient Queue
            </span>
            {quotations.map((q) => (
              <div
                key={q.id}
                onClick={() => setSelectedQuoteId(q.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition space-y-2 ${
                  selectedQuote?.id === q.id
                    ? 'border-brand-500 bg-brand-50/70 shadow-xs'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{q.patientName}</h4>
                    <span className="text-xs text-slate-500">{q.patientCountry} • {q.treatmentName}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    q.status === 'Hospital Responded' || q.status === 'Consultation Scheduled'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {q.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                  <span>Ref: {q.id}</span>
                  <span>Received: {q.submissionDate}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Details & Action Panel (8 cols) */}
          {selectedQuote && (
            <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              {/* Patient Info Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider">
                      Request Details
                    </span>
                    <span className="text-xs text-slate-400 font-mono">#{selectedQuote.id}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{selectedQuote.patientName}</h3>
                  <p className="text-xs text-slate-500">
                    {selectedQuote.patientCountry} • Contact: {selectedQuote.patientPhone} ({selectedQuote.patientEmail})
                  </p>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Live Status</span>
                  <span className="text-xs font-bold bg-brand-50 text-brand-800 px-3 py-1 rounded-full border border-brand-200">
                    {selectedQuote.status}
                  </span>
                </div>
              </div>

              {/* Status Update Buttons (Phase 8 Statuses) */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Update Workflow Status:
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {(['Under Review', 'Hospital Responded', 'Consultation Scheduled', 'Completed', 'Cancelled'] as QuotationStatus[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleUpdateStatus(st)}
                      className={`px-3 py-1.5 rounded-xl font-bold border transition ${
                        selectedQuote.status === st
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Patient Symptoms & Notes */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 text-xs">
                <span className="font-bold text-slate-700">Patient Symptoms & Clinical Notes:</span>
                <p className="text-slate-600 leading-relaxed">{selectedQuote.notes || 'None provided.'}</p>
                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Preferred Arrival Date: <strong>{selectedQuote.preferredDate}</strong></span>
                  <span>Accompanying Attendants: <strong>{selectedQuote.attendantCount}</strong></span>
                </div>
              </div>

              {/* Schedule Consultation Form */}
              <form onSubmit={handleScheduleAppt} className="p-4 bg-teal-50/60 border border-teal-200 rounded-2xl space-y-3 text-xs">
                <h4 className="font-bold text-teal-950 flex items-center gap-1.5 text-sm">
                  <Calendar className="w-4 h-4 text-teal-700" />
                  Schedule Clinical Consultation
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Date</label>
                    <input
                      type="date"
                      value={apptDate}
                      onChange={(e) => setApptDate(e.target.value)}
                      className="w-full p-2 bg-white border rounded-xl"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Time</label>
                    <input
                      type="text"
                      value={apptTime}
                      onChange={(e) => setApptTime(e.target.value)}
                      placeholder="e.g. 10:30 AM IST"
                      className="w-full p-2 bg-white border rounded-xl"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Doctor</label>
                    <input
                      type="text"
                      value={leadDoctor}
                      onChange={(e) => setLeadDoctor(e.target.value)}
                      className="w-full p-2 bg-white border rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Venue / Online Link</label>
                  <input
                    type="text"
                    value={apptPlatform}
                    onChange={(e) => setApptPlatform(e.target.value)}
                    placeholder="e.g. Apollo Greams Road Desk 3 or Zoom Video Link"
                    className="w-full p-2 bg-white border rounded-xl"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold shadow-xs transition flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Confirm Appointment & Notify Patient</span>
                </button>
              </form>

              {statusUpdatedNotice && (
                <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl font-bold text-center text-xs">
                  Updated successfully and synced to patient dashboard!
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Shared Diagnostic Dossiers */}
      {activeTab === 'DOCUMENTS' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Diagnostic Dossiers Shared with Hospital Consent
              </h3>
              <p className="text-xs text-slate-500">
                Only documents where the patient has explicitly granted sharing consent are visible to the clinical department.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sharedDocuments.map((doc) => (
              <div key={doc.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase text-brand-600">{doc.category}</span>
                  <div className="font-bold text-slate-900">{doc.title}</div>
                  <div className="text-[11px] text-slate-400 font-mono">{doc.fileName} ({doc.fileSize})</div>
                </div>
                <button
                  onClick={() => alert(`Opening diagnostic file: ${doc.fileName}...`)}
                  className="p-2 bg-white rounded-xl border border-slate-200 text-brand-700 hover:bg-brand-50 transition"
                  title="View diagnostic file"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Analytics */}
      {activeTab === 'ANALYTICS' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">International Patient Volume by Country</h3>
            <p className="text-xs text-slate-500">Overseas arrivals treated at Apollo Chennai in 2026</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData}>
                <XAxis dataKey="country" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', fontSize: '11px' }}
                />
                <Bar dataKey="patients" fill="#0284c7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};
