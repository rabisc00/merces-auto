import * as express from 'express';
import upload from '../middleware/upload';
import { registerUser, login } from '../controllers/user';
import { editUser } from '../controllers/user';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/register', authenticateToken);
router.post('/register', registerUser);

router.post('/edit/:id', authenticateToken);
router.patch('/edit/:id', upload.single('picture'), editUser);

router.post('/login', login);

export default router;