const router = require('express').Router();
const controller = require('./auth.controller');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Aniket
 *             email: aniket@gmail.com
 *             password: 123456
 *             role: coach
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 user:
 *                   id: uuid
 *                   name: Aniket
 *                   email: aniket@gmail.com
 *                   role: coach
 *                 token: jwt-token
 */
router.post('/register', controller.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: aniket@gmail.com
 *             password: 123456
 *     responses:
 *       200:
 *         description: Login success
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               user:
 *                 id: uuid
 *                 name: Aniket
 *                 email: aniket@gmail.com
 *                 role: coach
 *               token: jwt-token
 */
router.post('/login', controller.login);

module.exports = router;