const pool = require('../../config/db');

// =========================================
// CREATE PLAN
// =========================================
exports.createPlan = async (
  coach_id,
  name,
  description
) => {
  const { rows } = await pool.query(
    `
    INSERT INTO workout_plans (
      coach_id,
      name,
      description
    )
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [coach_id, name, description]
  );

  return rows[0];
};

// =========================================
// ADD PLAN EXERCISE
// =========================================
exports.addPlanExercise = async (
  plan_id,
  exercise_id,
  order
) => {
  await pool.query(
    `
    INSERT INTO plan_exercises (
      plan_id,
      exercise_id,
      order_index
    )
    VALUES ($1, $2, $3)
    `,
    [plan_id, exercise_id, order]
  );
};

// =========================================
// GET PLAN EXERCISES
// =========================================
exports.getPlanExercises = async (
  planId
) => {
  const { rows } = await pool.query(
    `
    SELECT
      e.id,
      e.name,
      pe.order_index

    FROM plan_exercises pe

    JOIN exercises e
      ON pe.exercise_id = e.id

    WHERE pe.plan_id = $1

    ORDER BY pe.order_index ASC
    `,
    [planId]
  );

  return rows;
};

// =========================================
// GET ALL PLANS
// =========================================
// =========================================
// GET ALL PLANS
// =========================================
exports.getPlans = async (
  coachId,
  {
    limit,
    offset,
    search = '',
  }
) => {
  const plansQuery = `
    SELECT *
    FROM workout_plans
    WHERE coach_id = $1
      AND (
        name ILIKE $2
        OR description ILIKE $2
      )
    ORDER BY created_at DESC
    LIMIT $3 OFFSET $4
  `;

  const countQuery = `
    SELECT COUNT(*)
    FROM workout_plans
    WHERE coach_id = $1
      AND (
        name ILIKE $2
        OR description ILIKE $2
      )
  `;

  const searchValue = `%${search}%`;

  const plansResult = await pool.query(
    plansQuery,
    [
      coachId,
      searchValue,
      limit,
      offset,
    ]
  );

  const countResult = await pool.query(
    countQuery,
    [
      coachId,
      searchValue,
    ]
  );

  const plans = await Promise.all(
    plansResult.rows.map(async (plan) => {
      const exercises =
        await exports.getPlanExercises(plan.id);

      return {
        ...plan,
        exercises,
      };
    })
  );

  return {
    plans,
    total: Number(
      countResult.rows[0].count
    ),
  };
};

// =========================================
// GET PLAN BY ID
// =========================================
exports.getPlanById = async (id) => {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM workout_plans
    WHERE id = $1
    `,
    [id]
  );

  const plan = rows[0];

  if (!plan) return null;

  const exercises =
    await exports.getPlanExercises(plan.id);

  return {
    ...plan,
    exercises,
  };
};

// =========================================
// UPDATE PLAN
// =========================================
exports.updatePlan = async (
  id,
  name,
  description
) => {
  const { rows } = await pool.query(
    `
    UPDATE workout_plans
    SET
      name = $1,
      description = $2
    WHERE id = $3
    RETURNING *
    `,
    [name, description, id]
  );

  return rows[0];
};

// =========================================
// DELETE PLAN
// =========================================
exports.deletePlan = async (id) => {
  await pool.query(
    `
    DELETE FROM workout_plans
    WHERE id = $1
    `,
    [id]
  );
};

// =========================================
// ASSIGN PLAN
// =========================================
exports.assignPlan = async (
  plan_id,
  client_id
) => {
  await pool.query(
    `
    INSERT INTO plan_assignments (
      plan_id,
      client_id
    )
    VALUES ($1, $2)
    `,
    [plan_id, client_id]
  );
};

// =========================================
// COMPLETE PLAN
// =========================================
exports.completePlan = async (
  assignmentId
) => {
  await pool.query(
    `
    UPDATE plan_assignments
    SET
      status = 'completed',
      completed_at = NOW()
    WHERE id = $1
    `,
    [assignmentId]
  );
};

// =========================================
// GET CLIENT PLANS
// =========================================
// =========================================
// GET CLIENT PLANS
// =========================================
exports.getClientPlans = async (
  clientId,
  {
    limit,
    offset,
    search = '',
  }
) => {
  const plansQuery = `
    SELECT
      pa.id as assignment_id,
      pa.status,
      pa.completed_at,
      pa.assigned_at,

      wp.id as plan_id,
      wp.name,
      wp.description,

      u.name as assigned_by_name

    FROM plan_assignments pa

    JOIN workout_plans wp
      ON pa.plan_id = wp.id

    JOIN users u
      ON wp.coach_id = u.id

    WHERE pa.client_id = $1
      AND (
        wp.name ILIKE $2
        OR wp.description ILIKE $2
      )

    ORDER BY pa.assigned_at DESC

    LIMIT $3 OFFSET $4
  `;

  const countQuery = `
    SELECT COUNT(*)

    FROM plan_assignments pa

    JOIN workout_plans wp
      ON pa.plan_id = wp.id

    WHERE pa.client_id = $1
      AND (
        wp.name ILIKE $2
        OR wp.description ILIKE $2
      )
  `;

  const searchValue = `%${search}%`;

  const plansResult = await pool.query(
    plansQuery,
    [
      clientId,
      searchValue,
      limit,
      offset,
    ]
  );

  const countResult = await pool.query(
    countQuery,
    [
      clientId,
      searchValue,
    ]
  );

  const plans = await Promise.all(
    plansResult.rows.map(async (plan) => {
      const exercises =
        await exports.getPlanExercises(
          plan.plan_id
        );

      return {
        ...plan,
        exercises,
      };
    })
  );

  return {
    plans,
    total: Number(
      countResult.rows[0].count
    ),
  };
};