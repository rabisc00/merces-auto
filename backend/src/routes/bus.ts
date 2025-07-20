import * as express from 'express';
import { authenticateToken } from '../middleware/auth';
import { busCreateSchema, busUpdateSchema } from '../validators/busValidator';
import { validate } from '../middleware/validate';
import { createBus, editBus, deleteBus, getBuses, getBusDetails, searchBus } from '../controllers/bus';

/**
* @swagger
* tags:
*      name: Buses
*      description: API for managing buses
*/

const router = express.Router();

/**
 * @swagger
 * /buses/retrieve:
 *   get:
 *     summary: Retrieve a paginated list of buses
 *     tags: [Buses]
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
 *         description: A list of buses
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
 *                 buses:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Bus'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Invalid or expired token
 *       500:
 *         description: Error fetching bus routes
 */
router.get('/retrieve', authenticateToken, getBuses);

/**
 * @swagger
 * /buses/retrieve/{id}:
 *   get:
 *     summary: Retrieve the details of a bus by ID
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bus ID
 *     responses:
 *       200:
 *         description: Details of the bus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 busFound:
 *                   $ref: '#/components/schemas/BusDetails'
 *       400:
 *         description: Bus with given id not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Invalid or expired token
 *       500:
 *         description: Error fetching bus details
 */
router.get('/retrieve/:id', authenticateToken, getBusDetails);

/**
 * @swagger
 * /buses/filter:
 *   get:
 *     summary: A list of filtered buses
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Query
 *     responses:
 *       200:
 *         description: A list of filtered buses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 routeResults:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Bus'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Invalid or expired token
 *       500:
 *         description: Error fetching filtered buses
 */
router.get('/filter', authenticateToken, searchBus);

/**
 * @swagger
 * /buses/create:
 *   post:
 *     summary: Create a new bus
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BusInput'
 *     responses:
 *       200:
 *         description: Bus created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bus created succesfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Invalid or expired token
 *       409:
 *          description: Bus with the given number already exists
 *       500:
 *         description: Error creating bus
 */
router.post('/create', authenticateToken, validate(busCreateSchema), createBus);

/**
 * @swagger
 * /buses/edit/{id}:
 *   patch:
 *     summary: Edit an existing bus
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the bus to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BusUpdateInput'
 *     responses:
 *       200:
 *         description: Bus updated successfully or no changes made
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bus updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Invalid or expired token
 *       404:
 *         description: Bus with the given id not found
 *       500:
 *         description: Error updating bus
 */
router.patch('/edit/:id', authenticateToken, validate(busUpdateSchema), editBus);

/**
 * @swagger
 * /buses/delete/{id}:
 *   delete:
 *     summary: Delete an existing bus
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the bus to delete
 *     responses:
 *       200:
 *         description: Bus deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bus deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Invalid or expired token
 *       404:
 *         description: Bus with the given ID not found
 *       500:
 *         description: Error updating bus 
 */
router.delete('/delete/:id', authenticateToken, deleteBus);

export default router;