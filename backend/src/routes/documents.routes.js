import { Router } from 'express';
import { 
  getDocuments, 
  uploadDocument, 
  deleteDocument, 
  toggleConsent 
} from '../controllers/documents.controller.js';
import { validateMedicalDocument } from '../middleware/validateFile.middleware.js';

const router = Router();

router.get('/', getDocuments);
router.post('/', validateMedicalDocument, uploadDocument);
router.delete('/:id', deleteDocument);
router.patch('/:id/consent', toggleConsent);

export default router;
