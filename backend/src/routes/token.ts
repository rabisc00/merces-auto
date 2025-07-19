import * as express from 'express';
import { generateToken } from '../controllers/authentication';
import { validate } from '../middleware/validate';
import { authenticationSchema } from '../validators/authenticationValidators';

const router = express.Router();

/**
 * @swagger
 * /token:
 *   post:
 *     summary: Generate JWT token for admin user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Token generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Access denied - invalid credentials or not an admin
 *       500:
 *         description: Error generating token
 */
router.post('/token', validate(authenticationSchema), generateToken);

export default router