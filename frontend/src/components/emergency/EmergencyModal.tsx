import React, { useState } from 'react';
import { PhoneCall, AlertTriangle, X, ShieldAlert, MapPin, Building2, UserCheck } from 'lucide-react';
import { mockEmergencyCenters, mockNationalEmergencyContacts } from '../../data/mockReviews';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToFullPage?: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose, onNavigateToFullPage }) => {
  const [selectedCity, setSelectedCity] = useState<string>('Chennai');

  if (!isOpen) return null;

  const filteredCenters = mockEmergencyCenters.filter((c) => c.city === selectedCity);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-red-500 max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-red-600 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center animate-pulse">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-extrabold tracking-widest bg-red-800/80 px-2 py-0.5 rounded">
                  24/7 SOS Desk
                </span>
                <span className="text-xs bg-red-700/60 px-2 py-0.5 rounded text-red-100">
                  India Medical Helplines
                </span>
              </div>
              <h2 className="text-xl font-bold mt-0.5">Emergency Assistance & Ambulance</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Non-Diagnostic Disclaimer */}
        <div className="bg-red-50 border-b border-red-100 px-5 py-3 flex items-start gap-2.5">
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <p className="text-xs text-red-900 leading-relaxed font-medium">
            <strong>Platform Safety Notice:</strong> This emergency module is for immediate communication and ambulance dispatch only. MEDTRAVEL INDIA does not provide emergency diagnosis or medical instructions. If you or your attendant are experiencing severe symptoms, call <strong>112</strong> or go to the nearest emergency trauma department immediately.
          </p>
        </div>

        <div className="p-5 overflow-y-auto space-y-5">
          {/* Quick Direct Dial Numbers */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
              National Emergency Helplines (Toll-Free in India)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {mockNationalEmergencyContacts.map((contact, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-800">{contact.name}</div>
                    <div className="text-base font-extrabold text-red-600 tracking-wide">{contact.number}</div>
                  </div>
                  <a
                    href={`tel:${contact.number.split('/')[0].trim()}`}
                    className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    Call
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Hospital Casualty Hubs by City */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Partner Hospital 24/7 Casualty Units
              </h3>
              <div className="flex gap-1">
                {['Chennai', 'Delhi NCR', 'Mumbai', 'Bengaluru'].map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-medium transition ${
                      selectedCity === city
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredCenters.map((center) => (
                <div key={center.id} className="p-4 border border-slate-200 rounded-xl bg-white shadow-sm space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider">
                        {center.traumaLevel}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-brand-600" />
                        {center.hospitalName}
                      </h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        {center.address}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-[11px] text-slate-500 block">Hospital Emergency Line</span>
                      <span className="text-sm font-bold text-slate-800">{center.emergencyPhone}</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 block">International Desk Liaison</span>
                      <span className="text-sm font-semibold text-brand-700">{center.intlPatientHelpline}</span>
                    </div>
                    <a
                      href={`tel:${center.emergencyPhone.split('/')[0].trim()}`}
                      className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm transition"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      Direct Hospital ER
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Patient Emergency Attendant Coordinator Info */}
          <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl flex items-center gap-3">
            <UserCheck className="w-5 h-5 text-brand-700 shrink-0" />
            <div className="text-xs text-slate-700">
              <strong className="text-brand-900 block font-semibold">Attendant SOS Contact Person:</strong>
              Your registered attendant <strong>Nasreen Hossain (+880 1711 000000)</strong> has emergency access credentials linked with your Chennai patient coordinator.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              if (onNavigateToFullPage) onNavigateToFullPage();
            }}
            className="text-xs text-brand-700 hover:text-brand-800 font-semibold underline"
          >
            View Complete Emergency Guide & Embassy Contacts →
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg text-xs transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
