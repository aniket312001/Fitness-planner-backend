const router = require('express').Router();
const controller = require('./exercises.controller');
const auth = require('../../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Exercises
 *   description: Exercise APIs
 */

/**
 * @swagger
 * /exercises:
 *   post:
 *     summary: Create exercise
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Push-ups
 *     responses:
 *       200:
 *         description: Exercise created
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: uuid
 *                 name: Push-ups
 *                 created_at: 2026-01-01T00:00:00Z
 */
router.post('/', auth, controller.create);

/**
 * @swagger
 * /exercises:
 *   get:
 *     summary: Get all exercises
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of exercises
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - id: uuid1
 *                   name: Push-ups
 *                 - id: uuid2
 *                   name: Squats
 */
router.get('/', auth, controller.getAll);

/**
 * @swagger
 * /exercises/{id}:
 *   get:
 *     summary: Get exercise by ID
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Exercise data
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: uuid
 *                 name: Push-ups
 */
router.get('/:id', auth, controller.getById);

/**
 * @swagger
 * /exercises/{id}:
 *   put:
 *     summary: Update exercise
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Updated Push-ups
 *     responses:
 *       200:
 *         description: Updated exercise
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: uuid
 *                 name: Updated Push-ups
 */
router.put('/:id', auth, controller.update);

/**
 * @swagger
 * /exercises/{id}:
 *   delete:
 *     summary: Delete exercise
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 */
router.delete('/:id', auth, controller.delete);

module.exports = router;