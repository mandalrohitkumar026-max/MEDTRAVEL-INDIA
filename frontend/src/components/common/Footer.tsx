import React from 'react';
import { HeartPulse, ShieldCheck, PhoneCall, ExternalLink, Globe, MapPin } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  onOpenSOS: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab, onOpenSOS }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      {/* Top Banner: Emergency helpline */}
      <div className="bg-gradient-to-r from-brand-950 via-slate-900 to-teal-950 border-b border-slate-800 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 text-white">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
            <span className="font-semibold text-xs text-slate-200">
              Need immediate medical or travel guidance while in India?
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSOS}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Emergency SOS (112 / 1066)
            </button>
            <a
              href="https://indianvisaonline.gov.in/evisa/tvoa.html"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-slate-300 hover:text-white underline text-xs"
            >
              Govt e-Visa Portal
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
          {/* Col 1: Brand & Mission */}
          <div className="md:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
                <HeartPulse className="w-5 h-5 text-white" />
              </div>
              <span className="text-base font-extrabold tracking-tight">MEDTRAVEL INDIA</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              “From Airport to Recovery — One Platform for Your Medical Journey in India.”
              Connecting international patients to accredited hospitals, verified doctors, comfortable accommodation, and coordinated transportation across India.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1 text-[11px] bg-slate-900 border border-slate-800 text-emerald-400 px-2 py-0.5 rounded">
                <ShieldCheck className="w-3 h-3" /> NABH & JCI Directory
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] bg-slate-900 border border-slate-800 text-teal-400 px-2 py-0.5 rounded">
                <ShieldCheck className="w-3 h-3" /> Verified Hotel & Cab Partners
              </span>
            </div>
          </div>

          {/* Col 2: The 7 Journey Steps */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Journey Flow
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => setCurrentTab('hospitals')} className="hover:text-white transition">
                  1. Discover Hospitals
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('compare')} className="hover:text-white transition">
                  2. Compare Facilities
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('estimator')} className="hover:text-white transition">
                  3. Estimate Budget
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('visa')} className="hover:text-white transition">
                  4. Visa & Flight Prep
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('transport')} className="hover:text-white transition">
                  5. Airport Pickup & Hotel
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('patient-dashboard')} className="hover:text-white transition">
                  6. Treatment & Care
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('recovery')} className="hover:text-white transition">
                  7. Recovery & Return
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Medical Hubs */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Medical Cities
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => setCurrentTab('cities')} className="hover:text-white transition">
                  Chennai (Health Capital)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('cities')} className="hover:text-white transition">
                  Delhi NCR (Gurugram / Saket)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('cities')} className="hover:text-white transition">
                  Mumbai (Specialist Quaternary)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('cities')} className="hover:text-white transition">
                  Bengaluru (Cardiac & Ortho)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('cities')} className="hover:text-white transition">
                  Hyderabad (Transplants)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('cities')} className="hover:text-white transition">
                  Kochi (Wellness & Recovery)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Support */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Concierge & Portals
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => setCurrentTab('ai-assistant')} className="hover:text-white text-teal-400 font-medium transition">
                  MediGuide AI Assistant
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('documents')} className="hover:text-white transition">
                  Medical Document Vault
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('reviews')} className="hover:text-white transition">
                  Patient Hospitality Reviews
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('emergency')} className="hover:text-white text-red-400 transition">
                  Emergency Support Directory
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('hospital-dashboard')} className="hover:text-white transition">
                  Hospital Partner Portal
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('admin-dashboard')} className="hover:text-white transition">
                  Platform Admin Console
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Safety Disclaimers */}
        <div className="pt-8 border-t border-slate-800 space-y-3 text-[11px] leading-relaxed text-slate-500">
          <p>
            <strong className="text-slate-400">Strict Medical Disclaimer:</strong> MEDTRAVEL INDIA is a medical travel facilitation, information, and coordination technology platform. MEDTRAVEL INDIA does not own or operate hospitals, does not practice medicine, does not diagnose medical conditions, does not prescribe pharmaceutical treatments, and does not perform surgical procedures. All medical treatment advice, diagnostic interpretations, surgical decisions, clinical outcomes, and hospital admissions remain exclusively between the patient and licensed healthcare practitioners.
          </p>
          <p>
            <strong className="text-slate-400">Financial & Regulatory Disclaimer:</strong> All pricing ranges, package calculations, and currency approximations displayed on this website are indicative estimates based on typical hospital guidelines and are subject to change following physical clinical consultation and pre-operative diagnostic evaluations. MEDTRAVEL INDIA does not issue visas, guarantee visa approvals, or claim clinical superiority of any participating hospital or clinician.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-900 gap-2 text-slate-500">
            <div>
              © 2026 MEDTRAVEL INDIA. All rights reserved. Built for international patients worldwide.
            </div>
            <div className="flex items-center gap-4">
              <span>Privacy Policy</span>
              <span>Terms of Coordination</span>
              <span>Patient Data Protection</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
