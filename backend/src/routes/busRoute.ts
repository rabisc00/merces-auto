import * as express from 'express';
import { authenticateToken } from '../middleware/auth';
import { createBusRoute, updateBusRoute, getBusRoutes, deleteBusRoute } from '../controllers/busRoute';

const router = express.Router();

router.get('/retrieve', authenticateToken, getBusRoutes);

router.post('/create', authenticateToken, createBusRoute);

router.patch('/edit/:id', authenticateToken, updateBusRoute);

router.delete('/delete/:id', authenticateToken, deleteBusRoute);

export default router;