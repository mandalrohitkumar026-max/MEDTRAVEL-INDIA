import React, { useState, useMemo } from 'react';
import { mockTreatments } from '../data/mockTreatments';
import { mockCities } from '../data/mockCities';
import { HospitalCard } from '../components/hospitals/HospitalCard';
import { Hospital } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import { useJourney } from '../context/JourneyContext';
import { 
  Building2, 
  Search, 
  Filter, 
  RotateCcw, 
  Check, 
  Layers, 
  Plane, 
  Languages, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';

interface HospitalDiscoveryPageProps {
  onSelectForQuotation: (hospital: Hospital) => void;
  onViewDetails: (hospital: Hospital) => void;
  onNavigateToComparison: () => void;
}

export const HospitalDiscoveryPage: React.FC<HospitalDiscoveryPageProps> = ({
  onSelectForQuotation,
  onViewDetails,
  onNavigateToComparison,
}) => {
  const { formatPrice } = useCurrency();
  const { hospitals } = useJourney();

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('ALL');
  const [selectedSpecialty, setSelectedSpecialty] = useState('ALL');
  const [selectedAccreditation, setSelectedAccreditation] = useState<'ALL' | 'JCI' | 'NABH'>('ALL');
  const [selectedLanguage, setSelectedLanguage] = useState('ALL');
  const [maxAirportKm, setMaxAirportKm] = useState<number>(60);
  const [maxBudgetINR, setMaxBudgetINR] = useState<number>(1500000);
  const [requireLounge, setRequireLounge] = useState<boolean>(false);
  const [requireHalal, setRequireHalal] = useState<boolean>(false);

  // Extract all distinct specialties and languages
  const allSpecialties = useMemo(() => {
    const set = new Set<string>();
    hospitals.forEach((h) => h.specialties.forEach((s) => set.add(s)));
    return Array.from(set);
  }, [hospitals]);

  const allLanguages = useMemo(() => {
    const set = new Set<string>();
    hospitals.forEach((h) => h.languagesSupported.forEach((l) => set.add(l)));
    return Array.from(set);
  }, [hospitals]);

  // Filtered List
  const filteredHospitals = useMemo(() => {
    return hospitals.filter((h) => {
      // 1. Text Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = h.name.toLowerCase().includes(q);
        const matchCity = h.city.toLowerCase().includes(q);
        const matchSpec = h.specialties.some((s) => s.toLowerCase().includes(q));
        const matchTreat = h.popularTreatments.some((t) => t.toLowerCase().includes(q));
        if (!matchName && !matchCity && !matchSpec && !matchTreat) return false;
      }

      // 2. City
      if (selectedCity !== 'ALL' && h.city !== selectedCity) return false;

      // 3. Specialty
      if (selectedSpecialty !== 'ALL' && !h.specialties.includes(selectedSpecialty)) return false;

      // 4. Accreditation
      if (selectedAccreditation !== 'ALL' && !h.accreditations.includes(selectedAccreditation as any)) {
        return false;
      }

      // 5. Language
      if (selectedLanguage !== 'ALL' && !h.languagesSupported.includes(selectedLanguage)) {
        return false;
      }

      // 6. Airport distance
      if (h.distanceAirportKm > maxAirportKm) return false;

      // 7. Budget range
      if (h.approxTreatmentCostRange.minINR > maxBudgetINR) return false;

      // 8. Facilities
      if (requireLounge && !h.internationalPatientServices.lounge) return false;
      if (requireHalal && !h.internationalPatientServices.halalAndDietaryFood) return false;

      return true;
    });
  }, [
    searchQuery,
    selectedCity,
    selectedSpecialty,
    selectedAccreditation,
    selectedLanguage,
    maxAirportKm,
    maxBudgetINR,
    requireLounge,
    requireHalal,
  ]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCity('ALL');
    setSelectedSpecialty('ALL');
    setSelectedAccreditation('ALL');
    setSelectedLanguage('ALL');
    setMaxAirportKm(60);
    setMaxBudgetINR(1500000);
    setRequireLounge(false);
    setRequireHalal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Factual Quaternary Directory</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Hospital Discovery & Verification
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Discover accredited medical centers in India based on verifiable clinical credentials, language interpretation desks, and proximity to international transit hubs.
          </p>
        </div>

        <button
          onClick={onNavigateToComparison}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition self-start md:self-auto"
        >
          <Layers className="w-4 h-4 text-brand-400" />
          <span>Open Comparison Matrix</span>
        </button>
      </div>

      {/* Main Filter Bar & Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Filter Sidebar */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-6 h-fit">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
              <Filter className="w-4 h-4 text-brand-600" />
              <span>Filters</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs text-slate-500 hover:text-brand-600 font-medium flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>

          {/* Search Query */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
              Search Hospital or Treatment
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Bypass, Apollo, Fortis..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* City Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
              Destination City
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 font-medium"
            >
              <option value="ALL">All Cities in India</option>
              {mockCities.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name} ({c.airportCode})
                </option>
              ))}
            </select>
          </div>

          {/* Specialty Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
              Medical Specialty
            </label>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 font-medium"
            >
              <option value="ALL">All Specialties</option>
              {allSpecialties.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Accreditation Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
              Hospital Accreditation
            </label>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              {['ALL', 'JCI', 'NABH'].map((acc) => (
                <button
                  key={acc}
                  onClick={() => setSelectedAccreditation(acc as any)}
                  className={`py-1.5 px-2 rounded-lg font-semibold border transition text-center ${
                    selectedAccreditation === acc
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {acc}
                </button>
              ))}
            </div>
          </div>

          {/* Language Support Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
              Language Concierge
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 font-medium"
            >
              <option value="ALL">Any Language</option>
              {allLanguages.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          {/* Max Airport Distance Slider */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-bold text-slate-600 uppercase text-[10px]">Airport Proximity</span>
              <span className="font-bold text-brand-700">Within {maxAirportKm} km</span>
            </div>
            <input
              type="range"
              min="10"
              max="70"
              step="5"
              value={maxAirportKm}
              onChange={(e) => setMaxAirportKm(parseInt(e.target.value))}
              className="w-full accent-brand-600 cursor-pointer"
            />
          </div>

          {/* Budget Filter */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-bold text-slate-600 uppercase text-[10px]">Max Approx Budget</span>
              <span className="font-bold text-brand-700">{formatPrice(maxBudgetINR)}</span>
            </div>
            <input
              type="range"
              min="300000"
              max="1500000"
              step="50000"
              value={maxBudgetINR}
              onChange={(e) => setMaxBudgetINR(parseInt(e.target.value))}
              className="w-full accent-brand-600 cursor-pointer"
            />
          </div>

          {/* Facility Checkboxes */}
          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
            <span className="block font-bold text-slate-600 uppercase text-[10px]">Required Facilities</span>
            <label className="flex items-center gap-2 cursor-pointer text-slate-700">
              <input
                type="checkbox"
                checked={requireLounge}
                onChange={(e) => setRequireLounge(e.target.checked)}
                className="rounded text-brand-600 focus:ring-brand-500"
              />
              <span>Dedicated International Lounge</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-slate-700">
              <input
                type="checkbox"
                checked={requireHalal}
                onChange={(e) => setRequireHalal(e.target.checked)}
                className="rounded text-brand-600 focus:ring-brand-500"
              />
              <span>Halal / Custom Dietary Kitchen</span>
            </label>
          </div>
        </div>

        {/* Right Column: Hospital Results (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 bg-white p-3.5 rounded-2xl border border-slate-200">
            <span className="font-medium">
              Showing <strong className="text-slate-900">{filteredHospitals.length}</strong> accredited hospitals
            </span>
            <span className="text-[11px] text-slate-400">
              Ordered by verified factual documentation • No sponsored ranking
            </span>
          </div>

          {filteredHospitals.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No hospitals match your filter criteria</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try widening your budget range or clearing some of the facility filters to view available centers.
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs px-4 py-2 rounded-xl transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredHospitals.map((hospital) => (
                <HospitalCard
                  key={hospital.id}
                  hospital={hospital}
                  onSelectForQuotation={onSelectForQuotation}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
