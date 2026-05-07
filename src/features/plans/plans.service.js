const model = require('./plans.model');

// =========================================
// CREATE PLAN
// =========================================
exports.createPlan = async (coachId, data) => {
  const plan = await model.createPlan(
    coachId,
    data.name,
    data.description
  );

  let index = 1;

  for (const exerciseId of data.exercises) {
    await model.addPlanExercise(
      plan.id,
      exerciseId,
      index++
    );
  }

  const exercises = await model.getPlanExercises(
    plan.id
  );

  return {
    ...plan,
    exercises,
  };
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
    page = 1,
    limit = 10,
    search = '',
  }
) => {
  const offset = (page - 1) * limit;

  return await model.getPlans(
    coachId,
    {
      limit,
      offset,
      search,
    }
  );
};
// =========================================
// GET SINGLE PLAN
// =========================================
exports.getPlanById = async (id) => {
  return await model.getPlanById(id);
};

// =========================================
// UPDATE PLAN
// =========================================
exports.updatePlan = async (id, data) => {
  return await model.updatePlan(
    id,
    data.name,
    data.description
  );
};

// =========================================
// DELETE PLAN
// =========================================
exports.deletePlan = async (id) => {
  await model.deletePlan(id);
};

// =========================================
// ASSIGN PLAN
// =========================================
exports.assignPlan = async (
  planId,
  clientIds
) => {
  for (const clientId of clientIds) {
    await model.assignPlan(planId, clientId);
  }
};

// =========================================
// COMPLETE PLAN
// =========================================
exports.completePlan = async (
  assignmentId
) => {
  await model.completePlan(assignmentId);
};

// =========================================
// GET CLIENT PLANS
// =========================================
exports.getClientPlans = async (
  clientId,
  { page, limit,   search = '',}
) => {
  const offset = (page - 1) * limit;

  return await model.getClientPlans(clientId, {
    limit,
    offset,
    search
  });
};