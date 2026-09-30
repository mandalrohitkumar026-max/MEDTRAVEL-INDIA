import React from 'react';
import { useComparison } from '../../context/ComparisonContext';
import { useJourney } from '../../context/JourneyContext';
import { Layers, X, ArrowRight, Check } from 'lucide-react';

interface ComparisonDrawerProps {
  onOpenComparisonPage: () => void;
}

export const ComparisonDrawer: React.FC<ComparisonDrawerProps> = ({ onOpenComparisonPage }) => {
  const { selectedHospitalIds, removeHospital, clearComparison } = useComparison();
  const { hospitals } = useJourney();

  if (selectedHospitalIds.length === 0) return null;

  const selectedHospitals = hospitals.filter((h) => selectedHospitalIds.includes(h.id));

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-4xl bg-slate-900/95 backdrop-blur-md text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl border border-slate-700 animate-slideUp">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-300">
              Comparing Hospitals ({selectedHospitalIds.length} of 4)
            </div>
            <div className="flex flex-wrap items-center gap-1.5 mt-1">
              {selectedHospitals.map((h) => (
                <span
                  key={h.id}
                  className="inline-flex items-center gap-1 text-[11px] bg-slate-800 border border-slate-700 rounded-md px-2 py-0.5 text-slate-200"
                >
                  <span className="truncate max-w-[120px]">{h.name.split(',')[0]}</span>
                  <button
                    onClick={() => removeHospital(h.id)}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={clearComparison}
            className="text-xs text-slate-400 hover:text-white px-2 py-1 transition"
          >
            Clear All
          </button>
          <button
            onClick={onOpenComparisonPage}
            className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-md transition"
          >
            Compare Side-by-Side
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
