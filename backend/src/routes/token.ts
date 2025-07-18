import * as express from 'express';
import { generateToken } from '../controllers/authentication';
import { validate } from '../middleware/validate';
import { authenticationSchema } from '../validators/authenticationValidators';

const router = express.Router();

router.post('/token', validate(authenticationSchema), generateToken);

export default router