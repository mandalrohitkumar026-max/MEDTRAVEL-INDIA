import React, { useState } from 'react';
import { mockHotels } from '../data/mockHotels';
import { Hotel } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import { VerifiedBadge } from '../components/common/VerifiedBadge';
import { 
  Hotel as HotelIcon, 
  MapPin, 
  Building2, 
  Filter, 
  Check, 
  Star, 
  PhoneCall, 
  Utensils, 
  Accessibility, 
  ShieldCheck,
  CalendarCheck
} from 'lucide-react';

export const HotelFinderPage: React.FC = () => {
  const { formatPrice } = useCurrency();
  const [selectedCity, setSelectedCity] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [maxDistanceKm, setMaxDistanceKm] = useState(5);
  const [requireKitchen, setRequireKitchen] = useState(false);
  const [requireNurse, setRequireNurse] = useState(false);
  const [bookingHotel, setBookingHotel] = useState<Hotel | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const filteredHotels = mockHotels.filter((h) => {
    if (selectedCity !== 'ALL' && h.city !== selectedCity) return false;
    if (selectedCategory !== 'ALL' && h.category !== selectedCategory) return false;
    if (h.distanceToHospitalKm > maxDistanceKm) return false;
    if (requireKitchen && !h.medicalPatientFriendlyFeatures.kitchenetteAvailable) return false;
    if (requireNurse && !h.medicalPatientFriendlyFeatures.nurseOnCall) return false;
    return true;
  });

  const handleBook = (hotel: Hotel) => {
    setBookingHotel(hotel);
    setBookingSuccess(false);
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingHotel(null);
      setBookingSuccess(false);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full mb-2">
          <HotelIcon className="w-3.5 h-3.5" />
          <span>Patient-Friendly Accommodation</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Hotel & Medical Serviced Apartment Finder
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Locate vetted accommodations within minutes of treating hospitals. Equipped with kitchenettes, wheelchair-accessible lifts, sanitized linens, and custom convalescence dining.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-12 gap-3 items-center text-xs">
        <div className="sm:col-span-3">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">City</label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
          >
            <option value="ALL">All Medical Cities</option>
            <option value="Chennai">Chennai</option>
            <option value="Delhi NCR">Delhi NCR</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Stay Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
          >
            <option value="ALL">All Categories</option>
            <option value="Serviced Medical Apartment">Serviced Apartment with Kitchen</option>
            <option value="3-Star Standard">3-Star Standard</option>
            <option value="4-Star Premium">4-Star Premium</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            <span>Hospital Proximity</span>
            <span className="text-brand-700 font-bold">{maxDistanceKm} km</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="10"
            step="0.5"
            value={maxDistanceKm}
            onChange={(e) => setMaxDistanceKm(parseFloat(e.target.value))}
            className="w-full accent-brand-600 cursor-pointer"
          />
        </div>

        <div className="sm:col-span-3 flex items-center gap-3 pt-4 sm:pt-0">
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
            <input
              type="checkbox"
              checked={requireKitchen}
              onChange={(e) => setRequireKitchen(e.target.checked)}
              className="rounded text-brand-600"
            />
            <span>Kitchenette</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
            <input
              type="checkbox"
              checked={requireNurse}
              onChange={(e) => setRequireNurse(e.target.checked)}
              className="rounded text-brand-600"
            />
            <span>Nurse-on-call</span>
          </label>
        </div>
      </div>

      {/* Hotel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <VerifiedBadge label="Verified Stay" type="HOTEL" size="sm" />
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-[11px] font-bold text-slate-800 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{hotel.ratingScore} ({hotel.reviewsCount})</span>
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <span className="text-[11px] font-semibold bg-slate-900/80 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-teal-400" />
                    {hotel.distanceToHospitalKm} km from {hotel.nearestHospitalName.split(',')[0]}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {hotel.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 leading-tight mt-0.5">
                    {hotel.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{hotel.address}</span>
                  </p>
                </div>

                {/* Medical friendly amenities */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1 text-xs">
                  <div className="font-semibold text-slate-800 text-[11px] flex items-center gap-1">
                    <Accessibility className="w-3.5 h-3.5 text-brand-600" />
                    <span>Patient Amenities:</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-600">
                    {hotel.medicalPatientFriendlyFeatures.wheelchairAccessible && (
                      <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-600" /> Wheelchair ramp</span>
                    )}
                    {hotel.medicalPatientFriendlyFeatures.elevator && (
                      <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-600" /> Wide elevator</span>
                    )}
                    {hotel.medicalPatientFriendlyFeatures.kitchenetteAvailable && (
                      <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-600" /> Kitchenette</span>
                    )}
                    {hotel.medicalPatientFriendlyFeatures.halalDietaryCustomization && (
                      <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-600" /> Halal / soft meals</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Price & Action */}
            <div className="p-5 pt-0">
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Estimated Rate</span>
                  <span className="text-base font-extrabold text-slate-900">
                    {formatPrice(hotel.pricePerNightINR)}
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal"> / night</span>
                </div>

                <button
                  onClick={() => handleBook(hotel)}
                  className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition"
                >
                  Reserve Stay
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {bookingHotel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-brand-600 uppercase">Patient Reservation</span>
                <h3 className="text-base font-bold text-slate-900">{bookingHotel.name}</h3>
              </div>
              <button onClick={() => setBookingHotel(null)} className="text-slate-400 font-bold">✕</button>
            </div>

            {bookingSuccess ? (
              <div className="p-6 text-center space-y-2">
                <CalendarCheck className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">Hotel Voucher Confirmed!</h4>
                <p className="text-xs text-slate-500">
                  A reservation request has been linked to your patient trip file. The hotel concierge will coordinate early check-in and room accessibility.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmReservation} className="space-y-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Check-in Date</label>
                  <input type="date" defaultValue="2026-10-14" className="w-full p-2 bg-slate-50 border rounded-xl" required />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Stay Duration (Nights)</label>
                  <input type="number" defaultValue={10} min={1} max={60} className="w-full p-2 bg-slate-50 border rounded-xl" required />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Special Medical Requests</label>
                  <input type="text" placeholder="e.g. Ground floor room, wheelchair access, low sodium meals" className="w-full p-2 bg-slate-50 border rounded-xl" />
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button type="button" onClick={() => setBookingHotel(null)} className="px-4 py-2 border rounded-xl text-slate-600">Cancel</button>
                  <button type="submit" className="px-5 py-2 bg-brand-600 text-white rounded-xl font-bold shadow-xs">Confirm Booking</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
