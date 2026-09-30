import React, { useState } from 'react';
import { useJourney } from '../context/JourneyContext';
import { 
  Car, 
  Plane, 
  MapPin, 
  Clock, 
  Users, 
  Accessibility, 
  CheckCircle2, 
  PhoneCall, 
  AlertCircle 
} from 'lucide-react';

export const TransportDashboardPage: React.FC = () => {
  const { transportBookings } = useJourney();

  const [fleet] = useState([
    { id: 'v-1', type: 'Toyota Innova Crysta MPV', plate: 'TN 09 BK 4421', driver: 'S. Murugan', status: 'DISPATCHED_TO_MAA', batteryOrFuel: '95%' },
    { id: 'v-2', type: 'Hydraulic Wheelchair Access Van', plate: 'TN 10 DL 8810', driver: 'M. Kumar', status: 'AVAILABLE_AT_BASE', batteryOrFuel: '88%' },
    { id: 'v-3', type: 'Maruti Suzuki Dzire Sedan', plate: 'TN 07 CM 1209', driver: 'A. Rahman', status: 'ON_OPD_SHUTTLE', batteryOrFuel: '72%' }
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold">
            <Car className="w-3.5 h-3.5" />
            <span>MedRoute Mobility Dispatch Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Specialized Patient Transit Operations
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Airport meet & greet dispatchers, wheelchair ramp vehicle management, and hospital roundtrips.
          </p>
        </div>

        <div className="text-xs text-slate-300 bg-slate-800 p-3 rounded-2xl border border-slate-700">
          Flight Tracking Radar: <strong className="text-emerald-400">🟢 Live Connected</strong>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Airport Transfers Today</span>
          <div className="text-2xl font-extrabold text-slate-900">12 Pickups</div>
          <span className="text-[11px] text-teal-600 font-semibold">Chennai MAA T4</span>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Wheelchair Vans Active</span>
          <div className="text-2xl font-extrabold text-purple-700">4 Vehicles</div>
          <span className="text-[11px] text-slate-500 font-medium">Hydraulic lift equipped</span>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">On-Time Arrival Rate</span>
          <div className="text-2xl font-extrabold text-emerald-600">99.4%</div>
          <span className="text-[11px] text-emerald-600 font-semibold">Chauffeur gate standby</span>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Drivers Certified</span>
          <div className="text-2xl font-extrabold text-brand-700">18 Drivers</div>
          <span className="text-[11px] text-slate-500 font-medium">First-Aid & Language trained</span>
        </div>
      </div>

      {/* Dispatch Board & Active Trips */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Patient Pickups (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900">
            Assigned Patient Trip Schedule
          </h2>

          <div className="space-y-3">
            {transportBookings.map((b) => (
              <div key={b.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{b.patientName} ({b.passengers} Pax)</h3>
                    <p className="text-brand-700 font-semibold">{b.serviceType}</p>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    {b.status}
                  </span>
                </div>

                <div className="text-slate-600 space-y-1 pt-1 border-t border-slate-200">
                  <div><strong>Pickup:</strong> {b.pickupLocation}</div>
                  <div><strong>Destination:</strong> {b.dropLocation}</div>
                  <div className="flex justify-between items-center pt-1 text-[11px] text-slate-500">
                    <span>Flight: <strong>{b.flightNumber || 'Direct Transfer'}</strong></span>
                    <span>Date: <strong>{b.date} at {b.time}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fleet Vehicles (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-xs">
          <h2 className="text-base font-bold text-slate-900">
            Specialized Vehicle Fleet Status
          </h2>

          <div className="space-y-2.5">
            {fleet.map((v) => (
              <div key={v.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900">{v.type}</span>
                  <span className="font-mono text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-700">{v.plate}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] text-slate-500">
                  <span>Chauffeur: <strong className="text-slate-700">{v.driver}</strong></span>
                  <span className="text-brand-700 font-semibold">{v.status.replace(/_/g, ' ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
