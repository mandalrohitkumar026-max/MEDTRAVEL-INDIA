import React, { useState } from 'react';
import { 
  CheckSquare, 
  Square, 
  Plane, 
  Stethoscope, 
  Home, 
  ShieldCheck, 
  Printer, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  category: 'BEFORE' | 'DURING' | 'AFTER';
  completed: boolean;
}

const defaultChecklist: ChecklistItem[] = [
  // Before Travel (7 items)
  { id: 'bt-1', label: 'Passport', description: 'Valid for at least 6 months with minimum 2 blank pages', category: 'BEFORE', completed: true },
  { id: 'bt-2', label: 'Medical reports', description: 'Angiogram CD, MRI/CT scans, biopsy and doctor summary', category: 'BEFORE', completed: true },
  { id: 'bt-3', label: 'Hospital consultation', description: 'Preliminary review & doctor teleconsultation confirmed', category: 'BEFORE', completed: true },
  { id: 'bt-4', label: 'Visa documents', description: 'Hospital Visa Invitation Letter (VIL) and Indian e-Medical Visa', category: 'BEFORE', completed: false },
  { id: 'bt-5', label: 'Flight booking', description: 'Round-trip flexible international airline tickets', category: 'BEFORE', completed: false },
  { id: 'bt-6', label: 'Hotel', description: 'Accessible accommodation within 2-3 km with kitchenette', category: 'BEFORE', completed: false },
  { id: 'bt-7', label: 'Airport transportation', description: 'Chauffeured arrival pickup with luggage/wheelchair space', category: 'BEFORE', completed: false },

  // During Treatment (4 items)
  { id: 'dt-1', label: 'Hospital check-in', description: 'Passport/visa registration at International Patient Lounge', category: 'DURING', completed: false },
  { id: 'dt-2', label: 'Consultation', description: 'In-person primary evaluation with chief surgeon & pre-op labs', category: 'DURING', completed: false },
  { id: 'dt-3', label: 'Treatment', description: 'Procedure, surgical recovery, and ICU/ward inpatient care', category: 'DURING', completed: false },
  { id: 'dt-4', label: 'Discharge documents', description: 'Detailed discharge summary, operative notes, and receipts', category: 'DURING', completed: false },

  // Before Returning (4 items)
  { id: 'br-1', label: 'Follow-up consultation', description: 'Wound inspection, stitch review, and medication protocol', category: 'AFTER', completed: false },
  { id: 'br-2', label: 'Medical documents', description: 'Fit-to-Fly certificate & radiology records for home doctor', category: 'AFTER', completed: false },
  { id: 'br-3', label: 'Medicines/prescriptions', description: '30 to 90 days supply of original sealed medicines with Rx', category: 'AFTER', completed: false },
  { id: 'br-4', label: 'Airport transportation', description: 'Return transfer to terminal with airport wheelchair assistance', category: 'AFTER', completed: false },
];

export const TravelChecklistPage: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>(() => {
    const saved = localStorage.getItem('medtravel_checklist');
    return saved ? JSON.parse(saved) : defaultChecklist;
  });

  const toggleItem = (id: string) => {
    setItems((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      );
      localStorage.setItem('medtravel_checklist', JSON.stringify(updated));
      return updated;
    });
  };

  const resetChecklist = () => {
    setItems(defaultChecklist);
    localStorage.setItem('medtravel_checklist', JSON.stringify(defaultChecklist));
  };

  const totalCount = items.length;
  const completedCount = items.filter((i) => i.completed).length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const beforeItems = items.filter((i) => i.category === 'BEFORE');
  const duringItems = items.filter((i) => i.category === 'DURING');
  const afterItems = items.filter((i) => i.category === 'AFTER');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full mb-2">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Section 10 • Medical Travel Preparation</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Medical Travel Checklist
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl leading-relaxed">
            Essential 3-phase checklist for your healthcare journey to India: Before Travel, During Treatment, and Before Returning.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
          <button
            onClick={resetChecklist}
            className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Progress Bar Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-800">
            Journey Readiness: {completedCount} of {totalCount} completed
          </span>
          <span className="font-extrabold text-brand-700 text-sm">{progressPercent}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-brand-600 to-teal-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 1. Before Travel */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-brand-50/70 p-4 border-b border-brand-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plane className="w-5 h-5 text-brand-700" />
            <h2 className="text-sm sm:text-base font-bold text-brand-950">
              Before Travel (Departure Preparation)
            </h2>
          </div>
          <span className="text-[11px] font-bold text-brand-700 bg-white px-2.5 py-0.5 rounded-full border border-brand-200">
            {beforeItems.filter(i => i.completed).length} / {beforeItems.length}
          </span>
        </div>

        <div className="divide-y divide-slate-100 p-2 sm:p-3">
          {beforeItems.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition flex items-start gap-3"
            >
              <button 
                type="button" 
                aria-label={`Toggle ${item.label}`}
                className="mt-0.5 text-brand-600 focus:outline-hidden"
              >
                {item.completed ? (
                  <CheckSquare className="w-5 h-5 text-brand-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
              </button>
              <div className="flex-1">
                <span className={`text-xs sm:text-sm font-bold block ${item.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                  {item.label}
                </span>
                <span className="text-[11px] text-slate-500 block leading-snug mt-0.5">
                  {item.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. During Treatment */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-teal-50/70 p-4 border-b border-teal-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-teal-700" />
            <h2 className="text-sm sm:text-base font-bold text-teal-950">
              During Treatment (Hospital & Inpatient Care)
            </h2>
          </div>
          <span className="text-[11px] font-bold text-teal-700 bg-white px-2.5 py-0.5 rounded-full border border-teal-200">
            {duringItems.filter(i => i.completed).length} / {duringItems.length}
          </span>
        </div>

        <div className="divide-y divide-slate-100 p-2 sm:p-3">
          {duringItems.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition flex items-start gap-3"
            >
              <button 
                type="button" 
                aria-label={`Toggle ${item.label}`}
                className="mt-0.5 text-teal-600 focus:outline-hidden"
              >
                {item.completed ? (
                  <CheckSquare className="w-5 h-5 text-teal-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
              </button>
              <div className="flex-1">
                <span className={`text-xs sm:text-sm font-bold block ${item.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                  {item.label}
                </span>
                <span className="text-[11px] text-slate-500 block leading-snug mt-0.5">
                  {item.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Before Returning */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-emerald-50/70 p-4 border-b border-emerald-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Home className="w-5 h-5 text-emerald-700" />
            <h2 className="text-sm sm:text-base font-bold text-emerald-950">
              Before Returning (Discharge & Fit-to-Fly)
            </h2>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-white px-2.5 py-0.5 rounded-full border border-emerald-200">
            {afterItems.filter(i => i.completed).length} / {afterItems.length}
          </span>
        </div>

        <div className="divide-y divide-slate-100 p-2 sm:p-3">
          {afterItems.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition flex items-start gap-3"
            >
              <button 
                type="button" 
                aria-label={`Toggle ${item.label}`}
                className="mt-0.5 text-emerald-600 focus:outline-hidden"
              >
                {item.completed ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
              </button>
              <div className="flex-1">
                <span className={`text-xs sm:text-sm font-bold block ${item.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                  {item.label}
                </span>
                <span className="text-[11px] text-slate-500 block leading-snug mt-0.5">
                  {item.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
