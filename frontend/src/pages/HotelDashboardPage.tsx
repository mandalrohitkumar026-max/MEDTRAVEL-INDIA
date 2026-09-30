import React, { useState } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { 
  Hotel, 
  Bed, 
  Users, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Accessibility, 
  Utensils, 
  Building2,
  Plus
} from 'lucide-react';

export const HotelDashboardPage: React.FC = () => {
  const { formatPrice } = useCurrency();

  const [availableRooms, setAvailableRooms] = useState(6);
  const [kitchenetteSuites, setKitchenetteSuites] = useState(4);

  const bookings = [
    {
      id: 'h-bk-101',
      guestName: 'Ahmed Hossain & Family (3 pax)',
      country: 'Bangladesh',
      treatingHospital: 'Apollo Hospitals Greams Road',
      checkIn: '2026-10-14',
      checkOut: '2026-10-24',
      roomType: 'Executive Medical Suite with Kitchenette',
      specialRequests: 'Wheelchair access ramp, low-sodium halal broth daily',
      status: 'CONFIRMED',
    },
    {
      id: 'h-bk-102',
      guestName: 'Kareem Al-Sayed (2 pax)',
      country: 'Oman',
      treatingHospital: 'Apollo Hospitals Greams Road',
      checkIn: '2026-10-18',
      checkOut: '2026-10-28',
      roomType: 'Twin Patient Recovery Room',
      specialRequests: 'Ground floor room, airport pickup coordinate',
      status: 'PENDING_ARRIVAL',
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">
            <Hotel className="w-3.5 h-3.5" />
            <span>Hotel Partner Concierge Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Lemon Tree Hotel, Shimona (Chennai)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Partnered with Apollo Hospitals Greams Road & MIOT International for post-operative patient and attendant lodging.
          </p>
        </div>

        <div className="text-xs text-slate-300 bg-slate-800 p-3 rounded-2xl border border-slate-700">
          Partner Verification: <strong className="text-emerald-400">🟢 Verified Medical Stay</strong>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Patient Guests Active</span>
          <div className="text-2xl font-extrabold text-slate-900">8 Rooms</div>
          <span className="text-[11px] text-teal-600 font-semibold">82% occupancy</span>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kitchenette Suites Free</span>
          <div className="text-2xl font-extrabold text-brand-700">{kitchenetteSuites} Suites</div>
          <span className="text-[11px] text-slate-500 font-medium">Ready for long-stay</span>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hospital Shuttles</span>
          <div className="text-2xl font-extrabold text-amber-600">6 Runs/Day</div>
          <span className="text-[11px] text-slate-500 font-medium">Direct to Greams Rd</span>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nurse-on-call</span>
          <div className="text-2xl font-extrabold text-emerald-600">Active</div>
          <span className="text-[11px] text-emerald-600 font-semibold">24/7 on duty</span>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900">
            Incoming & Active Medical Patient Stays
          </h2>
          <span className="text-xs text-slate-500">Auto-synced with hospital discharge schedules</span>
        </div>

        <div className="space-y-3">
          {bookings.map((b) => (
            <div key={b.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{b.guestName}</h3>
                  <div className="text-xs text-brand-700 font-medium flex items-center gap-1.5 mt-0.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Treating Center: {b.treatingHospital}</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full self-start sm:self-auto">
                  {b.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-200 text-xs text-slate-600">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Dates</span>
                  <strong>{b.checkIn} to {b.checkOut}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Room Selected</span>
                  <strong>{b.roomType}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Care Requirements</span>
                  <span className="text-slate-800">{b.specialRequests}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
