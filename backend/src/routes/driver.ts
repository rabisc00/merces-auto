import * as express from 'express';
import { registerDriver, deleteDriver, getDrivers } from '../controllers/driver';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/retrieve', authenticateToken, getDrivers);

router.post('/create', authenticateToken, registerDriver);

router.delete('/delete/:id', authenticateToken, deleteDriver);

export default router;