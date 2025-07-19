import * as express from 'express';
import { authenticateToken } from '../middleware/auth';
import { searchInfo } from '../controllers/filter';

const router = express.Router();

router.get('/filter', authenticateToken, searchInfo);

export default router;