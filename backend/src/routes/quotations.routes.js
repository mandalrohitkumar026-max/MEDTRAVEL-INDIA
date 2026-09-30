import { Router } from 'express';
import { 
  getQuotations, 
  getQuotationById, 
  createQuotation, 
  updateQuotationStatus, 
  scheduleAppointment 
} from '../controllers/quotations.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getQuotations);
router.get('/:id', getQuotationById);
router.post('/', createQuotation);
router.patch('/:id/status', updateQuotationStatus);
router.post('/:id/appointment', scheduleAppointment);

export default router;
