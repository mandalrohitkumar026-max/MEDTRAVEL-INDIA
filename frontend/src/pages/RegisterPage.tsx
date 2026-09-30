import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useJourney } from '../context/JourneyContext';
import { mockTreatments } from '../data/mockTreatments';
import { mockCities } from '../data/mockCities';
import { 
  HeartPulse, 
  User, 
  Mail, 
  Lock, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Phone, 
  Globe, 
  AlertTriangle 
} from 'lucide-react';

interface RegisterPageProps {
  onNavigateLogin: () => void;
  onRegisterSuccess: () => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigateLogin, onRegisterSuccess }) => {
  const { register } = useAuth();
  const { updateProfile } = useJourney();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Bangladesh');
  const [preferredLanguage, setPreferredLanguage] = useState('Bengali');
  const [treatmentId, setTreatmentId] = useState(mockTreatments[0].id);
  const [city, setCity] = useState('Chennai');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('');
  const [emergencyContactRel, setEmergencyContactRel] = useState('Spouse');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName: name || 'International Patient',
      country,
      phone,
      preferredLanguage,
      preferredCity: city,
      selectedTreatmentId: treatmentId,
      emergencyContact: {
        name: emergencyContactName || 'Accompanying Attendant',
        phone: emergencyContactPhone || phone,
        relationship: emergencyContactRel,
      }
    });

    register({
      name: name || 'International Patient',
      email: email || 'patient@demo.org',
      country,
      phone,
    });
    onRegisterSuccess();
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 space-y-6 animate-fadeIn">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-teal-500 text-white flex items-center justify-center mx-auto shadow-md">
          <HeartPulse className="w-7 h-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Patient Onboarding & Registration
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Create your international patient profile to coordinate hospitals, documents, visas, and accommodation
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Personal Info */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Full Legal Name (as per Passport)</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ahmed Hossain"
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Phone Number (with Country Code)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +880 1711 000000"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Country of Residence</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="e.g. Bangladesh / Oman / Kenya"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Preferred Language for Liaison</label>
              <select
                value={preferredLanguage}
                onChange={(e) => setPreferredLanguage(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
              >
                <option value="Bengali">বাংলা (Bengali)</option>
                <option value="English">English</option>
                <option value="Arabic">العربية (Arabic)</option>
                <option value="Hindi">हिंदी (Hindi)</option>
                <option value="French">Français (French)</option>
                <option value="Russian">Русский (Russian)</option>
                <option value="Spanish">Español (Spanish)</option>
              </select>
            </div>
          </div>

          {/* Treatment & City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Primary Treatment Needed</label>
              <select
                value={treatmentId}
                onChange={(e) => setTreatmentId(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
              >
                {mockTreatments.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Preferred Destination City in India</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
              >
                {mockCities.map((c) => (
                  <option key={c.id} value={c.name}>{c.name} ({c.airportCode})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Emergency Contact Information (Item Phase 2) */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
              Emergency Contact & Accompanying Attendant
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] text-slate-500 font-semibold mb-1">Contact Name</label>
                <input
                  type="text"
                  value={emergencyContactName}
                  onChange={(e) => setEmergencyContactName(e.target.value)}
                  placeholder="e.g. Nasreen Hossain"
                  className="w-full p-2 bg-white border rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 font-semibold mb-1">Contact Phone</label>
                <input
                  type="tel"
                  value={emergencyContactPhone}
                  onChange={(e) => setEmergencyContactPhone(e.target.value)}
                  placeholder="e.g. +880 1711 000000"
                  className="w-full p-2 bg-white border rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 font-semibold mb-1">Relationship</label>
                <select
                  value={emergencyContactRel}
                  onChange={(e) => setEmergencyContactRel(e.target.value)}
                  className="w-full p-2 bg-white border rounded-xl"
                >
                  <option value="Spouse">Spouse</option>
                  <option value="Child / Son / Daughter">Child</option>
                  <option value="Parent / Sibling">Parent / Sibling</option>
                  <option value="Caregiver">Caregiver</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 leading-snug">
            By registering, you acknowledge that MEDTRAVEL INDIA provides travel coordination and informational assistance, and is not a medical provider.
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-md transition text-xs flex items-center justify-center gap-1.5"
          >
            <span>Complete Registration & Open Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-500">
          Already registered?{' '}
          <button
            onClick={onNavigateLogin}
            className="font-bold text-brand-600 hover:text-brand-700 underline"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};
