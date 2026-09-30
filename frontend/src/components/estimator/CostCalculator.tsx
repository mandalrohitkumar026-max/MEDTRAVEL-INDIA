import React, { useState, useMemo } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { useJourney } from '../../context/JourneyContext';
import { mockCities } from '../../data/mockCities';
import { 
  Calculator, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  Coins, 
  Hotel, 
  Car, 
  Users, 
  Bed, 
  Stethoscope,
  ArrowRight
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface CostCalculatorProps {
  onStartQuotationForHospital?: (hospitalId: string) => void;
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({ onStartQuotationForHospital }) => {
  const { formatPrice, currency } = useCurrency();
  const { hospitals, treatments } = useJourney();

  // Inputs
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string>(treatments[0]?.id || 'treat-kidney-tx');
  const [selectedCity, setSelectedCity] = useState<string>('Chennai');
  const [selectedHospitalId, setSelectedHospitalId] = useState<string>('hosp-apollo-chennai');
  const [hospitalStayDays, setHospitalStayDays] = useState<number>(6);
  const [cityStayDays, setCityStayDays] = useState<number>(14);
  const [hotelCategory, setHotelCategory] = useState<'budget' | 'standard' | 'premium' | 'apartment'>('standard');
  const [attendantsCount, setAttendantsCount] = useState<number>(2);
  const [transportType, setTransportType] = useState<'airport_only' | 'daily_commute' | 'dedicated_van'>('daily_commute');

  const selectedTreatment = treatments.find((t) => t.id === selectedTreatmentId) || treatments[0];
  const selectedHospital = hospitals.find((h) => h.id === selectedHospitalId) || hospitals[0];

  // Dynamic Calculation
  const breakdown = useMemo(() => {
    // 1. Core Medical & Surgical procedure
    const medicalTreatmentBase = selectedTreatment.averageCostINR;

    // 2. Hospital room & ICU inpatient differential
    const hospitalDailyRate = 14000; // room + nursing + rounds
    const hospitalStayExpenses = hospitalStayDays * hospitalDailyRate;

    // 3. Pre-Op Diagnostics & Investigations (ECHO, Angio, CT, Blood tests)
    const diagnosticsEstimate = 38000;

    // 4. Hotel Accommodation
    let hotelDailyRatePerRoom = 3200; // default 3-star
    if (hotelCategory === 'budget') hotelDailyRatePerRoom = 1800;
    if (hotelCategory === 'premium') hotelDailyRatePerRoom = 6500;
    if (hotelCategory === 'apartment') hotelDailyRatePerRoom = 2800;

    // Attendant room requirements: 1 room fits patient + 1 attendant; >1 attendant may need suite/2 rooms
    const roomsRequired = attendantsCount >= 2 ? 1.5 : 1;
    const hotelStayDaysTotal = Math.max(1, cityStayDays - hospitalStayDays);
    const accommodationEstimate = Math.round(hotelStayDaysTotal * hotelDailyRatePerRoom * roomsRequired);

    // 5. Transportation
    let transportationEstimate = 3000; // Airport pickup & drop
    if (transportType === 'daily_commute') {
      transportationEstimate = 3000 + (hotelStayDaysTotal * 800); // Airport + daily hospital trips
    } else if (transportType === 'dedicated_van') {
      transportationEstimate = 3000 + (hotelStayDaysTotal * 2200); // Dedicated mobility van
    }

    // 6. Food, SIM, visa fees & local attendant living
    const dailyLivingPerPerson = 900;
    const totalPeople = 1 + attendantsCount;
    const otherTravelExpenses = Math.round(cityStayDays * dailyLivingPerPerson * totalPeople);

    // Total Estimated Budget
    const totalEstimateINR = 
      medicalTreatmentBase + 
      hospitalStayExpenses + 
      diagnosticsEstimate + 
      accommodationEstimate + 
      transportationEstimate + 
      otherTravelExpenses;

    return {
      medicalTreatmentBase,
      hospitalStayExpenses,
      diagnosticsEstimate,
      accommodationEstimate,
      transportationEstimate,
      otherTravelExpenses,
      totalEstimateINR,
      hotelStayDaysTotal,
    };
  }, [
    selectedTreatment, 
    hospitalStayDays, 
    cityStayDays, 
    hotelCategory, 
    attendantsCount, 
    transportType
  ]);

  // Chart data
  const chartData = [
    { name: 'Surgery & Procedure', value: breakdown.medicalTreatmentBase, color: '#0284c7' },
    { name: 'Hospital Inpatient & ICU', value: breakdown.hospitalStayExpenses, color: '#0d9488' },
    { name: 'Pre-Op Diagnostics', value: breakdown.diagnosticsEstimate, color: '#6366f1' },
    { name: 'Hotel / Apartment Stay', value: breakdown.accommodationEstimate, color: '#f59e0b' },
    { name: 'Airport & Local Transit', value: breakdown.transportationEstimate, color: '#8b5cf6' },
    { name: 'Living & Attendant Food', value: breakdown.otherTravelExpenses, color: '#10b981' },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-teal-900 text-white p-6 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-teal-200 mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Medical Journey Calculator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Treatment Cost & Travel Budget Estimator
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
            Calculate your complete medical trip expenditure — including surgical procedures, hospital inpatient days, family attendant accommodation, and local airport transportation.
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form Inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
              Trip Parameters
            </h3>

            {/* 1. Treatment Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                1. Select Treatment / Surgical Procedure
              </label>
              <select
                value={selectedTreatmentId}
                onChange={(e) => {
                  const t = treatments.find(item => item.id === e.target.value);
                  setSelectedTreatmentId(e.target.value);
                  if (t) {
                    setHospitalStayDays(t.typicalHospitalStayDays);
                    setCityStayDays(t.typicalCityStayDays);
                  }
                }}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
              >
                {treatments.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.category})
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-500 mt-1">
                Typical hospital stay: {selectedTreatment.typicalHospitalStayDays} days | Total city stay: {selectedTreatment.typicalCityStayDays} days
              </p>
            </div>

            {/* 2. City & Hospital Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  2. Preferred Medical City
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium text-slate-800"
                >
                  {mockCities.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name} ({c.airportCode})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  3. Hospital Center
                </label>
                <select
                  value={selectedHospitalId}
                  onChange={(e) => setSelectedHospitalId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium text-slate-800"
                >
                  {hospitals.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.name.split(',')[0]} ({h.city})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 3. Duration: Hospital Stay & City Stay */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Bed className="w-3.5 h-3.5 text-brand-600" />
                    Hospital Inpatient Days
                  </span>
                  <span className="font-extrabold text-brand-700">{hospitalStayDays} Days</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={hospitalStayDays}
                  onChange={(e) => setHospitalStayDays(parseInt(e.target.value))}
                  className="w-full accent-brand-600 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500">Includes OT, ICU, & recovery ward</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Hotel className="w-3.5 h-3.5 text-teal-600" />
                    Total Days in India
                  </span>
                  <span className="font-extrabold text-teal-700">{cityStayDays} Days</span>
                </label>
                <input
                  type="range"
                  min={hospitalStayDays + 2}
                  max="45"
                  value={cityStayDays}
                  onChange={(e) => setCityStayDays(parseInt(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500">Includes pre-op tests & post-op stitches check</span>
              </div>
            </div>

            {/* 4. Attendants & Hotel Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-brand-600" />
                  Accompanying Attendants
                </label>
                <select
                  value={attendantsCount}
                  onChange={(e) => setAttendantsCount(parseInt(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium text-slate-800"
                >
                  <option value={0}>0 (Traveling Alone)</option>
                  <option value={1}>1 Attendant (Spouse / Relative)</option>
                  <option value={2}>2 Attendants (Family Members)</option>
                  <option value={3}>3 Attendants</option>
                </select>
                <p className="text-[10px] text-slate-500 mt-1">
                  Indian e-Medical visa permits up to 2 medical attendants per patient.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Hotel className="w-3.5 h-3.5 text-amber-500" />
                  Accommodation Preference
                </label>
                <select
                  value={hotelCategory}
                  onChange={(e) => setHotelCategory(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium text-slate-800"
                >
                  <option value="apartment">Serviced Apartment with Kitchen (₹2,800/nt)</option>
                  <option value="standard">3-Star Patient-Friendly Hotel (₹3,200/nt)</option>
                  <option value="budget">Budget Guesthouse (₹1,800/nt)</option>
                  <option value="premium">4-Star Premium Hotel (₹6,500/nt)</option>
                </select>
              </div>
            </div>

            {/* 5. Transportation */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-purple-600" />
                Local Transportation Package
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setTransportType('airport_only')}
                  className={`p-3 rounded-xl border text-left transition ${
                    transportType === 'airport_only'
                      ? 'border-brand-500 bg-brand-50 font-bold text-brand-900'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-semibold">Airport Only</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Pickup & Drop Transfers</div>
                </button>
                <button
                  type="button"
                  onClick={() => setTransportType('daily_commute')}
                  className={`p-3 rounded-xl border text-left transition ${
                    transportType === 'daily_commute'
                      ? 'border-brand-500 bg-brand-50 font-bold text-brand-900'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-semibold">Daily Hospital Runs</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Airport + OPD Roundtrips</div>
                </button>
                <button
                  type="button"
                  onClick={() => setTransportType('dedicated_van')}
                  className={`p-3 rounded-xl border text-left transition ${
                    transportType === 'dedicated_van'
                      ? 'border-brand-500 bg-brand-50 font-bold text-brand-900'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-semibold">Wheelchair Van</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Hydraulic lift vehicle</div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Output & Budget Breakdown (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xl">
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>ESTIMATED TOTAL TRIP BUDGET</span>
                  <span className="font-mono text-emerald-400 uppercase font-semibold">{currency}</span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {formatPrice(breakdown.totalEstimateINR)}
                </div>
                <p className="text-[11px] text-teal-300 mt-1">
                  Estimated 70% to 85% savings compared to North America / Western Europe
                </p>
              </div>

              {/* Visual Donut Chart */}
              <div className="h-44 w-full flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={3}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: any) => formatPrice(Number(val) || 0)}
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px', color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                  <span className="text-[10px] text-slate-400 uppercase">Trip Split</span>
                  <span className="text-xs font-bold text-white">{cityStayDays} Days</span>
                </div>
              </div>

              {/* Itemized Line Items (Section 6 Output Specification) */}
              <div className="space-y-2 text-xs border-t border-slate-800 pt-3">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Estimated Medical Travel Budget
                </div>

                <div className="flex justify-between items-center text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7]"></span>
                    Treatment:
                  </span>
                  <span className="font-semibold text-white">{formatPrice(breakdown.medicalTreatmentBase + breakdown.hospitalStayExpenses + breakdown.diagnosticsEstimate)}</span>
                </div>

                <div className="flex justify-between items-center text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></span>
                    Accommodation:
                  </span>
                  <span className="font-semibold text-white">{formatPrice(breakdown.accommodationEstimate)}</span>
                </div>

                <div className="flex justify-between items-center text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6]"></span>
                    Transportation:
                  </span>
                  <span className="font-semibold text-white">{formatPrice(breakdown.transportationEstimate)}</span>
                </div>

                <div className="flex justify-between items-center text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
                    Other estimated travel expenses:
                  </span>
                  <span className="font-semibold text-white">{formatPrice(breakdown.otherTravelExpenses)}</span>
                </div>

                <div className="pt-2 border-t border-slate-700/80 flex justify-between items-center text-sm font-bold text-emerald-400">
                  <span>Estimated Total:</span>
                  <span className="text-base text-white font-extrabold">{formatPrice(breakdown.totalEstimateINR)}</span>
                </div>
              </div>
            </div>

            {/* Mandatory Disclaimer (Exact Section 6 Quote) */}
            <div className="mt-5 pt-3 border-t border-slate-800 space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-amber-300 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed italic">
                  “This is an approximate planning estimate. Actual medical costs and travel expenses may vary. Confirm final costs directly with the hospital and service providers.”
                </p>
              </div>

              {onStartQuotationForHospital && (
                <button
                  onClick={() => onStartQuotationForHospital(selectedHospitalId)}
                  className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition"
                >
                  <span>Request Consultation from {selectedHospital.name.split(',')[0]}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
