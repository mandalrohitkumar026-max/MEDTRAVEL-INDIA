import React from 'react';
import { useComparison } from '../context/ComparisonContext';
import { useCurrency } from '../context/CurrencyContext';
import { useJourney } from '../context/JourneyContext';
import { Hospital } from '../types';
import { 
  Layers, 
  X, 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Plane, 
  Hotel, 
  Car, 
  Languages, 
  Check, 
  ArrowRight,
  AlertCircle,
  Plus
} from 'lucide-react';

interface HospitalComparisonPageProps {
  onRequestQuotation: (hospital: Hospital) => void;
  onNavigateToDiscovery: () => void;
}

export const HospitalComparisonPage: React.FC<HospitalComparisonPageProps> = ({
  onRequestQuotation,
  onNavigateToDiscovery,
}) => {
  const { selectedHospitalIds, removeHospital, clearComparison } = useComparison();
  const { formatPrice } = useCurrency();
  const { hospitals } = useJourney();

  const hospitalsToCompare = hospitals.filter((h) => selectedHospitalIds.includes(h.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Side-by-Side Evaluation</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Hospital Comparison Matrix
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Factual side-by-side comparison of accredited medical centers. Documented information is displayed impartially without declaring an arbitrary winner.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {hospitalsToCompare.length > 0 && (
            <button
              onClick={clearComparison}
              className="text-xs text-slate-500 hover:text-slate-800 px-3 py-2 border border-slate-200 rounded-xl transition"
            >
              Clear Comparison
            </button>
          )}
          <button
            onClick={onNavigateToDiscovery}
            className="flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-xs transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add More Hospitals</span>
          </button>
        </div>
      </div>

      {hospitalsToCompare.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
          <Layers className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">No Hospitals Selected for Comparison</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Select up to 4 hospitals from the Hospital Discovery directory to analyze factual accreditation, bed counts, language support, and airport commute times side-by-side.
          </p>
          <button
            onClick={onNavigateToDiscovery}
            className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition"
          >
            Browse Hospital Directory →
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Strict Non-Superiority Disclaimer */}
          <div className="p-3 bg-amber-50 border-b border-amber-100 flex items-center gap-2 text-xs text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Factual Comparison Guarantee:</strong> Comparison metrics reflect published hospital bed strengths, accreditations, and standard package guidelines. The platform does not claim any hospital is clinically superior.
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  <th className="p-4 w-48 font-bold text-slate-500 uppercase tracking-wider text-[11px] bg-slate-50/50 sticky left-0 z-10">
                    Comparison Field
                  </th>
                  {hospitalsToCompare.map((h) => (
                    <th key={h.id} className="p-4 min-w-[240px] max-w-[280px] align-top">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold text-brand-700 uppercase tracking-wider">
                            {h.city}
                          </span>
                          <h3 className="text-sm font-bold text-slate-900 leading-tight mt-0.5">
                            {h.name}
                          </h3>
                        </div>
                        <button
                          onClick={() => removeHospital(h.id)}
                          className="text-slate-400 hover:text-red-600 p-1 rounded-md"
                          title="Remove from comparison"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {/* 1. Accreditations */}
                <tr>
                  <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white">
                    Accreditation & Standards
                  </td>
                  {hospitalsToCompare.map((h) => (
                    <td key={h.id} className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {h.accreditations.map((acc) => (
                          <span
                            key={acc}
                            className="inline-flex items-center gap-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full"
                          >
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            {acc}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 2. City & State */}
                <tr>
                  <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white">
                    Location & State
                  </td>
                  {hospitalsToCompare.map((h) => (
                    <td key={h.id} className="p-4 text-slate-800">
                      <div className="font-semibold">{h.city}, {h.state}</div>
                      <div className="text-[11px] text-slate-400 truncate">{h.address}</div>
                    </td>
                  ))}
                </tr>

                {/* 3. Airport Distance & Drive Time */}
                <tr>
                  <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white">
                    Airport Proximity
                  </td>
                  {hospitalsToCompare.map((h) => (
                    <td key={h.id} className="p-4">
                      <div className="font-bold text-slate-900 flex items-center gap-1">
                        <Plane className="w-3.5 h-3.5 text-brand-600" />
                        <span>{h.distanceAirportKm} km</span>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Approx {h.airportDriveMinutes} min drive via express corridors
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 4. Capacity & ICU Beds */}
                <tr>
                  <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white">
                    Bed Strength & ICU
                  </td>
                  {hospitalsToCompare.map((h) => (
                    <td key={h.id} className="p-4 text-slate-800 font-medium">
                      {h.totalBeds} Inpatient Beds • <strong className="text-brand-700">{h.icuBeds} ICU Beds</strong>
                    </td>
                  ))}
                </tr>

                {/* 5. Approx Treatment Cost Bracket */}
                <tr>
                  <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white">
                    Approx Treatment Range
                  </td>
                  {hospitalsToCompare.map((h) => (
                    <td key={h.id} className="p-4">
                      <span className="font-bold text-sm text-slate-900">
                        {formatPrice(h.approxTreatmentCostRange.minINR)} – {formatPrice(h.approxTreatmentCostRange.maxINR)}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        *Subject to physical diagnostic evaluation
                      </span>
                    </td>
                  ))}
                </tr>

                {/* 6. Key Quaternary Specialties */}
                <tr>
                  <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white">
                    Key Specialties
                  </td>
                  {hospitalsToCompare.map((h) => (
                    <td key={h.id} className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {h.specialties.map((s, idx) => (
                          <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 7. Languages Supported */}
                <tr>
                  <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white">
                    Language Interpreters
                  </td>
                  {hospitalsToCompare.map((h) => (
                    <td key={h.id} className="p-4 text-slate-800">
                      <div className="flex items-center gap-1 font-medium">
                        <Languages className="w-3.5 h-3.5 text-brand-600" />
                        <span>{h.languagesSupported.join(', ')}</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 8. International Patient Services */}
                <tr>
                  <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white">
                    International Patient Desk
                  </td>
                  {hospitalsToCompare.map((h) => (
                    <td key={h.id} className="p-4 space-y-1 text-[11px] text-slate-600">
                      <div className="flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-600" /> Dedicated Airport Liaison Desk
                      </div>
                      <div className="flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-600" /> Visa Invitation Letters (VIL)
                      </div>
                      <div className="flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-600" /> Currency Exchange On-Site
                      </div>
                      <div className="flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-600" /> Halal & Custom Meal Support
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 9. Nearby Hotels Count */}
                <tr>
                  <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white">
                    Nearby Accommodations
                  </td>
                  {hospitalsToCompare.map((h) => (
                    <td key={h.id} className="p-4 text-slate-800 font-medium">
                      <Hotel className="w-3.5 h-3.5 text-amber-500 inline mr-1" />
                      {h.nearbyHotelsCount} verified patient stays within 3 km
                    </td>
                  ))}
                </tr>

                {/* 10. Consultation Process */}
                <tr>
                  <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white">
                    Quotation & Consultation
                  </td>
                  {hospitalsToCompare.map((h) => (
                    <td key={h.id} className="p-4">
                      <button
                        onClick={() => onRequestQuotation(h)}
                        className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs py-2.5 px-3 rounded-xl shadow-xs transition flex items-center justify-center gap-1"
                      >
                        <span>Request Official Quote</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
