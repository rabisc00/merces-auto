import * as express from 'express';
import { driverCreateSchema, driverEditSchema } from '../validators/driverValidator';
import { uploadPicture } from '../middleware/upload';
import { validate } from '../middleware/validate';
import { createDriver, deleteDriver, getDriverDetails, getDrivers, searchDriver, updateDriver } from '../controllers/driver';
import { authenticateToken } from '../middleware/auth';

/**
* @swagger
* tags:
*      name: Bus Drivers
*      description: API for managing Bus Drivers 
*/

const router = express.Router();

/**
 * @swagger
 * /drivers/retrieve:
 *   get:
 *     summary: Retrieve a paginated list of drivers
 *     tags: [Bus Drivers]
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
 *         description: A list of bus drivers
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
 *                 drivers:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Driver'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Invalid or expired token
 *       500:
 *         description: Error fetching bus routes
 */
router.get('/retrieve', authenticateToken, getDrivers);

/**
 * @swagger
 * /drivers/retrieve/{id}:
 *   get:
 *     summary: Retrieve the details of a driver by ID
 *     tags: [Bus Drivers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Driver ID
 *     responses:
 *       200:
 *         description: Details of a bus driver
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 $ref: '#/components/schemas/DriverDetails'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Invalid or expired token
 *       500:
 *         description: Error fetching bus driver details
 */
router.get('/retrieve/:id', authenticateToken, getDriverDetails);

/**
 * @swagger
 * /drivers/filter:
 *   get:
 *     summary: A list of filtered bus drivers
 *     tags: [Bus Drivers]
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
 *         description: A list of filtered bus drivers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 routeResults:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Driver'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Invalid or expired token
 *       500:
 *         description: Error fetching filtered bus drivers
 */
router.get('/filter', authenticateToken, searchDriver);

/**
 * @swagger
 * /drivers/create:
 *   post:
 *     summary: Create a new bus driver
 *     tags: [Bus Drivers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DriverInput'
 *     responses:
 *       200:
 *         description: Bus driver created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bus driver created succesfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Invalid or expired token
 *       500:
 *         description: Error creating bus driver
 */
router.post('/create', authenticateToken, validate(driverCreateSchema), createDriver);

/**
 * @swagger
 * /drivers/edit/{id}:
 *   patch:
 *     summary: Edit an existing bus driver
 *     tags: [Bus Drivers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the bus driver to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DriverUpdateInput'
 *     responses:
 *       200:
 *         description: Bus driver updated successfully or no changes made
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bus Driver updated successfully
 *       400:
 *         description: Bus route with the given ID not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Invalid or expired token
 *       500:
 *         description: Error updating bus driver
 */
router.patch('/edit/:id', authenticateToken, uploadPicture.single('picture'), validate(driverEditSchema), updateDriver);

/**
 * @swagger
 * /drivers/delete/{id}:
 *   delete:
 *     summary: Delete an existing bus driver
 *     tags: [Bus Drivers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the bus driver to delete
 *     responses:
 *       200:
 *         description: Bus driver deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bus Driver updated successfully
 *       400:
 *         description: Bus driver with the given ID not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Invalid or expired token
 *       500:
 *         description: Error updating bus driver
 */
router.delete('/delete/:id', authenticateToken, deleteDriver);

export default router;