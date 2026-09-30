import React, { useState } from 'react';
import { Treatment } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import { useJourney } from '../context/JourneyContext';
import { 
  HeartPulse, 
  Clock, 
  Bed, 
  FileCheck2, 
  CheckCircle2, 
  Coins, 
  Calculator, 
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface TreatmentExplorerPageProps {
  onEstimateCost: (treatmentId: string) => void;
  onRequestQuote: () => void;
  onFindHospitals?: (treatmentId: string, city: string, budget: string) => void;
}

export const TreatmentExplorerPage: React.FC<TreatmentExplorerPageProps> = ({
  onEstimateCost,
  onRequestQuote,
  onFindHospitals,
}) => {
  const { formatPrice } = useCurrency();
  const { treatments } = useJourney();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedId, setSelectedId] = useState(treatments[0]?.id || 'treat-kidney-tx');
  const [selectedCity, setSelectedCity] = useState<string>('Chennai');
  const [selectedBudget, setSelectedBudget] = useState<string>('2-5');

  const categories = [
    'All',
    'Kidney/Urology',
    'Cardiology',
    'Orthopedics',
    'Oncology',
    'Neurology',
    'Gastroenterology',
    'Cosmetic surgery',
    'General surgery'
  ];

  const filteredTreatments = selectedCategory === 'All' 
    ? treatments 
    : treatments.filter(t => t.category === selectedCategory);

  const activeTreatment = treatments.find((t) => t.id === selectedId) || filteredTreatments[0] || treatments[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full mb-2">
          <HeartPulse className="w-3.5 h-3.5" />
          <span>Surgical Procedures & Clinical Overview</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Treatment & Surgical Package Explorer
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Review standard pre-operative diagnostic tests, estimated hospital inpatient days, city recuperation timelines, and international cost benchmarks.
        </p>
      </div>

      {/* Category Filter Pills (Section 2: 8 MVP Categories) */}
      <div className="flex flex-wrap items-center gap-2 pb-2 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              const matched = cat === 'All' ? treatments[0] : treatments.find(t => t.category === cat);
              if (matched) setSelectedId(matched.id);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              selectedCategory === cat
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Treatment Selection List (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Select Medical Procedure ({filteredTreatments.length})
          </span>
          {filteredTreatments.map((t) => {
            const isSelected = t.id === selectedId;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedId(t.id)}
                className={`w-full p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
                  isSelected
                    ? 'border-brand-500 bg-brand-50/70 shadow-sm ring-2 ring-brand-500/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    isSelected ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {t.category}
                  </span>
                  <h3 className={`text-sm font-bold mt-1.5 ${isSelected ? 'text-brand-900' : 'text-slate-800'}`}>
                    {t.name}
                  </h3>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Avg: <strong className="text-slate-900">{formatPrice(t.averageCostINR)}</strong></span>
                  <span>{t.typicalHospitalStayDays}d hospital • {t.typicalCityStayDays}d total</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Active Treatment Detail Card (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
                {activeTreatment.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                {activeTreatment.name}
              </h2>
            </div>
            <div className="text-left sm:text-right shrink-0">
              <span className="text-xs text-slate-400 block font-medium">Estimated Package Average</span>
              <span className="text-2xl font-extrabold text-brand-700">
                {formatPrice(activeTreatment.averageCostINR)}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {activeTreatment.description}
          </p>

          {/* Timeline & Stay Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Hospital Inpatient</span>
              <span className="text-base font-extrabold text-slate-900">{activeTreatment.typicalHospitalStayDays} Days</span>
              <span className="text-[11px] text-slate-500 block">ICU & surgical room</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Recommended Stay</span>
              <span className="text-base font-extrabold text-teal-700">{activeTreatment.typicalCityStayDays} Days</span>
              <span className="text-[11px] text-slate-500 block">Pre-op workup to Fit-to-Fly</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">US Comparative Cost</span>
              <span className="text-base font-extrabold text-slate-800">${activeTreatment.usCostUSD.toLocaleString()}</span>
              <span className="text-[11px] text-emerald-600 font-semibold block">Approx 80% savings in India</span>
            </div>
          </div>

          {/* Common Indications */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Common Clinical Indications for overseas referral
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {activeTreatment.commonIndications.map((ind, i) => (
                <div key={i} className="flex items-start gap-2 text-slate-700 p-2.5 bg-slate-50 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{ind}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pre-Op Diagnostic Reports Required */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-brand-600" />
              Pre-Operative Diagnostics to Bring or Upload
            </h4>
            <div className="space-y-1.5 text-xs text-slate-600">
              {activeTreatment.preOpDiagnostics.map((diag, i) => (
                <div key={i} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                  <span>{diag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recovery Highlights */}
          <div className="p-4 bg-teal-50/70 border border-teal-200/80 rounded-2xl text-xs space-y-1 text-teal-950">
            <span className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              Recovery & Travel Clearance Protocol
            </span>
            <p className="text-teal-900 leading-relaxed">
              {activeTreatment.recoveryHighlights}
            </p>
          </div>

          {/* Patient 3-Step Selection: Treatment -> City -> Budget (Section 2) */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Step-by-Step Hospital Matchmaker (Treatment → City → Budget)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Selected Treatment</label>
                <div className="p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 truncate">
                  {activeTreatment.name}
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Preferred City in India</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
                >
                  <option value="Chennai">Chennai (Medical Capital)</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Kochi">Kochi</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Approximate Budget</label>
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
                >
                  <option value="2-5">₹2,00,000 – ₹5,00,000</option>
                  <option value="5-10">₹5,00,000 – ₹10,00,000</option>
                  <option value="10+">₹10,00,000+</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  if (onFindHospitals) {
                    onFindHospitals(activeTreatment.id, selectedCity, selectedBudget);
                  }
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm transition"
              >
                <span>Find Relevant Hospitals in {selectedCity}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => onEstimateCost(activeTreatment.id)}
              className="flex items-center gap-2 bg-brand-50 hover:bg-brand-100 text-brand-800 border border-brand-200 font-bold text-xs px-5 py-2.5 rounded-xl transition"
            >
              <Calculator className="w-4 h-4 text-brand-600" />
              <span>Calculate Total Travel Budget</span>
            </button>

            <button
              onClick={onRequestQuote}
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md transition"
            >
              <span>Request Hospital Quotation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
