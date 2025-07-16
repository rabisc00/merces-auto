import * as express from 'express';
import { authenticateToken } from '../middleware/auth';
import { createBusRoute } from '../controllers/busRoute';

const router = express.Router();

router.post('/create', authenticateToken, createBusRoute);

export default router;