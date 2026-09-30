export interface TransportServiceOption {
  id: string;
  name: string;
  category: 'Airport Transfer' | 'Hospital Commute' | 'Full Stay Dedicated' | 'Wheelchair Lift Van';
  description: string;
  vehicleType: string;
  capacityPassengers: number;
  luggageCapacity: number;
  basePriceINR: number;
  isWheelchairAccessible: boolean;
  features: string[];
  partnerName: string;
  partnerPhone: string;
  verified: boolean;
  image: string;
}

export const mockTransportOptions: TransportServiceOption[] = [
  {
    id: 'trans-carewheels-van',
    name: 'CareWheels Hydraulic Wheelchair Access Van',
    category: 'Wheelchair Lift Van',
    description: 'Specially modified van with hydraulic ramp, lockable floor anchors, oxygen cylinder slot, and trained medical attendant driver.',
    vehicleType: 'Force Traveller / Tata Winger Special Mobility',
    capacityPassengers: 4,
    luggageCapacity: 4,
    basePriceINR: 2200,
    isWheelchairAccessible: true,
    features: ['Hydraulic Wheelchair Ramp', 'Floor Lockdown Straps', 'Oxygen Bottle Bracket', 'Driver First-Aid Certified', 'AC Cabin'],
    partnerName: 'CareWheels Medical Mobility India',
    partnerPhone: '+91 98840 12345',
    verified: true,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'trans-innova-airport',
    name: 'Apollo / Airport VIP Arrival MPV (Innova Crysta)',
    category: 'Airport Transfer',
    description: 'Chauffeured arrival pickup at international arrivals with personalized patient name placard, mineral water, and direct hospital/hotel routing.',
    vehicleType: 'Toyota Innova Crysta 7-Seater',
    capacityPassengers: 5,
    luggageCapacity: 4,
    basePriceINR: 1500,
    isWheelchairAccessible: false,
    features: ['Terminal Gate Meet & Greet', 'Flight Delay Monitoring', 'Extra Legroom Reclining Seats', 'English & Hindi Speaking Chauffeur'],
    partnerName: 'MedRoute Chauffeur Services',
    partnerPhone: '+91 98101 54321',
    verified: true,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'trans-sedan-hospital-shuttle',
    name: 'Daily Hospital OPD Commuter Sedan',
    category: 'Hospital Commute',
    description: 'Daily fixed-rate roundtrip transfers between your hotel or guesthouse and the hospital consultation wings.',
    vehicleType: 'Maruti Suzuki Dzire / Hyundai Aura Sedan',
    capacityPassengers: 3,
    luggageCapacity: 2,
    basePriceINR: 800,
    isWheelchairAccessible: false,
    features: ['Flexible OPD Return Timings', 'GPS Real-Time Tracking', 'Clean Sanitized Daily Interior', 'Direct Drop at Hospital Portico'],
    partnerName: 'CityHealth Cabs',
    partnerPhone: '+91 98400 98765',
    verified: true,
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'trans-dedicated-stay',
    name: 'Full Trip 7-Day Dedicated Chauffeur Car',
    category: 'Full Stay Dedicated',
    description: 'Private car and driver at patient and family disposal 10 hours daily for diagnostic visits, pharmacy errands, and local transport.',
    vehicleType: 'Toyota Innova / Ertiga Multi-Utility Vehicle',
    capacityPassengers: 6,
    luggageCapacity: 5,
    basePriceINR: 14500,
    isWheelchairAccessible: false,
    features: ['Dedicated Driver for Entire Week', 'Unlimited Hospital Runs within City', 'Attendant Airport Drop Included', 'Toll & Fuel Included'],
    partnerName: 'MedRoute Chauffeur Services',
    partnerPhone: '+91 98101 54321',
    verified: true,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'trans-airport-return',
    name: 'Departure Airport Drop & Porter Escort',
    category: 'Airport Transfer',
    description: 'Scheduled departure transfer from hospital or hotel to international departure terminal with baggage assistance and wheel-assist handover.',
    vehicleType: 'Toyota Innova Crysta / Luxury Van',
    capacityPassengers: 5,
    luggageCapacity: 5,
    basePriceINR: 1600,
    isWheelchairAccessible: false,
    features: ['Airline Check-in Curbside Assistance', 'Flexible Departure Timings', 'Spacious Cargo for Medical Gear', 'English-Speaking Driver'],
    partnerName: 'MedRoute Chauffeur Services',
    partnerPhone: '+91 98101 54321',
    verified: true,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'trans-intercity-medical-van',
    name: 'Intercity Sanitized Patient Transit Van',
    category: 'Hospital Commute',
    description: 'Long-distance patient transport between metropolitan medical centers, airports, and regional stay facilities with reclining stretcher/couch.',
    vehicleType: 'Tempo Traveller High-Roof Medical Edition',
    capacityPassengers: 6,
    luggageCapacity: 6,
    basePriceINR: 4800,
    isWheelchairAccessible: true,
    features: ['Reclining Medical Sleeper Berth', 'AC Dual Climate Control', 'Power Inverter for Medical Equipment', 'Bottled Water & First-Aid Kit'],
    partnerName: 'CareWheels Medical Mobility India',
    partnerPhone: '+91 98840 12345',
    verified: true,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'trans-luxury-recup',
    name: 'Executive Soft-Suspension Recovery Sedan',
    category: 'Hospital Commute',
    description: 'Premium smooth-suspension executive vehicle designed for orthopedic and post-operative patients needing gentle transit over city roads.',
    vehicleType: 'Toyota Camry Hybrid / Skoda Superb',
    capacityPassengers: 3,
    luggageCapacity: 3,
    basePriceINR: 1900,
    isWheelchairAccessible: false,
    features: ['Ultra-Smooth Electronically Controlled Suspension', 'Orthopedic Cushioning Pillows', 'Whisper-Quiet Hybrid Drive', 'On-Demand Temperature Control'],
    partnerName: 'CityHealth Cabs',
    partnerPhone: '+91 98400 98765',
    verified: true,
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=600&q=80',
  }
];

