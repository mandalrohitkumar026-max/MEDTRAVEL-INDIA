import React from 'react';
import { HeartPulse, ShieldCheck, Globe, Users, Award, Building2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12 animate-fadeIn">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-xs font-bold text-brand-700">
          <HeartPulse className="w-3.5 h-3.5 text-brand-600" />
          <span>About MEDTRAVEL INDIA</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          From Airport to Recovery
        </h1>
        <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
          One integrated coordination platform bridging international patients with India's accredited hospitals, verified physicians, accessible lodging, and dedicated transportation.
        </p>
      </div>

      {/* Mission & Purpose */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
            Our Purpose
          </span>
          <h2 className="text-2xl font-bold text-slate-900">
            Eliminating the Friction of Cross-Border Healthcare
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Every year, hundreds of thousands of patients from South Asia, the Middle East, Central Asia, and Africa travel to India for complex cardiovascular, oncology, orthopedic, and organ transplant procedures.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            While clinical outcomes in Indian quaternary centers are internationally acclaimed, patients often struggle with confusing hospital options, language barriers, fragmented accommodation, and opaque pricing. MEDTRAVEL INDIA solves this with a single, transparent, and empathetic platform.
          </p>
        </div>

        <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Factual Transparency</h3>
              <p className="text-xs text-slate-500">Documented metrics without promotional bias</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Multilingual Ecosystem</h3>
              <p className="text-xs text-slate-500">Arabic, Bengali, Hindi, French, Russian liaison</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Family & Attendant Support</h3>
              <p className="text-xs text-slate-500">Integrated lodging & transportation for loved ones</p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Ethics Checklist */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-slate-900">Our Commitments to International Families</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
            <strong className="text-slate-900 block font-semibold">1. We Are Not a Hospital</strong>
            <p className="text-slate-500">We do not practice medicine or make clinical diagnoses. All evaluations are conducted by licensed doctors.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
            <strong className="text-slate-900 block font-semibold">2. No Arbitrary "Best Hospital" Badges</strong>
            <p className="text-slate-500">We present verifiable facts: bed counts, ICU strength, NABH/JCI accreditations, and published tariff ranges.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
            <strong className="text-slate-900 block font-semibold">3. Strict Data Consent</strong>
            <p className="text-slate-500">Your diagnostic scans are never shared with any hospital without your explicit consent checkmark.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
            <strong className="text-slate-900 block font-semibold">4. Official Immigration Guidance</strong>
            <p className="text-slate-500">We provide step-by-step guidance for official Government of India portals and never charge visa processing markups.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
