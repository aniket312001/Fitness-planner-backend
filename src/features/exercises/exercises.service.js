const model = require('./exercises.model');
/**
 * @swagger
 * tags:
 *   name: Exercises
 *   description: Exercise management
 */

/**
 * @swagger
 * /exercises:
 *   post:
 *     summary: Create a new exercise
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Push-ups
 *     responses:
 *       200:
 *         description: Exercise created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: uuid
 *                     name:
 *                       type: string
 *                       example: Push-ups
 *                     created_at:
 *                       type: string
 *                       example: 2026-01-01T00:00:00Z
 */
exports.createExercise = async (data) => {
  return await model.createExercise(data.name);
};


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
 *                 - id: uuid-1
 *                   name: Push-ups
 *                 - id: uuid-2
 *                   name: Squats
 */
exports.getExercises = async () => {
  return await model.getExercises();
};

exports.getExerciseById = async (id) => {
  return await model.getExerciseById(id);
};



/**
 * @swagger
 * /exercises/{id}:
 *   put:
 *     summary: Update exercise
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Push-ups
 *     responses:
 *       200:
 *         description: Updated successfully
 */
exports.updateExercise = async (id, data) => {
  return await model.updateExercise(id, data.name);
};

exports.deleteExercise = async (id) => {
  return await model.deleteExercise(id);
};