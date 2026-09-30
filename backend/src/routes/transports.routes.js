import { Router } from 'express';
import { 
  getAllTransports, 
  getTransportBookings, 
  bookTransport 
} from '../controllers/transports.controller.js';

const router = Router();

router.get('/', getAllTransports);
router.get('/bookings', getTransportBookings);
router.post('/book', bookTransport);

export default router;
