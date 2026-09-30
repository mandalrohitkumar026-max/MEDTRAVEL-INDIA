import React from 'react';
import { useJourney } from '../context/JourneyContext';
import { 
  CalendarClock, 
  CheckCircle2, 
  Circle, 
  Plane, 
  Stethoscope, 
  FileText, 
  Hotel, 
  Car, 
  Sparkles,
  Download,
  AlertCircle
} from 'lucide-react';

export const TravelPlannerPage: React.FC = () => {
  const { timeline, toggleTaskCompletion, profile } = useJourney();

  // Calculate overall completion
  const totalTasks = timeline.reduce((acc, p) => acc + p.tasks.length, 0);
  const completedTasks = timeline.reduce(
    (acc, p) => acc + p.tasks.filter((t) => t.completed).length,
    0
  );
  const percentComplete = Math.round((completedTasks / totalTasks) * 100);

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'VISA':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'MEDICAL':
        return 'bg-brand-50 text-brand-700 border-brand-200';
      case 'TRAVEL':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'STAY':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-teal-50 text-teal-700 border-teal-200';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full mb-2">
            <CalendarClock className="w-3.5 h-3.5" />
            <span>Personalized Journey Roadmap</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Medical Travel Timeline Planner
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl leading-relaxed">
            Step-by-step preparation checklist for <strong>{profile.fullName}</strong> ({profile.country}) traveling to Chennai for Cardiac surgery.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-xs px-4 py-2.5 rounded-xl shadow-xs transition self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export / Print Checklist</span>
        </button>
      </div>

      {/* Progress Bar Card */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-700 uppercase tracking-wider">
            Overall Trip Preparedness
          </span>
          <span className="font-extrabold text-brand-700 text-sm">
            {percentComplete}% Completed ({completedTasks}/{totalTasks} Actions)
          </span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-600 to-teal-500 rounded-full transition-all duration-500"
            style={{ width: `${percentComplete}%` }}
          />
        </div>
        <p className="text-[11px] text-slate-500 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Click any checklist item below to mark tasks as completed in real time.</span>
        </p>
      </div>

      {/* Timeline Phases */}
      <div className="space-y-6">
        {timeline.map((phase, idx) => (
          <div
            key={phase.id}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden"
          >
            {/* Phase Bar */}
            <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold text-brand-700 uppercase tracking-wider">
                  Phase 0{idx + 1}
                </span>
                <h3 className="text-base font-bold text-slate-900 leading-tight">
                  {phase.phaseTitle}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{phase.phaseSubtitle}</p>
              </div>

              <div className="text-xs font-semibold text-slate-600 bg-white px-3 py-1 rounded-xl border border-slate-200 self-start sm:self-auto">
                {phase.tasks.filter((t) => t.completed).length} / {phase.tasks.length} Done
              </div>
            </div>

            {/* Task Items */}
            <div className="p-6 divide-y divide-slate-100">
              {phase.tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTaskCompletion(phase.id, task.id)}
                  className="py-3.5 first:pt-0 last:pb-0 flex items-start gap-3.5 cursor-pointer group hover:bg-slate-50/70 p-2 rounded-xl transition"
                >
                  <button className="mt-0.5 shrink-0 text-slate-400 group-hover:text-brand-600">
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>

                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-xs font-bold leading-tight ${
                        task.completed ? 'line-through text-slate-400' : 'text-slate-900'
                      }`}>
                        {task.title}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getCategoryBadge(task.category)}`}>
                        {task.category}
                      </span>
                    </div>
                    <p className={`text-xs leading-relaxed ${
                      task.completed ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      {task.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
