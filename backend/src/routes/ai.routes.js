import { Router } from 'express';
import { chatAssistant } from '../controllers/ai.controller.js';

const router = Router();

router.post('/chat', chatAssistant);

export default router;
