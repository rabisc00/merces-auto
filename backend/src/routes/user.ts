import * as express from 'express';
import upload from '../middleware/upload';
import { createUser, login } from '../controllers/user';
import { editUser } from '../controllers/user';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/login', login);
router.post('/create', authenticateToken, createUser);

router.patch('/edit/:id', authenticateToken, upload.single('picture'), editUser);

export default router;