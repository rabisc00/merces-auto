import * as express from 'express';
import { driverCreateSchema } from '../validators/driverValidator';
import { validate } from '../middleware/validate';
import { createDriver, deleteDriver, getDriverDetails, getDrivers } from '../controllers/driver';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/retrieve', authenticateToken, getDrivers);
router.get('retrieve/:id', authenticateToken, getDriverDetails);

router.post('/create', authenticateToken, validate(driverCreateSchema), createDriver);

router.delete('/delete/:id', authenticateToken, deleteDriver);

export default router;