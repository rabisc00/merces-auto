import * as express from 'express';
import { createDriver, deleteDriver, getDrivers } from '../controllers/driver';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/retrieve', authenticateToken, getDrivers);

router.post('/create', authenticateToken, createDriver);

router.delete('/delete/:id', authenticateToken, deleteDriver);

export default router;