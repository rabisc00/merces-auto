import * as express from 'express';
import { createTimetable, updateTimetable, deleteTimetable, getTimetables, getTimetableDetails } from '../controllers/timetable';
import { authenticateToken } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { timetableCreateSchema, timetableEditSchema } from '../validators/timetableValidator';

/**
* @swagger
* tags:
*      name: Bus Timetables
*      description: API for managing Bus Timetables 
*/

const router = express.Router();

/**
 * @swagger
 * /timetables/retrieve:
 *   get:
 *     summary: Retrieve a paginated list of bus timetables
 *     tags: [Bus Timetables]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *           default: 1
 *         description: Page Number
 *     responses:
 *       200:
 *         description: A list of bus timetables
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalCount:
 *                   type: integer
 *                 timetables:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Timetable'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Invalid or expired token
 *       500:
 *         description: Error fetching bus timetables
 */
router.get('/retrieve', authenticateToken, getTimetables);

/**
 * @swagger
 * /timetables/retrieve/{id}:
 *   get:
 *     summary: Retrieve the details of a bus timetable by ID
 *     tags: [Bus Timetables]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bus Timetable ID
 *     responses:
 *       200:
 *         description: Details of the bus timetable
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 busRouteFound:
 *                   $ref: '#/components/schemas/TimetableDetails'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Invalid or expired token
 *       500:
 *         description: Error fetching bus timetable details
 */
router.get('/retrieve/:id', authenticateToken, getTimetableDetails);

/**
 * @swagger
 * /timetables/create:
 *   post:
 *     summary: Create a new bus timetable
 *     tags: [Bus Timetables]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TimetableInput'
 *     responses:
 *       200:
 *         description: Bus route created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bus timetable created succesfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Invalid or expired token
 *       500:
 *         description: Error creating bus timetable
 */
router.post('/create', authenticateToken, validate(timetableCreateSchema), createTimetable);

/**
 * @swagger
 * /timetables/edit/{id}:
 *   patch:
 *     summary: Edit an existing bus timetable
 *     tags: [Bus Timetables]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the bus timetable to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TimetableInput'
 *     responses:
 *       200:
 *         description: Bus timetable updated successfully or no changes made
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bus Timetable updated successfully
 *       400:
 *         description: Bus route with the given ID not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Invalid or expired token
 *       500:
 *         description: Error updating bus timetable
 */
router.patch('/edit/:id', authenticateToken, validate(timetableEditSchema), updateTimetable);

/**
 * @swagger
 * /timetables/delete/{id}:
 *   delete:
 *     summary: Delete an existing bus timetable
 *     tags: [Bus Timetables]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the bus timetable to delete
 *     responses:
 *       200:
 *         description: Bus timetable deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bus Timetable updated successfully
 *       400:
 *         description: Bus timetable with the given ID not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Invalid or expired token
 *       500:
 *         description: Error updating bus timetable
 */
router.delete('/delete/:id', authenticateToken, deleteTimetable);

export default router;