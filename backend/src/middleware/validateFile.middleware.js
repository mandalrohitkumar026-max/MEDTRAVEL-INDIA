import path from 'node:path';
import { config } from '../config/index.js';

export function validateMedicalDocument(req, res, next) {
  const { fileName } = req.body;

  if (!fileName || typeof fileName !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Validation Error: fileName string is required for medical document submission.'
    });
  }

  const ext = path.extname(fileName).toLowerCase();

  // Reject executable or malicious extensions
  if (config.disallowedExtensions.includes(ext)) {
    return res.status(400).json({
      success: false,
      error: `Security Policy Violation: Uploads with extension "${ext}" are blocked for patient and server safety.`
    });
  }

  // Ensure allowed formats
  if (!config.allowedDocExtensions.includes(ext)) {
    return res.status(400).json({
      success: false,
      error: `Unsupported File Type: "${ext}". Please upload clinical records in PDF, JPEG, PNG, or DICOM format.`
    });
  }

  next();
}
