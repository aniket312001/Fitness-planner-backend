const router = require('express').Router();
const controller = require('./plans.controller');
const auth = require('../../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Plans
 *   description: Workout Plan APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Exercise:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: uuid-exercise
 *         name:
 *           type: string
 *           example: Push Ups
 *
 *     WorkoutPlan:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: uuid-plan
 *         coach_id:
 *           type: string
 *           example: uuid-coach
 *         name:
 *           type: string
 *           example: Fat Loss Plan
 *         description:
 *           type: string
 *           example: Beginner fat loss workout
 *         created_at:
 *           type: string
 *           example: 2026-01-01T10:00:00.000Z
 *         exercises:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Exercise'
 */

/**
 * @swagger
 * /plans:
 *   post:
 *     summary: Create workout plan
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Fat Loss Plan
 *             description: Beginner plan
 *             exercises:
 *               - uuid-ex1
 *               - uuid-ex2
 *
 *     responses:
 *       200:
 *         description: Plan created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: uuid-plan
 *                 coach_id: uuid-coach
 *                 name: Fat Loss Plan
 *                 description: Beginner plan
 *                 created_at: 2026-01-01T10:00:00.000Z
 *                 exercises:
 *                   - id: uuid-ex1
 *                     name: Push Ups
 *                   - id: uuid-ex2
 *                     name: Squats
 */
router.post('/', auth, controller.createPlan);

/**
 * @swagger
 * /plans:
 *   get:
 *     summary: Get coach plans
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 10
 *
 *     responses:
 *       200:
 *         description: List of plans
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               total: 2
 *               page: 1
 *               limit: 10
 *               data:
 *                 - id: uuid-plan1
 *                   coach_id: uuid-coach
 *                   name: Fat Loss Plan
 *                   description: Beginner plan
 *                   exercises:
 *                     - id: uuid-ex1
 *                       name: Push Ups
 *                     - id: uuid-ex2
 *                       name: Squats
 *
 *                 - id: uuid-plan2
 *                   coach_id: uuid-coach
 *                   name: Muscle Gain Plan
 *                   description: Advanced plan
 *                   exercises:
 *                     - id: uuid-ex3
 *                       name: Deadlift
 */
router.get('/', auth, controller.getPlans);

/**
 * @swagger
 * /plans/assign:
 *   post:
 *     summary: Assign plan to multiple clients
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             planId: uuid-plan
 *             clientIds:
 *               - uuid-client1
 *               - uuid-client2
 *
 *     responses:
 *       200:
 *         description: Plan assigned successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 */
router.post('/assign', auth, controller.assignPlan);

/**
 * @swagger
 * /plans/complete:
 *   post:
 *     summary: Mark assigned plan as completed
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             assignmentId: uuid-assignment
 *
 *     responses:
 *       200:
 *         description: Plan completed successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 */
router.post('/complete', auth, controller.completePlan);

/**
 * @swagger
 * /plans/client/my-plans:
 *   get:
 *     summary: Get client assigned plans
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 10
 *
 *     responses:
 *       200:
 *         description: Client assigned plans
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               total: 1
 *               page: 1
 *               limit: 10
 *               data:
 *                 - id: uuid-assignment
 *                   plan_id: uuid-plan
 *                   client_id: uuid-client
 *                   status: pending
 *                   completed_at: null
 *                   name: Fat Loss Plan
 *                   description: Beginner plan
 *                   exercises:
 *                     - id: uuid-ex1
 *                       name: Push Ups
 *                     - id: uuid-ex2
 *                       name: Squats
 */
router.get('/client/my-plans', auth, controller.getClientPlans);

/**
 * @swagger
 * /plans/{id}:
 *   get:
 *     summary: Get plan by ID
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: uuid-plan
 *
 *     responses:
 *       200:
 *         description: Single plan details
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: uuid-plan
 *                 coach_id: uuid-coach
 *                 name: Fat Loss Plan
 *                 description: Beginner plan
 *                 exercises:
 *                   - id: uuid-ex1
 *                     name: Push Ups
 *                   - id: uuid-ex2
 *                     name: Squats
 */
router.get('/:id', auth, controller.getPlanById);

/**
 * @swagger
 * /plans/{id}:
 *   put:
 *     summary: Update workout plan
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: uuid-plan
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Updated Fat Loss Plan
 *             description: Updated description
 *             exercises:
 *               - uuid-ex1
 *               - uuid-ex3
 *
 *     responses:
 *       200:
 *         description: Plan updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: uuid-plan
 *                 coach_id: uuid-coach
 *                 name: Updated Fat Loss Plan
 *                 description: Updated description
 *                 exercises:
 *                   - id: uuid-ex1
 *                     name: Push Ups
 *                   - id: uuid-ex3
 *                     name: Deadlift
 */
router.put('/:id', auth, controller.updatePlan);

/**
 * @swagger
 * /plans/{id}:
 *   delete:
 *     summary: Delete workout plan
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: uuid-plan
 *
 *     responses:
 *       200:
 *         description: Plan deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Deleted successfully
 */
router.delete('/:id', auth, controller.deletePlan);

module.exports = router;