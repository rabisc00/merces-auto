import * as express from 'express';
import { authenticateToken } from '../middleware/auth';
import { busRouteCreateSchema, busRouteEditSchema } from '../validators/busRouteValidator';
import { validate } from '../middleware/validate';
import { createBusRoute, updateBusRoute, getBusRoutes, deleteBusRoute, getBusRouteDetails } from '../controllers/busRoute';

const router = express.Router();

router.get('/retrieve', authenticateToken, getBusRoutes);
router.get('/retrieve/:id', authenticateToken, getBusRouteDetails);

router.post('/create', authenticateToken, validate(busRouteCreateSchema), createBusRoute);

router.patch('/edit/:id', authenticateToken, validate(busRouteEditSchema), updateBusRoute);

router.delete('/delete/:id', authenticateToken, deleteBusRoute);

export default router;