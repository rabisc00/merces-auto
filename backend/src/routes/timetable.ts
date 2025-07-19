import * as express from 'express';
import { createTimetable, editTimetable, deleteTimetable, getTimetables, getTimetableDetails } from '../controllers/timetable';
import { authenticateToken } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { timetableCreateSchema, timetableEditSchema } from '../validators/timetableValidator';

const router = express.Router();

router.get('/retrieve', authenticateToken, getTimetables);
router.get('/retrieve/:id', authenticateToken, getTimetableDetails);

router.post('/create', authenticateToken, validate(timetableCreateSchema), createTimetable);

router.patch('/edit/:id', authenticateToken, validate(timetableEditSchema), editTimetable);

router.delete('/delete/:id', authenticateToken, deleteTimetable);

export default router;