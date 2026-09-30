import React from 'react';
import { 
  Compass, 
  Layers, 
  CalendarClock, 
  Plane, 
  Stethoscope, 
  HeartPulse, 
  Home, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  HelpCircle,
  FileCheck2
} from 'lucide-react';

export const HowItWorksPage: React.FC<{ onStartJourney: () => void }> = ({ onStartJourney }) => {
  const steps = [
    {
      num: '01',
      title: 'Discover & Select Procedure',
      desc: 'Browse accredited Indian quaternary hospitals by medical specialty (Cardiology, Oncology, Orthopedics, Transplants, Neuro). Review documented bed counts, ICU facilities, and language concierges without sponsored rankings.',
      icon: Compass,
      tag: 'Discovery Phase'
    },
    {
      num: '02',
      title: 'Compare Hospitals Side-by-Side',
      desc: 'Add up to 4 hospitals into our factual comparison matrix. Analyze ICU bed strength, approximate surgical package brackets, distance from international airport terminals, and nearby hotel accessibility.',
      icon: Layers,
      tag: 'Evaluation Phase'
    },
    {
      num: '03',
      title: 'Upload Records & Request Quotations',
      desc: 'Upload Angiograms, MRI scans, biopsy records, and doctor summaries to our secure medical vault. With your explicit consent, submit requests to hospitals to receive itemized package estimates and expected stay lengths.',
      icon: CalendarClock,
      tag: 'Planning Phase'
    },
    {
      num: '04',
      title: 'Medical Visa & Travel Logistics',
      desc: 'Download the hospital-issued Medical Visa Invitation Letter (VIL) required for the Government of India e-Medical Visa. Pre-arrange chauffeured airport arrival pickups and wheelchair-accessible lodging within 2–3 km of your hospital.',
      icon: Plane,
      tag: 'Travel Phase'
    },
    {
      num: '05',
      title: 'Hospital Admission & Quaternary Care',
      desc: 'Meet your assigned surgical panel and international patient coordinator. Undergo pre-operative clinical workups, modular OT surgical interventions, and intensive post-operative inpatient care.',
      icon: Stethoscope,
      tag: 'Treatment Phase'
    },
    {
      num: '06',
      title: 'Hotel Convalescence & Fit-to-Fly Review',
      desc: 'Transition from hospital to a vetted medical-friendly hotel with kitchenettes and elevator access. Complete scheduled wound reviews, suture removals, and obtain the airline Medical Fit-to-Fly certificate.',
      icon: HeartPulse,
      tag: 'Recovery Phase'
    },
    {
      num: '07',
      title: 'Return Home & Telemedicine Continuity',
      desc: 'Enjoy seamless airport transfer back to your home country. Maintain care continuity through scheduled video check-ins at 30, 60, and 90 days with your treating specialist in India.',
      icon: Home,
      tag: 'Continuity Phase'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12 animate-fadeIn">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-xs font-bold text-brand-700">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Complete Medical Journey Coordination</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          How MEDTRAVEL INDIA Works
        </h1>
        <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
          From the moment you decide to explore healthcare overseas to your safe flight home, here is how our integrated platform guides your complete journey.
        </p>
      </div>

      {/* 7-Step Detailed Flow */}
      <div className="space-y-6">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={s.num}
              className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-md transition flex flex-col md:flex-row items-start gap-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-teal-500 text-white flex items-center justify-center font-extrabold text-xl shrink-0 shadow-md">
                <Icon className="w-8 h-8" />
              </div>

              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
                    Step {s.num}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {s.tag}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">{s.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ethical Guardrails Box */}
      <div className="p-8 bg-slate-900 text-white rounded-3xl shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-teal-300 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Our Ethical Principles & Non-Clinical Commitment</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold">Coordination First, Medicine to the Doctors</h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          MEDTRAVEL INDIA never diagnoses medical conditions, prescribes drugs, guarantees clinical outcomes, or promotes any hospital as "the best". Our mission is purely operational and logistical: providing international patients with verified documentation, transparent pricing benchmarks, and coordinated travel services.
        </p>

        <div className="pt-2">
          <button
            onClick={onStartJourney}
            className="bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs px-6 py-3 rounded-xl shadow-md transition flex items-center gap-2"
          >
            <span>Start Your Medical Travel Plan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
