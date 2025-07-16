import * as express from 'express';
import upload from '../middleware/upload';
import { registerUser, login } from '../controllers/user';
import { editUser } from '../controllers/user';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/login', login);
router.post('/register', authenticateToken, registerUser);

router.patch('/edit/:id', authenticateToken, upload.single('picture'), editUser);

export default router;