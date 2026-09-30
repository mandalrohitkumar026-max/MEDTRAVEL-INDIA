import React, { useState } from 'react';
import { mockCities } from '../data/mockCities';
import { useCurrency } from '../context/CurrencyContext';
import { 
  Compass, 
  Plane, 
  MapPin, 
  Building2, 
  Hotel, 
  Languages, 
  SunMedium, 
  Coins, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface CityExplorerPageProps {
  onSelectCityHospitals: (cityName: string) => void;
}

export const CityExplorerPage: React.FC<CityExplorerPageProps> = ({ onSelectCityHospitals }) => {
  const { formatPrice } = useCurrency();
  const [selectedCityId, setSelectedCityId] = useState(mockCities[0].id);

  const activeCity = mockCities.find((c) => c.id === selectedCityId) || mockCities[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full mb-2">
          <Compass className="w-3.5 h-3.5" />
          <span>Factual Medical Destination Guides</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Indian Healthcare Hubs & Medical Destinations
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Compare airport connectivity, living expenses, climate considerations, and clinical clusters across India’s primary healthcare destinations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* City Selector List (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Choose Destination Hub
          </span>
          {mockCities.map((city) => {
            const isSelected = city.id === selectedCityId;
            return (
              <button
                key={city.id}
                onClick={() => setSelectedCityId(city.id)}
                className={`w-full p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                  isSelected
                    ? 'border-brand-500 bg-brand-50/70 shadow-xs ring-2 ring-brand-500/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className={`text-sm font-bold ${isSelected ? 'text-brand-900' : 'text-slate-900'}`}>
                      {city.name}
                    </h3>
                    <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                      {city.airportCode}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{city.state}</p>
                </div>
                <div className="text-right text-xs text-slate-500">
                  <span className="font-bold text-slate-800">{city.hospitalCount}</span> Hospitals
                </div>
              </button>
            );
          })}
        </div>

        {/* Active City Details (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="relative h-64 w-full bg-slate-900">
              <img
                src={activeCity.image}
                alt={activeCity.name}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/20" />
              <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                  {activeCity.state}, India
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold">{activeCity.name}</h2>
                <p className="text-xs text-slate-300 flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5 text-brand-400" />
                  {activeCity.airportName} ({activeCity.airportCode}) • {activeCity.airportToCenterKm} km to medical district
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {/* Known For */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Healthcare Profile & Ecosystem
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {activeCity.knownFor}
                </p>
              </div>

              {/* City Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Daily Living Expense</span>
                  <span className="font-extrabold text-brand-700 text-sm">{formatPrice(activeCity.approxDailyLivingINR)}</span>
                  <span className="text-[10px] text-slate-500 block">Food, local travel, essentials</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Verified Hotels</span>
                  <span className="font-bold text-slate-800 text-sm">{activeCity.verifiedHotelsCount} Partner Stays</span>
                  <span className="text-[10px] text-slate-500 block">Near major hospital campuses</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Climate & Seasons</span>
                  <span className="font-semibold text-slate-800 line-clamp-2">{activeCity.climateNote}</span>
                </div>
              </div>

              {/* Specialties */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Primary Quaternary Specialties
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeCity.topSpecialties.map((spec, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium bg-brand-50 text-brand-800 border border-brand-200 px-3 py-1 rounded-lg"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Language Environment */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3 text-xs text-slate-600">
                <Languages className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 block">Language Environment:</strong>
                  {activeCity.languagesCommon.join(' • ')}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 pt-0 border-t border-slate-100">
            <button
              onClick={() => onSelectCityHospitals(activeCity.name)}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              <span>Explore Accredited Hospitals in {activeCity.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
