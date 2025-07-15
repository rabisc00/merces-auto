import * as express from 'express';
import { generateToken } from '../controllers/authentication';

const router = express.Router();

router.post('/token', generateToken);

export default router