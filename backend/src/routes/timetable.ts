import * as express from 'express';
import { createTimetable, editTimetable, deleteTimetable, getTimetablesByRouteId, getTimetableDetails } from '../controllers/timetable';
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
 * /timetables/retrieve/byroute/{routeId}:
 *   get:
 *     summary: Retrieve a paginated list of bus timetables by route ID
 *     tags: [Bus Timetables]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: path
 *         name: routeId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Bus Route ID
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
 *                 records:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Timetable'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/InvalidToken'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/retrieve/byroute/:routeId', authenticateToken, getTimetablesByRouteId);

/**
 * @swagger
 * /timetables/retrieve/{id}:
 *   get:
 *     summary: Retrieve the details of a timetable entry
 *     tags: [Bus Timetables]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Timetable ID
 *     responses:
 *       200:
 *         description: The details of a timetable entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Timetable'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/InvalidToken'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
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
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: 1a2b3c4d-5678-90ab-cdef-1234567890ab
 *       400:
 *         $ref: '#/components/responses/InvalidInput'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/InvalidToken'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
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
 *         $ref: '#/components/responses/InvalidInput'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/InvalidToken'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.patch('/edit/:id', authenticateToken, validate(timetableEditSchema), editTimetable);

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
 *         $ref: '#/components/responses/InvalidInput'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/InvalidToken'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete('/delete/:id', authenticateToken, deleteTimetable);

export default router;