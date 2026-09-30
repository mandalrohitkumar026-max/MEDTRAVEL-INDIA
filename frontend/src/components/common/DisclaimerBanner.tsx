import React, { useState } from 'react';
import { AlertCircle, X, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const DisclaimerBanner: React.FC = () => {
  const [closed, setClosed] = useState(false);
  const { t } = useLanguage();

  if (closed) return null;

  return (
    <div className="bg-slate-900 text-slate-100 text-xs py-2 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <p className="leading-snug">
            <strong className="text-amber-300 font-semibold uppercase tracking-wider text-[10px] mr-1.5 px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-500/30">
              Medical & Travel Notice
            </strong>
            {t('disclaimerMedical')}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden md:inline-block text-[11px] text-slate-400">
            Non-Diagnostic • Factual Comparison Only
          </span>
          <button
            onClick={() => setClosed(true)}
            className="text-slate-400 hover:text-white p-0.5 rounded hover:bg-slate-800 transition"
            aria-label="Dismiss disclaimer banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
