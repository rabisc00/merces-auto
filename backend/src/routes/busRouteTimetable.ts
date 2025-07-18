import * as express from 'express';
import { createBusRouteTimetable, editBusRouteTimetable, deleteBusRouteTimetable, getBusRouteTimetables } from '../controllers/busRouteTimetable';
import { authenticateToken } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { timetableCreateSchema, timetableEditSchema } from '../validators/timetableValidator';

const router = express.Router();

router.get('/retrieve', authenticateToken, getBusRouteTimetables);

router.post('/create', authenticateToken, validate(timetableCreateSchema), createBusRouteTimetable);

router.patch('/edit/:id', authenticateToken, validate(timetableEditSchema), editBusRouteTimetable);

router.delete('/delete/:id', authenticateToken, deleteBusRouteTimetable);

export default router;