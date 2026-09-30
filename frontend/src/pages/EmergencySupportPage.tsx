import React, { useState } from 'react';
import { mockEmergencyCenters, mockNationalEmergencyContacts } from '../data/mockReviews';
import { 
  ShieldAlert, 
  PhoneCall, 
  MapPin, 
  Building2, 
  AlertTriangle, 
  UserCheck, 
  Compass,
  ExternalLink
} from 'lucide-react';

export const EmergencySupportPage: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('Chennai');

  const filteredCenters = mockEmergencyCenters.filter((c) => c.city === selectedCity);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-red-200 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-3 py-1 rounded-full mb-2">
          <ShieldAlert className="w-3.5 h-3.5 text-red-600 animate-pulse" />
          <span>India 24/7 Emergency & Casualty Network</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Emergency Assistance Directory
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Immediate access to national emergency ambulance dispatchers, Level 1 trauma casualties, hospital chest pain units, and patient attendant emergency links.
        </p>
      </div>

      {/* Strict Non-Diagnostic Medical Alert */}
      <div className="bg-red-50 border-2 border-red-500/80 rounded-3xl p-6 sm:p-7 space-y-2 text-red-950">
        <div className="flex items-center gap-2 font-bold text-base text-red-700">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <span>Strict Platform Emergency Protocol</span>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed">
          <strong>MEDTRAVEL INDIA does not provide emergency clinical diagnoses, triage assessments, or resuscitation instructions.</strong> If you or an accompanying family member experiences chest pain, breathlessness, sudden speech impairment, severe bleeding, or trauma, call the direct telephone lines below or proceed immediately to the nearest casualty department.
        </p>
      </div>

      {/* Universal Toll-Free Indian Emergency Numbers */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">
          National Universal Helplines (Dial From Any Phone in India)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mockNationalEmergencyContacts.map((c, i) => (
            <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800">{c.name}</span>
                <div className="text-xl font-extrabold text-red-600 tracking-wider mt-0.5">{c.number}</div>
              </div>
              <a
                href={`tel:${c.number.split('/')[0].trim()}`}
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Hospital Casualty Trauma Centers by City */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">
              Accredited Level 1 Casualty Departments
            </h2>
            <p className="text-xs text-slate-500">
              Direct hotlines to hospital emergency reception desks.
            </p>
          </div>

          <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto text-xs">
            {['Chennai', 'Delhi NCR', 'Mumbai', 'Bengaluru'].map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3 py-1.5 rounded-lg font-bold transition ${
                  selectedCity === city
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredCenters.map((center) => (
            <div
              key={center.id}
              className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-extrabold text-red-600 uppercase tracking-wider bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                    {center.traumaLevel}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-brand-600" />
                    {center.hospitalName}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    {center.address}
                  </p>
                </div>

                <a
                  href={`tel:${center.emergencyPhone.split('/')[0].trim()}`}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition flex items-center gap-2 self-start sm:self-auto"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Hospital ER</span>
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-medium">Direct Ambulance Dispatch</span>
                  <span className="font-extrabold text-slate-900 text-sm">{center.ambulanceDirectPhone}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-medium">International Desk Emergency Liaison</span>
                  <span className="font-bold text-brand-700 text-sm">{center.intlPatientHelpline}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Attendant Details */}
      <div className="p-6 bg-blue-50 border border-blue-200 rounded-3xl flex items-start gap-4 text-xs text-blue-950">
        <UserCheck className="w-6 h-6 text-brand-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-bold text-sm text-brand-900">Designated Patient Attendant Contact</h4>
          <p className="leading-relaxed">
            Patient: <strong>Ahmed Hossain</strong> | Primary Caregiver: <strong>Nasreen Hossain (+880 1711 000000)</strong>
            <br />
            Hospital Liaison Officer in Chennai: <strong>Dr. K. Nair (+91 44 2829 3333)</strong>
          </p>
        </div>
      </div>
    </div>
  );
};
