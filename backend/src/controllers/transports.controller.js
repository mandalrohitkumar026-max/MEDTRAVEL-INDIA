import { db } from '../data/db.js';

export function getAllTransports(req, res) {
  const { category, wheelchairOnly } = req.query;
  const transports = db.findTransports({ category, wheelchairOnly });
  return res.json({
    success: true,
    count: transports.length,
    data: transports
  });
}

export function getTransportBookings(req, res) {
  const patientId = req.user ? req.user.id : (req.query.patientId || 'user-ahmed');
  const bookings = db.transportBookings.filter(b => !patientId || b.patientId === patientId);

  return res.json({
    success: true,
    count: bookings.length,
    data: bookings
  });
}

export function bookTransport(req, res) {
  const { 
    transportOptionId, 
    serviceName, 
    pickupLocation, 
    dropoffLocation, 
    date, 
    time, 
    flightNumber, 
    passengersCount,
    costINR 
  } = req.body;

  if (!pickupLocation || !date) {
    return res.status(400).json({ success: false, error: 'Pickup location and date are required' });
  }

  const patientId = req.user ? req.user.id : (req.body.patientId || 'user-ahmed');

  const newBooking = {
    id: `booking-trans-${Date.now()}`,
    patientId,
    transportOptionId: transportOptionId || 'trans-innova-airport',
    serviceName: serviceName || 'Airport Medical Transfer',
    pickupLocation,
    dropoffLocation: dropoffLocation || 'Partner Hospital / Hotel',
    date,
    time: time || '12:00',
    flightNumber: flightNumber || 'N/A',
    passengersCount: Number(passengersCount) || 1,
    status: 'CONFIRMED',
    costINR: Number(costINR) || 1600,
    driverName: 'Assigned Chauffeur (MedRoute Operations)',
    driverPhone: '+91 98840 55678',
    vehicleNumber: 'DL-01-AX-9921'
  };

  db.transportBookings.unshift(newBooking);

  return res.status(201).json({
    success: true,
    message: 'Medical transport dispatch booked successfully',
    data: newBooking
  });
}
