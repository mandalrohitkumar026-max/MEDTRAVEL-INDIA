import { Router } from 'express';
import { 
  getAllHospitals, 
  getHospitalById, 
  createHospital, 
  updateHospital, 
  deleteHospital 
} from '../controllers/hospitals.controller.js';
import { requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getAllHospitals);
router.get('/:id', getHospitalById);
router.post('/', requireAdmin, createHospital);
router.put('/:id', requireAdmin, updateHospital);
router.delete('/:id', requireAdmin, deleteHospital);

export default router;
