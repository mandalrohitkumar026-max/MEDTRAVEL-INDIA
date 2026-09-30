import React, { useState } from 'react';
import { 
  Compass, 
  Layers, 
  CalendarClock, 
  Plane, 
  Stethoscope, 
  HeartPulse, 
  Home,
  CheckCircle2,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { JourneyStep } from '../../types';

interface JourneyPipelineProps {
  onStepClick: (stepKey: string) => void;
}

export const JourneyPipeline: React.FC<JourneyPipelineProps> = ({ onStepClick }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const steps = [
    {
      step: 'DISCOVER' as JourneyStep,
      title: '1. Discover',
      subtitle: 'Treatment & Hospitals',
      icon: Compass,
      color: 'text-brand-600 bg-brand-50 border-brand-200',
      description: 'Filter verified quaternary hospitals by medical specialty, accreditation (NABH/JCI), multi-lingual interpreters, and proximity to international airports.',
      actionTab: 'hospitals',
      actionLabel: 'Explore Hospitals',
      bulletPoints: [
        'Explore 28+ quaternary facilities in Chennai, Delhi NCR, Mumbai, Bengaluru',
        'Verify doctor credentials, qualifications, and consultation schedules',
        'Review factual international patient lounge amenities and diet options'
      ]
    },
    {
      step: 'COMPARE' as JourneyStep,
      title: '2. Compare',
      subtitle: 'Side-by-Side Facts',
      icon: Layers,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      description: 'Direct side-by-side comparison of up to 4 hospitals without biased rankings or promotional endorsements.',
      actionTab: 'compare',
      actionLabel: 'Compare Hospitals',
      bulletPoints: [
        'Compare ICU capacity, operating theatres, and language concierges',
        'Inspect approximate surgical package cost brackets in your home currency',
        'Analyze airport commute times and nearby verified hotel accommodations'
      ]
    },
    {
      step: 'PLAN' as JourneyStep,
      title: '3. Plan',
      subtitle: 'Quotation & Budget',
      icon: CalendarClock,
      color: 'text-teal-600 bg-teal-50 border-teal-200',
      description: 'Upload your home country diagnostic records to request official hospital packages and calculate all trip costs.',
      actionTab: 'estimator',
      actionLabel: 'Use Cost Estimator',
      bulletPoints: [
        'Upload Angiogram, MRI, or pathology reports to encrypted medical vault',
        'Receive official hospital quotation with length-of-stay breakdowns',
        'Calculate attendant accommodation, flight days, and food budget'
      ]
    },
    {
      step: 'TRAVEL' as JourneyStep,
      title: '4. Travel',
      subtitle: 'Visa, Flight & Arrival',
      icon: Plane,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      description: 'Coordinate Indian e-Medical Visa letters, flight arrival terminal meet & greet, and wheelchair transfers.',
      actionTab: 'visa',
      actionLabel: 'Visa Guide & Checklist',
      bulletPoints: [
        'Download official hospital Visa Invitation Letter (VIL) for e-Visa',
        'Add up to 2 family attendants with attendant visa documentation',
        'Pre-book chauffeured airport arrival pickup with baggage assistance'
      ]
    },
    {
      step: 'TREAT' as JourneyStep,
      title: '5. Treat',
      subtitle: 'Hospital Admission',
      icon: Stethoscope,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      description: 'In-person surgical evaluation, pre-anesthetic clearance, state-of-the-art procedure, and inpatient recovery.',
      actionTab: 'patient-dashboard',
      actionLabel: 'View Treatment Dashboard',
      bulletPoints: [
        'Direct consultation with Chief Specialist and surgical team',
        'Inpatient stay with family attendant accommodation facilities',
        'Daily rounds with international patient liaison interpreter'
      ]
    },
    {
      step: 'RECOVER' as JourneyStep,
      title: '6. Recover',
      subtitle: 'Convalescence & Review',
      icon: HeartPulse,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      description: 'Post-discharge recuperation in patient-friendly nearby hotels, wound reviews, and airline Fit-to-Fly clearance.',
      actionTab: 'recovery',
      actionLabel: 'Post-Op Milestones',
      bulletPoints: [
        'Day 1 to Day 14 scheduled wound and suture evaluations',
        'Specialized nutrition, nurse-on-call, and rehabilitation exercises',
        'Official Fit-to-Fly medical clearance certificate issuance'
      ]
    },
    {
      step: 'RETURN' as JourneyStep,
      title: '7. Return',
      subtitle: 'Home Tele-Continuity',
      icon: Home,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      description: 'Comfortable airport drop-off, flight home, and continuing teleconsultations with your treating surgeon in India.',
      actionTab: 'patient-dashboard',
      actionLabel: 'Tele-Continuity Care',
      bulletPoints: [
        'Airport transfer with wheelchair escort through security gate',
        'Transition care summary shared with your home country physician',
        '30-day and 90-day follow-up video consultations via patient portal'
      ]
    }
  ];

  const current = steps[activeStepIndex];
  const StepIcon = current.icon;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <span className="text-xs font-bold text-brand-700 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
          The 7-Step Experience
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
          From First Inquiry to Safe Return Home
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Every phase of your medical travel journey seamlessly integrated on one coordination platform.
        </p>
      </div>

      {/* Step Buttons Tracker */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pb-6 border-b border-slate-100">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          const isActive = idx === activeStepIndex;
          return (
            <button
              key={s.step}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                isActive
                  ? 'border-brand-500 bg-brand-50/80 shadow-xs ring-2 ring-brand-500/20'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  0{idx + 1}
                </span>
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
              </div>
              <div>
                <div className={`text-xs font-bold ${isActive ? 'text-brand-900' : 'text-slate-800'}`}>
                  {s.step}
                </div>
                <div className="text-[10px] text-slate-500 truncate">{s.subtitle}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Detailed Card */}
      <div className="mt-6 bg-slate-50 rounded-2xl p-6 border border-slate-200">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2.5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${current.color}`}>
                <StepIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
                  Phase {activeStepIndex + 1} of 7
                </span>
                <h4 className="text-lg font-bold text-slate-900">{current.title} — {current.subtitle}</h4>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {current.description}
            </p>

            <div className="space-y-1.5 pt-1">
              {current.bulletPoints.map((bp, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>{bp}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="shrink-0 flex flex-col gap-2.5 w-full md:w-auto">
            <button
              onClick={() => onStepClick(current.actionTab)}
              className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md transition flex items-center justify-center gap-1.5"
            >
              <span>{current.actionLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Full Privacy & Non-Diagnostic Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
