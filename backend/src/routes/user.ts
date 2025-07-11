import * as express from 'express';
import { registerUser, login } from '../controllers/user';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);

export default router;