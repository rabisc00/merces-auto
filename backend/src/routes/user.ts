import * as express from 'express';
import { userCreateSchema, userEditSchema } from '../validators/userValidator';
import { validate } from '../middleware/validate';
import { uploadPicture } from '../middleware/upload';
import { createUser, login } from '../controllers/user';
import { editUser } from '../controllers/user';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/login', login);
router.post('/create', authenticateToken, validate(userCreateSchema), createUser);

router.patch('/edit/:id', authenticateToken, uploadPicture.single('picture'), validate(userEditSchema), editUser);

export default router;