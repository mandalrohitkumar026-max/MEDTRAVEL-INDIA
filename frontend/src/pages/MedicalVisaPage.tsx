import React, { useState } from 'react';
import { mockVisaGuideData } from '../data/mockVisaChecklist';
import { 
  FileCheck2, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  Download,
  Users,
  FileText
} from 'lucide-react';

export const MedicalVisaPage: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [showVILPreview, setShowVILPreview] = useState(false);

  const toggleCheck = (item: string) => {
    setCheckedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full mb-2">
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>Government of India e-Visa Guidance</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Indian Medical Visa & Attendant Guide
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Official eligibility requirements, hospital invitation letter protocols, and step-by-step submission checklists for the Indian e-Medical Visa.
        </p>
      </div>

      {/* Mandatory Non-Issuance Disclaimer */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-xs text-amber-950">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="block font-bold">Important Immigration Disclaimer:</strong>
          <p className="leading-relaxed">
            {mockVisaGuideData.importantDisclaimer}
          </p>
        </div>
      </div>

      {/* Visa Categories: Patient vs Attendant */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockVisaGuideData.visaTypes.map((v) => (
          <div key={v.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded uppercase tracking-wider">
              {v.target}
            </span>
            <h3 className="text-lg font-bold text-slate-900">{v.name}</h3>
            <p className="text-xs text-slate-600">{v.purpose}</p>
            <div className="pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-400 block text-[10px]">Permitted Validity</span>
              <span className="font-bold text-slate-800">{v.validity}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Step by step process */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900">
          5-Step Application Process
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {mockVisaGuideData.stepByStepProcess.map((step) => (
            <div key={step.step} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-between">
              <div>
                <span className="w-7 h-7 rounded-xl bg-brand-600 text-white font-extrabold text-xs flex items-center justify-center mb-2">
                  0{step.step}
                </span>
                <h4 className="text-xs font-bold text-slate-900">{step.title}</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Required Documents Checklist */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Mandatory Documents Checklist
            </h2>
            <p className="text-xs text-slate-500">
              Check off documents as you prepare your physical and digital dossier.
            </p>
          </div>

          <button
            onClick={() => setShowVILPreview(true)}
            className="flex items-center gap-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 font-bold text-xs px-4 py-2 rounded-xl transition"
          >
            <FileText className="w-3.5 h-3.5 text-teal-600" />
            <span>Sample Hospital Invitation Letter</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {mockVisaGuideData.requiredDocuments.map((doc, idx) => {
            const isChecked = checkedItems.includes(doc.item);
            return (
              <div
                key={idx}
                onClick={() => toggleCheck(doc.item)}
                className={`p-4 rounded-2xl border cursor-pointer transition flex items-start gap-3 ${
                  isChecked
                    ? 'border-emerald-500 bg-emerald-50/50'
                    : 'border-slate-200 bg-slate-50/60 hover:bg-slate-50'
                }`}
              >
                <div className="mt-0.5">
                  <CheckCircle2
                    className={`w-5 h-5 ${isChecked ? 'text-emerald-600 fill-emerald-100' : 'text-slate-300'}`}
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className={`text-xs font-bold ${isChecked ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                      {doc.item}
                    </h4>
                    <span className="text-[10px] font-semibold bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                      {doc.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-snug">{doc.details}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Official Government Portals */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-md space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-teal-300">
          Official Government of India Portals
        </h3>
        <p className="text-xs text-slate-400">
          Always submit your visa application directly through the official Government portal to avoid scam charges or counterfeit third-party agents.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {mockVisaGuideData.officialGovernmentPortals.map((portal, idx) => (
            <div key={idx} className="p-4 bg-slate-800 rounded-2xl border border-slate-700 space-y-2">
              <h4 className="text-xs font-bold text-white">{portal.title}</h4>
              <p className="text-[11px] text-slate-400 leading-snug">{portal.notes}</p>
              <a
                href={portal.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 font-semibold pt-1 underline"
              >
                <span>Open Government Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Sample VIL Modal */}
      {showVILPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-5 text-xs">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <span className="text-[10px] font-bold text-brand-600 uppercase">Hospital Document Specimen</span>
                <h3 className="text-base font-bold text-slate-900">Medical Visa Invitation Letter (VIL)</h3>
              </div>
              <button onClick={() => setShowVILPreview(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <div className="p-6 border-2 border-dashed border-slate-300 rounded-2xl space-y-3 font-serif bg-slate-50/50">
              <div className="text-center border-b pb-3 space-y-0.5">
                <div className="font-bold text-base text-slate-900 tracking-wide">APOLLO HOSPITALS ENTERPRISE LIMITED</div>
                <div className="text-[11px] text-slate-600">Greams Lane, Thousand Lights, Chennai 600006, Tamil Nadu, India</div>
                <div className="text-[10px] text-slate-500 font-sans">NABH / JCI Accredited • Registration No: TN/CH/MED/8391</div>
              </div>

              <div className="pt-2 text-right text-[11px]">
                Date: 20 September 2026<br/>
                Ref No: AHE/INTL/VIL/2026/882
              </div>

              <div>
                To:<br/>
                The Visa Consular Officer<br/>
                High Commission of India, Dhaka, Bangladesh
              </div>

              <div className="font-bold underline text-center pt-1 font-sans text-xs">
                SUBJECT: MEDICAL VISA INVITATION FOR MR. AHMED HOSSAIN & ATTENDANTS
              </div>

              <p className="leading-relaxed">
                This is to certify that <strong>Mr. Ahmed Hossain</strong> (Passport: A08291482, DOB: 14/06/1972) has been clinically evaluated based on diagnostic records for <em>Coronary Artery Bypass Grafting (CABG)</em> under the care of <strong>Dr. Ramesh Sundaram, Chief CTVS</strong> at Apollo Hospitals Chennai.
              </p>

              <p className="leading-relaxed">
                The patient requires the support of accompanying attendants: <strong>Mrs. Nasreen Hossain</strong> (Spouse, Passport: B09482711) and <strong>Mr. Tanvir Hossain</strong> (Caregiver, Passport: C03829104). The expected inpatient and post-operative recuperation duration is approximately 14–20 days.
              </p>

              <div className="pt-4 flex justify-between items-end font-sans">
                <div>
                  <span className="inline-block border border-slate-400 px-3 py-1 rounded text-[10px] text-slate-600">
                    [Official Hospital Digital Seal]
                  </span>
                </div>
                <div className="text-right">
                  <strong>Dr. K. Nair</strong><br/>
                  <span className="text-slate-500">Director — International Patients Division</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowVILPreview(false)}
                className="px-5 py-2 bg-brand-600 text-white rounded-xl font-bold"
              >
                Close Specimen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
