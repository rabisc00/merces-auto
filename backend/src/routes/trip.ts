import * as express from 'express';
import { authenticateToken } from '../middleware/auth';
import { tripCreateSchema, tripEditSchema } from '../validators/tripValidator';
import { validate } from '../middleware/validate';
import { createTrip, deleteTrip, editTrip, getTripDetails, getTripsByBus, getTripsByDriver } from '../controllers/trip';

const router = express.Router();

router.get('/retrieve/:id', authenticateToken, getTripDetails);
router.get('/retrieve/bybus/:busId', authenticateToken, getTripsByBus);
router.get('/retrieve/bydriver/:driverId', authenticateToken, getTripsByDriver);

router.post('/create', authenticateToken, validate(tripCreateSchema), createTrip);

router.patch('/update/:id', authenticateToken, validate(tripEditSchema), editTrip);

router.delete('/delete/:id', authenticateToken, deleteTrip);

export default router;