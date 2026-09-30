import React, { useState } from 'react';
import { mockTransportOptions, TransportServiceOption } from '../data/mockTransports';
import { useCurrency } from '../context/CurrencyContext';
import { useJourney } from '../context/JourneyContext';
import { VerifiedBadge } from '../components/common/VerifiedBadge';
import { 
  Car, 
  Plane, 
  MapPin, 
  Accessibility, 
  Users, 
  Luggage, 
  Check, 
  PhoneCall, 
  ShieldCheck,
  Calendar,
  Clock,
  ArrowRight
} from 'lucide-react';

export const TransportPage: React.FC = () => {
  const { formatPrice } = useCurrency();
  const { addTransportBooking, profile } = useJourney();

  const [bookingOption, setBookingOption] = useState<TransportServiceOption | null>(null);
  const [pickupDate, setPickupDate] = useState('2026-10-14');
  const [pickupTime, setPickupTime] = useState('14:30');
  const [flightNo, setFlightNo] = useState('BS-205');
  const [pickupLocation, setPickupLocation] = useState('Chennai International Airport (MAA) Terminal 4');
  const [dropLocation, setDropLocation] = useState('Lemon Tree Hotel / Greams Road, Chennai');
  const [passengers, setPassengers] = useState(profile.attendants.length + 1);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingOption) return;

    addTransportBooking({
      patientName: profile.fullName,
      serviceType: bookingOption.category === 'Airport Transfer' ? 'AIRPORT_PICKUP' : 'HOTEL_TO_HOSPITAL',
      pickupLocation,
      dropLocation,
      date: pickupDate,
      time: pickupTime,
      passengers,
      vehicleType: bookingOption.vehicleType as any,
      flightNumber: flightNo,
      estimatedCostINR: bookingOption.basePriceINR,
      partnerName: bookingOption.partnerName,
      driverName: 'S. Murugan (Assigned Chauffeur)',
      driverPhone: '+91 94440 88219',
    });

    setBookingSuccess(true);
    setTimeout(() => {
      setBookingOption(null);
      setBookingSuccess(false);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full mb-2">
          <Car className="w-3.5 h-3.5" />
          <span>Patient Mobility & Chauffeurs</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Cab & Specialized Transportation
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Pre-book airport terminal pickups, wheelchair-accessible hydraulic lift vans, and daily hotel-to-hospital consultation commutes with verified chauffeurs.
        </p>
      </div>

      {/* Visual Journey Banner: Airport -> Cab -> Hotel -> Hospital -> Hotel -> Airport */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-md">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
          Seamless Medical Transit Pipeline
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold">
          <span className="p-2 bg-slate-800 rounded-xl text-teal-400">✈️ Airport Arrival</span>
          <span className="text-slate-500">→</span>
          <span className="p-2 bg-slate-800 rounded-xl text-purple-400">🚕 Chauffeured Cab</span>
          <span className="text-slate-500">→</span>
          <span className="p-2 bg-slate-800 rounded-xl text-amber-400">🏨 Hotel Check-In</span>
          <span className="text-slate-500">→</span>
          <span className="p-2 bg-slate-800 rounded-xl text-brand-400">🏥 Hospital Treatment</span>
          <span className="text-slate-500">→</span>
          <span className="p-2 bg-slate-800 rounded-xl text-emerald-400">🏨 Hotel Recovery</span>
          <span className="text-slate-500">→</span>
          <span className="p-2 bg-slate-800 rounded-xl text-teal-400">✈️ Airport Drop</span>
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockTransportOptions.map((opt) => (
          <div
            key={opt.id}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <img
                  src={opt.image}
                  alt={opt.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <VerifiedBadge label="Verified Mobility Partner" type="TRANSPORT" size="sm" />
                </div>
                {opt.isWheelchairAccessible && (
                  <div className="absolute top-3 right-3 bg-purple-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <Accessibility className="w-3.5 h-3.5" />
                    <span>Wheelchair Ramp</span>
                  </div>
                )}
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                    {opt.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">{opt.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {opt.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Users className="w-3.5 h-3.5 text-brand-600" />
                    <span>Up to {opt.capacityPassengers} Passengers</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Luggage className="w-3.5 h-3.5 text-brand-600" />
                    <span>Up to {opt.luggageCapacity} Large Bags</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Service Standards
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-600">
                    {opt.features.map((f, i) => (
                      <span key={i} className="flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{f}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Price & Action */}
            <div className="p-6 pt-0">
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Fixed Tariff</span>
                  <span className="text-lg font-extrabold text-slate-900">
                    {formatPrice(opt.basePriceINR)}
                  </span>
                  <span className="text-[10px] text-slate-400"> (All-inclusive)</span>
                </div>

                <button
                  onClick={() => setBookingOption(opt)}
                  className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition"
                >
                  Book Transfer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {bookingOption && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-brand-600 uppercase">Transport Reservation</span>
                <h3 className="text-base font-bold text-slate-900">{bookingOption.name}</h3>
              </div>
              <button onClick={() => setBookingOption(null)} className="text-slate-400 font-bold">✕</button>
            </div>

            {bookingSuccess ? (
              <div className="p-6 text-center space-y-2">
                <Check className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">Ride Scheduled!</h4>
                <p className="text-xs text-slate-500">
                  Your chauffeur details have been saved to your patient dashboard and will sync with your flight arrival time.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Date</label>
                    <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} className="w-full p-2 bg-slate-50 border rounded-xl" required />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Time</label>
                    <input type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} className="w-full p-2 bg-slate-50 border rounded-xl" required />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Flight Number (If Airport)</label>
                  <input type="text" value={flightNo} onChange={(e) => setFlightNo(e.target.value)} placeholder="e.g. BS-205 / EK-544" className="w-full p-2 bg-slate-50 border rounded-xl" />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Pickup Location</label>
                  <input type="text" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} className="w-full p-2 bg-slate-50 border rounded-xl" required />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Drop Location</label>
                  <input type="text" value={dropLocation} onChange={(e) => setDropLocation(e.target.value)} className="w-full p-2 bg-slate-50 border rounded-xl" required />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button type="button" onClick={() => setBookingOption(null)} className="px-4 py-2 border rounded-xl text-slate-600">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-brand-600 text-white rounded-xl font-bold shadow-xs">Schedule Chauffeur</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
