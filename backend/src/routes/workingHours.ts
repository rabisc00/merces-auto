import * as express from 'express';
import { uploadSignature} from '../middleware/upload';
import { createWorkingHours, editWorkingHours, deleteWorkingHours, getAllWorkingHours, getWorkingHoursDetails } from '../controllers/workingHours';
import { validate } from '../middleware/validate';
import { workingHoursCreateSchema, workingHoursEditSchema } from '../validators/workingHoursValidator';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/retrieve/:id', authenticateToken, getWorkingHoursDetails);

router.get('/retrieve/bydriver/:driverId', authenticateToken, getAllWorkingHours);

router.post('/create', authenticateToken, uploadSignature.single('signature'), validate(workingHoursCreateSchema), createWorkingHours);

router.patch('/edit/:id', authenticateToken, validate(workingHoursEditSchema), editWorkingHours);

router.delete('/delete/:id', authenticateToken, deleteWorkingHours);

export default router;