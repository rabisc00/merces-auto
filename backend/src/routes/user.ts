import * as express from 'express';
import { registerUser, checkValidUser } from '../controllers/user';

const router = express.Router();

router.post('/register', registerUser);
router.post('/check', checkValidUser);

export default router;