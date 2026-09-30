import { Router } from 'express';
import { getAllDoctors, getDoctorById } from '../controllers/doctors.controller.js';

const router = Router();

router.get('/', getAllDoctors);
router.get('/:id', getDoctorById);

export default router;
