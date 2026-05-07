const express = require('express');
const router = express.Router();
const userController = require('./users.controller');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User APIs
 */

/**
 * @swagger
 * /users/clients:
 *   get:
 *     summary: Get all clients with search & pagination
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         example: rahul
 *         description: Search by name or email
 *
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *         description: Page number
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 10
 *         description: Number of items per page
 *
 *     responses:
 *       200:
 *         description: Client list fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               total: 2
 *               page: 1
 *               limit: 10
 *               data:
 *                 - id: uuid1
 *                   name: Rahul
 *                   email: rahul@gmail.com
 *                   role: client
 *
 *                 - id: uuid2
 *                   name: Amit
 *                   email: amit@gmail.com
 *                   role: client
 */
router.get('/clients', userController.getClients);

module.exports = router;