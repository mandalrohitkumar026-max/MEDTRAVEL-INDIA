import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { JourneyPipeline } from '../components/landing/JourneyPipeline';
import { CostSavingsTable } from '../components/landing/CostSavingsTable';
import { mockHospitals } from '../data/mockHospitals';
import { mockTreatments } from '../data/mockTreatments';
import { mockReviews } from '../data/mockReviews';
import { HospitalCard } from '../components/hospitals/HospitalCard';
import { Hospital } from '../types';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  PhoneCall, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  Users,
  Compass,
  FileCheck2
} from 'lucide-react';

interface HomePageProps {
  setCurrentTab: (tab: string) => void;
  onSelectHospitalForQuotation: (hospital: Hospital) => void;
  onViewHospitalDetails: (hospital: Hospital) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setCurrentTab,
  onSelectHospitalForQuotation,
  onViewHospitalDetails,
}) => {
  const featuredHospitals = mockHospitals.slice(0, 3);

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Hero Section */}
      <HeroSection
        onStartJourney={() => setCurrentTab('planner')}
        onExploreHospitals={() => setCurrentTab('hospitals')}
        onSearch={(treatmentId, city) => {
          setCurrentTab('hospitals');
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* 2. The 7-Step Main User Journey */}
        <section>
          <JourneyPipeline onStepClick={(tab) => setCurrentTab(tab)} />
        </section>

        {/* 3. Top Treatments Explorer Grid */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-teal-700 uppercase tracking-widest bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
                Key Quaternary Specialties
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                Popular Treatment Specialties in India
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
                Explore procedures with high surgical volume, advanced robotic suites, and comprehensive post-operative care.
              </p>
            </div>
            <button
              onClick={() => setCurrentTab('treatments')}
              className="text-xs font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1 group self-start sm:self-auto"
            >
              <span>View All Treatments</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockTreatments.map((t) => (
              <div
                key={t.id}
                onClick={() => setCurrentTab('treatments')}
                className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-brand-300 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                    {t.category}
                  </span>
                  <h3 className="font-bold text-base text-slate-900 mt-2 group-hover:text-brand-700 transition">
                    {t.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {t.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Typical India Average</span>
                    <span className="font-bold text-slate-900">₹{t.averageCostINR.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Total Stay</span>
                    <span className="font-semibold text-slate-700">{t.typicalCityStayDays} Days</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Featured Verified Hospitals Showcase */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-brand-700 uppercase tracking-widest bg-brand-50 border border-brand-200 px-3 py-1 rounded-full">
                Accredited Healthcare Hubs
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                Verified Quaternary Care Hospitals
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
                Documented information on JCI and NABH accredited facilities with dedicated International Patient Departments.
              </p>
            </div>
            <button
              onClick={() => setCurrentTab('hospitals')}
              className="text-xs font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1 group self-start sm:self-auto"
            >
              <span>Explore All Hospitals</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHospitals.map((hospital) => (
              <HospitalCard
                key={hospital.id}
                hospital={hospital}
                onSelectForQuotation={onSelectHospitalForQuotation}
                onViewDetails={onViewHospitalDetails}
              />
            ))}
          </div>
        </section>

        {/* 5. Global Cost Comparison Benchmark */}
        <section>
          <CostSavingsTable onSelectTreatment={() => setCurrentTab('treatments')} />
        </section>

        {/* 6. Real Patient Service Reviews */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                Verified Experiences
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                What International Families Say
              </h2>
            </div>
            <button
              onClick={() => setCurrentTab('reviews')}
              className="text-xs font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1"
            >
              <span>All Reviews</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockReviews.slice(0, 2).map((rev) => (
              <div key={rev.id} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified Travel Stay
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{rev.content}"
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-slate-900">{rev.authorName} ({rev.country})</span>
                  <span>{rev.targetName}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Call To Action Banner */}
        <section className="bg-gradient-to-r from-brand-900 via-brand-800 to-teal-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-bold text-teal-300 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">
              Start Planning Now
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to coordinate your medical travel to India?
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Upload your medical reports, compare accredited hospitals, get an itemized quotation, and arrange airport-to-hotel logistics in one seamless platform.
            </p>
            <div className="pt-3 flex flex-wrap gap-3">
              <button
                onClick={() => setCurrentTab('planner')}
                className="bg-white text-slate-950 hover:bg-slate-100 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md transition"
              >
                Open Medical Travel Planner
              </button>
              <button
                onClick={() => setCurrentTab('ai-assistant')}
                className="bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md transition"
              >
                Ask MediGuide AI
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
