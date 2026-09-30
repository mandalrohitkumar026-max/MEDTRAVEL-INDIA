import { db } from '../data/db.js';

export function getQuotations(req, res) {
  const { status, hospitalId } = req.query;
  const user = req.user;

  // If patient, restrict to their own requests unless admin
  let patientId = req.query.patientId;
  if (user && user.role === 'PATIENT') {
    patientId = user.id;
  }

  const list = db.findQuotations({ patientId, hospitalId, status });
  return res.json({
    success: true,
    count: list.length,
    data: list
  });
}

export function getQuotationById(req, res) {
  const { id } = req.params;
  const quote = db.findQuotationById(id);

  if (!quote) {
    return res.status(404).json({ success: false, error: 'Quotation request not found' });
  }

  // Security check: Patients can only view their own
  if (req.user && req.user.role === 'PATIENT' && quote.patientId !== req.user.id) {
    return res.status(403).json({ success: false, error: 'Access denied to this quotation record' });
  }

  return res.json({
    success: true,
    data: quote
  });
}

export function createQuotation(req, res) {
  const { hospitalId, treatmentCategory, treatmentName, approxBudgetINR } = req.body;

  if (!hospitalId) {
    return res.status(400).json({ success: false, error: 'hospitalId is required' });
  }

  const patientId = req.user ? req.user.id : (req.body.patientId || 'user-ahmed');
  const patientName = req.user ? req.user.name : (req.body.patientName || 'International Patient');
  const patientEmail = req.user ? req.user.email : (req.body.patientEmail || '');
  const patientCountry = req.user ? req.user.country : (req.body.patientCountry || 'International');

  const hospital = db.findHospitalById(hospitalId);

  const newQuote = db.createQuotation({
    ...req.body,
    patientId,
    patientName,
    patientEmail,
    patientCountry,
    hospitalName: hospital ? hospital.name : req.body.hospitalName
  });

  return res.status(201).json({
    success: true,
    message: 'Medical inquiry and quotation request submitted successfully',
    data: newQuote
  });
}

export function updateQuotationStatus(req, res) {
  const { id } = req.params;
  const { status, hospitalResponseNote, estimatedCostQuoteINR, timelineEstimateDays } = req.body;

  const validStatuses = ['SUBMITTED', 'UNDER_REVIEW', 'ESTIMATE_PROVIDED', 'CONFIRMED', 'CANCELLED'];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
    });
  }

  const updated = db.updateQuotation(id, {
    ...(status && { status }),
    ...(hospitalResponseNote && { hospitalResponseNote }),
    ...(estimatedCostQuoteINR && { estimatedCostQuoteINR: Number(estimatedCostQuoteINR) }),
    ...(timelineEstimateDays && { timelineEstimateDays })
  });

  if (!updated) {
    return res.status(404).json({ success: false, error: 'Quotation request not found' });
  }

  return res.json({
    success: true,
    message: 'Quotation status updated successfully',
    data: updated
  });
}

export function scheduleAppointment(req, res) {
  const { id } = req.params;
  const { date, time, doctorName, meetingPlatform } = req.body;

  if (!date || !time) {
    return res.status(400).json({ success: false, error: 'Date and time are required for scheduling' });
  }

  const quote = db.findQuotationById(id);
  if (!quote) {
    return res.status(404).json({ success: false, error: 'Quotation request not found' });
  }

  const updated = db.updateQuotation(id, {
    scheduledAppointment: {
      date,
      time,
      doctorName: doctorName || quote.selectedDoctorName || 'Chief Specialist',
      meetingPlatform: meetingPlatform || 'Secure MedTravel Video Desk'
    },
    status: quote.status === 'SUBMITTED' ? 'UNDER_REVIEW' : quote.status
  });

  return res.json({
    success: true,
    message: 'Hospital tele-consultation scheduled successfully',
    data: updated
  });
}
