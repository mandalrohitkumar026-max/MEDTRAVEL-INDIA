import { db } from '../data/db.js';

export function getAllTreatments(req, res) {
  const { search } = req.query;
  const treatments = db.findTreatments({ search });
  return res.json({
    success: true,
    count: treatments.length,
    data: treatments
  });
}

export function getTreatmentById(req, res) {
  const { id } = req.params;
  const treatment = db.findTreatmentById(id);

  if (!treatment) {
    return res.status(404).json({ success: false, error: 'Treatment category not found' });
  }

  // Also include hospitals offering this treatment
  const relevantHospitals = db.findHospitals({ treatment: treatment.category });

  return res.json({
    success: true,
    data: {
      ...treatment,
      relevantHospitals
    }
  });
}

export function createTreatment(req, res) {
  const { name, category, averageCostINR } = req.body;

  if (!name || !category) {
    return res.status(400).json({ success: false, error: 'Treatment name and category are required' });
  }

  const newTreatment = db.addTreatment(req.body);
  return res.status(201).json({
    success: true,
    message: 'Treatment package created successfully',
    data: newTreatment
  });
}

export function updateTreatment(req, res) {
  const { id } = req.params;
  const updated = db.updateTreatment(id, req.body);

  if (!updated) {
    return res.status(404).json({ success: false, error: 'Treatment not found' });
  }

  return res.json({
    success: true,
    message: 'Treatment updated successfully',
    data: updated
  });
}

export function deleteTreatment(req, res) {
  const { id } = req.params;
  const success = db.deleteTreatment(id);

  if (!success) {
    return res.status(404).json({ success: false, error: 'Treatment not found' });
  }

  return res.json({
    success: true,
    message: 'Treatment deleted successfully',
    id
  });
}
