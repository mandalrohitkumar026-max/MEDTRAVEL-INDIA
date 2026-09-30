import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Building2, 
  Activity, 
  Stethoscope, 
  Hotel, 
  FileText, 
  Users, 
  RotateCcw,
  CheckCircle2, 
  Clock, 
  Search,
  Plus,
  Trash2,
  X
} from 'lucide-react';
import { useJourney } from '../context/JourneyContext';
import { useCurrency } from '../context/CurrencyContext';
import { Hospital, Treatment, QuotationStatus } from '../types';

type AdminTab = 'REQUESTS' | 'HOSPITALS' | 'TREATMENTS' | 'DOCTORS' | 'HOTELS' | 'USERS_DEMO';

export const AdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('REQUESTS');
  const { 
    quotations, 
    updateQuotationStatus, 
    profile, 
    updateProfile, 
    resetDemoData,
    hospitals,
    addHospital,
    deleteHospital,
    treatments,
    addTreatment,
    deleteTreatment,
    doctors,
    hotels
  } = useJourney();
  const { formatPrice } = useCurrency();

  // Search & filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [treatmentCategoryFilter, setTreatmentCategoryFilter] = useState('ALL');
  const [resetSuccessMessage, setResetSuccessMessage] = useState<string | null>(null);

  // Add Hospital Modal State
  const [showAddHospitalModal, setShowAddHospitalModal] = useState(false);
  const [newHospName, setNewHospName] = useState('');
  const [newHospCity, setNewHospCity] = useState('Chennai');
  const [newHospAddress, setNewHospAddress] = useState('');
  const [newHospSpecialties, setNewHospSpecialties] = useState('Cardiology, Orthopedics, Oncology');
  const [newHospBeds, setNewHospBeds] = useState(450);
  const [newHospAirportKm, setNewHospAirportKm] = useState(15);
  const [newHospCostMin, setNewHospCostMin] = useState(250000);
  const [newHospCostMax, setNewHospCostMax] = useState(500000);

  // Add Treatment Modal State
  const [showAddTreatmentModal, setShowAddTreatmentModal] = useState(false);
  const [newTreatName, setNewTreatName] = useState('');
  const [newTreatCategory, setNewTreatCategory] = useState('Cardiology');
  const [newTreatAvgCost, setNewTreatAvgCost] = useState(350000);
  const [newTreatStayDays, setNewTreatStayDays] = useState(5);
  const [newTreatCityDays, setNewTreatCityDays] = useState(14);
  const [newTreatDesc, setNewTreatDesc] = useState('');

  // Status helper badge
  const getStatusBadge = (status: QuotationStatus) => {
    switch (status) {
      case 'Submitted':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1"><Clock className="w-3 h-3" /> Submitted</span>;
      case 'Under Review':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1"><Activity className="w-3 h-3" /> Under Review</span>;
      case 'Hospital Responded':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Hospital Responded</span>;
      case 'Completed':
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Completed</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  const handleReset = () => {
    resetDemoData();
    setResetSuccessMessage('Demo data restored to initial clean state.');
    setTimeout(() => setResetSuccessMessage(null), 3000);
  };

  const handleSeedKidneyTest = () => {
    updateProfile({
      fullName: 'Tariq Al-Mansoor',
      country: 'Oman',
      preferredLanguage: 'Arabic, English',
      preferredCity: 'Chennai',
      selectedTreatmentId: 'treat-kidney-tx',
      selectedHospitalId: 'hosp-apollo-chennai',
      budgetRangeMin: 200000,
      budgetRangeMax: 500000,
      diagnosisOrSymptom: 'End-stage renal disease; seeking living donor kidney transplant.',
      currentJourneyStep: 'PLAN'
    });
    setResetSuccessMessage('Demo patient seeded with Kidney/Urology in Chennai (₹2L–₹5L)!');
    setTimeout(() => setResetSuccessMessage(null), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Platform Operations & Administration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            MEDTRAVEL INDIA Administration
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Streamlined backoffice management for hospitals, treatments, doctor profiles, nearby hotels, patient consultation requests, and demo session controls.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition border border-slate-700 shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

      {resetSuccessMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium flex items-center justify-between animate-fadeIn">
          <span>{resetSuccessMessage}</span>
          <button onClick={() => setResetSuccessMessage(null)} className="text-emerald-600 hover:text-emerald-900">✕</button>
        </div>
      )}

      {/* Admin Navigation Tabs */}
      <div className="flex gap-2 border-b border-slate-200 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setActiveTab('REQUESTS')}
          className={`pb-3 px-4 font-bold border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === 'REQUESTS'
              ? 'border-brand-600 text-brand-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Patient Requests ({quotations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('HOSPITALS')}
          className={`pb-3 px-4 font-bold border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === 'HOSPITALS'
              ? 'border-brand-600 text-brand-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Hospitals ({hospitals.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('TREATMENTS')}
          className={`pb-3 px-4 font-bold border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === 'TREATMENTS'
              ? 'border-brand-600 text-brand-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Treatments ({treatments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('DOCTORS')}
          className={`pb-3 px-4 font-bold border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === 'DOCTORS'
              ? 'border-brand-600 text-brand-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          <span>Doctors ({doctors.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('HOTELS')}
          className={`pb-3 px-4 font-bold border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === 'HOTELS'
              ? 'border-brand-600 text-brand-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Hotel className="w-4 h-4" />
          <span>Hotels ({hotels.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('USERS_DEMO')}
          className={`pb-3 px-4 font-bold border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === 'USERS_DEMO'
              ? 'border-brand-600 text-brand-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Users & Demo Controls</span>
        </button>
      </div>

      {/* 1. PATIENT REQUESTS */}
      {activeTab === 'REQUESTS' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Consultation & Quotation Requests</h2>
              <p className="text-xs text-slate-500">Track and advance patient requests through the 4-step status cycle.</p>
            </div>
            <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full font-medium self-start sm:self-auto">
              Total Inbound: {quotations.length}
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {quotations.map((req) => (
              <div key={req.id} className="py-4 space-y-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{req.patientName}</span>
                      <span className="text-xs text-slate-500">({req.patientCountry})</span>
                      {getStatusBadge(req.status)}
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      <span className="font-semibold text-brand-700">{req.treatmentName}</span> at <span className="font-medium text-slate-800">{req.hospitalName}</span>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Submitted: {req.submissionDate} • Preferred Date: {req.preferredDate} • Attendants: {req.attendantCount} • Documents: {req.documentIds?.length || 0} attached
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-xs font-medium text-slate-500">Change Status:</label>
                    <select
                      value={req.status}
                      onChange={(e) => updateQuotationStatus(req.id, e.target.value as QuotationStatus)}
                      aria-label="Update request status"
                      className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 font-semibold bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    >
                      <option value="Submitted">Submitted</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Hospital Responded">Hospital Responded</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

                {req.notes && (
                  <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-100">
                    <span className="font-bold text-slate-700">Patient Notes: </span>
                    {req.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. HOSPITALS */}
      {activeTab === 'HOSPITALS' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Registered Hospitals ({hospitals.length})</h2>
              <p className="text-xs text-slate-500">Accredited partner hospitals across major Indian medical centers.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search hospital or city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg w-48 sm:w-56 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>
              <button
                onClick={() => setShowAddHospitalModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-sm transition shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Hospital</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hospitals
              .filter(h => 
                h.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                h.city.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((h) => (
                <div key={h.id} className="p-4 rounded-xl border border-slate-200 hover:border-brand-300 transition space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{h.name}</h3>
                      <p className="text-xs text-slate-500">{h.address}, {h.city}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Active
                      </span>
                      <button
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to remove "${h.name}" from the hospital directory?`)) {
                            deleteHospital(h.id);
                          }
                        }}
                        className="p-1 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                        title="Delete hospital from directory"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {h.accreditations.map(acc => (
                      <span key={acc} className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                        {acc}
                      </span>
                    ))}
                    <span className="text-[10px] text-slate-500 px-1.5 py-0.5">
                      {h.distanceAirportKm} km to Airport
                    </span>
                    <span className="text-[10px] text-slate-500 px-1.5 py-0.5">
                      {h.totalBeds}+ Beds
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 pt-1 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="font-medium text-slate-700">Top Specialties: </span>
                      {h.specialties.slice(0, 3).join(', ')}
                    </div>
                    <span className="text-[11px] font-semibold text-brand-700">
                      {formatPrice(h.approxTreatmentCostRange.minINR)} – {formatPrice(h.approxTreatmentCostRange.maxINR)}
                    </span>
                  </div>
                </div>
              ))}
          </div>

          {/* Add Hospital Modal */}
          {showAddHospitalModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
              <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-brand-600" />
                    Register New Partner Hospital
                  </h3>
                  <button onClick={() => setShowAddHospitalModal(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newHospName.trim() || !newHospAddress.trim()) return;
                    const newHosp: Hospital = {
                      id: `hosp-${Date.now()}`,
                      name: newHospName,
                      slug: newHospName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                      tagline: 'Accredited multi-speciality tertiary medical care center',
                      city: newHospCity,
                      state: 'India',
                      address: newHospAddress,
                      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80',
                      accreditations: ['NABH', 'NABL', 'JCI'],
                      establishedYear: 2015,
                      totalBeds: Number(newHospBeds) || 400,
                      icuBeds: 90,
                      specialties: newHospSpecialties.split(',').map((s) => s.trim()).filter(Boolean),
                      popularTreatments: ['Surgical Treatment', 'Specialist Consultation'],
                      languagesSupported: ['English', 'Hindi', 'Bengali', 'Arabic'],
                      distanceAirportKm: Number(newHospAirportKm) || 15,
                      airportDriveMinutes: 30,
                      approxTreatmentCostRange: {
                        minINR: Number(newHospCostMin) || 200000,
                        maxINR: Number(newHospCostMax) || 500000,
                      },
                      internationalPatientServices: {
                        lounge: true,
                        dedicatedCoordinator: true,
                        interpreterAvailable: true,
                        currencyExchangeDesk: true,
                        visaInvitationLetters: true,
                        halalAndDietaryFood: true,
                        prayerRooms: true,
                        telemedicineFollowup: true,
                      },
                      nearbyHotelsCount: 10,
                      transportAvailable: true,
                      contactEmail: `intl@${newHospName.toLowerCase().replace(/[^a-z0-9]/g, '')}.demo`,
                      helplinePhone: '+91 11 4000 8888',
                      verifiedPartner: true,
                      ratingScore: 4.8,
                      reviewCount: 30,
                      overview: `${newHospName} in ${newHospCity} provides high-quality quaternary care for overseas patients.`,
                    };
                    addHospital(newHosp);
                    setShowAddHospitalModal(false);
                    setNewHospName('');
                    setNewHospAddress('');
                  }}
                  className="space-y-3"
                >
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Hospital Name</label>
                    <input
                      type="text"
                      value={newHospName}
                      onChange={(e) => setNewHospName(e.target.value)}
                      placeholder="e.g. Tata Medical Center"
                      className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">City</label>
                      <select
                        value={newHospCity}
                        onChange={(e) => setNewHospCity(e.target.value)}
                        className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                      >
                        <option value="Chennai">Chennai</option>
                        <option value="Delhi NCR">Delhi NCR</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Bengaluru">Bengaluru</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Kochi">Kochi</option>
                        <option value="Kolkata">Kolkata</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Distance to Airport (km)</label>
                      <input
                        type="number"
                        value={newHospAirportKm}
                        onChange={(e) => setNewHospAirportKm(Number(e.target.value))}
                        className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Address / Area</label>
                    <input
                      type="text"
                      value={newHospAddress}
                      onChange={(e) => setNewHospAddress(e.target.value)}
                      placeholder="e.g. Major Arterial Road, New Town"
                      className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Key Specialties (comma separated)</label>
                    <input
                      type="text"
                      value={newHospSpecialties}
                      onChange={(e) => setNewHospSpecialties(e.target.value)}
                      placeholder="e.g. Oncology, Cardiology, Orthopedics"
                      className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Total Beds</label>
                      <input
                        type="number"
                        value={newHospBeds}
                        onChange={(e) => setNewHospBeds(Number(e.target.value))}
                        className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Min Cost (₹)</label>
                      <input
                        type="number"
                        value={newHospCostMin}
                        onChange={(e) => setNewHospCostMin(Number(e.target.value))}
                        className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Max Cost (₹)</label>
                      <input
                        type="number"
                        value={newHospCostMax}
                        onChange={(e) => setNewHospCostMax(Number(e.target.value))}
                        className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddHospitalModal(false)}
                      className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold shadow-xs transition"
                    >
                      Save Hospital
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. TREATMENTS */}
      {activeTab === 'TREATMENTS' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Standardized Medical Treatments ({treatments.length})</h2>
              <p className="text-xs text-slate-500">Categories, typical procedural costs, and recovery times.</p>
            </div>
            
            <div className="flex items-center gap-2">
              <select
                value={treatmentCategoryFilter}
                onChange={(e) => setTreatmentCategoryFilter(e.target.value)}
                aria-label="Filter treatments by category"
                className="text-xs border border-slate-300 rounded-lg px-3 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-500"
              >
                <option value="ALL">All Categories</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Oncology">Oncology</option>
                <option value="Neurology">Neurology</option>
                <option value="Kidney/Urology">Kidney/Urology</option>
                <option value="Gastroenterology">Gastroenterology</option>
                <option value="Cosmetic surgery">Cosmetic surgery</option>
                <option value="General surgery">General surgery</option>
              </select>

              <button
                onClick={() => setShowAddTreatmentModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-sm transition shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Treatment</span>
              </button>
            </div>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {treatments
              .filter(t => treatmentCategoryFilter === 'ALL' || t.category === treatmentCategoryFilter)
              .map((t) => (
                <div key={t.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{t.name}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-700">
                        {t.category}
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs">{t.description}</p>
                    <p className="text-[11px] text-slate-400">
                      Hospital Stay: {t.typicalHospitalStayDays} days • India Recovery: {t.typicalCityStayDays} days
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-right sm:self-center">
                    <div>
                      <span className="font-extrabold text-slate-900 text-sm">
                        {formatPrice(t.approxRangeINR.min)} – {formatPrice(t.approxRangeINR.max)}
                      </span>
                      <p className="text-[10px] text-slate-400">Typical estimate</p>
                    </div>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete treatment "${t.name}" from catalog?`)) {
                          deleteTreatment(t.id);
                        }
                      }}
                      className="p-1 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                      title="Delete treatment from catalog"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* Add Treatment Modal */}
          {showAddTreatmentModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
              <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-brand-600" />
                    Add Standard Treatment Package
                  </h3>
                  <button onClick={() => setShowAddTreatmentModal(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newTreatName.trim()) return;
                    const avgCost = Number(newTreatAvgCost) || 300000;
                    const newTreat: Treatment = {
                      id: `treat-${Date.now()}`,
                      name: newTreatName,
                      category: newTreatCategory,
                      averageCostINR: avgCost,
                      approxRangeINR: {
                        min: Math.round(avgCost * 0.8),
                        max: Math.round(avgCost * 1.3),
                      },
                      usCostUSD: Math.round((avgCost * 4.5) / 85),
                      ukCostGBP: Math.round((avgCost * 3.8) / 105),
                      bangladeshCostBDT: Math.round(avgCost * 1.35),
                      typicalHospitalStayDays: Number(newTreatStayDays) || 5,
                      typicalCityStayDays: Number(newTreatCityDays) || 14,
                      description: newTreatDesc || `${newTreatName} comprehensive medical procedure with accredited hospital stay.`,
                      commonIndications: ['Indicated for overseas patients seeking quality surgical outcomes in India'],
                      preOpDiagnostics: ['Screening Panel', 'Specialist Review'],
                      recoveryHighlights: 'Mobilization in 24-48 hours with tele-followup.',
                    };
                    addTreatment(newTreat);
                    setShowAddTreatmentModal(false);
                    setNewTreatName('');
                    setNewTreatDesc('');
                  }}
                  className="space-y-3"
                >
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Treatment Name</label>
                    <input
                      type="text"
                      value={newTreatName}
                      onChange={(e) => setNewTreatName(e.target.value)}
                      placeholder="e.g. Corneal Transplant & Eye Microsurgery"
                      className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Category</label>
                      <select
                        value={newTreatCategory}
                        onChange={(e) => setNewTreatCategory(e.target.value)}
                        className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                      >
                        <option value="Cardiology">Cardiology</option>
                        <option value="Orthopedics">Orthopedics</option>
                        <option value="Oncology">Oncology</option>
                        <option value="Neurology">Neurology</option>
                        <option value="Kidney/Urology">Kidney/Urology</option>
                        <option value="Gastroenterology">Gastroenterology</option>
                        <option value="Cosmetic surgery">Cosmetic surgery</option>
                        <option value="General surgery">General surgery</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Average Cost (₹ INR)</label>
                      <input
                        type="number"
                        value={newTreatAvgCost}
                        onChange={(e) => setNewTreatAvgCost(Number(e.target.value))}
                        className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Hospital Stay (Days)</label>
                      <input
                        type="number"
                        value={newTreatStayDays}
                        onChange={(e) => setNewTreatStayDays(Number(e.target.value))}
                        className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Total India Stay (Days)</label>
                      <input
                        type="number"
                        value={newTreatCityDays}
                        onChange={(e) => setNewTreatCityDays(Number(e.target.value))}
                        className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Description</label>
                    <textarea
                      value={newTreatDesc}
                      onChange={(e) => setNewTreatDesc(e.target.value)}
                      placeholder="Brief overview of the procedure..."
                      className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg"
                      rows={2}
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddTreatmentModal(false)}
                      className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold shadow-xs transition"
                    >
                      Save Treatment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. DOCTORS */}
      {activeTab === 'DOCTORS' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">Doctor Directory ({doctors.length})</h2>
            <p className="text-xs text-slate-500">Board-certified specialists affiliated with accredited medical centers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {doctors.map((doc) => (
              <div key={doc.id} className="p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{doc.name}</h3>
                    <p className="text-xs text-brand-700 font-medium">{doc.specialty}</p>
                    <p className="text-xs text-slate-500">{doc.hospitalName}</p>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-100 text-slate-700">
                    {doc.experienceYears}+ Yrs Exp
                  </span>
                </div>
                <div className="text-xs text-slate-600">
                  <span className="font-medium text-slate-700">Qualifications: </span>{doc.qualifications.join(', ')}
                </div>
                <div className="text-xs text-slate-500">
                  <span className="font-medium text-slate-700">Languages: </span>{doc.languages.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. HOTELS */}
      {activeTab === 'HOTELS' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">Hospital-Adjacent Accommodations ({hotels.length})</h2>
            <p className="text-xs text-slate-500">Curated stay options tailored for medical tourists and their attendants.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{hotel.name}</h3>
                    <p className="text-xs text-slate-500">{hotel.city} • {hotel.distanceToHospitalKm} km from hospital</p>
                  </div>
                  <span className="text-xs font-bold text-slate-900">
                    {formatPrice(hotel.pricePerNightINR)} / night
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {hotel.medicalPatientFriendlyFeatures?.kitchenetteAvailable && (
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-medium">Kitchenette</span>
                  )}
                  {hotel.medicalPatientFriendlyFeatures?.wheelchairAccessible && (
                    <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-medium">Wheelchair Accessible</span>
                  )}
                  {hotel.medicalPatientFriendlyFeatures?.elevator && (
                    <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">Elevator</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. USERS & DEMO DATA */}
      {activeTab === 'USERS_DEMO' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">Patient Profiles & Demo State Management</h2>
            <p className="text-xs text-slate-500">Configure or reset the active patient persona for testing the end-to-end flow.</p>
          </div>

          {/* Current Active Persona */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Patient Persona</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-500">Full Name:</span>
                <p className="font-bold text-slate-900 text-sm">{profile.fullName}</p>
              </div>
              <div>
                <span className="text-slate-500">Origin Country:</span>
                <p className="font-bold text-slate-900 text-sm">{profile.country}</p>
              </div>
              <div>
                <span className="text-slate-500">Preferred Language:</span>
                <p className="font-bold text-slate-900 text-sm">{profile.preferredLanguage}</p>
              </div>
              <div>
                <span className="text-slate-500">Destination City:</span>
                <p className="font-bold text-slate-900 text-sm">{profile.preferredCity || 'Not selected'}</p>
              </div>
              <div>
                <span className="text-slate-500">Planned Budget:</span>
                <p className="font-bold text-slate-900 text-sm">
                  {formatPrice(profile.budgetRangeMin || 0)} – {formatPrice(profile.budgetRangeMax || 0)}
                </p>
              </div>
              <div>
                <span className="text-slate-500">Accompanying Attendants:</span>
                <p className="font-bold text-slate-900 text-sm">{profile.attendants?.length || 0} family members</p>
              </div>
            </div>
          </div>

          {/* Quick Preload Test Actions */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900">Quick Journey Test Presets</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSeedKidneyTest}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition shadow-xs"
              >
                <span>Seed Kidney/Urology in Chennai Persona (₹2L–₹5L)</span>
              </button>
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Demo State</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
