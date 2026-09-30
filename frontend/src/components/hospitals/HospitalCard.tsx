import React from 'react';
import { Hospital } from '../../types';
import { useCurrency } from '../../context/CurrencyContext';
import { useComparison } from '../../context/ComparisonContext';
import { VerifiedBadge } from '../common/VerifiedBadge';
import { 
  Building2, 
  MapPin, 
  Plane, 
  Hotel, 
  Car, 
  Languages, 
  Check, 
  Plus, 
  ArrowRight,
  ShieldCheck,
  PhoneCall,
  Mail
} from 'lucide-react';

interface HospitalCardProps {
  hospital: Hospital;
  onSelectForQuotation: (hospital: Hospital) => void;
  onViewDetails: (hospital: Hospital) => void;
}

export const HospitalCard: React.FC<HospitalCardProps> = ({
  hospital,
  onSelectForQuotation,
  onViewDetails,
}) => {
  const { formatPrice } = useCurrency();
  const { toggleHospital, isInComparison } = useComparison();
  const compared = isInComparison(hospital.id);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group">
      {/* Top Image & Accreditation Badges */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={hospital.image}
          alt={hospital.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
        
        {/* Badges in image */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {hospital.accreditations.map((acc) => (
            <span
              key={acc}
              className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 flex items-center gap-1 shadow-xs"
            >
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              {acc} Accredited
            </span>
          ))}
          {hospital.verifiedPartner && (
            <VerifiedBadge label="Verified Partner" type="PARTNER" size="sm" />
          )}
        </div>

        {/* Airport distance chip */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-xs">
          <Plane className="w-3.5 h-3.5 text-brand-600" />
          <span>{hospital.distanceAirportKm} km ({hospital.airportDriveMinutes} min)</span>
        </div>

        {/* Bottom overlay inside image: Name and City */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center gap-1 text-slate-300 text-xs mb-0.5 font-medium">
            <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span>{hospital.city}, {hospital.state}</span>
          </div>
          <h3 className="font-bold text-lg leading-tight line-clamp-1">{hospital.name}</h3>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Tagline */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {hospital.overview}
        </p>

        {/* Factual Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-100">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Approx Cost Range</span>
            <span className="font-bold text-slate-900">
              {formatPrice(hospital.approxTreatmentCostRange.minINR)} – {formatPrice(hospital.approxTreatmentCostRange.maxINR)}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Capacity & ICUs</span>
            <span className="font-semibold text-slate-800">
              {hospital.totalBeds} Beds ({hospital.icuBeds} ICU)
            </span>
          </div>
        </div>

        {/* Key Specialties */}
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Key Quaternary Specialties
          </span>
          <div className="flex flex-wrap gap-1.5">
            {hospital.specialties.slice(0, 3).map((spec, i) => (
              <span
                key={i}
                className="text-[11px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-md"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* International Patient Services checklist */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] space-y-1">
          <div className="font-semibold text-slate-800 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-brand-600" />
            <span>International Patient Department:</span>
          </div>
          <div className="grid grid-cols-2 gap-1 text-slate-600 pt-0.5">
            <span className="flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-600 shrink-0" /> Dedicated Lounge
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-600 shrink-0" /> Visa Letter (VIL)
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-600 shrink-0" /> Halal & Dietary Food
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-600 shrink-0" /> Airport Transfer Desk
            </span>
          </div>
        </div>

        {/* Nearby Support (Hotels & Language) */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <div className="flex items-center gap-1.5">
            <Hotel className="w-3.5 h-3.5 text-amber-500" />
            <span>{hospital.nearbyHotelsCount} verified hotels nearby</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Languages className="w-3.5 h-3.5 text-brand-600" />
            <span>{hospital.languagesSupported.slice(0, 2).join(', ')} +more</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-2">
          {/* Compare toggle */}
          <button
            onClick={() => toggleHospital(hospital.id)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 border transition ${
              compared
                ? 'bg-brand-50 text-brand-700 border-brand-300'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
            title="Add to side-by-side comparison"
          >
            {compared ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            <span>{compared ? 'In Compare' : 'Compare'}</span>
          </button>

          {/* View Details */}
          <button
            onClick={() => onViewDetails(hospital)}
            className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition text-center"
          >
            Hospital Details
          </button>

          {/* Request Quotation */}
          <button
            onClick={() => onSelectForQuotation(hospital)}
            className="py-2 px-3.5 rounded-xl text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 transition shadow-sm text-center shrink-0 flex items-center gap-1"
          >
            <span>Get Quote</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
