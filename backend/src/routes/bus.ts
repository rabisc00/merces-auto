import * as express from 'express';
import { authenticateToken } from '../middleware/auth';
import { createBus, editBus, deleteBus, getBuses } from '../controllers/bus';

const router = express.Router();

router.get('/retrieve', authenticateToken, getBuses);

router.post('/create', authenticateToken, createBus);

router.patch('/edit/:id', authenticateToken, editBus);

router.delete('/delete/:id', authenticateToken, deleteBus);

export default router;