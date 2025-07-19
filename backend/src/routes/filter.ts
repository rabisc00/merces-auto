import * as express from 'express';
import { authenticateToken } from '../middleware/auth';
import { searchInfo } from '../controllers/filter';

const router = express.Router();

/**
 * @swagger
 * /filter:
 *   get:
 *     summary: Search for buses, routes, and drivers
 *     tags: [Search]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query string
 *     responses:
 *       200:
 *         description: Search results for buses, routes, and drivers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 buses:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Bus'
 *                 routes:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/BusRoutes'
 *                 drivers:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Driver'
 *       400:
 *         description: Missing search query
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Invalid or expired token
 *       500:
 *         description: Search error
 */
router.get('/filter', authenticateToken, searchInfo);

export default router;