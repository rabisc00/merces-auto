import * as express from 'express';
import { userCreateSchema } from '../validators/userValidator';
import { validate } from '../middleware/validate';
import { createUser, login } from '../controllers/user';
import { authenticateToken } from '../middleware/auth';

/**
* @swagger
* tags:
*      name: Users
*      description: API for managing user credentials
*/

const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate a user and return a JWT token
 *     tags: [Users]
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
 *         description: Login successful, JWT token returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */
router.post('/login', login);

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Create a new user (admin-only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - isAdmin
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               name:
 *                 type: string
 *               isAdmin:
 *                 type: boolean
 *                 description: Set to true if user is an admin
 *     responses:
 *       200:
 *         description: User registered successfully
 *       409:
 *         description: Email already registered
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error registering user
 */
router.post('/create', authenticateToken, validate(userCreateSchema), createUser);

export default router;