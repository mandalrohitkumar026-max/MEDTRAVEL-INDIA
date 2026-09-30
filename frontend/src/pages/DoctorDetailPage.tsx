import React, { useState } from 'react';
import { Doctor } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import { VerifiedBadge } from '../components/common/VerifiedBadge';
import { 
  Building2, 
  MapPin, 
  Languages, 
  GraduationCap, 
  Calendar, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Send,
  AlertCircle
} from 'lucide-react';

interface DoctorDetailPageProps {
  doctor: Doctor;
  onBack: () => void;
  onRequestConsultationSuccess: () => void;
}

export const DoctorDetailPage: React.FC<DoctorDetailPageProps> = ({
  doctor,
  onBack,
  onRequestConsultationSuccess,
}) => {
  const { formatPrice } = useCurrency();
  const [preferredDate, setPreferredDate] = useState('2026-10-18');
  const [patientNotes, setPatientNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onRequestConsultationSuccess();
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-xl transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Doctors</span>
      </button>

      {/* Main Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <img
            src={doctor.avatar}
            alt={doctor.name}
            className="w-28 h-28 rounded-3xl object-cover border border-slate-200 shadow-md shrink-0"
          />
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded uppercase tracking-wider">
                {doctor.department}
              </span>
              <VerifiedBadge label="Verified Faculty" type="PARTNER" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{doctor.name}</h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">{doctor.title}</p>
            <p className="text-xs text-brand-700 font-semibold flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              {doctor.hospitalName}, {doctor.city}
            </p>
          </div>
        </div>

        {/* Factual Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Practice Experience</span>
            <span className="font-bold text-slate-800 text-sm">{doctor.experienceYears}+ Years</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Spoken Languages</span>
            <span className="font-semibold text-slate-800">{doctor.languages.join(', ')}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Teleconsultation Fee</span>
            <span className="font-bold text-brand-700 text-sm">{formatPrice(doctor.consultationFeeINR)}</span>
          </div>
        </div>

        {/* Professional Qualifications */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-brand-600" />
            Verified Medical Qualifications & Fellowships
          </h3>
          <ul className="space-y-1 text-xs text-slate-600">
            {doctor.qualifications.map((q, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Clinical Biography */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Clinical Biography & Department Overview
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {doctor.bio}
          </p>
        </div>

        {/* Booking Form or Confirmation */}
        <div className="pt-4 border-t border-slate-200">
          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="text-sm font-bold text-emerald-900">Teleconsultation Request Received!</h4>
              <p className="text-xs text-emerald-700 max-w-md mx-auto">
                The international scheduling team at {doctor.hospitalName} will contact you via WhatsApp / email to confirm video slot and translate diagnostic records.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-600" />
                Request Video Teleconsultation with {doctor.name}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Preferred Consultation Date</label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-300 rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Standard Availability</label>
                  <div className="p-2 bg-slate-100 rounded-xl text-slate-600">
                    {doctor.consultationAvailability}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Brief Medical Concern / Questions for the Doctor
                </label>
                <textarea
                  rows={2}
                  value={patientNotes}
                  onChange={(e) => setPatientNotes(e.target.value)}
                  placeholder="Outline prior surgeries, recent symptoms, or specific questions about travel readiness..."
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-500">
                  Non-diagnostic preliminary medical review
                </span>
                <button
                  type="submit"
                  className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm transition flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Appointment Request</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
