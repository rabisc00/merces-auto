import * as express from 'express';
import { authenticateToken } from '../middleware/auth';
import { tripCreateSchema, tripEditSchema } from '../validators/tripValidator';
import { validate } from '../middleware/validate';
import { createTrip, deleteTrip, editTrip, getTripDetails, getTripsByBus, getTripsByDriver } from '../controllers/trip';

/**
* @swagger
* tags:
*      name: Trips
*      description: API for managing Trips
*/

const router = express.Router();

/**
 * @swagger
 * /trips/retrieve/{id}:
 *   get:
 *     summary: Retrieve the details of a trip by ID
 *     tags: [Trips]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Trip ID
 *     responses:
 *       200:
 *         description: Details of the trip
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 busRouteFound:
 *                   $ref: '#/components/schemas/TripDetails'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Invalid or expired token
 *       500:
 *         description: Error fetching trip
 */
router.get('/retrieve/:id', authenticateToken, getTripDetails);

/**
 * @swagger
 * /trips/retrieve/bybus/{busId}:
 *   get:
 *     summary: Retrieve the details of a trip by a related bus ID
 *     tags: [Trips]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: busId
 *         required: true
 *         schema:
 *           type: string
 *         description: Bus ID
 *     responses:
 *       200:
 *         description: Details of the trip
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 busRouteFound:
 *                   $ref: '#/components/schemas/TripDetails'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Invalid or expired token
 *       500:
 *         description: Error fetching trip by bus ID
 */
router.get('/retrieve/bybus/:busId', authenticateToken, getTripsByBus);

/**
 * @swagger
 * /trips/retrieve/bydriver/{driverId}:
 *   get:
 *     summary: Retrieve the details of a trip by a related driver ID
 *     tags: [Trips]
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
 *         description: Details of the trip
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 busRouteFound:
 *                   $ref: '#/components/schemas/TripDetails'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Invalid or expired token
 *       500:
 *         description: Error fetching trip by bus ID
 */
router.get('/retrieve/bydriver/:driverId', authenticateToken, getTripsByDriver);

/**
 * @swagger
 * /trips/create:
 *   post:
 *     summary: Create a new trip
 *     tags: [Trips]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TripInput'
 *     responses:
 *       200:
 *         description: Trip created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Trip created succesfully
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: 1a2b3c4d-5678-90ab-cdef-1234567890ab
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Invalid or expired token
 *       500:
 *         description: Error creating trip
 */
router.post('/create', authenticateToken, validate(tripCreateSchema), createTrip);

/**
 * @swagger
 * /trips/edit/{id}:
 *   patch:
 *     summary: Edit an existing trip
 *     tags: [Trips]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the trip to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TripUpdateInput'
 *     responses:
 *       200:
 *         description: Trip updated successfully or no changes made
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Trip updated successfully
 *       400:
 *         description: Trip with the given ID not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Invalid or expired token
 *       500:
 *         description: Error updating trip
 */
router.patch('/edit/:id', authenticateToken, validate(tripEditSchema), editTrip);

/**
 * @swagger
 * /trips/delete/{id}:
 *   delete:
 *     summary: Delete an existing trip
 *     tags: [Trips]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the trip to delete
 *     responses:
 *       200:
 *         description: Trip deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Trip updated successfully
 *       400:
 *         description: Trip with the given ID not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Invalid or expired token
 *       500:
 *         description: Error updating trip
 */
router.delete('/delete/:id', authenticateToken, deleteTrip);

export default router;