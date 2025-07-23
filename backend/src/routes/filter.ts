import * as express from 'express';
import { authenticateToken } from '../middleware/auth';
import { searchInfo } from '../controllers/filter';

const router = express.Router();

/**
 * @swagger
 * /filter:
 *   get:
 *     summary: Search for buses, routes, and users
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
 *         description: Search results for buses, routes, and users
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
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/InvalidInput'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/InvalidToken'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/filter', authenticateToken, searchInfo);

export default router;