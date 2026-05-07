const asyncHandler = require('../../helpers/asyncHandler');
const service = require('./plans.service');

// CREATE PLAN
exports.createPlan = asyncHandler(async (req, res) => {
  const plan = await service.createPlan(req.user.id, req.body);

  res.json({ success: true, data: plan });
});

// GET ALL PLANS (coach)
exports.getPlans = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;

  const limit = Number(req.query.limit) || 10;

  const search = req.query.search || '';

  console.log("search ",search)

  const result = await service.getPlans(
    req.user.id,
    {
      page,
      limit,
      search,
    }
  );

  res.json({
    success: true,
    total: result.total,
    page,
    limit,
    data: result.plans,
  });
});

// GET SINGLE PLAN
exports.getPlanById = asyncHandler(async (req, res) => {
  const plan = await service.getPlanById(req.params.id);

  res.json({ success: true, data: plan });
});

// UPDATE PLAN
exports.updatePlan = asyncHandler(async (req, res) => {
  const plan = await service.updatePlan(req.params.id, req.body);

  res.json({ success: true, data: plan });
});

// DELETE PLAN
exports.deletePlan = asyncHandler(async (req, res) => {
  await service.deletePlan(req.params.id);

  res.json({ success: true, message: 'Deleted successfully' });
});

// ASSIGN PLAN
exports.assignPlan = asyncHandler(async (req, res) => {
  await service.assignPlan(req.body.planId, req.body.clientIds);

  res.json({ success: true });
});

// COMPLETE PLAN (client)
exports.completePlan = asyncHandler(async (req, res) => {
  await service.completePlan(req.body.assignmentId);

  res.json({ success: true });
});

// GET CLIENT ASSIGNED PLANS
exports.getClientPlans = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
    const search = req.query.search || '';

  const result = await service.getClientPlans(req.user.id, {
    page,
    limit,
    search
  });

  res.json({
    success: true,
    total: result.total,
    page,
    limit,
    data: result.plans,
  });
});