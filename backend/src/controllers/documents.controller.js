import { db } from '../data/db.js';

export function getDocuments(req, res) {
  const user = req.user;
  let patientId = req.query.patientId;

  // Strict ownership: patients can only access their documents
  if (user && user.role === 'PATIENT') {
    patientId = user.id;
  }

  const docs = db.findDocuments({ patientId });
  return res.json({
    success: true,
    count: docs.length,
    data: docs
  });
}

export function uploadDocument(req, res) {
  const { title, category, fileName, fileSize, isSharedWithHospitalConsent } = req.body;

  if (!title || !fileName) {
    return res.status(400).json({
      success: false,
      error: 'Title and fileName are required'
    });
  }

  const patientId = req.user ? req.user.id : (req.body.patientId || 'user-ahmed');

  const newDoc = db.createDocument({
    patientId,
    title,
    category: category || 'Lab Report',
    fileName,
    fileSize: fileSize || '1.8 MB',
    isSharedWithHospitalConsent: isSharedWithHospitalConsent !== false
  });

  return res.status(201).json({
    success: true,
    message: 'Medical document securely uploaded and encrypted',
    data: newDoc
  });
}

export function deleteDocument(req, res) {
  const { id } = req.params;
  const patientId = req.user && req.user.role === 'PATIENT' ? req.user.id : null;

  const success = db.deleteDocument(id, patientId);
  if (!success) {
    return res.status(404).json({ success: false, error: 'Document not found or access denied' });
  }

  return res.json({
    success: true,
    message: 'Medical document removed from encrypted vault',
    id
  });
}

export function toggleConsent(req, res) {
  const { id } = req.params;
  const { consent } = req.body;

  const doc = db.findDocumentById(id);
  if (!doc) {
    return res.status(404).json({ success: false, error: 'Document not found' });
  }

  doc.isSharedWithHospitalConsent = typeof consent === 'boolean' ? consent : !doc.isSharedWithHospitalConsent;

  return res.json({
    success: true,
    message: `Hospital sharing consent updated to ${doc.isSharedWithHospitalConsent}`,
    data: doc
  });
}
