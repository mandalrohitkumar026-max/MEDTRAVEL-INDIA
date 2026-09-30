import React, { useState } from 'react';
import { useJourney } from '../context/JourneyContext';
import { 
  HeartPulse, 
  Calendar, 
  Bell, 
  CheckCircle2, 
  Circle, 
  FileText, 
  Video, 
  AlertCircle,
  Clock,
  PlaneTakeoff,
  ShieldCheck
} from 'lucide-react';

interface Milestone {
  day: number;
  title: string;
  category: 'DISCHARGE' | 'WOUND_CHECK' | 'PHYSIO' | 'FIT_TO_FLY' | 'TELEMEDICINE';
  description: string;
  timeSlot: string;
  completed: boolean;
  notes: string;
}

export const PostTreatmentRecoveryPage: React.FC = () => {
  const { profile } = useJourney();

  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      day: 1,
      title: 'Hospital Discharge to Hotel',
      category: 'DISCHARGE',
      description: 'Transfer from surgical step-down ward to nearby hotel. Receive discharge summary and 14-day medication dossier.',
      timeSlot: '11:00 AM IST',
      completed: true,
      notes: 'Ensure prescription medicines and wound care dressings are handed over.',
    },
    {
      day: 3,
      title: 'Nursing Wound Dressing & Vitals Check',
      category: 'WOUND_CHECK',
      description: 'Visiting nurse checks chest sternal wound and saphenous vein graft harvest site on leg. Check blood pressure and SpO2.',
      timeSlot: '10:30 AM IST',
      completed: true,
      notes: 'Nurse confirmed incisions are clean and healing well.',
    },
    {
      day: 7,
      title: 'In-Hospital Surgical OPD Review',
      category: 'WOUND_CHECK',
      description: 'In-person evaluation at Apollo Heart Centre with surgical registrar. Inspection of suture line and cardiac rehab walk test.',
      timeSlot: '2:00 PM IST',
      completed: false,
      notes: 'Bring repeat resting ECG report.',
    },
    {
      day: 14,
      title: 'Final Consultation & Fit-to-Fly Clearance',
      category: 'FIT_TO_FLY',
      description: 'Consultation with Chief Surgeon Dr. Ramesh Sundaram. Review repeat 2D Echo and issuance of airline Medical Fit-to-Fly certificate.',
      timeSlot: '11:30 AM IST',
      completed: false,
      notes: 'Crucial for airline check-in boarding authorization.',
    },
    {
      day: 30,
      title: 'Telemedicine Check-in from Dhaka',
      category: 'TELEMEDICINE',
      description: 'Video consultation bridge from home country to review long-term beta-blocker/antiplatelet regimen and local cardiologist notes.',
      timeSlot: '4:00 PM BST / 3:30 PM IST',
      completed: false,
      notes: 'Digital prescription sent directly to patient portal.',
    }
  ]);

  const toggleMilestone = (index: number) => {
    setMilestones((prev) =>
      prev.map((m, i) => (i === index ? { ...m, completed: !m.completed } : m))
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full mb-2">
          <HeartPulse className="w-3.5 h-3.5" />
          <span>Post-Discharge Convalescence & Fit-to-Fly</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Recovery & Post-Treatment Support
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl leading-relaxed">
          Structured recovery milestones from hospital discharge to home telemedicine continuity for <strong>{profile.fullName}</strong>.
        </p>
      </div>

      {/* Fit to Fly Notification Banner */}
      <div className="p-5 bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-3xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-teal-300 uppercase tracking-wider">
            <PlaneTakeoff className="w-4 h-4" />
            <span>Airline Fit-to-Fly Authorization</span>
          </div>
          <h3 className="text-lg font-bold">Standard 14-Day Post-Op Clearance Protocol</h3>
          <p className="text-xs text-slate-300 max-w-lg">
            Airlines require an official physician-signed Fit-to-Fly clearance following cardiac surgery. Scheduled for <strong>Day 14</strong> at Apollo Chennai.
          </p>
        </div>

        <button
          onClick={() => alert('Fit-to-fly clearance certificate will unlock after Day 14 surgical review.')}
          className="bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition shrink-0"
        >
          View Clearance Status
        </button>
      </div>

      {/* Milestones Progression */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">
          Recovery Timeline & Reminders
        </h2>

        <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-8">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline marker */}
              <button
                onClick={() => toggleMilestone(idx)}
                className={`absolute -left-[35px] top-1 w-6 h-6 rounded-full flex items-center justify-center transition ${
                  m.completed
                    ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                    : 'bg-white border-2 border-slate-300 text-slate-300 hover:border-brand-500'
                }`}
              >
                {m.completed ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-3.5 h-3.5" />}
              </button>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/90 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-brand-700 bg-brand-50 px-2 py-0.5 rounded uppercase">
                      Day {m.day}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">{m.title}</h3>
                  </div>

                  <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {m.timeSlot}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {m.description}
                </p>

                <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                  <span><strong>Instructions:</strong> {m.notes}</span>
                  <button
                    onClick={() => alert(`Reminder set for Day ${m.day}: ${m.title}!`)}
                    className="text-brand-600 hover:text-brand-700 font-semibold flex items-center gap-1"
                  >
                    <Bell className="w-3 h-3" />
                    <span>Set WhatsApp Reminder</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
