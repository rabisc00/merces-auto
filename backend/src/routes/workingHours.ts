import * as express from 'express';
import { uploadSignature} from '../middleware/upload';
import { createWorkingHours, editWorkingHours, deleteWorkingHours, getWorkingHours, getWorkingHoursDetails } from '../controllers/workingHours';
import { validate } from '../middleware/validate';
import { workingHoursCreateSchema, workingHoursEditSchema } from '../validators/workingHoursValidator';
import { authenticateToken } from '../middleware/auth';

/**
* @swagger
* tags:
*      name: Working Hours
*      description: API for managing Working Hours
*/

const router = express.Router();

/**
 * @swagger
 * /workinghours/retrieve/{id}:
 *   get:
 *     summary: Retrieve the details of a working hours entry by ID
 *     tags: [Working Hours]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Working Hours ID
 *     responses:
 *       200:
 *         description: Details of the working hours entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/WorkingHoursDetails'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Invalid or expired token
 *       500:
 *         description: Error fetching bus working hours details
 */
router.get('/retrieve/:id', authenticateToken, getWorkingHoursDetails);

/**
 * @swagger
 * /workinghours/retrieve/bydriver/{driverId}:
 *   get:
 *     summary: Retrieve the details of a working hours entry a driver's ID
 *     tags: [Working Hours]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: driverId
 *         required: true
 *         schema:
 *           type: string
 *         description: Driver ID
 *     responses:
 *       200:
 *         description: A driver's working hours
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/WorkingHours'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Invalid or expired token
 *       500:
 *         description: Error fetching driver's working hours
 */
router.get('/retrieve/bydriver/:driverId', authenticateToken, getWorkingHours);

/**
 * @swagger
 * /workinghours/create:
 *   post:
 *     summary: Create a new working hours entry
 *     tags: [Working Hours]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WorkingHoursInput'
 *     responses:
 *       200:
 *         description: Working hours entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Working hours entry created succesfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Invalid or expired token
 *       500:
 *         description: Error creating working hours entry
 */
router.post('/create', authenticateToken, uploadSignature.single('signature'), validate(workingHoursCreateSchema), createWorkingHours);

/**
 * @swagger
 * /workinghours/edit/{id}:
 *   patch:
 *     summary: Edit an existing working hours entry
 *     tags: [Working Hours]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the working hours entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WorkingHoursUpdateInput'
 *     responses:
 *       200:
 *         description: Working hours entry updated successfully or no changes made
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Working hours entry updated successfully
 *       400:
 *         description: Working hours entry with the given ID not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Invalid or expired token
 *       500:
 *         description: Error updating working hours entry
 */
router.patch('/edit/:id', authenticateToken, validate(workingHoursEditSchema), editWorkingHours);

/**
 * @swagger
 * /workinghours/delete/{id}:
 *   delete:
 *     summary: Delete an existing working hours entry
 *     tags: [Working Hours]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the working hours entry to delete
 *     responses:
 *       200:
 *         description: Working hours entry deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Working hours entry updated successfully
 *       400:
 *         description: Working hours with the given ID not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Invalid or expired token
 *       500:
 *         description: Error updating working hours entry
 */
router.delete('/delete/:id', authenticateToken, deleteWorkingHours);

export default router;