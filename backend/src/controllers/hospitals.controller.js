import { db } from '../data/db.js';

export function getAllHospitals(req, res) {
  const { city, treatment, search, accreditedOnly } = req.query;
  const hospitals = db.findHospitals({ city, treatment, search, accreditedOnly });
  return res.json({
    success: true,
    count: hospitals.length,
    data: hospitals
  });
}

export function getHospitalById(req, res) {
  const { id } = req.params;
  const hospital = db.findHospitalById(id);

  if (!hospital) {
    return res.status(404).json({ success: false, error: 'Hospital not found' });
  }

  // Also include doctors affiliated with this hospital
  const doctors = db.findDoctors({ hospitalId: hospital.id });
  const nearbyHotels = db.findHotels({ hospitalId: hospital.id });

  return res.json({
    success: true,
    data: {
      ...hospital,
      doctors,
      nearbyHotels
    }
  });
}

export function createHospital(req, res) {
  const { name, city, state, specialties } = req.body;

  if (!name || !city) {
    return res.status(400).json({ success: false, error: 'Hospital name and city are required' });
  }

  const newHospital = db.addHospital(req.body);
  return res.status(201).json({
    success: true,
    message: 'Hospital registered successfully',
    data: newHospital
  });
}

export function updateHospital(req, res) {
  const { id } = req.params;
  const updated = db.updateHospital(id, req.body);

  if (!updated) {
    return res.status(404).json({ success: false, error: 'Hospital not found' });
  }

  return res.json({
    success: true,
    message: 'Hospital profile updated successfully',
    data: updated
  });
}

export function deleteHospital(req, res) {
  const { id } = req.params;
  const success = db.deleteHospital(id);

  if (!success) {
    return res.status(404).json({ success: false, error: 'Hospital not found' });
  }

  return res.json({
    success: true,
    message: 'Hospital deleted successfully',
    id
  });
}
