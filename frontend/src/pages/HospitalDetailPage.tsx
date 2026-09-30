import React from 'react';
import { Hospital, Doctor } from '../types';
import { mockDoctors } from '../data/mockDoctors';
import { mockHotels } from '../data/mockHotels';
import { useCurrency } from '../context/CurrencyContext';
import { useComparison } from '../context/ComparisonContext';
import { VerifiedBadge } from '../components/common/VerifiedBadge';
import { 
  Building2, 
  MapPin, 
  Plane, 
  Bed, 
  ShieldCheck, 
  Languages, 
  Calendar, 
  Hotel, 
  ArrowLeft, 
  PhoneCall, 
  Mail, 
  Check, 
  Plus, 
  FileText,
  UserCheck
} from 'lucide-react';

interface HospitalDetailPageProps {
  hospital: Hospital;
  onBack: () => void;
  onRequestQuotation: (hospital: Hospital) => void;
  onSelectDoctor: (doctor: Doctor) => void;
}

export const HospitalDetailPage: React.FC<HospitalDetailPageProps> = ({
  hospital,
  onBack,
  onRequestQuotation,
  onSelectDoctor,
}) => {
  const { formatPrice } = useCurrency();
  const { toggleHospital, isInComparison } = useComparison();
  const compared = isInComparison(hospital.id);

  const affiliatedDoctors = mockDoctors.filter((d) => d.hospitalId === hospital.id);
  const nearbyHotels = mockHotels.filter((h) => h.nearestHospitalId === hospital.id);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-xl transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Hospitals</span>
      </button>

      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white min-h-[320px] flex flex-col justify-end p-6 sm:p-10 shadow-xl">
        <img
          src={hospital.image}
          alt={hospital.name}
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {hospital.accreditations.map((acc) => (
              <span
                key={acc}
                className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                {acc} Accredited
              </span>
            ))}
            <VerifiedBadge label="Verified Healthcare Partner" type="PARTNER" />
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            {hospital.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-teal-400" />
              {hospital.address}
            </span>
            <span className="flex items-center gap-1">
              <Plane className="w-4 h-4 text-brand-400" />
              {hospital.distanceAirportKm} km from Airport ({hospital.airportDriveMinutes} min drive)
            </span>
            <span className="flex items-center gap-1">
              <Bed className="w-4 h-4 text-amber-400" />
              {hospital.totalBeds} Total Beds ({hospital.icuBeds} Quaternary ICU Beds)
            </span>
          </div>
        </div>
      </div>

      {/* Action Strip */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs text-slate-500 block">Indicative Treatment Package Range</span>
          <span className="text-lg font-extrabold text-brand-700">
            {formatPrice(hospital.approxTreatmentCostRange.minINR)} – {formatPrice(hospital.approxTreatmentCostRange.maxINR)}
          </span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={() => toggleHospital(hospital.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition ${
              compared
                ? 'bg-brand-50 text-brand-700 border-brand-300'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            {compared ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            <span>{compared ? 'In Comparison Matrix' : 'Add to Comparison'}</span>
          </button>

          <button
            onClick={() => onRequestQuotation(hospital)}
            className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md transition"
          >
            Request Hospital Quotation & VIL
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Overview, International Services, Doctors (2 cols) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Overview */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-brand-600" />
              About {hospital.name.split(',')[0]}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {hospital.overview}
            </p>
            <div className="pt-2 text-xs text-slate-500">
              Established in <strong className="text-slate-800">{hospital.establishedYear}</strong> • Quaternary Referral Center
            </div>
          </div>

          {/* International Patient Department Amenities */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              International Patient Department (IPD)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5 text-slate-800">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Dedicated International Patient Lounge</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5 text-slate-800">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Hospital Visa Invitation Letter (VIL) Team</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5 text-slate-800">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Foreign Currency Exchange Counter</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5 text-slate-800">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Halal & Custom Diet Hospital Kitchen</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5 text-slate-800">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Multi-Faith Prayer Rooms</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5 text-slate-800">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Post-Discharge Telemedicine Follow-up</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-600">
              <Languages className="w-4 h-4 text-brand-600" />
              <span>
                <strong>Languages Supported:</strong> {hospital.languagesSupported.join(', ')}
              </span>
            </div>
          </div>

          {/* Affiliated Specialists */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-brand-600" />
              Affiliated Senior Faculty & Surgeons
            </h2>

            {affiliatedDoctors.length === 0 ? (
              <p className="text-xs text-slate-500">
                Consultant panel details available upon formal quotation enquiry.
              </p>
            ) : (
              <div className="space-y-4">
                {affiliatedDoctors.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5">
                      <img
                        src={doc.avatar}
                        alt={doc.name}
                        className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                      />
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600">
                          {doc.specialty}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900">{doc.name}</h3>
                        <p className="text-xs text-slate-500">{doc.title}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {doc.experienceYears} Years Experience • Languages: {doc.languages.join(', ')}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectDoctor(doc)}
                      className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold text-xs px-3.5 py-2 rounded-xl transition self-end sm:self-center shrink-0"
                    >
                      View Profile
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Contact info & Nearby accommodation (1 col) */}
        <div className="space-y-6">
          {/* Direct International Desk Contacts */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              International Desk Contacts
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5 text-slate-700">
                <PhoneCall className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Helpline Phone</span>
                  <a href={`tel:${hospital.helplinePhone}`} className="font-bold hover:underline">
                    {hospital.helplinePhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-slate-700">
                <Mail className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Liaison Email</span>
                  <a href={`mailto:${hospital.contactEmail}`} className="font-bold hover:underline">
                    {hospital.contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-slate-700">
                <Plane className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Airport Arrival Distance</span>
                  <span className="font-semibold text-slate-900">
                    {hospital.distanceAirportKm} km ({hospital.airportDriveMinutes} mins)
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onRequestQuotation(hospital)}
              className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs shadow-md transition text-center flex items-center justify-center gap-1.5"
            >
              <span>Request Consultation</span>
              <FileText className="w-4 h-4" />
            </button>
          </div>

          {/* Nearby Medical-Friendly Hotels (Section 9) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
              <span>Nearby Hotels</span>
              <Hotel className="w-4 h-4 text-amber-500" />
            </h3>

            {nearbyHotels.length === 0 ? (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-2">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>Lemon Tree / Standard Medical Suites</span>
                  <span className="text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded text-[10px]">1.8 km</span>
                </div>
                <div className="text-[11px] text-slate-500">Facilities: Elevator, Kitchenette, Wheelchair Access</div>
                <div className="font-bold text-slate-900">₹2,800 – ₹4,200 / night</div>
                <button
                  onClick={() => alert(`Assistance request for nearby accommodation at ${hospital.name} registered. Our liaison team will contact you.`)}
                  className="w-full py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold rounded-lg text-[11px] border border-amber-200 transition"
                >
                  Request Hotel Assistance
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {nearbyHotels.map((h) => (
                  <div key={h.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold text-slate-900 line-clamp-1">{h.name}</span>
                      <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded">
                        {h.distanceToHospitalKm} km
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">Facilities: Elevator, Kitchenette, Barrier-free</div>
                    <div className="text-xs font-extrabold text-slate-800">
                      {formatPrice(h.pricePerNightINR)} <span className="text-[10px] font-normal text-slate-400">/ night</span>
                    </div>
                    <button
                      onClick={() => alert(`Assistance request for ${h.name} registered. Our liaison team will contact you with booking options.`)}
                      className="w-full py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold rounded-lg text-[11px] border border-amber-200 transition"
                    >
                      Request Assistance
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Transportation Routes (Section 9) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
              <span>Transportation Options</span>
              <Plane className="w-4 h-4 text-brand-600" />
            </h3>
            <p className="text-[11px] text-slate-500">
              Chauffeured, wheelchair-adapted point-to-point assistance:
            </p>
            <div className="space-y-1.5 text-xs text-slate-700">
              <div className="p-2 bg-slate-50 rounded-lg flex items-center justify-between">
                <span>Airport → Hotel</span>
                <span className="text-[10px] font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded">Arrival Meet</span>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg flex items-center justify-between">
                <span>Hotel → Hospital</span>
                <span className="text-[10px] font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded">OPD Commute</span>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg flex items-center justify-between">
                <span>Hospital → Hotel</span>
                <span className="text-[10px] font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded">Discharge Trip</span>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg flex items-center justify-between">
                <span>Hotel → Airport</span>
                <span className="text-[10px] font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded">Departure Drop</span>
              </div>
            </div>
            <button
              onClick={() => alert(`Assistance request for patient transportation to ${hospital.name} registered. Driver and vehicle details will be arranged upon flight confirmation.`)}
              className="w-full mt-2 py-2 bg-brand-50 hover:bg-brand-100 text-brand-800 font-bold rounded-xl text-xs border border-brand-200 transition"
            >
              Request Transport Assistance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
