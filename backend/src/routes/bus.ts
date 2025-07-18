import * as express from 'express';
import { authenticateToken } from '../middleware/auth';
import { busCreateSchema, busUpdateSchema } from '../validators/busValidator';
import { validate } from '../middleware/validate';
import { createBus, editBus, deleteBus, getBuses } from '../controllers/bus';

const router = express.Router();

router.get('/retrieve', authenticateToken, getBuses);

router.post('/create', authenticateToken, validate(busCreateSchema), createBus);

router.patch('/edit/:id', authenticateToken, validate(busUpdateSchema), editBus);

router.delete('/delete/:id', authenticateToken, deleteBus);

export default router;