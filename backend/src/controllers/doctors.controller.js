import { db } from '../data/db.js';

export function getAllDoctors(req, res) {
  const { hospitalId, specialty, city, search } = req.query;
  const doctors = db.findDoctors({ hospitalId, specialty, city, search });
  return res.json({
    success: true,
    count: doctors.length,
    data: doctors
  });
}

export function getDoctorById(req, res) {
  const { id } = req.params;
  const doctor = db.findDoctorById(id);

  if (!doctor) {
    return res.status(404).json({ success: false, error: 'Doctor not found' });
  }

  // Include hospital detail
  const hospital = db.findHospitalById(doctor.hospitalId);

  return res.json({
    success: true,
    data: {
      ...doctor,
      hospital
    }
  });
}
