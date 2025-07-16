import * as express from 'express';
import { authenticateToken } from '../middleware/auth';
import { registerBus, editBus, deleteBus, getBuses } from '../controllers/bus';

const router = express.Router();

router.get('/retrieve', authenticateToken, getBuses);

router.post('/register', authenticateToken, registerBus);

router.patch('/edit/:id', authenticateToken, editBus);

router.delete('/delete/:id', authenticateToken, deleteBus);

export default router;