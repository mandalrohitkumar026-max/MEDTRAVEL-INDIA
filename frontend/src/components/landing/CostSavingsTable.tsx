import React from 'react';
import { mockTreatments } from '../../data/mockTreatments';
import { useCurrency } from '../../context/CurrencyContext';
import { TrendingDown, AlertCircle } from 'lucide-react';

export const CostSavingsTable: React.FC<{ onSelectTreatment: (id: string) => void }> = ({ onSelectTreatment }) => {
  const { formatPrice } = useCurrency();

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200/70 px-2.5 py-1 rounded-full mb-2">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Factual Global Cost Comparison</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            International Procedure Price Benchmarks
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Indicative averages for common surgical interventions compared against standard commercial rates in Western and South Asian countries.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
              <th className="py-3.5 px-4">Treatment / Surgery</th>
              <th className="py-3.5 px-4 text-brand-700">Estimated India Rate</th>
              <th className="py-3.5 px-4">United States (USD)</th>
              <th className="py-3.5 px-4">United Kingdom (GBP)</th>
              <th className="py-3.5 px-4">Bangladesh (BDT)</th>
              <th className="py-3.5 px-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockTreatments.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50/80 transition">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-slate-900">{t.name}</div>
                  <div className="text-[11px] text-slate-500">{t.category}</div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="font-bold text-sm text-brand-700 bg-brand-50/80 px-2 py-0.5 rounded-md">
                    {formatPrice(t.averageCostINR)}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-700">
                  ${t.usCostUSD.toLocaleString()}
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-700">
                  £{t.ukCostGBP.toLocaleString()}
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-700">
                  ৳{t.bangladeshCostBDT.toLocaleString()}
                </td>
                <td className="py-3.5 px-4">
                  <button
                    onClick={() => onSelectTreatment(t.id)}
                    className="text-xs text-brand-600 hover:text-brand-800 font-bold underline"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p>
          Comparative international pricing reflects documented published healthcare industry estimates. Variations occur based on hospital tier, room category, patient comorbidities, and surgeon seniority. Always obtain an itemized quotation directly from the hospital.
        </p>
      </div>
    </div>
  );
};
