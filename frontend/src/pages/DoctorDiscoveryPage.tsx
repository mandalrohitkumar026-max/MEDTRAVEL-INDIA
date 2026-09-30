import React, { useState } from 'react';
import { mockDoctors } from '../data/mockDoctors';
import { Doctor } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import { VerifiedBadge } from '../components/common/VerifiedBadge';
import { 
  Stethoscope, 
  Search, 
  MapPin, 
  Building2, 
  Languages, 
  GraduationCap, 
  Calendar, 
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface DoctorDiscoveryPageProps {
  onSelectDoctor: (doctor: Doctor) => void;
  onRequestConsultation: (doctor: Doctor) => void;
}

export const DoctorDiscoveryPage: React.FC<DoctorDiscoveryPageProps> = ({
  onSelectDoctor,
  onRequestConsultation,
}) => {
  const { formatPrice } = useCurrency();
  const [search, setSearch] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('ALL');
  const [cityFilter, setCityFilter] = useState('ALL');

  const filteredDoctors = mockDoctors.filter((doc) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = doc.name.toLowerCase().includes(q);
      const matchSpec = doc.specialty.toLowerCase().includes(q);
      const matchHospital = doc.hospitalName.toLowerCase().includes(q);
      const matchExpertise = doc.areasOfExpertise.some((e) => e.toLowerCase().includes(q));
      if (!matchName && !matchSpec && !matchHospital && !matchExpertise) return false;
    }
    if (specialtyFilter !== 'ALL' && doc.specialty !== specialtyFilter) return false;
    if (cityFilter !== 'ALL' && doc.city !== cityFilter) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full mb-2">
          <Stethoscope className="w-3.5 h-3.5" />
          <span>Accredited Faculty & Specialists</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Doctor Profiles & Surgical Panels
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Explore documented qualifications, hospital affiliations, and international teleconsultation availability for senior clinicians in India.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by doctor name, specialty, or procedure (e.g. CABG, BMT)..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800"
          >
            <option value="ALL">All Medical Cities</option>
            <option value="Chennai">Chennai</option>
            <option value="Delhi NCR">Delhi NCR</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bengaluru">Bengaluru</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={specialtyFilter}
            onChange={(e) => setSpecialtyFilter(e.target.value)}
            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800"
          >
            <option value="ALL">All Specialties</option>
            <option value="Cardiothoracic & Vascular Surgery (CTVS)">Cardiac Surgery (CTVS)</option>
            <option value="Hemato-Oncology & Stem Cell Transplant">Bone Marrow Transplant</option>
            <option value="Neurosurgery & Spine Surgery">Neurosurgery & Spine</option>
            <option value="Robotic Joint Replacement & Arthroscopy">Joint Replacement</option>
            <option value="Uro-Oncology & Renal Transplantation">Renal & Urology</option>
            <option value="Precision Oncology & Immunotherapy">Medical Oncology</option>
          </select>
        </div>
      </div>

      {/* Non-superiority statement */}
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-slate-400 shrink-0" />
        <span>
          <strong>Factual Qualifications Notice:</strong> Profiles reflect verified university medical degrees and hospital credentials. In compliance with medical ethics, MEDTRAVEL INDIA does not publish subjective clinical rankings or superiority claims.
        </span>
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all p-6 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <img
                  src={doc.avatar}
                  alt={doc.name}
                  className="w-20 h-20 rounded-2xl object-cover border border-slate-200 shrink-0 shadow-xs"
                />
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[11px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded uppercase tracking-wider">
                      {doc.department}
                    </span>
                    <VerifiedBadge label="Verified Faculty" type="PARTNER" size="sm" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-tight">{doc.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{doc.title}</p>
                  <p className="text-xs text-brand-700 font-semibold flex items-center gap-1 mt-1">
                    <Building2 className="w-3.5 h-3.5" />
                    {doc.hospitalName} ({doc.city})
                  </p>
                </div>
              </div>

              {/* Factual Highlights */}
              <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Practice Experience</span>
                  <span className="font-bold text-slate-800">{doc.experienceYears}+ Years</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Languages</span>
                  <span className="font-medium text-slate-700 truncate block">{doc.languages.join(', ')}</span>
                </div>
              </div>

              {/* Areas of Expertise */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Focus Areas & Procedures
                </span>
                <div className="flex flex-wrap gap-1">
                  {doc.areasOfExpertise.map((exp, i) => (
                    <span
                      key={i}
                      className="text-[11px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-md"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Consultation availability */}
              <div className="text-[11px] text-slate-500 flex items-center gap-1.5 bg-slate-50 p-2.5 rounded-xl">
                <Calendar className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                <span>
                  <strong>Availability:</strong> {doc.consultationAvailability}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => onSelectDoctor(doc)}
                className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition text-center"
              >
                View Full Bio & Credentials
              </button>
              <button
                onClick={() => onRequestConsultation(doc)}
                className="py-2 px-4 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-xl shadow-xs transition shrink-0"
              >
                Book Teleconsultation
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
