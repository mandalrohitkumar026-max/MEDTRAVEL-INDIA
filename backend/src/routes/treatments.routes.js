import { Router } from 'express';
import { 
  getAllTreatments, 
  getTreatmentById, 
  createTreatment, 
  updateTreatment, 
  deleteTreatment 
} from '../controllers/treatments.controller.js';
import { requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getAllTreatments);
router.get('/:id', getTreatmentById);
router.post('/', requireAdmin, createTreatment);
router.put('/:id', requireAdmin, updateTreatment);
router.delete('/:id', requireAdmin, deleteTreatment);

export default router;
