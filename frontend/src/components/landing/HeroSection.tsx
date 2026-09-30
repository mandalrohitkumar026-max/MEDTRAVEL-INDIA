import React, { useState } from 'react';
import { 
  Plane, 
  Hotel, 
  Building2, 
  HeartPulse, 
  ArrowRight, 
  Search, 
  MapPin, 
  ShieldCheck, 
  Sparkles,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { mockTreatments } from '../../data/mockTreatments';
import { mockCities } from '../../data/mockCities';

interface HeroSectionProps {
  onStartJourney: () => void;
  onExploreHospitals: () => void;
  onSearch: (treatmentId: string, city: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartJourney,
  onExploreHospitals,
  onSearch,
}) => {
  const { t } = useLanguage();
  const [selectedTreatment, setSelectedTreatment] = useState(mockTreatments[0].id);
  const [selectedCity, setSelectedCity] = useState('Chennai');

  const handleSearchClick = () => {
    onSearch(selectedTreatment, selectedCity);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-white to-slate-50 border-b border-slate-200">
      {/* Subtle Background Glow Circles */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-brand-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-teal-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-14 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-4">
          {/* Trust Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-200/80 shadow-xs text-xs font-semibold text-brand-900">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            <span>First Release MVP • Factual Comparison • Direct Hospital Quotations</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Find a suitable hospital in India & plan your medical trip in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-teal-600">one place.</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            “Find your hospital. Plan your journey. Focus on your recovery.”
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onExploreHospitals}
              className="flex items-center gap-2 bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-700 hover:to-teal-700 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-brand-500/25 transition hover:scale-102 text-sm"
            >
              <span>Discover Accredited Hospitals</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onStartJourney}
              className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold px-6 py-3.5 rounded-2xl shadow-xs transition text-sm"
            >
              <span>Travel Checklist & Planner</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* 5-Step Core MVP Pipeline: DISCOVER → COMPARE → ESTIMATE → REQUEST → PLAN */}
        <div className="mt-10 max-w-4xl mx-auto">
          <div className="bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-md">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center mb-3">
              The 5-Step Medical Travel Flow
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 sm:gap-3 text-center">
              <div className="p-3 rounded-2xl bg-brand-50/70 border border-brand-100 flex flex-col items-center">
                <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-[11px] font-bold flex items-center justify-center mb-1">1</span>
                <span className="text-xs font-bold text-slate-900">DISCOVER</span>
                <span className="text-[10px] text-slate-500 mt-0.5">Accredited centers</span>
              </div>
              <div className="p-3 rounded-2xl bg-teal-50/70 border border-teal-100 flex flex-col items-center">
                <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-[11px] font-bold flex items-center justify-center mb-1">2</span>
                <span className="text-xs font-bold text-slate-900">COMPARE</span>
                <span className="text-[10px] text-slate-500 mt-0.5">Up to 3 hospitals</span>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex flex-col items-center">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center mb-1">3</span>
                <span className="text-xs font-bold text-slate-900">ESTIMATE</span>
                <span className="text-[10px] text-slate-500 mt-0.5">Total trip budget</span>
              </div>
              <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-100 flex flex-col items-center">
                <span className="w-6 h-6 rounded-full bg-sky-600 text-white text-[11px] font-bold flex items-center justify-center mb-1">4</span>
                <span className="text-xs font-bold text-slate-900">REQUEST</span>
                <span className="text-[10px] text-slate-500 mt-0.5">Direct quotation</span>
              </div>
              <div className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex flex-col items-center col-span-2 md:col-span-1">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center mb-1">5</span>
                <span className="text-xs font-bold text-slate-900">PLAN</span>
                <span className="text-[10px] text-slate-500 mt-0.5">Checklist & recovery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Search & Demo Journey Launcher */}
        <div className="mt-8 max-w-4xl mx-auto bg-white p-4 sm:p-5 rounded-2xl border border-slate-300 shadow-md">
          <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Search className="w-4 h-4 text-brand-600" />
              Find Hospitals by Treatment, City & Budget
            </span>
            <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
              Step 2 Demo: Kidney/Urology in Chennai (₹2–5L)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Treatment dropdown */}
            <div className="sm:col-span-5">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Treatment Required
              </label>
              <select
                value={selectedTreatment}
                onChange={(e) => setSelectedTreatment(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-brand-500"
              >
                {mockTreatments.map((t) => (
                  <option key={t.id} value={t.id}>{t.category}: {t.name}</option>
                ))}
              </select>
            </div>

            {/* City dropdown */}
            <div className="sm:col-span-3">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Destination City
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-brand-500"
              >
                <option value="Chennai">Chennai</option>
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Kochi">Kochi</option>
              </select>
            </div>

            {/* Budget Range */}
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Approx Budget
              </label>
              <select
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-brand-500"
              >
                <option value="2-5">₹2–5 Lakh</option>
                <option value="5-10">₹5–10 Lakh</option>
                <option value="10+">₹10+ Lakh</option>
              </select>
            </div>

            {/* Submit */}
            <div className="sm:col-span-2 pt-1 sm:pt-4">
              <button
                onClick={handleSearchClick}
                className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
              >
                <span>Find Hospitals</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
