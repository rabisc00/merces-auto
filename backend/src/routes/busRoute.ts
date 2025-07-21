import * as express from 'express';
import { authenticateToken } from '../middleware/auth';
import { busRouteCreateSchema, busRouteEditSchema } from '../validators/busRouteValidator';
import { validate } from '../middleware/validate';
import { createBusRoute, editBusRoute, getBusRoutes, deleteBusRoute, getBusRouteDetails, searchBusRoute } from '../controllers/busRoute';

/**
* @swagger
* tags:
*      name: Bus Routes
*      description: API for managing Bus Routes 
*/

const router = express.Router();

/**
 * @swagger
 * /busroutes/retrieve:
 *   get:
 *     summary: Retrieve a paginated list of bus routes
 *     tags: [Bus Routes]
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
 *         description: A list of bus routes
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
 *                 busRoutes:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/BusRoutes'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Access Denied
 *       403:
 *         description: Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid token
 *       500:
 *         description: Error fetching bus routes
 */
router.get('/retrieve', authenticateToken, getBusRoutes);

/**
 * @swagger
 * /busroutes/retrieve/{id}:
 *   get:
 *     summary: Retrieve the details of a bus route by ID
 *     tags: [Bus Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bus Route ID
 *     responses:
 *       200:
 *         description: Details of the bus route
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/BusRouteDetails'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Access Denied
 *       403:
 *         description: Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid token
 *       500:
 *         description: Error fetching bus route details
 */
router.get('/retrieve/:id', authenticateToken, getBusRouteDetails);

/**
 * @swagger
 * /busroutes/filter:
 *   get:
 *     summary: A list of filtered bus routes
 *     tags: [Bus Routes]
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
 *         description: A list of filtered bus routes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 routeResults:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/BusRoutes'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Access Denied
 *       403:
 *         description: Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid token
 *       500:
 *         description: Error fetching filtered bus routes
 */
router.get('/filter', authenticateToken, searchBusRoute);

/**
 * @swagger
 * /busroutes/create:
 *   post:
 *     summary: Create a new bus route
 *     tags: [Bus Routes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BusRouteInput'
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
 *                   example: Bus route created succesfully
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: 1a2b3c4d-5678-90ab-cdef-1234567890ab
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Access Denied
 *       403:
 *         description: Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid token
 *       500:
 *         description: Error creating bus route
 */
router.post('/create', authenticateToken, validate(busRouteCreateSchema), createBusRoute);

/**
 * @swagger
 * /busroutes/edit/{id}:
 *   patch:
 *     summary: Edit an existing bus route
 *     tags: [Bus Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the bus route to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BusRouteUpdateInput'
 *     responses:
 *       200:
 *         description: Bus route updated successfully or no changes made
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bus Route updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Access Denied
 *       403:
 *         description: Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid token
 *       404:
 *         description: Bus route with the given id not found
 *       500:
 *         description: Error updating bus route
 */
router.patch('/edit/:id', authenticateToken, validate(busRouteEditSchema), editBusRoute);

/**
 * @swagger
 * /busroutes/delete/{id}:
 *   delete:
 *     summary: Delete an existing bus route
 *     tags: [Bus Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the bus route to delete
 *     responses:
 *       200:
 *         description: Bus route deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bus Route updated successfully
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Access Denied
 *       403:
 *         description: Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid token
 *       404:
 *         description: Bus route with the given ID not found
 *       500:
 *         description: Error updating bus route
 */
router.delete('/delete/:id', authenticateToken, deleteBusRoute);

export default router;